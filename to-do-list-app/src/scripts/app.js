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
            taskItem.textContent = taskText;
            taskItem.classList.add('task-item');
            taskList.appendChild(taskItem);
            taskInput.value = '';
            animateTask(taskItem);
        }
    }

    function removeTask(event) {
        if (event.target.classList.contains('task-item')) {
            const taskItem = event.target;
            taskItem.classList.add('fade-out');
            taskItem.addEventListener('animationend', () => {
                taskList.removeChild(taskItem);
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