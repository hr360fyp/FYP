import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../Models/OrderModel.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";

const orderRoute = express.Router();

// GET ALL ORDER
orderRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Order.countDocuments({ ...keyword });
    const orders = await Order.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL ORDER WITHOUT SEARCH AND PEGINATION
orderRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({}).sort({ _id: -1 });
    res.json(orders);
  })
);

// GET SINGLE ORDER
orderRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not Found");
    }
  })
);

// ORDER REVIEW
orderRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      const alreadyReviewed = order.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Order already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      order.reviews.push(review);
      order.numReviews = order.reviews.length;
      order.rating =
        order.reviews.reduce((acc, item) => item.rating + acc, 0) /
        order.reviews.length;

      await order.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Order not Found");
    }
  })
);

// DELETE ORDER
orderRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.remove();
      res.json({ message: "Order deleted" });
    } else {
      res.status(404);
      throw new Error("Order not Found");
    }
  })
);

// CREATE ORDER
orderRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, head, temp, tpd, tsales, rem, pstatus } = req.body;
    const orderExist = await Order.findOne({ name });
    if (orderExist) {
      res.status(400);
      throw new Error("Order name already exists");
    } else {
      const order = new Order({
        name,
        head,
        temp,
        tpd,
        tsales,
        rem,
        pstatus,
      });
      if (order) {
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
      } else {
        res.status(400);
        throw new Error("Invalid order data");
      }
    }
  })
);

// UPDATE ORDER
orderRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, head, temp, tpd, tsales, rem, pstatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (order) {
      order.name = name || order.name;
      order.head = head || order.head;
      order.temp = temp || order.temp;
      order.tpd = tpd || order.tpd;
      order.tsales = tsales || order.tsales;
      order.rem = rem || order.rem;
      order.pstatus = pstatus || order.pstatus;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

// GET ALL ORDER 
orderRoute.get(
  "/getorders",
  asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
  })
);

export default orderRoute;