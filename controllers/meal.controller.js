const { Meal } = require("../models/meal.model");

const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({ where: { status: "active" } });

  res.status(200).json({
    status: "success",
    data: { meals },
  });
});

const getOneMeal = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  const meal = await Meal.findOne({ where: { status: "active" } });

  if (meal.id !== id) {
    return next(new AppError("Meal not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;

  const newMeal = await Meal.create({ name, price });

  res.status(201).json({
    status: "success",
    data: { newMeal },
  });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { meal } = req;

  await meal.update({ name, price });

  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: "deleted" });

  res.status(204).json({
    status: "success",
  });
});

module.exports = {
  getAllMeals,
  getOneMeal,
  createMeal,
  updateMeal,
  deleteMeal,
};
