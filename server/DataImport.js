import express from "express";
import User from "./Models/UserModel.js";
import users from "./data/users.js";
import Product from "./Models/ProductModel.js";
import products from "./data/Products.js";
import Order from "./Models/OrderModel.js";
import orders from "./data/Orders.js";
import Ticket from "./Models/TicketModel.js";
import tickets from "./data/Tickets.js";
import asyncHandler from "express-async-handler";

const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/products",
  asyncHandler(async (req, res) => {
    await Product.remove({});
    const importProducts = await Product.insertMany(products);
    res.send({ importProducts });
  })
);

ImportData.post(
  "/orders",
  asyncHandler(async (req, res) => {
    await Order.remove({});
    const importOrders = await Order.insertMany(orders);
    res.send({ importOrders });
  })
);

ImportData.post(
  "/tickets",
  asyncHandler(async (req, res) => {
    await Ticket.remove({});
    const importTickets = await Ticket.insertMany(tickets);
    res.send({ importTickets });
  })
);

export default ImportData;