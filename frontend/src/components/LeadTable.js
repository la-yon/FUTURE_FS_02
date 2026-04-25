import React, { useState } from "react";

function LeadTable({ leads, onStatusChange, onDelete, onAddNote, onEditLead }) {
  const [noteInputs, setNoteInputs] = useState({});

  const handleNoteInput = (leadId, value) => {
    setNoteInputs((prev) => ({ ...prev, [leadId]: value }));
  };

  const submitNote = (leadId) => {
    const note = noteInputs[leadId]?.trim();
    if (!note) return;
    onAddNote(leadId, note);
    setNoteInputs((prev) => ({ ...prev, [leadId]: "" }));
  };

  return (
    <div className="card table-wrapper">
      <h3>Leads</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Source</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-cell">
                No leads found.
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <React.Fragment key={lead._id}>
                <tr>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.source}</td>
                  <td>
                    <select value={lead.status} onChange={(e) => onStatusChange(lead._id, e.target.value)}>
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="converted">converted</option>
                    </select>
                  </td>
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="secondary" onClick={() => onEditLead(lead)}>
                      Edit
                    </button>
                    <button className="danger" onClick={() => onDelete(lead._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr className="notes-row">
                  <td colSpan="6">
                    <div className="notes-section">
                      <strong>Notes:</strong>
                      {lead.notes?.length ? (
                        <ul>
                          {lead.notes.map((note, index) => (
                            <li key={`${lead._id}-note-${index}`}>{note}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="hint">No notes yet.</p>
                      )}
                      <div className="note-input-row">
                        <input
                          placeholder="Add a note"
                          value={noteInputs[lead._id] || ""}
                          onChange={(e) => handleNoteInput(lead._id, e.target.value)}
                        />
                        <button onClick={() => submitNote(lead._id)}>Add Note</button>
                      </div>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;
