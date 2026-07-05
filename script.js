var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var errorMsg = document.getElementById("errorMsg");
var remainingCount = document.getElementById("remainingCount");
var counterParagraph = document.getElementById("counter");
var clearBtn = document.getElementById("clearBtn");
var allDoneMsg = document.getElementById("allDoneMsg");
var colorCircles = document.querySelectorAll(".color-circle");
var tasks = [];
function updateCounters() {
  var totalTasks = tasks.length;
  var undoneCount = 0;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].done === false) {
      undoneCount = undoneCount + 1;
    }
  }

  var completedCount = totalTasks - undoneCount;

  remainingCount.textContent = undoneCount + " (" + completedCount + " of " + totalTasks + " completed)";

  if (totalTasks > 0 && undoneCount === 0) {
    counterParagraph.innerHTML = '🎉 <span id="remainingCount" style="color: #388e3c; font-weight: bold;">All tasks done!</span>';
    allDoneMsg.classList.add("visible");
  } else {
    counterParagraph.innerHTML = 'Tasks remaining: <span id="remainingCount">' + undoneCount + '</span> (' + completedCount + ' of ' + totalTasks + ' completed)';
    allDoneMsg.classList.remove("visible");
  }
}
function render() {

  taskList.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    var currentTask = tasks[i];

    var li = document.createElement("li");
    li.className = "task-item";

    if (currentTask.done === true) {
      li.classList.add("done");
    }
    var textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = currentTask.text;
    li.appendChild(textSpan);
    var doneBtn = document.createElement("button");
    doneBtn.className = "done-btn";
    
    if (currentTask.done === true) {
      doneBtn.textContent = "Undo";
    } else {
      doneBtn.textContent = "Done";
    }
    doneBtn.setAttribute("onclick", "toggleTask(" + i + ")");
    li.appendChild(doneBtn);
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("onclick", "deleteTask(" + i + ")");
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
  updateCounters();
}

function addTask() {
  var inputValue = taskInput.value.trim();
  if (inputValue === "") {
    errorMsg.textContent = "Please type a task first!";
    return;
  }
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].text.toLowerCase() === inputValue.toLowerCase()) {
      errorMsg.textContent = "This task already exists!";
      return;
    }
  }
  errorMsg.textContent = "";
  var newTask = {
    text: inputValue,
    done: false
  };
  tasks.push(newTask);
  taskInput.value = "";
  taskInput.focus();
  render();
}


function toggleTask(index) {
  if (tasks[index].done === true) {
    tasks[index].done = false;
  } else {
    tasks[index].done = true;
  }
  
  errorMsg.textContent = "";
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  errorMsg.textContent = "";
  render();
}
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function clearAllTasks() {
  tasks = [];
  errorMsg.textContent = "";
  render();
}
clearBtn.addEventListener("click", clearAllTasks);


colorCircles.forEach(function(circle) {
  circle.addEventListener("click", function() {

    colorCircles.forEach(function(c) {
      c.classList.remove("active");
    });


    circle.classList.add("active");


    var chosenColor = circle.dataset.color;
    

    document.body.style.backgroundColor = chosenColor;
  });
});