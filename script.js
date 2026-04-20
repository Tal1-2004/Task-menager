let tasks = [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

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
    const li = document.createElement("li");

    if (task.completed) {
    li.classList.add("completed");
}

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;

    li.appendChild(taskSpan);
    taskSpan.addEventListener("click", function () {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();

    });

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
