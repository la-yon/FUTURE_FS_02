const Lead = require("../models/Lead");

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leads." });
  }
};

const createLead = async (req, res) => {
  try {
    const { name, email, source } = req.body;

    if (!name || !email || !source) {
      return res.status(400).json({ message: "Name, email and source are required." });
    }

    const newLead = await Lead.create({ name, email, source });
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ message: "Failed to create lead." });
  }
};

const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLead = await Lead.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found." });
    }

    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: "Failed to update lead." });
  }
};

const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found." });
    }

    res.status(200).json({ message: "Lead deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete lead." });
  }
};

const addLeadNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    if (!note || !note.trim()) {
      return res.status(400).json({ message: "Note cannot be empty." });
    }

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found." });
    }

    lead.notes.push(note.trim());
    await lead.save();

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: "Failed to add note." });
  }
};

module.exports = {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  addLeadNote
};
