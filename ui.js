class Task {
  constructor(taskValue) {
    this.taskValue = taskValue;
  }
}

class UI {
  showAlert(message, className) {
    // Show Alert

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
  }

  showTask(task) {
    // Show/Add task to UI
    /*
    const list = document.createElement("li"),
      span = document.createElement("span"),
      listValue = document.createTextNode(taskInput.value),
      link = document.createElement("a"),
      linkValue = document.createTextNode("X");
    list.className = "collection-item"
    span.appendChild(listValue),
      list.appendChild(span);
    link.appendChild(linkValue);
    link.className = "del-item";
    link.setAttribute("href", "#");
    list.appendChild(link);
    taskCollection.appendChild(list);
    console.log(list);
    */
    const list = document.createElement("li");
    list.className = "collection-item";
    list.innerHTML = `<p>${taskInput.value}</p><a href="#" class="del-item">X</a>`;
    list.firstElementChild.className = "item";
    taskCollection.appendChild(list);
    console.log(list);
  }

  filter(target) {
    // Filter task
    const filterText = target.value.toLowerCase();
    const allTask = document.querySelectorAll(".collection-item");
    allTask.forEach(task => {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(filterText) != -1) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    });
  }

  clearInput() {
    // Clear task
    taskInput.value = "";
  }

  delTask(target) {
    // Remove task
    if (target.className === "del-item") {
      target.parentElement.remove();
    }
  }

  clearAllTask() {
    // Clear all TAsk
    alert("This action will delete all task!");
    taskCollection.innerHTML = "";
  }
}
