const express = require('express');

const mealsRouter = express.Router();

const { protectSession } = require('../middlewares/auth.middlewares');
const { mealExist } = require('../middlewares/meals.middlewares');

mealsRouter.get('/');

mealsRouter.get('/:id');

mealsRouter.use(protectSession);

mealsRouter.post('/:id');

mealsRouter.patch('/:id', mealExist);

mealsRouter.delete('/:id', mealExist);

module.exports = { mealsRouter };