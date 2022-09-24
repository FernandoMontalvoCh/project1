//Models
const { Meal } = require("../models/meal.model")

//Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const mealExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({ where: { status: "active", id } });

  if (!meal) {
    return next(new AppError("This meal does not exists", 404));
  }

  req.meal = meal;
  next();
});

module.exports = { mealExist };