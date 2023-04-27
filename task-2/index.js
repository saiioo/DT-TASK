const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();
const port = 3000;

// connect to mongoose database
mongoose.connect("mongodb://localhost:27017/nudge_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const nudgeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  invitation: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  sendTime: {
    type: Date,
    required: true,
  },
});

const Nudge = mongoose.model("Nudge", nudgeSchema);

app.use(express.json());
app.use(fileUpload());
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// Create a nudge
app.post("/nudge", (req, res) => {
  const nudge = new Nudge({
    title: req.body.title,
    event: req.body.event,
    description: req.body.description,
    icon: req.body.icon,
    invitation: req.body.invitation,
    sendTime: req.body.sendTime,
  });

  if (req.files && req.files.image) {
    const image = req.files.image;
    const imageName = Date.now() + "-" + image.name;
    const imagePath = path.join(__dirname, "public", "images", imageName);
    image.mv(imagePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal server error");
      } else {
        nudge.image = "/images/" + imageName;
        nudge.save((err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal server error");
          } else {
            res.status(201).send(nudge);
          }
        });
      }
    });
  } else {
    nudge.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal server error");
      } else {
        res.status(201).send(nudge);
      }
    });
  }
});

// Get all nudges
app.get("/nudge", async (req, res) => {
  try {
    const nudges = await Nudge.find();
    res.json(nudges);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a specific nudge by id
app.get("/nudge/:id", async (req, res) => {
  try {
    const nudge = await Nudge.findById(req.params.id);
    if (!nudge) {
      return res.status(404).json({ msg: "Nudge not found" });
    }
    res.json(nudge);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Nudge not found" });
    }
    res.status(500).send("Server Error");
  }
});

// Update a nudge by id
app.put("/nudge/:id", async (req, res) => {
  try {
    const nudge = await Nudge.findById(req.params.id);

    if (!nudge) {
      return res.status(404).json({ msg: "Nudge not found" });
    }

    nudge.title = req.body.title || nudge.title;
    nudge.event = req.body.event || nudge.event;
    nudge.description = req.body.description || nudge.description;
    nudge.icon = req.body.icon || nudge.icon;
    nudge.invitation = req.body.invitation || nudge.invitation;
    nudge.sendTime = req.body.sendTime || nudge.sendTime;

    if (req.files && req.files.image) {
      const image = req.files.image;
      const imageName = Date.now() + "-" + image.name;
      const imagePath = path.join(__dirname, "public", "images", imageName);
      image.mv(imagePath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal server error");
        } else {
          nudge.image = "/images/" + imageName;
          nudge.save((err) => {
            if (err) {
              console.error(err);
              res.status(500).send("Internal server error");
            } else {
              res.status(200).json(nudge);
            }
          });
        }
      });
    } else {
      nudge.save((err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal server error");
        } else {
          res.status(200).json(nudge);
        }
      });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Nudge not found" });
    }
    res.status(500).send("Server Error");
  }
});
// Delete a nudge by id
app.delete("/nudge/:id", async (req, res) => {
  try {
    const nudge = await Nudge.findById(req.params.id);

    if (!nudge) {
      return res.status(404).json({ msg: "Nudge not found" });
    }

    await nudge.remove();

    res.json({ msg: "Nudge removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Nudge not found" });
    }
    res.status(500).send("Server Error");
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
