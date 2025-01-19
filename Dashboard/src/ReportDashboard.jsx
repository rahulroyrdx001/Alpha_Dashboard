import React, { useState, useMemo } from "react";
import FolderNavigation from "./component/FolderNavigation";
import AddFolder from "./component/AddFolder";
import FileUpload from "./component/FileUpload";
import TagFilter from "./component/TagFilter";
import ReportItem from "./component/ReportItem";

const ReportDashboard = () => {
  const [folders, setFolders] = useState({
    folder1: { name: "Sales Reports", reports: [] },
    folder2: { name: "Marketing Reports", reports: [] },
  });

  const [activeFolder, setActiveFolder] = useState("folder1");
  const [newFolderName, setNewFolderName] = useState("");
  const [allTags, setAllTags] = useState([]); // Holds all available tags
  const [selectedTags, setSelectedTags] = useState([]); // Holds selected tags for filtering

  // Helper function to get all unique tags across all folders
  const getAllTags = useMemo(() => {
    const tags = new Set();
    Object.values(folders).forEach((folder) =>
      folder.reports.forEach((report) =>
        (report.tags || []).forEach((tag) => tags.add(tag.toLowerCase()))
      )
    );
    return Array.from(tags);
  }, [folders]);

  // Filter reports in the active folder based on selected tags
  const filterReportsByTags = (reports) => {
    if (selectedTags.length === 0) return reports; // No filter applied
    return reports.filter((report) =>
      selectedTags.every((tag) =>
        (report.tags || []).map((t) => t.toLowerCase()).includes(tag)
      )
    );
  };

  // Get filtered reports based on selected tags
  const filteredReports = filterReportsByTags(
    folders[activeFolder]?.reports || []
  );

  return (
    <div>
      <h1>Folder-based Report Dashboard</h1>

      {/* Folder Navigation */}
      <FolderNavigation
        folders={folders}
        activeFolder={activeFolder}
        setActiveFolder={setActiveFolder}
      />

      {/* Add Folder Functionality */}
      <AddFolder
        folders={folders}
        setFolders={setFolders}
        setActiveFolder={setActiveFolder}
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
      />

      {/* File Upload Functionality */}
      <FileUpload
        folders={folders}
        setFolders={setFolders}
        activeFolder={activeFolder}
      />

      {/* Tag Filtering */}
      <TagFilter
        allTags={getAllTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      {/* Render filtered reports */}
      {filteredReports.length > 0 ? (
        filteredReports.map((report) => (
          <ReportItem
            key={report.id}
            report={report}
            folders={folders}
            setFolders={setFolders}
            activeFolder={activeFolder}
          />
        ))
      ) : (
        <p>No reports match the selected tags.</p>
      )}
    </div>
  );
};

export default ReportDashboard;
