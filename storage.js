class Store {
    
    static getTasks() { // Get task from LS
        let tasks;
        if(localStorage.getItem("tasks") === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem("tasks"));
        }
        return tasks;
    }

    static addTaskToLoc(task) { // Add task to LS
        const tasks = Store.getTasks();
              tasks.push(task);
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }

    static displayTask() { // Display task on load
        const tasks = Store.getTasks();
        tasks.forEach((task) => {
            const ui = new UI;
            ui.showTask(task);
        });
    }

    static remTaskFromLoc(taskItem) {  // Remove task from LS
        const tasks = Store.getTasks();
        tasks.forEach((task,index) => {
            if(taskItem.firstElementChild.textContent === task) {
                tasks.splice(index, 1);
            }
        });
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }

    static clearTaskFromLoc() { // Clear task from LS
        localStorage.clear();
    }
}

