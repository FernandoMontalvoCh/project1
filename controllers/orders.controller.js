const { Order } = require("../models/order.model");
const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");

const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const createAnOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;

  

  const newOrder = await Order.create({ quantity, mealId });

  res.status(201).json({
    status: "success",
    data: { newOrder },
  });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    include: [{ model: Meal }, { model: Restaurant }],
  });

  res.status(200).json({
    status: "success",
    data: { orders },
  });
});

const updateAnOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "completed" });

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

const deleteAnOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "deleted" });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  createAnOrder,
  getAllOrders,
  updateAnOrder,
  deleteAnOrder,
};
