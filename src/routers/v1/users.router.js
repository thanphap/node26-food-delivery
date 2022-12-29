//Users Router
const express = require("express");
const { getUsers } = require('../../controllers/users.controllers')

// path userRouters: /api/v1/users
const userRouters = express.Router();

userRouters.get("", getUsers);

module.exports = userRouters;