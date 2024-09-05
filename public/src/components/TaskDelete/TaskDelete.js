import React from "react";

function DeleteTask({ id, onTaskDeleted }) {

    // Function to handle task deletion
    const handleDelete = async () => {
        try {
            // Make DELETE request to remove the task
            const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Use stored access token for authentication
                },
            });

            if (response.ok) {
                console.log('Task deleted successfully!');
                onTaskDeleted(); // Notify parent component to refresh the task list
            } else {
                console.error('Failed to delete task.');
            }
        } catch (error) {
            console.error('An error occurred while deleting the task.');
        }
    };

    return (
        <button onClick={handleDelete}>Delete Task</button>
    );
}

export default DeleteTask;
