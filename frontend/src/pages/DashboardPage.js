import React, { useEffect, useMemo, useState } from "react";
import api from "../api";
import LeadForm from "../components/LeadForm";
import LeadTable from "../components/LeadTable";

function DashboardPage({ onLogout }) {
  const [leads, setLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const showMessage = (text, error = false) => {
    setMessage(text);
    setIsError(error);
    setTimeout(() => setMessage(""), 2500);
  };

  const fetchLeads = async () => {
    try {
      const response = await api.get("/leads");
      setLeads(response.data);
    } catch (error) {
      showMessage("Session expired. Please login again.", true);
      localStorage.removeItem("token");
      onLogout();
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleCreateLead = async (leadData) => {
    try {
      await api.post("/leads", leadData);
      showMessage("Lead added successfully.");
      fetchLeads();
    } catch (error) {
      showMessage(error.response?.data?.message || "Failed to add lead.", true);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/leads/${id}`, { status });
      showMessage("Status updated.");
      fetchLeads();
    } catch (error) {
      showMessage("Failed to update status.", true);
    }
  };

  const handleEditLead = async (lead) => {
    const name = window.prompt("Edit name", lead.name);
    if (name === null) return;
    const email = window.prompt("Edit email", lead.email);
    if (email === null) return;
    const source = window.prompt("Edit source", lead.source);
    if (source === null) return;

    try {
      await api.put(`/leads/${lead._id}`, { name, email, source });
      showMessage("Lead updated.");
      fetchLeads();
    } catch (error) {
      showMessage("Failed to update lead.", true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/leads/${id}`);
      showMessage("Lead deleted.");
      fetchLeads();
    } catch (error) {
      showMessage("Failed to delete lead.", true);
    }
  };

  const handleAddNote = async (id, note) => {
    try {
      await api.post(`/leads/${id}/notes`, { note });
      showMessage("Note added.");
      fetchLeads();
    } catch (error) {
      showMessage("Failed to add note.", true);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const statusMatch = statusFilter === "all" ? true : lead.status === statusFilter;
      const search = searchText.toLowerCase().trim();
      const searchMatch =
        !search ||
        lead.name.toLowerCase().includes(search) ||
        lead.email.toLowerCase().includes(search) ||
        lead.source.toLowerCase().includes(search);

      return statusMatch && searchMatch;
    });
  }, [leads, statusFilter, searchText]);

  return (
    <div className="container">
      <div className="top-bar">
        <h1>Client Lead Management System</h1>
        <button className="secondary" onClick={onLogout}>
          Logout
        </button>
      </div>

      {message && <div className={isError ? "message error" : "message success"}>{message}</div>}

      <LeadForm onCreateLead={handleCreateLead} />

      <div className="card filter-row">
        <input
          type="text"
          placeholder="Search by name, email, or source"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="new">new</option>
          <option value="contacted">contacted</option>
          <option value="converted">converted</option>
        </select>
      </div>

      <LeadTable
        leads={filteredLeads}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onAddNote={handleAddNote}
        onEditLead={handleEditLead}
      />
    </div>
  );
}

export default DashboardPage;
