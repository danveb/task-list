// Define UI Vars
const form = document.querySelector('#task-form'); 
const taskList = document.querySelector('.collection'); 
const clearBtn = document.querySelector('.clear-tasks'); 
const filter = document.querySelector('#filter'); 
const taskInput = document.querySelector('#task'); 

// Call function to load all event Listeners
loadEventListeners(); 

// Load all event listeners function
function loadEventListeners() {
    // DOM Load event 
    document.addEventListener('DOMContentLoaded', getTasks); 
    // Add task event 
    form.addEventListener('submit', addTask); 
    // Remove task event 
    taskList.addEventListener('click', removeTask); 
    // Clear task event 
    clearBtn.addEventListener('click', clearTasks); 
    // Filter task event 
    filter.addEventListener('keyup', filterTasks); 
}; 

// Get tasks from LS 
function getTasks() {
    let tasks; 
    if (localStorage.getItem('tasks') === null) {
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }

    tasks.forEach(function(task) {
        // Create li element 
        const li = document.createElement('li'); 
        // Add class
        li.className = 'collection-item'; 
        // Create Textnode and appendChild to li 
        li.appendChild(document.createTextNode(task)); 
        // Create new link element 
        const link = document.createElement('a'); 
        // Add class
        link.className = 'delete-item secondary-content'; 
        // Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>'
        // Append the link to li
        li.appendChild(link); 

        // Append li to ul 
        taskList.appendChild(li); 
    })
}

// Add Task Function
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task'); 
    };  

    // Create li element 
    const li = document.createElement('li'); 
    // Add class
    li.className = 'collection-item'; 
    // Create Textnode and appendChild to li 
    li.appendChild(document.createTextNode(taskInput.value)); 
    // Create new link element 
    const link = document.createElement('a'); 
    // Add class
    link.className = 'delete-item secondary-content'; 
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append the link to li
    li.appendChild(link); 

    // Append li to ul 
    taskList.appendChild(li); 

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value); 

    // Clear input 
    taskInput.value = ''; 

    // Prevent default submit 
    e.preventDefault(); 
}; 

// Store Task 
function storeTaskInLocalStorage(task) {
    let tasks; 
    if (localStorage.getItem('tasks') === null) {
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }
    tasks.push(task); 

    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

// RemoveTask 
function removeTask(e) {
    // target <a> tag
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Please confirm?')) {
            // Remove parentElement of parentElement -> li 
            e.target.parentElement.parentElement.remove(); 
            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement); 
        };
    };
};

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks; 
    if (localStorage.getItem('tasks') === null) {
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    } 

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1); 
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

// ClearTasks
function clearTasks() {
    // Clear everything by removing HTML 
    // taskList.innerHTML = ''; 
    // OR While loop (faster) -> while something is here 
    while (taskList.firstChild) {
        // Remove 
        taskList.removeChild(taskList.firstChild); 
    };
    // Clear from LS
    clearTasksFromLocalStorage(); 
};

// ClearTasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear(); 
}

// FilterTasks 
function filterTasks(e) {
    const text = e.target.value.toLowerCase(); 
    // Use querySelectorAll and loop through with forEach
    // This works because selectorAll returns nodeList and can use forEach
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent; 
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block'; 
        } else {
            task.style.display = 'none'; 
        }
    }); 
}

