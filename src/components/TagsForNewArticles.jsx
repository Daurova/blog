import React, { useState } from "react";

const TagsForNewArticles = ({ onTagsChange }) => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  

  const handleAddTag = () => {
    setTags([...tags, tagInput]);
    setTagInput("");
  };

  const handleDeleteTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  localStorage.setItem('tags', tags)
  return (
    <div>
      <div>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button onClick={handleAddTag}>Add Tag</button>
      </div>
      <div>
      {tags.map((tag, index) => 
            <div key={index}>
            <span>{tag}</span>
            <button onClick={() => handleDeleteTag(index)}>Delete</button>
      </div>)}
      </div>
    </div>
  );
};


export default TagsForNewArticles