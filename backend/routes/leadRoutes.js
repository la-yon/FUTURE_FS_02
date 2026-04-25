const express = require("express");
const {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  addLeadNote
} = require("../controllers/leadController");
const protect = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, getLeads);
router.post("/", protect, createLead);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);
router.post("/:id/notes", protect, addLeadNote);

module.exports = router;
