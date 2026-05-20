export function initTodo() {
  let input = document.getElementById("inputtask");
  let addbtn = document.getElementById("addbtn");
  let listitem = document.getElementById("listitem");

  let tasks = [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
      tasks.forEach((task) => createTask(task.text, task.completed));
    }
  }

  function createTask(taskText, completed = false) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    const span = document.createElement("span");
    span.textContent = taskText;

    if (completed) {
      span.style.textDecoration = "line-through";
    }

    // ✅ EDIT BUTTON (STYLE FIXED)
    const editbtn = document.createElement("button");
    editbtn.textContent = "Edit";
    editbtn.classList.add("edit-btn"); // IMPORTANT

    // ✅ DELETE BUTTON (STYLE FIXED)
    const dltbtn = document.createElement("button");
    dltbtn.textContent = "Delete";
    dltbtn.classList.add("delete-btn"); // IMPORTANT

    // Checkbox logic
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        span.style.textDecoration = "line-through";
      } else {
        span.style.textDecoration = "none";
      }
      updateTasks();
    });

    // Delete logic
    dltbtn.addEventListener("click", () => {
      li.remove();
      updateTasks();
    });

    // Edit logic
    editbtn.addEventListener("click", () => {
      if (editbtn.textContent === "Edit") {
        span.contentEditable = true;
        span.focus();
        editbtn.textContent = "Save";
      } else {
        span.contentEditable = false;
        editbtn.textContent = "Edit";
        updateTasks();
      }
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editbtn);
    li.appendChild(dltbtn);

    listitem.appendChild(li);
  }

  function updateTasks() {
    tasks = [];

    document.querySelectorAll("#listitem li").forEach((li) => {
      const text = li.querySelector("span").textContent;
      const completed = li.querySelector("input").checked;

      tasks.push({
        text: text,
        completed: completed,
      });
    });

    saveTasks();
  }

  addbtn.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText === "") return;

    createTask(taskText);

    tasks.push({
      text: taskText,
      completed: false,
    });

    saveTasks();
    input.value = "";
  });

  loadTasks();
}
