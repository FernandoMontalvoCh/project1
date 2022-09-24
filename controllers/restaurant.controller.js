const { Restaurant } = require("../models/restaurant.model");

const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({ where: { status: "active" } });

  res.status(200).json({
    status: "success",
    data: { restaurants },
  });
});

const getOneRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  const restaurant = await Restaurant.findOne({ where: { status: "active" } });

  if (restaurant.id !== id) {
    return next(new AppError("Meal not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { restaurant },
  });
});

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({ name, address, rating });

  res.status(201).json({
    status: "success",
    data: { newRestaurant },
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, adress } = req.body;
  const { restaurant } = req;

  await restaurant.update({ name, adress });

  res.status(200).json({
    status: "success",
    data: { restaurant },
  });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: "deleted" });

  res.status(204).json({
    status: "success",
  });
});

const createRestaurantReview = catchAsync(async (req, res, next) => {});

const updateRestaurantReview = catchAsync(async (req, res, next) => {});

const deleteRestaurantReview = catchAsync(async (req, res, next) => {});

module.exports = {
  getAllRestaurants,
  getOneRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createRestaurantReview,
  updateRestaurantReview,
  deleteRestaurantReview,
};
