import React from "react";

function DeleteTask({ id, onTaskDeleted }) {

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
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
