// This file contains the JavaScript logic for the to-do list application.
// It handles user interactions, such as adding and removing tasks, and updates the UI accordingly.

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', removeTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            // Add icon span
            const icon = document.createElement('span');
            icon.className = 'fa-regular fa-circle-check task-icon';
            taskItem.appendChild(icon);
            // Add text
            const textNode = document.createTextNode(' ' + taskText);
            taskItem.appendChild(textNode);
            taskList.appendChild(taskItem);
            taskInput.value = '';
            animateTask(taskItem);
        }
    }

    function removeTask(event) {
        if (event.target.classList.contains('task-item')) {
            const taskItem = event.target;
            // Prevent multiple triggers
            if (taskItem.classList.contains('fade-out')) return;
            taskItem.classList.add('fade-out');
            // Remove after animation
            taskItem.addEventListener('animationend', function handler() {
                taskItem.removeEventListener('animationend', handler);
                taskItem.remove();
            });
        }
    }

    function animateTask(taskItem) {
        taskItem.classList.add('fade-in');
        taskItem.addEventListener('animationend', () => {
            taskItem.classList.remove('fade-in');
        });
    }
});