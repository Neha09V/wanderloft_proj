const mongoose = require("mongoose");
const Community = require("../models/community");

async function seedDB() {

    await Community.deleteMany({}); // clear old data

    await Community.insertMany([
        
       {
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
    caption: "Exploring the vibrant culture of Rajasthan 🕌",
    location: "Jaipur",
},
{
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
    caption: "Serene backwaters of Kerala 🚤",
    location: "Alleppey",
},
{
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    caption: "The majestic Himalayas 🏔️",
    location: "Leh",
},
{
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
    caption: "India Gate: A symbol of national pride and history 🏛️",
    location: " India Gate Delhi",
},
{
    image: "https://images.unsplash.com/photo-1548013146-72479768bada",
    caption: "The iconic Taj Mahal at sunrise 🌅",
    location: "Agra",
},

{
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073",
    caption: "The stunning architecture of the Golden Temple ✨",
    location: "Golden Temple, Amritsar",
},
{
    image: "https://images.unsplash.com/photo-1558431382-27e303142255",
    caption: "Museum of Kolkata's rich history and culture 🏛️",
    location: " Museum of Kolkata",
},
{
    image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e",
    caption: "Baackwaters of Kerala: A tranquil escape from the hustle and bustle 🚤",
    location: "Kerala",
},

{
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
    caption: "Gateway of India's iconic architecture and vibrant culture 🏰",
    location: "Gateway of India, Mumbai",
},
{
    image: "https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc",
    caption: "JeJu Island;s Coastal beauty and Stunning Landscapes 🌊",
    location: "JeJu Island",
},



{
    image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d",
    caption: "Sandy Buildings  of Vidhana Soudha 🏛️",
    location: "Vidhana Soudha, Bangalore",
},
    ]);

    console.log("Community seeded successfully 🌍");
}

module.exports = seedDB;