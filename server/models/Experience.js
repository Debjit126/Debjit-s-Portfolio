const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  role:        { type: String, required: true },
  company:     { type: String, required: true },
  period:      { type: String, required: true },
  description: { type: String },
  tech:        [{ type: String }],
  current:     { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
