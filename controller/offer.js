const Offer = require("../model/offer");

exports.createOffer = async (req, res) => {
  try {
    const { offerType, text } = req.body;
    let imageUrl = null;

    if (offerType !== "headerOffer") {
      if (!req.file) {
        return res.status(400).json({
          status: "Fail",
          message: "Image is required for bannerOffer",
        });
      }
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newOffer = new Offer({
      offerType,
      text: offerType === "headerOffer" ? text : undefined,
      imageUrl: offerType !== "headerOffer" ? imageUrl : undefined,
    });

    const saved = await newOffer.save();

    res.status(201).json({
      status: "Success",
      message: "Offer created successfully",
      data: saved,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "Success",
      data: offers,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Offer.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        status: "Fail",
        message: "Offer not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Offer deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
};
