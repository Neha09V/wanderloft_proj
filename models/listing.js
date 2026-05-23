const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;
const Review = require("./review");
const { required } = require("joi");

 const listingSchema = new mongoose.Schema ({
    title:  {
        type:String,
        required:true,
        validate: {
          validator: function (v) {
            return typeof v === 'string' && isNaN(Number(v));
          },
          message: "Title must be a non-numeric string."
        }
    },


    description: {
      type:String
    },

//mongoose virtuals function 
  //   url: {
  //     type: String,
  //     required: true,
  //     default: "https://unsplash.com/photos/a-mountain-range-covered-in-snow-and-clouds-O67hc8Ws_xo",
  //     set: (v) =>
  //       v === "" ? "https://unsplash.com/photos/a-mountain-range-covered-in-snow-and-clouds-O67hc8Ws_xo" : v
  //   }
    // image: {
    //     url:String,
    //     filename:  {
    //      type: String,
    //      default:
    //     ""
    //     },
    //   },
    //         image: {
    //     filename: {
    //         type: String,
    //         default: "listingimage",
    //         set: (v) => v === "" ? "listingimage" : v,
    //     },
    //     url: {
    //         type: String,
    //         default: "https://images.unsplash.com/photo-1748897364750-a9ce5b1067cc?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         set: (v) => v === "" ? "https://images.unsplash.com/photo-1748897364750-a9ce5b1067cc?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    //     },
    // },
      

     image: {
      url : String,
      filename:String
     },
     
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
     type:String
    },
    country: {
       type:String
    },
    

      category: {
    type: String,
    // required: true,
    // enum: [
      
    //   "Rooms",
    //   "Mountains Retreats",
    //   "Farms",
    //   "Camping",
    //   "Amazing Pool",
    //   "Iconic cities",
    //   "Countryside",
    //   "Beaches",
    //   "Castles",
    //   "Arctic"
    // ],
  

  },
 
   // ✅ GeoJSON field
  // geometry: {
  //   type: {
  //     type: String,
  //     enum: ["Point"],
  //     // required: true
  //   },
  //   coordinates: {
  //     type: [Number], // [longitude, latitude]
  //     // required: true
  //   }
  // },
geometry: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
    required: true
  },
  coordinates: {
    type: [Number],
    required: true,
    default: [0, 0]
  }
},

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref:"Review",
      },
    ],
    owner : {
      type: Schema.Types.ObjectId,
      ref: "User",
     },

 });
  


 listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id: {$in: listing.reviews}}) ;
  }
 });



 const Listing= mongoose.model("Listing",listingSchema) ;
 module.exports = Listing;
 

