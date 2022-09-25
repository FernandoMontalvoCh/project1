const express = require("express");

const {
  getAllRestaurants,
  getOneRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createRestaurantReview,
  updateRestaurantReview,
  deleteRestaurantReview,
} = require("../controllers/restaurant.controller");

const restaurantsRouter = express.Router();

const {
  protectSession,
  grantAccessToUsers,
  protectReviewsOwners,
  protectUserAccount,
} = require("../middlewares/auth.middlewares");
const { restaurantExist } = require("../middlewares/restaurants.middlewares");

const {
  createRestaurantValidator,
  createReviewValidators,
} = require("../middlewares/validators.middlewares");

restaurantsRouter.get("/", getAllRestaurants);

restaurantsRouter.get("/:id", getOneRestaurant);

restaurantsRouter.use(protectSession);

restaurantsRouter.post(
  "/",
  protectUserAccount,
  createRestaurantValidator,
  createRestaurant
);

restaurantsRouter.patch(
  "/:id",
  restaurantExist,
  grantAccessToUsers,
  updateRestaurant
);

restaurantsRouter.delete(
  "/:id",
  restaurantExist,
  grantAccessToUsers,
  deleteRestaurant
);

restaurantsRouter.post(
  "/reviews/:restaurantId",
  protectUserAccount,
  createReviewValidators,
  createRestaurantReview
);

restaurantsRouter.patch(
  "/reviews/:id",
  protectReviewsOwners,
  updateRestaurantReview
);

restaurantsRouter.delete(
  "/reviews/:id",
  protectReviewsOwners,
  deleteRestaurantReview
);
