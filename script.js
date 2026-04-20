let tasks = [];
let currentFilter = "all";
const taskCounter = document.getElementById("taskCounter");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearCompleted");
const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  renderTasks();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  tasks.push({
  text: taskText,
  completed: false
});
  saveTasks();
  renderTasks();

  taskInput.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function(task, index) {

    if (currentFilter === "active" && task.completed) return;
    if (currentFilter === "completed" && !task.completed) return;

    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });
    
    const activeTasks = tasks.filter(task => !task.completed).length;
    taskCounter.textContent = activeTasks + " tasks left";

    
    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;

   
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    deleteBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      deleteTask(index);
    });

    editBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;

      li.innerHTML = "";
      li.appendChild(input);

      input.focus();

      input.addEventListener("blur", saveEdit);
      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          saveEdit();
        }
      });

      function saveEdit() {
        const newValue = input.value.trim();

        if (newValue !== "") {
          tasks[index].text = newValue;
          saveTasks();
          renderTasks();
        } else {
          renderTasks();
        }
      }
    });
    editBtn.addEventListener("click", function (e) {
  e.stopPropagation();

  const input = document.createElement("input");
  input.type = "text";
  input.value = task.text;

  li.innerHTML = "";
  li.appendChild(input);

  input.focus();

  input.addEventListener("blur", saveEdit);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      saveEdit();
    }
  });

  function saveEdit() {
    const newValue = input.value.trim();

    if (newValue !== "") {
      tasks[index].text = newValue;
      saveTasks();
      renderTasks();
    } else {
      renderTasks();
    }
  }
});

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    
    taskList.appendChild(li);
  });
}
        
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function setFilter(filter) {
  currentFilter = filter;

  document.querySelectorAll(".filters button").forEach(btn => {
    btn.classList.remove("active");
  });

  document.getElementById("filter-" + filter).classList.add("active");

  renderTasks();
}
clearBtn.addEventListener("click", function () {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
});