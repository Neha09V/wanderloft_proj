// require("dotenv").config() ;

// const mongoose= require("mongoose") ;
// const initData =require("./data.js") ;
// const Listing = require("../models/listing.js");   

// const dbUrl = process.env.ATLASDB_URL;

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(dbUrl);
// }

// const initDB = async () => {
//   try {
//     await Listing.deleteMany({});

//     const updatedData = await Promise.all(
//       initData.data.map(async (obj) => {
//         let response;
//         try {
//           response = await geoCodingClient
//             .forwardGeocode({
//               query: `${obj.location}, ${obj.country}`,
//               limit: 1,
//             })
//             .send();
//         } catch (error) {
//           console.error(
//             `Geocoding failed for ${obj.location}, ${obj.country}:`,
//             error
//           );
//           return { ...obj, owner: "66567b03fda820235197b582", geometry: null };
//         }

//         const geometry = response.body.features[0].geometry || null;

//         return {
//           ...obj,
//           owner: "66567b03fda820235197b582",
//           geometry,
//         };
//       })
//     );

//     await Listing.insertMany(updatedData);
//     console.log("DB is initialized");
//   } catch (error) {
//     console.error("Error initializing DB:", error);
//   }
// };

// initDB();
require("dotenv").config();

const mongoose = require("mongoose");
const axios = require("axios");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// const dbUrl = process.env.ATLASDB_URL;
const dbUrl = "mongodb://127.0.0.1:27017/wanderloft";

async function main() {
  await mongoose.connect(dbUrl);
  console.log("connected to DB");
}

main().catch(err => console.log(err));

const initDB = async () => {
  try {
    await Listing.deleteMany({});

    const updatedData = await Promise.all(
      initData.data.map(async (obj) => {
        let geometry = null;

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search`,
            {
              params: {
                format: "json",
                q: `${obj.location}, ${obj.country}`
              },
              headers: {
                "User-Agent": "WanderLoft App"
              }
            }
          );

          const data = response.data;

          if (data.length) {
            geometry = {
              type: "Point",
              coordinates: [
                parseFloat(data[0].lon),
                parseFloat(data[0].lat)
              ]
            };
          }
        } catch (error) {
          console.error(`Geocoding failed for ${obj.location}`, error);
        }

        return {
          ...obj,
          owner: "66567b03fda820235197b582",
          geometry
        };
      })
    );

    await Listing.insertMany(updatedData);
    console.log("DB is initialized");
  } catch (error) {
    console.error("Error initializing DB:", error);
  }
};

initDB();