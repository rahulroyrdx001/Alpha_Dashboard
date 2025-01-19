import React, { useState } from "react";

const TagFilter = ({ allTags, setAllTags, selectedTags, setSelectedTags }) => {
  const [newTag, setNewTag] = useState("");

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleAddTag = () => {
    if (newTag.trim() && !allTags.includes(newTag.trim())) {
      setAllTags((prevTags) => [...prevTags, newTag.trim()]);
      setNewTag(""); // Clear the input field after adding
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Filter by Tags</h3>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add new tag"
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
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Tag
        </button>
      </div>
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          style={{
            padding: "5px 10px",
            marginRight: "10px",
            marginBottom: "10px",
            backgroundColor: selectedTags.includes(tag) ? "#007bff" : "#ccc",
            color: selectedTags.includes(tag) ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
