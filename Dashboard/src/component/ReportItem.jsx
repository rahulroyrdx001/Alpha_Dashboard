import React, { useState } from "react";
import ReportTable from "./ReportTable";

const ReportItem = ({ report, folders, setFolders, activeFolder }) => {
  const [newTag, setNewTag] = useState("");

  // Toggle report visibility
  const toggleReportActive = () => {
    setFolders((prevFolders) => ({
      ...prevFolders,
      [activeFolder]: {
        ...prevFolders[activeFolder],
        reports: prevFolders[activeFolder].reports.map((r) =>
          r.id === report.id ? { ...r, isActive: !r.isActive } : r
        ),
      },
    }));
  };

  // Add a new tag to the report
  const handleAddTag = () => {
    if (!newTag.trim()) return;

    setFolders((prevFolders) => {
      const updatedReports = prevFolders[activeFolder].reports.map((r) => {
        if (r.id === report.id) {
          return {
            ...r,
            tags: [...new Set([...r.tags, newTag.trim()])], // Ensure unique tags
          };
        }
        return r;
      });

      return {
        ...prevFolders,
        [activeFolder]: {
          ...prevFolders[activeFolder],
          reports: updatedReports,
        },
      };
    });

    setNewTag(""); // Clear input field after adding tag
  };

  return (
    <div
      style={{
        marginBottom: "15px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h4>{report.name}</h4>
      <p>Date Added: {report.dateAdded}</p>
      <p>Tags: {report.tags.join(", ") || "No Tags"}</p>

      {/* Add Tag Input */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a tag"
          style={{
            padding: "5px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleAddTag}
          style={{
            padding: "5px 10px",
            backgroundColor: "#17a2b8",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Tag
        </button>
      </div>

      {/* Toggle Report Visibility */}
      <button
        onClick={toggleReportActive}
        style={{
          padding: "10px 20px",
          backgroundColor: report.isActive ? "#dc3545" : "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {report.isActive ? "Hide Report" : "View Report"}
      </button>

      {/* Display Report Table */}
      {report.isActive && (
        <div style={{ marginTop: "10px" }}>
          <h5>Report Table</h5>
          <ReportTable
            rowData={report.rowData}
            columnDefs={report.columnDefs}
          />
        </div>
      )}
    </div>
  );
};

export default ReportItem;
