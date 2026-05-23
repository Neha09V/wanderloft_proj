const mongoose = require("mongoose");
const Listing = require("./models/listing");

async function fix() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderloft");

  const listings = await Listing.find({});

  for (let l of listings) {
    if (Array.isArray(l.geometry)) {
      const [lng, lat] = l.geometry;

      l.geometry = {
        type: "Point",
        coordinates: [lng, lat],
      };

      await l.save();
      console.log("Fixed:", l.title);
    }
  }

  console.log("All listings updated");
  mongoose.connection.close();
}

fix();