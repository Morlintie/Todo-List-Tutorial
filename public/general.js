const formField = document.querySelector(".tasks-form-js");
async function postFetch() {
  const formData = new FormData(formField);
  const formName = formData.get("name");
  console.log(JSON.stringify({ formName }));
  const response = await fetch("/api/tasks/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: formName }),
  });
  const data = await response.json();
  console.log(data);
}
formField.addEventListener("submit", (event) => {
  event.preventDefault();
  postFetch();
});
