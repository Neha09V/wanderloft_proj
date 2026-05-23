const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
     category: Joi.string().required(),

    // ✅ IMAGE OPTIONAL (IMPORTANT)
    image: Joi.object({
      url: Joi.string().uri().allow("", null),
      filename: Joi.string().allow("", null)
    }).optional()

  }).required()

});


module.exports.signupSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

// ✅ LOGIN VALIDATION
module.exports.loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});
 module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
  }).required()
});

