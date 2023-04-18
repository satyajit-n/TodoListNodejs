const btn = document.querySelector(".btn");
const myForm = document.querySelector("#my-form");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");
const delButton = document.querySelector(".btn:hover");

myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  // const done = document.getElementById("done").value;

  let myObj = {
    name: name,
    description: description,
  };

  const parentEle = document.getElementById("lisOfItems");
  // const parentEle = document.getElementById("lisOfDoneItems");
  const childEle = document.createElement("li");
  const taskDone = document.createElement("input");
  const taskNotDone = document.createElement("input");

  childEle.className = "li";

  taskDone.type = "button";
  taskDone.value = " ✓ ";
  taskDone.className = "btn";

  taskNotDone.type = "button";
  taskNotDone.value = " X ";
  taskNotDone.className = "btn";

  axios
    .post("http://localhost:3000/todo/add-todo", myObj)
    .then((res) => {
      console.log(res);
      showTodoDetails(res.data.newTodoDetails);
      window.location.reload();
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h2>Something Went wrong<h2/>";
      console.log(err);
    });
}

function showTodoDetails(todo) {
  const parentEle = document.getElementById("lisOfItems");
  const childEle = document.createElement("li");
  const taskDone = document.createElement("input");
  const taskNotDone = document.createElement("input");

  childEle.className = "li";

  taskDone.type = "button";
  taskDone.value = " ✓ ";
  taskDone.className = "btn-outline-dark";

  taskNotDone.type = "button";
  taskNotDone.value = " X ";
  taskNotDone.className = "btn-outline-dark";

  childEle.textContent = todo.name + "   =========   " + todo.description;

  parentEle.appendChild(childEle);
  childEle.appendChild(taskDone);
  childEle.appendChild(taskNotDone);
}

function showCompletedTodoDetails(completedTodo) {
  const parentEle = document.getElementById("listOfDoneItems");
  const childEle = document.createElement("li");
  const deleteTodo = document.createElement("input");

  childEle.className = "li";

  deleteTodo.type = "button";
  deleteTodo.value = " X ";
  deleteTodo.className = "btn-outline-dark";

  childEle.textContent =
    completedTodo.name + "   =========   " + completedTodo.description;

  parentEle.appendChild(childEle);
  childEle.appendChild(deleteTodo);
}

function showTodoOnLoad(todo) {
  const parentEle = document.getElementById("lisOfItems");
  const childEle = document.createElement("li");
  const taskDone = document.createElement("input");
  const taskNotDone = document.createElement("input");

  childEle.className = "li";

  taskDone.type = "button";
  taskDone.value = " ✓ ";
  taskDone.className = "btn-outline-dark";

  taskNotDone.type = "button";
  taskNotDone.value = " X ";
  taskNotDone.className = "btn-outline-dark";

  childEle.textContent = todo.name + "   ======   " + todo.description + "  ";

  parentEle.appendChild(childEle);
  childEle.appendChild(taskDone);
  childEle.appendChild(taskNotDone);

  taskDone.onclick = () => {
    const data = {
      name: todo.name,
      description: todo.description,
    };

    childEle.textContent = todo.name + "   ======   " + todo.description;

    axios
      .post(`http://localhost:3000/completedTodo/add-completed-todo`, data)
      .then((res) => {
        showCompletedTodoDetails(res.data.newCompletedTodoDetails);
        // window.location.reload();
      });
    axios
      // .post(`http://localhost:3000/completedTodo/add-completed-todo`, data)
      .delete(`http://localhost:3000/todo/delete-todo/${todo.id}`)
      .then((res) => {
        // parentEle.appendChild(childEle)
        window.location.reload();
      });
  };

  taskNotDone.onclick = () => {
    var temp = {
      name: candy.name,
      description: candy.description,
    };
    axios
      .put(`http://localhost:3000/candy/update-candy-by-two/${candy.id}`, temp)
      .then((res) => window.location.reload());
  };
}

function showCompletedTodoOnLoad(completedTodo) {
  const parentEle = document.getElementById("listOfDoneItems");
  const childEle = document.createElement("li");
  const deleteTodo = document.createElement("input");

  childEle.className = "li";

  deleteTodo.type = "button";
  deleteTodo.value = " X ";
  deleteTodo.className = "btn-outline-dark";

  childEle.textContent =
    completedTodo.name + "   =========   " + completedTodo.description;

  parentEle.appendChild(childEle);
  childEle.appendChild(deleteTodo);

  deleteTodo.onclick = () => {
    axios
      .delete(
        `http://localhost:3000/completedTodo//delete-completed-todo/${completedTodo.id}`
      )
      .then((res) => {
        window.location.reload();
      });
  };
}

window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  axios.get("http://localhost:3000/todo/get-todo").then((res) => {
    console.log(res);
    for (var i = 0; i < res.data.allTodo.length; i++) {
      console.log(res);
      showTodoOnLoad(res.data.allTodo[i]);
    }
  });
  axios
    .get("http://localhost:3000/completedTodo/get-completed-todo")
    .then((res) => {
      for (var i = 0; i < res.data.allCompletedTodo.length; i++) {
        console.log(res);
        showCompletedTodoOnLoad(res.data.allCompletedTodo[i]);
      }
    })
    .catch((res) => {
      console.log(res);
    });
});
