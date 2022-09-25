const { Review } = require("../models/review.model");

const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const reviewExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({ where: { id } });

  if (!review) {
    return next(new AppError("This review does not exists", 404));
  }
  req.review = review;
  next();
});

module.exports = { reviewExist };
