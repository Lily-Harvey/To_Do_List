import React, { useState, useEffect } from "react";

function TaskEdit({ id, onTaskUpdated }) {
    // State variables for task title, description, and error messages
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    // Fetch task data when component mounts or id changes
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Use stored access token for authentication
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    // Set state with fetched task data
                    setTitle(data.title);
                    setDescription(data.description);
                } else {
                    setError('Failed to fetch task data.');
                }
            } catch (error) {
                setError('An error occurred while fetching the task.');
            }
        };

        fetchTask();
    }, [id]); // Dependency array to refetch when id changes

    // Handle form submission for updating the task
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Use stored access token for authentication
                },
                body: JSON.stringify({ title, description }), // Send updated task data
            });

            if (response.ok) {
                console.log('Task updated successfully!');
                onTaskUpdated(); // Notify parent component to refresh the task list
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Failed to update task.');
            }
        } catch (error) {
            setError('An error occurred while updating the task.');
        }
    };

    return (
        <div>
            <form className="task-edit-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Update Task</button>
                {/* Display error message if there is one */}
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
}

export default TaskEdit;
