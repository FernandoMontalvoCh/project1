const express = require('express');

const {
    getAllMeals,
    getOneMeal,
    createMeal,
    updateMeal,
    deleteMeal,
} = require('../controllers/meal.controller');

const mealsRouter = express.Router();

const { 
    protectSession,
    grantAccessToUsers,
} = require('../middlewares/auth.middlewares');
const { mealExist } = require('../middlewares/meals.middlewares');

const { createMealValidator } = require('../middlewares/validators.middlewares');

mealsRouter.get('/', getAllMeals);

mealsRouter.get('/:id', getOneMeal);

mealsRouter.use(protectSession);

mealsRouter.post('/:id', createMealValidator, createMeal);

mealsRouter.patch('/:id', mealExist, grantAccessToUsers, updateMeal);

mealsRouter.delete('/:id', mealExist, grantAccessToUsers, deleteMeal);

module.exports = { mealsRouter };