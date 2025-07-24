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

            // Add icon
            const icon = document.createElement('span');
            icon.className = 'fa-regular fa-circle-check task-icon';
            taskItem.appendChild(icon);

            // Add text span
            const textSpan = document.createElement('span');
            textSpan.className = 'task-text';
            textSpan.textContent = ' ' + taskText;
            taskItem.appendChild(textSpan);

            // Add edit button
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
            taskItem.appendChild(editBtn);

            taskList.appendChild(taskItem);
            taskInput.value = '';
            animateTask(taskItem);
        }
    }

    taskList.addEventListener('click', function(event) {
        // Remove task
        if (event.target.classList.contains('task-item')) {
            const taskItem = event.target;
            if (taskItem.classList.contains('fade-out')) return;
            taskItem.classList.add('fade-out');
            taskItem.addEventListener('animationend', function handler() {
                taskItem.removeEventListener('animationend', handler);
                taskItem.remove();
            });
        }
        // Edit task
        if (event.target.closest('.edit-btn')) {
            const taskItem = event.target.closest('.task-item');
            const textSpan = taskItem.querySelector('.task-text');
            const oldText = textSpan.textContent.trim();
            // Replace text with input
            const input = document.createElement('input');
            input.type = 'text';
            input.value = oldText;
            input.className = 'edit-input';
            textSpan.replaceWith(input);

            // Change edit button to save
            const editBtn = taskItem.querySelector('.edit-btn');
            editBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            editBtn.classList.add('save-btn');
            editBtn.classList.remove('edit-btn');

            // Animate input
            input.classList.add('edit-animate');
            input.focus();
        }
        // Save edited task
        if (event.target.closest('.save-btn')) {
            const taskItem = event.target.closest('.task-item');
            const input = taskItem.querySelector('.edit-input');
            const newText = input.value.trim() || 'Untitled Task';
            const textSpan = document.createElement('span');
            textSpan.className = 'task-text';
            textSpan.textContent = ' ' + newText;
            input.replaceWith(textSpan);

            // Change save button back to edit
            const saveBtn = taskItem.querySelector('.save-btn');
            saveBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
            saveBtn.classList.add('edit-btn');
            saveBtn.classList.remove('save-btn');

            // Animate text
            textSpan.classList.add('edit-animate');
        }
    });

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