import { useState, useEffect } from 'react';
import PromptCard from './PromptCard'; // Assuming PromptCard is in the same folder

const PromptList = () => {
  const [prompts, setPrompts] = useState([]);

  // Fetch prompts from the API when the component mounts
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompts'); // Adjust the endpoint if needed
      const data = await response.json();
      setPrompts(data); // Set fetched prompts to state
    };

    fetchPrompts();
  }, []);

  // Function to update the UI after a prompt is deleted
  const handleDeleteSuccess = (deletedPostId) => {
    // Remove the deleted prompt from the state
    setPrompts(prompts.filter(post => post._id !== deletedPostId));
  };

  return (
    <div>
      <h1>All Prompts</h1>
      <div className="prompt-list">
        {prompts.length === 0 ? (
          <p>No prompts available</p>
        ) : (
          prompts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              onDeleteSuccess={handleDeleteSuccess}  // Pass down delete success handler
              handleEdit={() => console.log('Edit clicked for', post)}  // Placeholder
              handleDelete={() => {}}  // This is handled inside the PromptCard now
              handleTagClick={(tag) => console.log('Tag clicked:', tag)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PromptList;
