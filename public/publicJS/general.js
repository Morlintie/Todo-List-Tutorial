import { getFetch } from "./data.js";

function taskManager() {
  const formField = document.querySelector(".tasks-form-js");
  const taskDisplay = document.querySelector(".task-display");
  const disclaimer = document.querySelector(".warning-line");

  async function postFetch() {
    try {
      const formData = new FormData(formField);
      const formName = formData.get("name");
      await fetch("/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: formName }),
      });
    } catch (err) {}
  }

  formField.addEventListener("submit", async (event) => {
    event.preventDefault();

    postFetch();
    document.querySelector(".task-manager-input").value = "";

    taskManager();
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
              class="trashcan-icon"
              src="../icons/trashcan-icon.jpg"
              alt="trashcan-icon"
            />
            </figure >
            <a href = "/edit.html?taskId=${
              task._id
            }"><figure class="edit-figure">
            <img
              class="edit-icon"
              src="../icons/edit-icon.png"
              alt="edit-icon"
            />
            </figure>
            </a>
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
    })
    .catch((err) => {});
}

taskManager();
