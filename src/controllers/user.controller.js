// Controller nhận vào request, response
// Nhiệm vụ: chỉ parse request (params, body) sau đó chuyển xuống Service xử lý, nhận kết quả trả về từ Service và trả response về cho client

const { response } = require("../helpers/response");
const userService = require("../services/users.service");

const getUsers = () => {
  return async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json(response(users));
    } catch (error) {
      // res.status(500).json({ error: error.message });
      // Chuyển tiếp cái error xuống middleware handleErrors
      next(error);
    }
  };
};

const createUser = () => {
  return async (req, res) => {
    try {
      const user = req.body;
      const createdUser = await userService.createUser(user);
      res.status(200).json(response(createdUser));
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
    }
  };
};

const deleteUser = () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;
        const createdUser = await userService.deleteUser(id);
        res.status(200).json(response(true));
      } catch (error) {
        // res.status(500).json({ error: error.message });
        next(error);
      }
    };
  };

module.exports = {
  getUsers,
  createUser,
  deleteUser,
};


// const userService = require("../services/users.sevicer");

// const getUsers = async (req, res) => {
//     try {
//         const users = await userService.getUsers();
//         res.status(200).json({ data: users });
//     } catch (error) {
//         res.status(400).json({ error: error });
//     }
// };

// module.exports = {
//     getUsers,
// };