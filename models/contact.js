const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "First name must be at least 2 characters long"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "Last name must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  favoriteColor: {
    type: String,
    required: [true, "Favorite color is required"],
  },
  birthday: {
    type: String,
    required: [true, "Birthday is required"],
  },
});

// Use the schema to create the Contact model
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
