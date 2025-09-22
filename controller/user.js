const API = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createData = async (req, res) => {
  try {
    const data = req.body;

    data.password = await bcrypt.hash(data.password, 10);
    data.profile = req.file.filename;

    const addData = await API.create(req.body);
    res.status(201).json({
      status: "Success",
      message: "User Added Successfully",
      data: addData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.viewData = async (req, res) => {
  try {
    const viewData = await API.find();
    res.status(200).json({
      status: "Success",
      message: "User Found Successfully",
      data: viewData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.deleteData = async (req, res) => {
  try {
    const deleteId = req.params.id;

    const checkUser = await API.findById(deleteId);
    if (!checkUser) throw new Error("User Not Found");

    const deleteData = await API.findByIdAndDelete(deleteId);
    res.status(200).json({
      status: "Success",
      message: "User Deleted Successfully",
      data: deleteData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.editData = async (req, res) => {
  try {
    const editId = req.params.id;
    const data = req.body;

    const checkUser = await API.findById(editId);
    if (!checkUser) throw new Error("User Not Found");

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    } else {
      throw new Error("Password is required");
    }

    if (req.file) {
      data.profile = req.file.filename;
    } else {
      throw new Error("Profile picture is required");
    }
    const editData = await API.findByIdAndUpdate(editId, data, { new: true });

    res.status(200).json({
      status: "Success",
      message: "User Data Edited Successfully",
      data: editData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const emailVerify = await API.findOne({ email: req.body.email });
    if (!emailVerify) throw new Error("Invalid Email");
    
    const passwordVerify = await bcrypt.compare(
      req.body.password,
      emailVerify.password
    );
    if (!passwordVerify) throw new Error("Invalid Password");

    const token = jwt.sign({ id: emailVerify._id }, "surat");
    res.status(200).json({
      status: "Success",
      message: "Login Successfully",
      loginUser: emailVerify,
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
