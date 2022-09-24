//Models
const { Order } = require("../models/order.model")

//Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({ where: { status: "active", id } });

  if (!order) {
    return next(new AppError("This order does not exists", 404));
  }

  req.order = order;
  next();
});

module.exports = { orderExist };
