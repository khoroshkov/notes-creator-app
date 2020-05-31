const express = require("express");
const mongoose = require("mongoose");
const expshbs = require("express-handlebars");
const noteRoutes = require("./routes/notes");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = expshbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(noteRoutes);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://dbMainUser:ks6101981@cluster0-kratf.mongodb.net/notes",
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );

    app.listen(PORT, () => {
      console.log("Server has been started on port:", PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
