const ContactUs = require("../Model/ContactUs");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createContact = async (req, res) => {
  const { name, email, number, message } = req.body;
  const contact = await ContactUs.create({
    name,
    email,
    number,
    message,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ contact, Status: true, msg: "Contact created succesfully" });
};

const getAllContact = async (req, res) => {
  const contact = await ContactUs.find({});
  if (!contact) {
    throw new CustomError.NotFoundError("No contact request avilable");
  }
  res.status(StatusCodes.OK).json({ contact, count: contact.length });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await ContactUs.findOneAndRemove({ _id: id });
  if (!contact) {
    throw new CustomError.NotFoundError(`No contact with id:${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Contact deleted successfully" });
};

module.exports = { createContact, getAllContact, deleteContact };
