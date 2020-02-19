// variables

const form = document.querySelector(".container__form"),
  taskInput = document.querySelector(".container__taskInput"),
  filterTask = document.querySelector(".container__filter"),
  list = document.querySelector(".collection-item"),
  taskCollection = document.querySelector(".container__collection-list"),
  clearTask = document.querySelector(".container__clear-all");

// Event Listener fn

const loadEvents = () => {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("click", addTask);
  taskCollection.addEventListener("click", remTask);
  filterTask.addEventListener("keyup", filterTasks);
  clearTask.addEventListener("click", clearAll);
};

// Get Tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(task => {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.innerHTML = `<p>${task}</p>`;
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove">X</i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskCollection.appendChild(li);
  });
}

const listItem = () => {
  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.innerHTML = `<p>${taskInput.value}</p>`;
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove">X</i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskCollection.appendChild(li);
  console.log(li);
};

// Show Alert

const showAlert = (message, className) => {
  // Create element
  const div = document.createElement("div");
  // add clas name
  div.className = `alert ${className}`;
  // add Text
  const divText = document.createTextNode(`${message}`);
  div.appendChild(divText);
  // show error message
  // 1 - get container
  const container = document.querySelector(".container__header");
  // 2 - get form
  const form = document.querySelector("#book-form");
  // 3 - Insert message to dox
  container.insertBefore(div, form);
  // time out fn
  function timeOut() {
    div.remove();
  }
  // set time out
  setTimeout(timeOut, 1000);
};

// 1 - Add Task
const addTask = e => {
  const taskValue = taskInput.value;
  if (taskValue === "") {
    showAlert("Add a task", "error");
  } else {
    // Invoke list item
    listItem();
    // Store in LS
    storeTaskInLocalStorage(taskInput.value);
    // Show Alert
    showAlert("Task Added", "success");
    // Clear input
    taskInput.value = "";
  }

  e.preventDefault();
};

// Store Task To LS
const storeTaskInLocalStorage = task => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// 2 - Remove Task
const remTask = e => {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();

    // Show Alert
    showAlert("Task Removed", "success");
    // Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
};

// Remove Task from LS
const removeTaskFromLocalStorage = taskItem => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task, index) => {
    if (taskItem.firstChild.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// 3 - Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase(),
    allList = document.querySelectorAll(".collection-item");
  allList.forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

// 4 - Clear Tasks
const clearAll = () => {
  if (confirm("This action will delete all your task")) {
    taskCollection.innerHTML = "";
    // Show Alert
    showAlert("Task Removed", "success");
    // Clear from LS
    clearTasksFromLocalStorage();
  }
};

// Clear Tasks from LS
const clearTasksFromLocalStorage = () => {
  localStorage.clear();
};

// Invoke loadEvents fn

loadEvents();
