const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  icon:     { type: String },
  items:    [{ type: String }],
  order:    { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
