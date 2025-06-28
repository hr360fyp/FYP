import express from "express";
import asyncHandler from "express-async-handler";
import Ticket from "./../Models/TicketModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const ticketRoute = express.Router();

// GET ALL TICKET
ticketRoute.get(
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
    const count = await Ticket.countDocuments({ ...keyword });
    const tickets = await Ticket.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ tickets, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL TICKET WITHOUT SEARCH AND PEGINATION
ticketRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const tickets = await Ticket.find({}).sort({ _id: -1 });
    res.json(tickets);
  })
);

// GET SINGLE TICKET
ticketRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404);
      throw new Error("Ticket not Found");
    }
  })
);

// TICKET REVIEW
ticketRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (ticket) {
      const alreadyReviewed = ticket.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Ticket already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      ticket.reviews.push(review);
      ticket.numReviews = ticket.reviews.length;
      ticket.rating =
        ticket.reviews.reduce((acc, item) => item.rating + acc, 0) /
        ticket.reviews.length;

      await ticket.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Ticket not Found");
    }
  })
);

// DELETE TICKET
ticketRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (ticket) {
      await ticket.remove();
      res.json({ message: "Ticket deleted" });
    } else {
      res.status(404);
      throw new Error("Ticket not Found");
    }
  })
);

// CREATE TICKET
ticketRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { description, priority, crtby, asgnto , deadline, status } = req.body;
    const ticketExist = await Ticket.findOne({ crtby });
    if (ticketExist) {
      res.status(400);
      throw new Error("Ticket name already exist");
    } else {
      const ticket = new Ticket({
        description,
        priority,
        crtby,
        asgnto,
        deadline,
        status,
        user: req.user._id,
      });
      if (ticket) {
        const createdticket = await ticket.save();
        res.status(201).json(createdticket);
      } else {
        res.status(400);
        throw new Error("Invalid ticket data");
      }
    }
  })
);

// UPDATE TICKET
ticketRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { description, priority, crtby, asgnto, deadline, status } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    if (ticket) {
      ticket.description = description || ticket.description;
      ticket.priority = priority || ticket.priority;
      ticket.crtby = crtby || ticket.crtby;
      ticket.asgnto = asgnto || ticket.asgnto;
      ticket.deadline = deadline || ticket.deadline;
      ticket.status = status || ticket.status;

      const updatedTicket = await ticket.save();
      res.json(updatedTicket);
    } else {
      res.status(404);
      throw new Error("Ticket not found");
    }
  })
);

// GET ALL TICKET 
ticketRoute.get(
  "/gettickets",
  asyncHandler(async (req, res) => {
    const tickets = await Ticket.find({});
    res.json(tickets);
  })
);

export default ticketRoute;