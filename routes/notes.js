const { Router } = require("express");
const router = Router();
const notesModel = require("../models/notes.model");

router.get("/", async (req, res) => {
  const notes = await notesModel.find({}).lean();

  res.render("index", {
    title: "Notes list",
    isIndex: true,
    notes,
  });
});

router.get("/create", (req, res) => {
  res.render("create", {
    title: "Create notes",
    isCreate: true,
  });
});

router.post("/create", async (req, res) => {
  const note = new notesModel({
    title: req.body.title,
    text: req.body.text,
  });

  await note.save();
  console.log(note);
  res.redirect("/");
});

router.post("/delete", async (req, res) => {
  await notesModel.findByIdAndDelete(req.body.id);
  res.redirect("/")
});

module.exports = router;
