const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  title:      { type: String, required: true },
  subtitle:   { type: String },
  bio:        { type: String },
  bio2:       { type: String },
  location:   { type: String },
  email:      { type: String },
  github:     { type: String },
  linkedin:   { type: String },
  twitter:    { type: String },
  resumeUrl:  { type: String },
  available:  { type: Boolean, default: true },
  stats: {
    years:     { type: String, default: '3+' },
    projects:  { type: String, default: '15+' },
    certs:     { type: String, default: '6+' },
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
