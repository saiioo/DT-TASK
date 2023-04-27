const express = require("express");
const mongoose = require("mongoose");
const Event = require("./models/events");
const path = require("path");
const port = 3008 || process.env.PORT;
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
app.use(cors());

//cors
app.use(express.json());
app.use(fileUpload());

mongoose.set("strictQuery", true);
const url = `mongodb+srv://Manikanta:Manikanta@cluster0.sptxrlw.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url)
  .then(() => {
    console.log("Connected to mongoDB successfully");
  })
  .catch((err) => {
    console.log("Connection to mongodb failed: ", err);
  });


app.get("/", (req, res) => {
  try {
    res.send("Welcome");
    res.send(`<h1> this is it </h1>`);
  } catch (e) {
    res.json(e.message);
  }
});

// GET an event by its unique id
app.get("/api/v3/app/events", async (req, res) => {
  const { id } = req.query;
  try {
    const data = await Event.findOne({ _id: id });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({
        status: "failed",
        message: "Event not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
});

// GET events by recency & paginate results by page number and limit of events per page
app.get("/api/v3/app/events", async (req, res) => {
  const { type, limit, page } = req.query;
  let query = {};
  if (type === "latest") {
    query = { schedule: { $gte: new Date() } };
  }
  try {
    const data = await Event.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({
        status: "failed",
        message: "No events found",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
});

// Create an event and return the Id of the event
app.post("/api/v3/app/events", async (req, res) => {
  const {
    name,
    tagline,
    schedule,
    description,
    moderator,
    category,
    sub_category,
    rigor_rank,
  } = req.body;
  const { image } = req.files;
  const eventData = {
    name,
    tagline,
    schedule,
    description,
    moderator,
    category,
    sub_category,
    rigor_rank,
    attendees: [],
  };
  image.mv("./uploads/" + image.name, async (err) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      const event = new Event({
        ...eventData,
        image: image.name,
      });
      try {
        const response = await event.save();
        res
          .status(200)
          .json({
            message: "Event created successfully",
            eventId: response._id,
          });
      } catch (e) {
        res.status(500).json({ message: "Something went wrong", error: e });
      }
    }
  });
});

// Update an event by its unique id
app.put("//api/v3/app/events/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    tagline,
    schedule,
    description,
    moderator,
    category,
    sub_category,
    rigor_rank,
  } = req.body;
  const { image } = req.files;
  const eventData = {
    name,
    tagline,
    schedule,
    description,
    moderator,
    category,
    sub_category,
    rigor_rank,
  };
  if (image) {
    image.mv("./uploads/" + image.name, async (err) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        eventData.image = image.name;
        try {
          const updatedEvent = await Event.findOneAndUpdate(
            { _id: id },
            eventData,
            { new: true }
          );
          res.status(200).json(updatedEvent);
        } catch (e) {
          res.status(500).json({
            status: "failed",
            message: e.message,
          });
        }
      }
    });
  } else {
    try {
      const updatedEvent = await Event.findOneAndUpdate(
        { _id: id },
        eventData,
        { new: true }
      );
      res.status(200).json(updatedEvent);
    } catch (e) {
      res.status(500).json({
        status: "failed",
        message: e.message,
      });
    }
  }
});

// Delete an event by its unique id
app.delete("/api/v3/app/events/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await Event.findOneAndDelete({ _id: id });
    if (deletedEvent) {
      res.status(200).json({
        message: "Event deleted successfully",
        deletedEvent,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "Event not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
