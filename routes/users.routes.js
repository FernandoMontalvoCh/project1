const express = require('express');

//Controllers
const { 
    createUser, 
    updateUser, 
    deleteUser, 
    login,
    getAllOrders,
    getOneOrder,
} = require('../controllers/users.cotroller');

const userRouter = express.Router();

const { userExist } = require('../middlewares/users.middlewares');
const { 
    protectSession, 
    protectUserAccount,
    grantAccessToUsers,
} = require('../middlewares/auth.middlewares');

const { createUserValidators } = require('../middlewares/validators.middlewares');

userRouter.post(
    '/signup',
    createUserValidators,
    createUser
);

userRouter.post('/login', login);

//Protecting below endpoints
userRouter.use(protectSession);

userRouter.patch('/:id', userExist, protectUserAccount, updateUser);

userRouter.delete('/:id', userExist, protectUserAccount, deleteUser);

userRouter.get('/orders', getAllOrders);

userRouter.get('/orders/:id', getOneOrder);

module.exports = { userRouter };