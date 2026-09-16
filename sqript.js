console.log("SCRIPT BERHASIL DIBACA");
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const taskStatus = document.getElementById("taskStatus");
const emptyMessage = document.getElementById("emptyMessage");
const clearTasksButton = document.getElementById("clearTasksButton");

function updateTaskCount() {
    const tasks = taskList.children;
    const total = tasks.length;

    taskCount.textContent = total;

    if (total === 0) {
        emptyMessage.classList.remove("hidden");
        taskStatus.textContent = "Kosong";
    } else {
        emptyMessage.classList.add("hidden");

        const completed = taskList.querySelectorAll(
            'input[type="checkbox"]:checked'
        ).length;

        if (completed === total) {
            taskStatus.textContent = "Selesai";
        } else {
            taskStatus.textContent = "Berjalan";
        }
    }
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Silakan masukkan tugas terlebih dahulu!");
        return;
    }

    const taskItem = document.createElement("div");

    taskItem.className =
        "flex items-center justify-between gap-4 bg-slate-950 border border-slate-800 rounded-xl p-4";

    const leftSide = document.createElement("div");

    leftSide.className =
        "flex items-center gap-3 flex-1 min-w-0";

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.className =
        "w-5 h-5 accent-blue-600 cursor-pointer";

    const taskTextElement = document.createElement("span");

    taskTextElement.textContent = taskText;

    taskTextElement.className =
        "text-slate-200 break-words";

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            taskTextElement.classList.add(
                "line-through",
                "text-slate-600"
            );
        } else {
            taskTextElement.classList.remove(
                "line-through",
                "text-slate-600"
            );
        }

        updateTaskCount();
    });

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Hapus";

    deleteButton.className =
        "text-red-400 hover:text-red-300 font-semibold text-sm";

    deleteButton.addEventListener("click", function () {
        taskItem.remove();
        updateTaskCount();
    });

    leftSide.appendChild(checkbox);
    leftSide.appendChild(taskTextElement);

    taskItem.appendChild(leftSide);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

    taskInput.value = "";

    taskInput.focus();

    updateTaskCount();
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

clearTasksButton.addEventListener("click", function () {
    if (taskList.children.length === 0) {
        alert("Belum ada tugas.");
        return;
    }

    if (confirm("Apakah kamu yakin ingin menghapus semua tugas?")) {
        taskList.innerHTML = "";
        updateTaskCount();
    }
});
updateTaskCount();