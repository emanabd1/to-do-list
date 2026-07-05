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
    allDoneMsg.classList.remove("visible"); // Hide celebration text block
  }
}