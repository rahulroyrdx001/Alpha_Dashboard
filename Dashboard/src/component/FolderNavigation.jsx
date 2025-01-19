const FolderNavigation = ({ folders, activeFolder, setActiveFolder }) => {
    return (
      <div style={{ marginBottom: "20px" }}>
        {Object.entries(folders).map(([folderId, folder]) => (
          <button
            key={folderId}
            onClick={() => setActiveFolder(folderId)}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              backgroundColor: activeFolder === folderId ? "#007bff" : "#ccc",
              color: activeFolder === folderId ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {folder.name}
          </button>
        ))}
      </div>
    );
  };
  
  export default FolderNavigation;
  