const mongoose = require("mongoose");
const Discussion = require("../models/discussion");
const Answer = require("../models/answer");
const User = require("../models/user");

require("dotenv").config();

const dbUrl = process.env.ATLASDB_URL;


// ================================
// SEED DISCUSSIONS
// ================================

const discussions = [
    {
        title: "What are the best budget-friendly places to visit in Himachal?",
        description:
            "I am planning a 5-day trip to Himachal. Can anyone suggest affordable destinations, transportation options, and budget-friendly stays?",
        tags: ["Budget Travel", "Himachal", "Travel Tips"]
    },

    {
        title: "What should I know before my first solo trip?",
        description:
            "I am planning my first solo trip in India. What safety tips, planning advice, and common mistakes should I keep in mind?",
        tags: ["Solo Travel", "Travel Tips"]
    },

    {
        title: "Which are the best places for a weekend trip from Delhi?",
        description:
            "Looking for peaceful weekend destinations near Delhi. Please share recommendations for transportation, approximate budgets, and activities.",
        tags: ["Weekend Trips", "Destinations"]
    },

    {
        title: "How can I plan a low-budget trip to Goa?",
        description:
            "I want to visit Goa on a limited budget. What would be a reasonable plan for accommodation, food, and local transportation?",
        tags: ["Budget Travel", "Goa"]
    },

    

    {
        title: "How can I plan a memorable birthday trip?",
        description:
            "I want to spend my birthday somewhere different instead of having a traditional celebration. Looking for ideas for a 3 to 4 day trip.",
        tags: ["Weekend Trips", "Travel Ideas", "Experiences"]
    },

    {
        title: "What are some travel apps you actually use?",
        description:
            "There are so many travel apps for maps, accommodation, transport, weather, and itinerary planning. Which ones do you actually find useful?",
        tags: ["Travel Apps", "Travel Tips", "Planning"]
    }
];


// ================================
// SEED ANSWERS
// ================================

const answers = [
    {
        question:
            "What are the best budget-friendly places to visit in Himachal?",

        content:
            "For a 5-day budget trip, you can consider Manali, Kasol, or Tirthan Valley. Traveling by bus and staying in hostels or small guesthouses can help keep the cost manageable."
    },

    {
        question:
            "What are the best budget-friendly places to visit in Himachal?",

        content:
            "If you prefer a quieter trip, Tirthan Valley is a good option. Try booking accommodation slightly away from the main tourist areas and use local buses wherever possible."
    },

    {
        question:
            "What should I know before my first solo trip?",

        content:
            "For your first solo trip, start with a destination that is easy to navigate. Share your itinerary with someone you trust and keep digital copies of important documents."
    },

    {
        question:
            "What should I know before my first solo trip?",

        content:
            "Avoid planning every minute of the trip. Keep some flexibility in your schedule and check local transport timings before traveling to remote areas."
    },

    {
        question:
            "Which are the best places for a weekend trip from Delhi?",

        content:
            "Rishikesh, Jaipur, Agra, and Lansdowne are popular weekend options. The best choice depends on whether you want adventure, history, nature, or a relaxed trip."
    },

    {
        question:
            "How can I plan a low-budget trip to Goa?",

        content:
            "Traveling during the off-season can reduce accommodation costs. Hostels, local restaurants, and public transportation can also help keep the overall budget low."
    },

    {
        question:
            "How can I plan a low-budget trip to Goa?",

        content:
            "Compare accommodation prices before booking and consider staying slightly away from the busiest beaches. You can also rent a scooter if you plan to explore multiple areas."
    },

    {
        question:
            "What are some essential things to pack for a mountain trip?",

        content:
            "Carry layers instead of one very heavy jacket. Comfortable shoes, a rain jacket, sunscreen, a power bank, water bottle, basic medicines, and a small first-aid kit are useful."
    },

    {
        question:
            "What are some essential things to pack for a mountain trip?",

        content:
            "Always check the weather forecast before leaving. For longer hikes, keep your backpack lightweight and carry enough water and snacks."
    },

    {
        question:
            "How do you find reliable and affordable accommodation?",

        content:
            "I usually compare ratings, recent reviews, location, cancellation policies, and photos before booking. Recent reviews are especially useful for understanding the current condition of a property."
    },

    {
        question:
            "Which is better for a short trip: train or bus?",

        content:
            "For longer distances, trains can be more comfortable. For shorter routes, buses can sometimes be more convenient because they may have more departure options."
    },

    {
        question:
            "What are some underrated travel destinations in India?",

        content:
            "Tirthan Valley, Ziro Valley, Majuli, and parts of Meghalaya can be interesting choices if you want to explore less crowded destinations."
    },

    {
        question:
            "What are some underrated travel destinations in India?",

        content:
            "Exploring smaller towns instead of only major tourist attractions can lead to some great experiences. Local recommendations are often useful for discovering less-known places."
    },
       {
        question:
            "Is a Spiti Valley trip possible for beginners?",

        content:
            "Yes, but I would not treat it like a normal hill-station trip. Take your time to acclimatize, avoid rushing between destinations, and keep some buffer days because road conditions can change."
    },

    {
        question:
            "Is a Spiti Valley trip possible for beginners?",

        content:
            "If it is your first high-altitude trip, consider going with an experienced group or planning through a reliable local operator. Keep warm layers, basic medicines, water, and snacks with you."
    },


  

   

    // ========================================
    // SOLO TRAVEL
    // ========================================

    {
        question:
            "Which places in India are good for a 3-day solo trip?",

        content:
            "Rishikesh, Jaipur, Udaipur, Pondicherry, and Varanasi can work for a short solo trip depending on where you are starting from. Choose somewhere with convenient local transport."
    },

    {
        question:
            "Which places in India are good for a 3-day solo trip?",

        content:
            "For only three days, I would choose a destination that does not require an entire day of travel. Staying near the main areas can also save a lot of time."
    },




   
  

    // ========================================
    // ROAD TRIPS
    // ========================================

    {
        question:
            "How do you plan a road trip without overplanning?",

        content:
            "I usually decide the main destination and only a few important stops in advance. Leaving some time for unexpected viewpoints, cafes, or local places makes road trips more enjoyable."
    },

    {
        question:
            "How do you plan a road trip without overplanning?",

        content:
            "Check fuel stations, accommodation, road conditions, and approximate driving time beforehand. Beyond those essentials, I prefer keeping the daily schedule flexible."
    },


    // ========================================
    // MONSOON
    // ========================================

    {
        question:
            "What are some good monsoon destinations in India?",

        content:
            "Coorg, Wayanad, parts of Maharashtra, Meghalaya, and the Western Ghats can be beautiful during the monsoon. Just check local weather and road conditions before traveling."
    },

    {
        question:
            "What are some good monsoon destinations in India?",

        content:
            "Monsoon trips are great for greenery and waterfalls, but trekking routes can become slippery. I would keep waterproof bags and shoes and avoid risky trails during heavy rain."
    },


   


    // ========================================
    // TRAIN TRAVEL
    // ========================================

    {
        question:
            "How can I travel by train across India on a budget?",

        content:
            "Booking trains early can give you more options. Sleeper and AC 3-tier can be practical depending on the route, and staying near railway stations can sometimes reduce local transportation costs."
    },

    {
        question:
            "How can I travel by train across India on a budget?",

        content:
            "Try planning your route around overnight trains when possible. You can save both travel time and one night's accommodation, although the journey should still fit your comfort level."
    },


 


    // ========================================
    // TOUR VS INDEPENDENT
    // ========================================

    {
        question:
            "How do you choose between a planned tour and independent travel?",

        content:
            "Independent travel gives you more flexibility, while group tours can simplify transportation and logistics. For remote destinations, a group or local guide can sometimes make planning easier."
    },

    {
        question:
            "How do you choose between a planned tour and independent travel?",

        content:
            "I usually travel independently when public transportation is easy. For places with complicated routes or limited connectivity, I would consider a local tour or guide."
    },


    // ========================================
    // FOOD TRAVEL
    // ========================================

    {
        question:
            "Which Indian cities are best for food-focused travel?",

        content:
            "Delhi, Lucknow, Amritsar, Hyderabad, Kolkata, and Indore are interesting choices for food lovers. Each has a very different local food culture."
    },

    {
        question:
            "Which Indian cities are best for food-focused travel?",

        content:
            "Do not only look at famous restaurants. Some of the best local food can be found at small family-run places and traditional markets."
    },


    // ========================================
    // TREKKING
    // ========================================

    {
        question:
            "What are some beginner-friendly trekking destinations?",

        content:
            "For beginners, look for shorter trails with established routes and reasonable elevation gain. Triund and Nag Tibba are often considered approachable options, but conditions should always be checked before going."
    },

    {
        question:
            "What are some beginner-friendly trekking destinations?",

        content:
            "Good shoes are more important than expensive trekking equipment for a beginner. Start with a shorter trek and learn how your body handles elevation before attempting longer routes."
    },


  
   


    // ========================================
    // PHOTOGRAPHY
    // ========================================

    {
        question:
            "What are the best places for a photography trip in India?",

        content:
            "Ladakh, Rajasthan, Kerala, Meghalaya, and parts of Uttarakhand offer very different photography opportunities. Rajasthan is especially interesting for architecture and street photography."
    },

    {
        question:
            "What are the best places for a photography trip in India?",

        content:
            "If you enjoy street photography, spend time walking around local markets instead of only visiting tourist attractions. Early mornings and evenings usually give interesting light and activity."
    },


    // ========================================
    // TRAVEL SAFETY
    // ========================================

    {
        question:
            "How can I avoid common tourist scams while traveling?",

        content:
            "Research common scams before visiting a destination and confirm prices before using taxis, guides, or local services. Avoid handing over important documents unnecessarily."
    },

    {
        question:
            "How can I avoid common tourist scams while traveling?",

        content:
            "I usually use official transport counters or verified apps whenever possible. Keeping emergency contacts and copies of important documents offline is also useful."
    },


   

    


    // ========================================
    // FRIENDS / GROUP TRAVEL
    // ========================================

    {
        question:
            "How do you plan a trip when traveling with friends?",

        content:
            "Before booking anything, agree on an approximate budget and the type of trip everyone wants. We usually split shared expenses equally and track them using a shared expense app."
    },

    {
        question:
            "How do you plan a trip when traveling with friends?",

        content:
            "Do not try to make every activity compulsory for everyone. It is completely fine if two people want to explore while others prefer relaxing at the hotel."
    },


    // ========================================
    // INTERNATIONAL TRAVEL
    // ========================================

    {
        question:
            "Which destinations are good for a first international trip from India?",

        content:
            "Thailand, Vietnam, Nepal, Sri Lanka, and Malaysia are commonly considered by Indian travelers because they offer different experiences and relatively straightforward tourist infrastructure."
    },

    {
        question:
            "Which destinations are good for a first international trip from India?",

        content:
            "For a first international trip, I would prioritize destinations with easy transportation and plenty of travel information available online. Keep passport, visa, insurance, and emergency documents organized."
    },



 

  

 



];


// ================================
// SEED FUNCTION
// ================================

async function seedDiscussion() {

    try {

        await mongoose.connect(dbUrl);

        console.log("Connected to database");


        // Find an existing user
        const user = await User.findOne();

        if (!user) {
            console.log(
                "No user found. Please create a user first."
            );

            return;
        }
  // ================================
        // CLEAR OLD DATA
        // ================================

    

        // await Answer.deleteMany({});
        // await Discussion.deleteMany({});

        // console.log("Old discussions and answers deleted!");


        // ================================
        // CREATE DISCUSSIONS
        // ================================

        for (const data of discussions) {

            await Discussion.updateOne(
                {
                    title: data.title
                },

                {
                    $setOnInsert: {
                        ...data,
                        author: user._id
                    }
                },

                {
                    upsert: true
                }
            );
        }

        console.log("Discussions seeded successfully!");



        // ================================
        // CREATE ANSWERS
        // ================================

        for (const data of answers) {

            // Find the question
            const discussion = await Discussion.findOne({
                title: data.question
            });

            if (!discussion) {

                console.log(
                    `Question not found: ${data.question}`
                );

                continue;
            }


            // Prevent duplicate answers
            const existingAnswer = await Answer.findOne({
                discussion: discussion._id,
                content: data.content
            });

            if (existingAnswer) {
                continue;
            }


            // Create answer
            await Answer.create({

                content: data.content,

                author: user._id,

                discussion: discussion._id

            });
        }


        console.log("Answers seeded successfully!");

        console.log("Discussion seeding completed!");

    } catch (err) {

        console.log(err);

    } finally {

        await mongoose.connection.close();

    }
}


seedDiscussion();