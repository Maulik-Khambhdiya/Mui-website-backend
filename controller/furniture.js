const API = require("../model/furniture");


exports.createData = async (req, res) => {
  try {
    const data = req.body;

    data.image = req.file.filename;

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