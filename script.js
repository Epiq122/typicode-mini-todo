const apiUrl = "https://jsonplaceholder.typicode.com/todos";

const getTodos = () => {
  fetch(apiUrl + "?_limit=7")
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((todo) => {
        addTodoToDom(todo);
      });
    });
};

const addTodoToDom = (todo) => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(todo.title));
  div.setAttribute("data-id", todo.id);
  if (todo.completed) {
    div.classList.add("done");
  }

  document.getElementById("todo-list").appendChild(div);
};

const createTodo = (event) => {
  event.preventDefault();

  const newTodo = {
    title: event.target.firstElementChild.value,
    completed: false,
  };

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => addTodoToDom(data));
};

const init = () => {
  document.addEventListener("DOMContentLoaded", getTodos);
  document.querySelector("#todo-form").addEventListener("submit", createTodo);
};

init();
