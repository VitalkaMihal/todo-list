let count = 0;
let countComplete = 0;


const allTodo = document.getElementById("root");
allTodo.innerHTML ="<div></div>";
const container = allTodo.querySelector("div");
container.classList.add("root-container");
container.innerHTML = "<div></div>";
const todo = container.getElementsByTagName("div")[0];
todo.classList.add("root-container-todo");
todo.innerHTML = "<form class='todo-form-input'></form><form class='todo-form-search'></form>";
const formOne = todo.getElementsByTagName("form")[0];
formOne.classList.add("todoForm");
formOne.innerHTML = `<button type="button" class="button todo-form-input__button-deleteAll">Delete All</button><button type="button" class="button todo-form-input__button-deleteLast">delete Last</button><input type="text" class="todo-form-input" placeholder="enter todo..."><button type="button" class="button todo-form-input__button-add">Add</button>`;
const input = formOne.getElementsByClassName("todo-form-input")[0];
const delAll = formOne.getElementsByTagName("button")[0];
const delLast = formOne.getElementsByTagName("button")[1];
const add = formOne.querySelectorAll("button")[2];
const formTwo = todo.getElementsByTagName("form")[1];
formTwo.innerHTML = 
`<div class="todo__info">
    <div class="todo__info-all">
        All: 0
    </div>
    <div class="todo__info-complete">
        Completed: 0
    </div>
</div>
    <form class="todo-form-search">
        <button class="button todo-form-search__button-showAll" type="button">
            Show All
        </button>
        <button class="button todo-form-search__button-showCompleted" type="button">
            Show Completed
        </button>
        <input class="todo-form-search__input" type="text" placeholder="search">
    </form>`;
    const all = document.querySelector(".todo__info-all");
    const complete = document.querySelector(".todo__info-complete");
const showAll = formTwo.getElementsByTagName("button")[0];
const showCompleted = formTwo.getElementsByTagName("button")[1];
const search = formTwo.getElementsByTagName("input")[0];

add.addEventListener("click", createList);

function createList(){
    if (input.value === ""){return};
    count++;
    const newList = document.createElement('div');
    newList.classList.add("todo-lists");
    todo.appendChild(newList);
    const done = document.createElement("button");
    done.classList.add("todo-lists__done");
    done.textContent = "Done";
    newList.appendChild(done);
    const text = document.createElement('div');
    text.classList.add("todo-lists__text");
    text.textContent = input.value;
    newList.appendChild(text);
    all.textContent = `All: ${count}`;
    const delDate = document.createElement('div');
    delDate.classList.add("todo-lists-delDate");
    newList.appendChild(delDate);
    const delList = document.createElement("button");
    delList.classList.add("todo-lists-delDate__delList");
    delList.textContent = "Del"
    delDate.appendChild(delList);
    const date = document.createElement('div');
    date.classList.add("todo-lists-delDate__date");
    date.textContent = new Date().getDate() + "." + +new Date().getMonth() +1  + "." + new Date().getFullYear();
    delDate.appendChild(date);
    input.value = "";
    
    delList.addEventListener("click", ()=>{
        todo.removeChild(newList);
        count--;
        if (done.className === "todo-lists__done-Complete"){
            countComplete--;
            complete.textContent = `Completed: ${countComplete}`;
        }
        all.textContent = `All: ${count}`;
    });

    done.addEventListener("click", ()=>{
        newList.classList.remove("todo-lists");
        newList.classList.add("todo-Complete");
        done.classList.remove("todo-lists__done");
        done.classList.add("todo-lists__done-Complete");
        text.classList.remove("todo-lists__text");
        text.classList.add("todo-lists__text-Complete");
        countComplete++;
        complete.textContent = `Completed: ${countComplete}`;
    }, {"once": true});

};

const eventHandler = (e) => {
    if (e.key === 'Enter') {
        createList();
        search.value = "";
        e.preventDefault();
    }
};


document.addEventListener('keydown', eventHandler);


delAll.addEventListener("click", deleteAll);

function deleteAll() {
    let check = todo.getElementsByTagName("div");
        for (let i = 0; i < check.length; i++){
            if (check[i].className === "todo-lists" || check[i].className === "todo-Complete"){
                todo.removeChild(check[i]);
                i--;
            };
        }
    count = 0;
    countComplete = 0;
    complete.textContent = `Completed: ${countComplete}`;
    all.textContent = `All: ${count}`;
};

delLast.addEventListener("click", deleteLast);

function deleteLast() {
    let check = todo.getElementsByTagName("div");
    for (let i = check.length - 1; i >= 0; i--){
        if (check[i].className === "todo-lists" || check[i].className === "todo-Complete"){
            if (check[i].className === "todo-lists"){
                todo.removeChild(check[i]);
                count--;
                all.textContent = `All: ${count}`;
                break;
            };
            if (check[i].className === "todo-Complete"){
                todo.removeChild(check[i]);
                count--;
                all.textContent = `All: ${count}`;
                countComplete--;
                complete.textContent = `Completed: ${countComplete}`;
                break;
            };
        }
    }
};


showCompleted.addEventListener("click", ()=>{
    let check = todo.getElementsByTagName("div");
    for (let i = check.length - 1; i >= 0; i--){
        if (check[i].className === "todo-lists"){
            check[i].style.display = "none";
        }}
});

showAll.addEventListener("click", ()=>{
    let check = todo.getElementsByTagName("div");
    for (let i of check){
        i.style.display = "flex";
    };
});


search.addEventListener("input", searchList);

function searchList(){
    let check = todo.querySelectorAll(".todo-lists__text");
    let checkComplete = todo.querySelectorAll(".todo-lists__text-Complete");
    for (let item of check){
        if (item.textContent.indexOf(search.value) === -1){
            item.parentNode.style.display = "none";
        } else {item.parentNode.style.display = "flex";};
    };
    for (let item of checkComplete){
        if (item.textContent.indexOf(search.value) === -1){
            item.parentNode.style.display = "none";
        } else {item.parentNode.style.display = "flex";};
    };
};