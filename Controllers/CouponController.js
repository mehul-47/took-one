const Coupon = require("../Model/Coupon");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createCoupon = async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(StatusCodes.CREATED).json({ coupon });
};

const getAllCoupons = async (req, res) => {
  const coupons = await Coupon.find({});
  res.status(StatusCodes.OK).json({ coupons, count: coupons.length });
};

const getSingleCoupons = async (req, res) => {
  const { id: couponId } = req.params;
  const coupon = await Coupon.findOne({ _id: couponId });
  if (!coupon) {
    throw new CustomError.NotFoundError(`No coupon with id:${couponId}`);
  }
  res.status(StatusCodes.OK).json({ coupon });
};

const updateCoupons = async (req, res) => {
  const { id: couponId } = req.params;
  const coupon = await Coupon.findOneAndUpdate({ _id: couponId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!coupon) {
    throw new CustomError.NotFoundError(`No coupon with id:${couponId}`);
  }
  res.status(StatusCodes.OK).json({ coupon });
};

const deleteCoupons = async (req, res) => {
  const { id: couponId } = req.params;
  const coupon = await Coupon.findOne({ _id: couponId });
  if (!coupon) {
    throw new CustomError.NotFoundError(`No coupon with id:${couponId}`);
  }
  await coupon.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! coupon removed" });
};

module.exports = {
  createCoupon,
  getAllCoupons,
  getSingleCoupons,
  updateCoupons,
  deleteCoupons,
};
