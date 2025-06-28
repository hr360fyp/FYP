import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/OrderRoutes.js";
import ticketRouter from "./Routes/TicketRoutes.js";
import mongoose from "mongoose";
import cors from 'cors';

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

const corsOptions = {
  origin: '*', // Allow all origins, you can specify your frontend origin if needed
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'content-type'], // added lowercase content-type for case sensitivity
  credentials: true
};

// Use the cors middleware to handle CORS globally
app.use(cors(corsOptions));

// Allow preflight requests for all routes
app.options('*', cors(corsOptions));


// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/registers", userRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/tickets", ticketRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});


// Define message schema
const messageSchema = new mongoose.Schema({
  recipient: String,
  sender: String, // Add the sender field to the schema
  message: String,
  timestamp: String,
});

// Create message model
const Message = mongoose.model("Message", messageSchema);

// Save a new message to MongoDB
app.post("/messages", (req, res) => {
  const { recipient, sender, message, timestamp } = req.body;

  const newMessage = new Message({
    recipient,
    sender,
    message,
    timestamp,
  });

  newMessage.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving the message");
    } else {
      res.status(200).send("Message saved successfully");
    }
  });
});

// Retrieve messages for a specific recipient
app.get("/messages/:recipient", (req, res) => {
  const recipient = req.params.recipient;

  Message.find({ recipient }, (err, messages) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving messages");
    } else {
      res.status(200).json(messages);
    }
  });
});

// Define a calendar event schema and model
const eventSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
});
const Event = mongoose.model("Event", eventSchema);

// Save a new event
app.post("/api/events", (req, res) => {
  const { title, start, end } = req.body;
  const newEvent = new Event({
    title,
    start,
    end,
  });
  newEvent.save((err, savedEvent) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving the event");
    } else {
      res.status(201).json(savedEvent);
    }
  });
});

// Retrieve all events
app.get("/api/events", (req, res) => {
  Event.find({}, (err, events) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving events");
    } else {
      res.status(200).json(events);
    }
  });
});

// Update an event
app.put("/api/events/:eventId", (req, res) => {
  const { eventId } = req.params;
  const { title } = req.body;
  Event.findByIdAndUpdate(
    eventId,
    { title },
    { new: true },
    (err, updatedEvent) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating the event");
      } else {
        res.status(200).json(updatedEvent);
      }
    }
  );
});

// Delete an event
app.delete("/api/events/:eventId", (req, res) => {
  const { eventId } = req.params;
  Event.findByIdAndRemove(eventId, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting the event");
    } else {
      res.sendStatus(204);
    }
  });
});
// Assuming you have set up your server using Express.js and connected to MongoDB

app.post("/messages", (req, res) => {
  const newMessage = req.body; // Assuming the request body contains the new message object

  // Save the new message to MongoDB
  db.collection("messages")
    .insertOne(newMessage)
    .then(() => {
      res.status(200).send("Message saved successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred while saving the message");
    });
});

// Create an Attendance schema
const attendanceSchema = new mongoose.Schema({
  employeeName: String,
  employeeEmail: String,
  attendance: Number, // Change the type to Number
});

// Create an Attendance model
const Attendance = mongoose.model("Attendance", attendanceSchema);

// API route to save attendance
app.post("/api/attendance", (req, res) => {
  const { attendanceData } = req.body;

  // Check if any radio button is empty
  const isAnyEmpty = attendanceData.some(
    (attendance) => attendance.attendance === ""
  );
  if (isAnyEmpty) {
    return res
      .status(400)
      .json({ error: "Please fill all the radio buttons." });
  }

  // Create an array of attendance documents
  const attendanceDocuments = attendanceData.map((attendance) => ({
    employeeName: attendance.employeeName,
    employeeEmail: attendance.employeeEmail,
    attendance: attendance.attendance,
  }));

  // Save the attendance documents to the database
  Attendance.insertMany(attendanceDocuments, (err, savedAttendance) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to save attendance." });
    } else {
      res.json(savedAttendance);
    }
  });
});

app.get("/api/attendance", (req, res) => {
  Attendance.find({}, (err, attendanceData) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch attendance data." });
    } else {
      res.json(attendanceData);
    }
  });
});


app.get("/getusers",
  (req, res) => {
  res.json(user.name);
}
);


app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('Response Headers:', res.getHeaders()); // Log the response headers to debug CORS
  });
  next();
});

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, URL: ${req.url}`);
  next();
});


// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));

export default app;