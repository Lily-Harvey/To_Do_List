import React, { useState, useEffect } from "react";

function TaskEdit({ id, onTaskUpdated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
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
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ title, description }),
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
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
}

export default TaskEdit;
