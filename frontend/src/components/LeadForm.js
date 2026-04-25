import React, { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  source: ""
};

function LeadForm({ onCreateLead }) {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateLead(formData);
    setFormData(initialForm);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Add New Lead</h3>
      <div className="grid-3">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="source" placeholder="Source (website/referral/ads)" value={formData.source} onChange={handleChange} required />
      </div>
      <button type="submit">Add Lead</button>
    </form>
  );
}

export default LeadForm;
