import React, { useState, useEffect } from "react";
import TaskCreate from "../TaskCreate/TaskCreate";
import TaskEdit from "../TaskEdit/TaskEdit";
import DeleteTask from "../TaskDelete/TaskDelete";
import './TaskManager.css'

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);

    const checkTokenValidity = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
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
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login'
        }
    };
    

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

    const handleSignOut = async () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
    };

    useEffect(() => {
        const initialize = async () => {
            await checkTokenValidity();
            fetchTasks();
        };
        initialize();
    }, []);

    const handleEditClick = (taskId) => {
        setEditingTaskId(taskId);
    };

    const handleTaskUpdated = () => {
        setEditingTaskId(null);
        fetchTasks();
    };

    const handleTaskCreated = () => {
        fetchTasks();
    };

    return (
        <div className="task-manager-background">
            <div className="task-manager-container">
                <h1>Tasks</h1>
                <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
                {!editingTaskId && <TaskCreate onTaskCreated={handleTaskCreated} />}
                {editingTaskId && (
                    <TaskEdit id={editingTaskId} onTaskUpdated={handleTaskUpdated} />
                )}
                <ul className="task-list">
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <span>Task: {task.title}</span>
                            <span>Description: {task.description}</span>
                            <button onClick={() => handleEditClick(task.id)}>Edit</button>
                            <DeleteTask id={task.id} onTaskDeleted={fetchTasks} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TaskManager;