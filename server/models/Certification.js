const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  issuer: { type: String },
  year:   { type: String },
  icon:   { type: String, default: '🎓' },
  url:    { type: String },
  order:  { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Certification', CertificationSchema);
