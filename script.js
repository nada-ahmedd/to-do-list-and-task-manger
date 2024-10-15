const taskForm = document.getElementById('taskForm');
const clearAllBtn = document.getElementById('clearAllBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    displayTasks(); 
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = taskInput.value.trim();
    if (task !== '') {
        addTask(task);
        taskInput.value = '';
    } else {
        alert('Please enter a task!');
    }
});

function addTask(task) {
    tasks.push({ name: task, completed: false }); 
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    displayTasks(); 
}

function displayTasks() {
    taskList.innerHTML = ''; 
    tasks.forEach((taskObj, index) => {
        const li = document.createElement('li');
        li.textContent = taskObj.name;
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        const deleteBtn = createButton('Delete', 'btn-danger', () => {
            deleteTask(index);
        });

        const checkBtn = createButton('Check', 'btn-success', () => {
            li.classList.toggle('completed');
            taskObj.completed = !taskObj.completed; 
            localStorage.setItem('tasks', JSON.stringify(tasks)); 
        });
        checkBtn.style.marginLeft = '10px'; 
        deleteBtn.style.marginLeft = '10px'; 

        if (taskObj.completed) {
            li.classList.add('completed'); 
        }

        const btnContainer = document.createElement('div');
        btnContainer.appendChild(checkBtn);
        btnContainer.appendChild(deleteBtn);

        li.appendChild(btnContainer);
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(); 
}

clearAllBtn.addEventListener('click', () => {
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    displayTasks(); 
});

searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase(); 
    const filteredTasks = tasks.filter(taskObj => taskObj.name.toLowerCase().includes(searchTerm));
    displayFilteredTasks(filteredTasks); 
});

function displayFilteredTasks(filteredTasks) {
    taskList.innerHTML = ''; 
    filteredTasks.forEach((taskObj, index) => {
        const li = document.createElement('li');
        li.textContent = taskObj.name;
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        const deleteBtn = createButton('Delete', 'btn-danger', () => {
            const taskIndex = tasks.findIndex(t => t.name === taskObj.name);
            deleteTask(taskIndex); 
        });

        const checkBtn = createButton('Check', 'btn-success', () => {
            li.classList.toggle('completed');
            taskObj.completed = !taskObj.completed; 
            localStorage.setItem('tasks', JSON.stringify(tasks)); 
        });
        checkBtn.style.marginLeft = '10px'; 
        deleteBtn.style.marginLeft = '10px'; 

        if (taskObj.completed) {
            li.classList.add('completed'); 
        }

        const btnContainer = document.createElement('div');
        btnContainer.appendChild(checkBtn);
        btnContainer.appendChild(deleteBtn);

        li.appendChild(btnContainer);
        taskList.appendChild(li);
    });
}

function createButton(text, className, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('btn', className);
    button.addEventListener('click', onClick);
    return button;
}
