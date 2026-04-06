const Experience = require('../models/Experience');

exports.getExperience = async (req, res) => {
  try {
    const exp = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json(exp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createExperience = async (req, res) => {
  try {
    const exp = new Experience(req.body);
    const saved = await exp.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!exp) return res.status(404).json({ message: 'Experience not found' });
    res.json(exp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
