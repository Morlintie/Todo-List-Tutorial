const generateEdit = async () => {
  try {
    const main = document.querySelector(".edit-main");
    let storeHTML = "";
    const url = new URL(window.location.href);
    const taskId = url.searchParams.get("taskId");
    const response = await fetch(`/api/tasks/get/${taskId}`);
    const data = await response.json();
    storeHTML = ` <section class="edit-card">
        <article class="task-info">
          <p>TaskID = ${data.task._id}</p>
          <p>${data.task.name}</p>
        </article>
        <article class="edit-article">
          <label for="name"></label>
          <input
            class="edit-input"
            type="text"
            id="name"
            placeholder="Task Name"
            value = "${data.task.name}"
          />
          <label for="complete"></label>
          <select class="edit-select" name="complete" id="complete">
            <option ${
              data.task.completed ? "selected" : null
            } value="true">Completed</option>
            <option ${
              data.task.completed ? null : "selected"
            } value="false">In Progress</option>
          </select>
        </article>
        <button class="edit-submit">Edit</button>
      </section>`;
    main.innerHTML = storeHTML;
    const editInput = document.querySelector(".edit-input");
    const editSelect = document.querySelector(".edit-select");
    const editSubmit = document.querySelector(".edit-submit");

    editSubmit.addEventListener("click", async () => {
      const taskName = editInput.value;
      const taskComplete = editSelect.value;

      await fetch(`/api/tasks/patch/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: taskName, completed: taskComplete }),
      });

      editInput.value = "";
      generateEdit();
    });
  } catch (err) {}
};

generateEdit();
