const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // stored hashed, never as plain text
  role: { type: String, enum: ['applicant', 'company'], default: 'applicant' },
});

module.exports = mongoose.model('User', userSchema);
