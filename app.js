
// variables 

const taskInput = document.querySelector(".container__taskInput"),
    addBtn = document.querySelector(".container__btn-add"),
    filterTask = document.querySelector(".container__filter"),
    taskCollection = document.querySelector(".container__collection-list");
    clearTask = document.querySelector(".container__clear-all");

// Event Listener fn

const loadEvents = () => {
    document.addEventListener("DOMContentLoaded", Store.displayTask);
    addBtn.addEventListener("click", addTask);
    filterTask.addEventListener("keyup", filterTasks);
    clearTask.addEventListener("click", clearAll);
    taskCollection.addEventListener("click", remTask);
}

// Event fn


const addTask = (e) => {
    let taskValue = taskInput.value;
    const task = new Task(taskValue); // Instantiate new task
    const ui = new UI; // Instantiate new UI
        
    if (taskValue === "") {
        ui.showAlert("Add a task","error");
    } else {
        ui.showTask(task); // Add task to list
        Store.addTaskToLoc(task); // Add task to LS
        ui.showAlert("Task Added","success");
        ui.clearInput(); // Clear input
    }
    e.preventDefault();
}

const filterTasks = (e) => {

    const ui = new UI() // Instantiate new UI
    // Filer Task
    ui.filter(e.target);
  }

const clearAll = (e) => {
    const ui = new UI; // Instantiate new UI
    ui.clearAllTask(); // Clear all task from UI
    Store.clearTaskFromLoc(); // Clear all task from LS
    ui.showAlert("All Cleared","success");
    e.preventDefault();
}

const remTask = (e) => {
    const ui = new UI; // Instantiate new UI
    ui.delTask(e.target); // Remove task from UI
    Store.remTaskFromLoc(e.target.parentElement);
    ui.showAlert("Task Removed","success");
    e.preventDefault();
}

// Invoke Event Listener fn

loadEvents();