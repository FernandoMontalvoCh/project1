const { Restaurant } = require("../models/restaurant.model");
const { Review } = require("../models/review.model");

const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: { status: "active" },
    include: { model: Review },
  });

  res.status(200).json({
    status: "success",
    data: { restaurants },
  });
});

const getOneRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  const restaurant = await Restaurant.findOne({
    include: { model: Review },
  });

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

const createRestaurantReview = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;
  const { comment, rating } = req.body;
  const { sessionUser } = req;

  const newReview = await Review.create({
    userId: sessionUser.id,
    restaurantId,
    comment,
    rating,
  });

  res.status(201).json({
    status: "success",
    data: { newReview },
  });
});

const updateRestaurantReview = catchAsync(async (req, res, next) => {
  const { review, sessionUser } = req;
  const { comment, rating } = req.body;

  if (sessionUser.id === review.userId) {
    await review.update({ comment, rating });
  } else {
    return next(new AppError("Not your review", 400));
  }
  res.status(201).json({ status: "success", review });
});

const deleteRestaurantReview = catchAsync(async (req, res, next) => {
  const { review, sessionUser } = req;

  if (sessionUser.id === review.userId) {
    await review.update({ status: "deleted" });
  } else {
    return next(new AppError("Not the author of the review", 400));
  }
  res.status(204).json({ status: "success" });
});

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
