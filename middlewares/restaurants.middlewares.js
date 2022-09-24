//Models
const { Restaurant } = require("../models/restaurant.model")

//Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const restaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({ where: { status: "active", id } });

  if (!restaurant) {
    return next(new AppError("This meal does not exists", 404));
  }

  req.restaurant = restaurant;
  next();
});

module.exports = { restaurantExist };