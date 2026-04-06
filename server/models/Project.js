const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  tag:         { type: String },
  tech:        [{ type: String }],
  github:      { type: String },
  live:        { type: String },
  emoji:       { type: String, default: '🚀' },
  featured:    { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
