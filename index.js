const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos")); // parseでJSONを配列にする。

if (todos) {
    todos.forEach(todo => {
        add(todo);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault(); // もともとある機能リロードを制限する
    console.log(input.value);
    add();
});

function add(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    };
    if (todoText) { // 型変換でvalue=""がfalseに変換される
        const li = document.createElement("li"); // liを新しく作る
        li.innerText = todoText;
        li.classList.add("list-group-item");
        if (todo && todo.completed) {
            li.classList.toggle("text-decoration-line-through");
        }

        li.addEventListener("contextmenu", function (event) { // 右クリック
            event.preventDefault();
            li.remove();
            saveData();
        });

        li.addEventListener("click", function () {
            li.classList.toggle("text-decoration-line-through"); // toggleで切り替え
            saveData();
        });
        
        ul.appendChild(li);
        input.value = "";
        saveData();
    }
}

function saveData() {
    const lists = document.querySelectorAll("li");
    let todos = [];
    lists.forEach(list => { // それぞれの要素について実行
        let todo = {
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        }
        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos)); // ブラウザにデータをJSONで保存する。JSONはString
}