import React, { useState } from "react";


function TaskCreate({ onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/tasks/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ title, description }),
            });

            if (response.ok) {
                console.log('Task created successfully!');
                setTitle('');
                setDescription('');
                onTaskCreated(); // Notify parent component to refresh the task list
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Failed to create task.');
            }
        } catch (error) {
            setError('An error occurred while creating the task.');
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
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
}

export default TaskCreate;
