import React, { useState } from "react";

function TaskCreate({ onTaskCreated }) {
    const [title, setTitle] = useState(''); // State for task title
    const [description, setDescription] = useState(''); // State for task description
    const [error, setError] = useState(''); // State for error messages

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await fetch('http://localhost:8000/api/tasks/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Content type of request
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Authorization header with token
                },
                body: JSON.stringify({ title, description }), // Convert form data to JSON
            });

            if (response.ok) {
                console.log('Task created successfully!');
                setTitle(''); // Clear the title input field
                setDescription(''); // Clear the description input field
                onTaskCreated(); // Notify parent component to refresh the task list
            } else {
                const errorData = await response.json(); // Parse error response
                setError(errorData.detail || 'Failed to create task.'); // Set error message
            }
        } catch (error) {
            setError('An error occurred while creating the task.'); // Handle network or other errors
        }
    };

    return (
        <div>
            <form className="task-create-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                />
                <button type="submit">Create Task</button>
                {/* Display error message if any */}
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
}

export default TaskCreate;
