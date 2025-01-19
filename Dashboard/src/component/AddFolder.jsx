const AddFolder = ({
    folders,
    setFolders,
    setActiveFolder,
    newFolderName,
    setNewFolderName,
  }) => {
    const handleAddFolder = () => {
      if (!newFolderName.trim()) {
        alert("Folder name cannot be empty!");
        return;
      }
  
      const newFolderId = `folder${Object.keys(folders).length + 1}`;
      setFolders({
        ...folders,
        [newFolderId]: { name: newFolderName, reports: [] },
      });
      setActiveFolder(newFolderId);
      setNewFolderName("");
    };
  
    return (
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter new folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleAddFolder}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Folder
        </button>
      </div>
    );
  };
  
  export default AddFolder;
  