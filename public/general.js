import { getFetch } from "./data.js";

function taskManager() {
  const formField = document.querySelector(".tasks-form-js");
  const taskDisplay = document.querySelector(".task-display");
  async function postFetch() {
    const formData = new FormData(formField);
    const formName = formData.get("name");
    console.log(JSON.stringify({ formName }));
    await fetch("/api/tasks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: formName }),
    });
    taskManager();
  }

  formField.addEventListener("submit", (event) => {
    event.preventDefault();

    postFetch();
    document.querySelector(".task-manager-input").value = "";
  });
  let taskHTML = "";

  getFetch()
    .then((data) => {
      data.tasks.forEach((task) => {
        taskHTML += `<article class="task">
          <p style= '${
            task.completed
              ? "text-decoration:line-through"
              : "text-decoration:none"
          }' class="task-name">${task.name}</p>
          <section class="image-section">
          <figure class="trash-figure" data-trash-id = "${task._id}">
            <img
              class="trahscan-icon"
              src="../icons/trashcan-icon.jpg"
              alt="trashcan-icon"
            />
            </figure >
            <figure class="edit-figure" data-edit-id = "${task._id}">
            <img
              class="edit-icon"
              src="../icons/edit-icon.png"
              alt="edit-icon"
            />
            </figure>
          </section>
        </article>`;
      });
      return new Promise((resolve, reject) => {
        resolve();
      });
    })
    .then(() => {
      taskDisplay.innerHTML = taskHTML;
      return new Promise((resolve, reject) => {
        resolve();
      });
    })
    .then(() => {
      document.querySelectorAll(".trash-figure").forEach((figure) => {
        figure.addEventListener("click", () => {
          const deleteFetch = async () => {
            await fetch(`api/tasks/delete/${figure.dataset.trashId}`, {
              method: "DELETE",
            });
          };
          deleteFetch();
          taskManager();
        });
      });
    });
}

taskManager();
