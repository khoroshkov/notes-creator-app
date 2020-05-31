const {Schema, model} = require("mongoose")

const notesSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: true
  },
})

module.exports = model("Note", notesSchema)