const bcrypt = require("bcrypt");
const { AppError } = require("../helpers/error");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");

const login = async (credentials) => {
    try {
        const { email, password } = credentials;
        const user = await User.findOne({
            where: { email },
            attributes: { include: ["password"] }
        });

        if (!user) {
            throw new AppError(400, "email or password invalid");
        }

        const isMatched = bcrypt.compareSync(password, user.password);
        if (!isMatched) {
            throw new AppError(400, "email or password invalid");
        }

        return generateToken(user);
        // delete user.dataValues.password;
        // return user;

    } catch (error) {
        throw error;
    }
};

module.exports = {
    login,
};