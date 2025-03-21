const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "First name must be at least 2 characters long"],
  },
  favoriteFood: {
    type: String
  },
  birthday: {
    type: String,
    required: [true, "Pet's birthday is required"],
  },  
  tutor_id: {
    type: String
  },
});

// Use the schema to create an Pet model
const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
