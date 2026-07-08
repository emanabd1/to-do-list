const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const remainingCount = document.getElementById("remainingCount");
const counterParagraph = document.getElementById("counter");
const clearBtn = document.getElementById("clearBtn");
const allDoneMsg = document.getElementById("allDoneMsg");
const colorCircles = document.querySelectorAll(".color-circle");

let tasks = [];

function addTask() {
  const inputValue = taskInput.value.trim();

  if (!inputValue) {
    errorMsg.textContent = "Please type a task first!";
    return;
  }

  let isDuplicate = false;
  tasks.forEach(function(task) {
    if (task.text.toLowerCase() === inputValue.toLowerCase()) {
      isDuplicate = true;
    }
  });

  if (isDuplicate) {
    errorMsg.textContent = "This task already exists!";
    return;
  }

  errorMsg.textContent = "";

  const newTask = {
    text: inputValue,
    done: false
  };
  tasks.push(newTask);

  taskInput.value = "";
  taskInput.focus();

  showTasksOnScreen();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function toggleTask(index) {
  if (tasks[index].done === true) {
    tasks[index].done = false;
  } else {
    tasks[index].done = true;
  }
  
  errorMsg.textContent = "";
  showTasksOnScreen();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  errorMsg.textContent = "";
  showTasksOnScreen();
}

function showTasksOnScreen() {
  taskList.innerHTML = "";

  tasks.forEach(function(currentTask, index) {
    const li = document.createElement("li");
    li.className = "task-item";

    if (currentTask.done === true) {
      li.classList.add("done");
    }

    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = currentTask.text;
    li.appendChild(textSpan);

    const doneBtn = document.createElement("button");
    doneBtn.className = "done-btn";
    doneBtn.textContent = currentTask.done === true ? "Undo" : "Done";
    doneBtn.addEventListener("click", function() {
      toggleTask(index);
    });
    li.appendChild(doneBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function() {
      deleteTask(index);
    });
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  updateCounters();
}

function updateCounters() {
  const totalTasks = tasks.length;
  let undoneCount = 0;

  tasks.forEach(function(task) {
    if (task.done === false) {
      undoneCount = undoneCount + 1;
    }
  });

  const completedCount = totalTasks - undoneCount;

  if (totalTasks > 0 && undoneCount === 0) {
    counterParagraph.innerHTML = '🎉 <span id="remainingCount" style="color: #388e3c; font-weight: bold;">All tasks done!</span>';
    allDoneMsg.classList.add("visible");
  } else {
    counterParagraph.innerHTML = `Tasks remaining: <span id="remainingCount">${undoneCount}</span> (${completedCount} of ${totalTasks} completed)`;
    allDoneMsg.classList.remove("visible");
  }
}

function clearAllTasks() {
  tasks = [];
  errorMsg.textContent = "";
  showTasksOnScreen();
}

clearBtn.addEventListener("click", clearAllTasks);

colorCircles.forEach(function(circle) {
  circle.addEventListener("click", function() {
    colorCircles.forEach(function(c) {
      c.classList.remove("active");
    });

    circle.classList.add("active");

    const chosenColor = circle.dataset.color;
    document.body.style.backgroundColor = chosenColor;
  });
});

showTasksOnScreen();