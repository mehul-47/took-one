const Contact = require("../Model/Contact");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { findOneAndUpdate } = require("../Model/Contact");

const createContact = async (req, res) => {
  const { name, email, number, message, notice } = req.body;
  const emailAlreadyExists = await Contact.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const contact = await Contact.create({
    name,
    email,
    number,
    message,
    notice,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ contact, Status: true, msg: "Contact created succesfully" });
};

const getAllContact = async (req, res) => {
  const contact = await Contact.find({});
  if (!contact) {
    throw new CustomError.NotFoundError("No contact request avilable");
  }
  res.status(StatusCodes.OK).json({ contact, count: contact.length });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!contact) {
    throw new CustomError.NotFoundError(`No contact with id:${id}`);
  }
  res.status(StatusCodes.OK).json({ contact });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findOneAndRemove({ _id: id });
  if (!contact) {
    throw new CustomError.NotFoundError(`No contact with id:${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Contact deleted successfully" });
};

module.exports = { createContact, getAllContact, updateContact, deleteContact };
