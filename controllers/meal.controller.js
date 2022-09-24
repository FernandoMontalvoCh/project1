const { Meal } = require("../models/meal.model");

const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const getAllMeals = catchAsync(async (req, res, next) => {
    const meals = await Meal.findAll({ where: { status: "active"}});

    res.status(200).json({
        status: "success",
        data: { meals },
    });
});

const getOneMeal = catchAsync(async (req, res, next) => {
    const { id } = req.body;

    const meal = await Meal.findOne({ where: { status: "active"} });

    if( meal.id === id) {
        res.status(200).json({
            status: "success",
            data: { meal },
        });
    } else if(!id) {
        return next(new AppError('Meal not found', 404));
    }
});

const createMeal = catchAsync(async (req, res, next) => {
    const { name, price } = req.body;


});

const updateMeal = catchAsync(async (req, res, next) => {
});