const express = require('express');

//Controllers
const { 
    getAllUsers, 
    createUser, 
    updateUser, 
    deleteUser, 
    login,
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

userRouter.get('/orders', grantAccessToUsers, getAllUsers);

userRouter.get('/orders/:id')

module.exports = { userRouter };