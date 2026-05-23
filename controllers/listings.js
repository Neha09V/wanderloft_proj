const Listing = require("../models/listing");
 const { cloudinary } = require("../cloudConfig");



module.exports.index = async (req, res) => {
  let allListings = await Listing.find();
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
   return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  
 const { location } = req.body.listing;

  // 🌍 Get coordinates from OpenStreetMap
  const geoRes = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${location}`,
    {
      headers: {
        "User-Agent": "WanderLoft/1.0 (https://Wanderloft.com)",
      },
    }
  );
  if (!geoRes.ok) {
  req.flash("error", "Location service failed");
  return res.redirect("/listings/new");
}
  const data = await geoRes.json();

  

  if (!data.length) {
    req.flash("error", "Invalid location");
    return res.redirect("/listings/new");
  }

  const lat = data[0].lat;
  const lon = data[0].lon;

  const newListing = new Listing(req.body.listing);

  newListing.owner = req.user._id;
  newListing.image = {
    filename: req.file.filename,
    url: req.file.path
  };

  // 🗺️ store coordinates
  newListing.geometry = {
    type: "Point",
    coordinates: [parseFloat(lon), parseFloat(lat)]
  };

  await newListing.save();

  req.flash("success", "New listing created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you trying to edit for does not exist!");
    res.redirect("/listings");
  }
 let imageUrl = listing.image.url;
  imageUrl = imageUrl.replace("/upload", "/upload/w_250,h_160");
  res.render("listings/edit.ejs", { listing, imageUrl });
};

module.exports.updateListing = async (req, res, next) => {
  let { id } = req.params;
  // let response = await geoCodingClient
  //   .forwardGeocode({
  //     query: ` ${req.body.listing.location},${req.body.listing.country}`,
  //     limit: 1,
  //   })
  //   .send();

  // req.body.listing.geometry = response.body.features[0].geometry;
  let updatedListing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });



  // 🌍 ADD THIS (auto geocode on update also)
  const location = req.body.listing.location;

  const geoRes = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${location}`,
    {
      headers: {
        "User-Agent": "WanderLoft/1.0"
      }
    }
  );

  const data = await geoRes.json();

  if (data.length) {
    updatedListing.geometry = {
      type: "Point",
      coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)]
    };
  }

  await updatedListing.save();

  // if (typeof req.file !== "undefined") {
  //   let url = req.file.path;
  //   let filename = req.file.filename;
  //   updatedListing.image = { url, filename };
  //   await updatedListing.save();
  // }
  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.filter = async (req, res, next) => {
  let { id } = req.params;
  let allListings = await Listing.find({ category: { $all: [id] } });
  if (allListings.length != 0) {
    res.locals.success = `Listings Filtered by ${id}!`;
    res.render("listings/index.ejs", { allListings });
  } else {
    req.flash("error", `There is no any Listing for ${id}!`);
    res.redirect("/listings");
  }
};

module.exports.search = async (req, res) => {
   let input = req.query.q;
  // if (input == "" || input == " " || !input || input == undefined) {
  //   req.flash("error", "Please enter search query!");
  //   res.redirect("/listings");
  // }
    if (!input || input.trim() === "") {
    req.flash("error", "Please enter search query!");
    return res.redirect("/listings");
  }

  input = input.trim().replace(/\s+/g, " ");
  let data = input.split("");
  let element = "";
  let flag = false;
  for (let index = 0; index < data.length; index++) {
    if (index == 0 || flag) {
      element = element + data[index].toUpperCase();
    } else {
      element = element + data[index].toLowerCase();
    }
    flag = data[index] == " ";
  }

  let allListings = await Listing.find({
    title: { $regex: element, $options: "i" },
  });
  if (allListings.length != 0) {
    res.locals.success = "Listings searched by Title!";
    res.render("listings/index.ejs", { allListings });
    return;
  }

  if (allListings.length == 0) {
    allListings = await Listing.find({
      category: { $regex: element, $options: "i" },
    }).sort({ _id: -1 });
    if (allListings.length != 0) {
      res.locals.success = "Listings searched by Category!";
      res.render("listings/index.ejs", { allListings });
      return;
    }
  }
  if (allListings.length == 0) {
    allListings = await Listing.find({
      country: { $regex: element, $options: "i" },
    }).sort({ _id: -1 });
    if (allListings.length != 0) {
      res.locals.success = "Listings searched by Country!";
      res.render("listings/index.ejs", { allListings });
      return;
    }
  }

  if (allListings.length == 0) {
    allListings = await Listing.find({
      location: { $regex: element, $options: "i" },
    }).sort({ _id: -1 });
    if (allListings.length != 0) {
      res.locals.success = "Listings searched by Location!";
      res.render("listings/index.ejs", { allListings });
      return;
    }
  }

  const intValue = parseInt(element, 10);
  const intDec = Number.isInteger(intValue);

  if (allListings.length == 0 && intDec) {
    allListings = await Listing.find({ price: { $lte: element } }).sort({
      price: 1,
    });
    if (allListings.length != 0) {
      res.locals.success = `Listings searched by price less than Rs ${element}!`;
      res.render("listings/index.ejs", { allListings });
      return;
    }
  }
  if (allListings.length == 0) {
    req.flash("error", "No listings found based on your search!");
    res.redirect("/listings");
  }
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};

module.exports.reserveListing = async (req, res) => {
  let { id } = req.params;
  req.flash("success", "Reservation Details sent to your Email!");
  res.redirect(`/listings/${id}`);
};