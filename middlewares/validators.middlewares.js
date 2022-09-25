const { body, validationResult } = require("express-validator");

//Utils
const { AppError } = require("../utils/appError.util");

const checkValidations = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    // [{..., msg}] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = error.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return next(new AppError(message, 400))
  }
  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 2 })
    .withMessage("Name must be al least 2 characters"),
  body("email").isEmail().withMessage("Must provid a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  checkValidations,
];

const createMealValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 2})
    .withMessage("Name must be al least 2 characters"),
  body("price")
    .notEmpty()
    .withMessage("price cannot be empty")
    .isLength({ min: 1 })
    .withMessage("Price must be al least 1 characters"),
  checkValidations,
];

const createRestaurantValidator = [
  body("name")
  .isString()
  .withMessage("Name must be a string")
  .notEmpty()
  .withMessage("Name cannot be empty")
  .isLength({ min: 2 })
  .withMessage("Name must be al least 2 characters"),
body("adress")
  .isString()
  .withMessage("Adress must be a string")
  .notEmpty()
  .withMessage("Adress cannot be empty")
  .isLength({ min: 4 })
  .withMessage("Adress must be at least 4 characters"),
  body("rating")
  .notEmpty()
  .withMessage("Rating cannot be empty")
  .isLength({ min: 1 })
  .withMessage("Rating must be at least 1 characters"),
checkValidations,
];

const createReviewValidators = [
  body("userId")
  .notEmpty()
  .withMessage("userId cannot be empty")
  .isLength({ min: 1 })
  .withMessage("userId must be al least 1 characters"),
body("restaurantId")
  .notEmpty()
  .withMessage("restaurantId cannot be empty")
  .isLength({ min: 1 })
  .withMessage("restaurantId must be at least 1 characters"),
  body("comment")
  .isString()
  .withMessage("Comment must be a string")
  .notEmpty()
  .withMessage("Comment cannot be empty")
  .isLength({ min: 4 })
  .withMessage("Comment must be al least 4 characters"),
  body("rating")
  .notEmpty()
  .withMessage("Rating cannot be empty")
  .isLength({ min: 1 })
  .withMessage("Rating must be at least 1 characters"),
checkValidations,
];

module.exports = { 
  createUserValidators, 
  createMealValidator,
  createRestaurantValidator,
  createReviewValidators,
};
