const { AppError } = require("../helpers/error");
const { User } = require("../models");

// Service nhận vào data từ controller
// Nhiệm vụ: xử lý nghiệp vụ của ứng dụng, sau đó gọi tới model của sequelize để query xuống DB, nhận data từ DB và return về cho controller

const getUsers = async () => {
  try {
    const users = await User.findAll({ include: "restaurants" });
    return users;
  } catch (error) {
    throw error;
  }
};

const createUser = async (data) => {
  try {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    // Email đã tồn tại trong DB
    if (user) {
      throw new AppError(400, "Email is existed");
    }

    // Ví dụ trong trường hợp admin thêm user, chỉ cần dùng email, ta cần phải tạo một mật khẩu ngẩu nhiên
    if (!data.password) {
      data.password = Math.random().toString(36).substring(2);
      //Gửi email về cho user mật khẩu này
    }

    const createdUser = await User.create(data);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError(400, "user not found");
    }

    await User.destroy({ where: { id: userId } });
  } catch (error) {
    throw error;
  }
};

// Delete:
// - User.findOne({where: {id: 1}}) - Nếu không tìm thấy trả về lỗi
// - User.destroy({where: {id: 1}})
// Update:
// - User.findOne({where: {id: 1}}) - Nếu không tìm thấy trả về lỗi
// - User.update(data, {where: {id: 1}})
// - User.findOne({where: {id: 1}})

module.exports = {
  getUsers,
  createUser,
  deleteUser,
};


// const User = require("../models/User")
// class UserService {
//     async getUsers(){
//         try {
//             const users = await User.findAll();
//             return users;
//         } catch (error) {
//             throw error;
//         }
//     }
// }

// const userService = new UserService();
// module.exports = userService;
