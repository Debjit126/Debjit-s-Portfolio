const Certification = require('../models/Certification');

exports.getCertifications = async (req, res) => {
  try {
    const certs = await Certification.find().sort({ order: 1, year: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCertification = async (req, res) => {
  try {
    const cert = new Certification(req.body);
    const saved = await cert.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCertification = async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!cert) return res.status(404).json({ message: 'Certification not found' });
    res.json(cert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCertification = async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certification deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
