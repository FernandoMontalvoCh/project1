const express = require('express');

const {
    createAnOrder,
    getAllOrders,
    updateAnOrder,
    deleteAnOrder,
} = require('../controllers/orders.controller');

const ordersRouter = express.Router();

const { protectSession } = require('../middlewares/auth.middlewares');
const { orderExist } = require('../middlewares/orders.middlewares');

ordersRouter.use(protectSession);

ordersRouter.post('/', createAnOrder);

ordersRouter.get('/me', getAllOrders);

ordersRouter.patch('/:id', orderExist, updateAnOrder);

ordersRouter.delete('/:id', orderExist, deleteAnOrder);

module.exports = {ordersRouter };