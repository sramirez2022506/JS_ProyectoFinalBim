import bcryptjs from "bcryptjs";
import { response } from "express";
import User from "./user.model.js";

export const register = async (req, res) => {
  const { name, email, password, ...rest } = req.body;
  try {
    const salt = bcryptjs.genSaltSync();
    const hashPassword = bcryptjs.hashSync(password, salt);
    const newUser = new User({ name, email, password: hashPassword });
    Object.assign(newUser, rest);
    await newUser.save();
    res.status(201).json({
      msg: "User was created succesfully",
      user: newUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in the server",
    });
  }
};

/*export const createUser = async (req, res) =>{
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    });
}*/

export const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  const { ...rest } = req.body;

  try {
    let update = {};
    if (rest.name) update.name = rest.name;
    if (rest.email) update.email = rest.email;
    if (rest.password) {
      const hashPassword = await bcryptjs.hash(rest.password, 9);
      update.password = hashPassword;
    }
    update.update_at = new Date();

    const updateUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    });

    return res.status(200).json({
      msg: "The user info was succesfully updated",
      user: updateUser,
    });
    /*if(password){
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync(password, salt);*/
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in the server",
    });
  }
};

export const updateRoleUser = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user = await User.findById(id);
    user.role = role;
    await user.save();
    return res.status(200).json({
      msg: "Role changed succesfully",
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Error in the server",
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const existUser = await User.findById(id);
    existUser.status = false;
    await existUser.save();
    res.json({
      msg: "The user was deleted succesfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in the server",
    });
  }
};

export const getUser = async (req, res = response) => {
  const { limit, from } = req.query;
  const query = { status: true };

  const [total, user] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    user,
  });
};

export const UpdateClient = async (req, res) => {
  const userId = req.user.id;
  const { ...rest } = req.body;

  try {
    let update = {};
    if (rest.nameClient) update.nameClient = rest.nameClient;
    if (rest.address) update.address = rest.address;
    if (rest.birth) update.birth = rest.birth;
    if (rest.phone) update.phone = rest.phone;
    update.updated_at = new Date();

    const updateUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    });
    res.status(200).json({
      msg: "Information was updated succesfully",
      user: updateUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in the server",
    });
  }
};

export const deleteUserClient = async (req, res) => {
  const userId = req.user.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { status: false },
      { new: true }
    );

    res.status(200).json({
      msg: "Account succesfully deleted",
      user: updateUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in the server",
    });
  }
};
