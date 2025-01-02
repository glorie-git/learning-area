require("dotenv").config();

const PORT = process.env.PORT || 3008;
const URI = process.env.MONGODB_URI;

module.exports = {
  PORT,
  URI,
};
