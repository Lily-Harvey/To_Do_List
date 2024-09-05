import React, { useState, useEffect } from "react";
import TaskCreate from "../TaskCreate/TaskCreate";
import TaskEdit from "../TaskEdit/TaskEdit";
import DeleteTask from "../TaskDelete/TaskDelete";
import './TaskManager.css';

function TaskManager() {
    // State variables for tasks and the currently editing task
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);

    // Function to check the validity of the access token
    const checkTokenValidity = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            // If no token, clear local storage and redirect to login
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/token/verify/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }), // Sending token in the body
            });

            if (!response.ok) {
                throw new Error('Token is invalid');
            }
        } catch (error) {
            // If token verification fails, clear local storage and redirect to login
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        }
    };

    // Function to fetch tasks from the server
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/tasks/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            } else {
                console.error('Failed to fetch tasks.');
            }
        } catch (error) {
            console.error('An error occurred while fetching tasks.');
        }
    };

    // Function to handle user sign-out
    const handleSignOut = async () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
    };

    // Initialize component by checking token validity and fetching tasks
    useEffect(() => {
        const initialize = async () => {
            await checkTokenValidity();
            fetchTasks();
        };
        initialize();
    }, []);

    // Set the task to be edited
    const handleEditClick = (taskId) => {
        setEditingTaskId(taskId);
    };

    // Refresh the task list after a task is updated
    const handleTaskUpdated = () => {
        setEditingTaskId(null);
        fetchTasks();
    };

    // Refresh the task list after a new task is created
    const handleTaskCreated = () => {
        fetchTasks();
    };

    return (
        <div className="task-manager-background">
            <div className="task-manager-container">
                <h1>Tasks</h1>
                {/* Sign out button */}
                <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
                
                {/* Display task creation form if no task is being edited */}
                {!editingTaskId && <TaskCreate onTaskCreated={handleTaskCreated} />}
                
                {/* Display task edit form if a task is being edited */}
                {editingTaskId && (
                    <TaskEdit id={editingTaskId} onTaskUpdated={handleTaskUpdated} />
                )}
                
                {/* List of tasks with edit and delete options */}
                <ul className="task-list">
                    {tasks.map((task) => (
                        <li key={task.id} className="task-list-item">
                            <div className="task-title">{task.title}</div>
                            <div className="task-description">{task.description}</div>
                            <div className="task-actions">
                                <button onClick={() => handleEditClick(task.id)}>Edit</button>
                                <DeleteTask id={task.id} onTaskDeleted={fetchTasks} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TaskManager;
