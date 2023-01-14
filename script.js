let count = 0;
let countComplete = 0;
let localCount = 0;
const localTodos = [];
// localStorage.clear()




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
    localCount++;
    const newList = document.createElement('div');
    newList.classList.add("todo-lists");
    todo.appendChild(newList);
    const done = document.createElement("button");
    done.classList.add("todo-lists__done");
    done.textContent = "Done";
    newList.appendChild(done);
    const text = document.createElement('div');
    text.classList.add('todo-lists__text');
    text.classList.add(`todo-lists__text-${localCount}`);
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
    setName();
    newList.id = localTodo.id;
};


document.addEventListener('click', delList)
document.addEventListener('click', done)


function done(event){ 
    if (event.target.closest('.todo-lists__done')){
        event.target.parentNode.classList.remove("todo-lists");
        event.target.parentNode.classList.add("todo-Complete");
        event.target.classList.remove("todo-lists__done");
        event.target.classList.add("todo-lists__done-Complete");
        event.target.parentNode.querySelector(".todo-lists__text").classList.add("todo-lists__text-Complete");
        event.target.parentNode.querySelector(".todo-lists__text").classList.remove("todo-lists__text");
        countComplete++;
        complete.textContent = `Completed: ${countComplete}`; 
        localTodos[event.target.parentNode.id - 1].isChecked = false;
        localStorage.setItem('localTodos' , JSON.stringify(localTodos));
    }
};


function delList(event) {
    if (event.target.closest('.todo-lists-delDate__delList')){
        count--;
        all.textContent = `All: ${count}`;
        if (event.target.parentNode.parentNode.closest('.todo-Complete')){
            countComplete--;
            complete.textContent = `Completed: ${countComplete}`;
        }
        localTodos[event.target.parentNode.parentNode.id - 1] = '';
        localStorage.setItem('localTodos' , JSON.stringify(localTodos));
        event.target.parentNode.parentNode.remove();
    }
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
    localStorage.clear();
    localCount = 0;
};

delLast.addEventListener("click", deleteLast);

function deleteLast() {
    let check = todo.getElementsByTagName("div");
    for (let i = check.length - 1; i >= 0; i--){
        if (check[i].className === "todo-lists" || check[i].className === "todo-Complete"){
            if (check[i].className === "todo-lists"){
                todo.removeChild(check[i]);
                count--;
                localCount--;
                localTodos.pop();
                all.textContent = `All: ${count}`;
                if (localTodos.length){
                    localStorage.setItem('localTodos' , JSON.stringify(localTodos));
                } else {
                    localStorage.clear();
                }
                
                break;
            };
            if (check[i].className === "todo-Complete"){
                todo.removeChild(check[i]);
                count--;
                localCount--;
                all.textContent = `All: ${count}`;
                countComplete--;
                complete.textContent = `Completed: ${countComplete}`;
                localTodos.pop();
                if (localTodos.length){
                    localStorage.setItem('localTodos' , JSON.stringify(localTodos));
                } else {
                    localStorage.clear();
                }
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


const localTodo = {
    id: 1,
    date: '19:35 17 sept',
    text: 'Play video games',
    isChecked: true,
};

function setName(event){
    localTodo.id = localCount;
    localTodo.date = new Date().getDate() + "." + +new Date().getMonth() +1  + "." + new Date().getFullYear();
    localTodo.text = document.querySelector(`.todo-lists__text-${localCount}`).textContent;
    localTodos.push(Object.assign({}, localTodo));
    localStorage.setItem('localTodos' , JSON.stringify(localTodos));
}

function getName(){
    if (localStorage.length){
        let arr = JSON.parse(localStorage.getItem('localTodos'));
        for (let i of arr) {
            localTodos.push(i);
            if (i == ''){continue};
            if (i.isChecked == true) {
                count++;
                all.textContent = `All: ${count}`;
                const newList = document.createElement('div');
                newList.classList.add("todo-lists");
                todo.appendChild(newList);
                const done = document.createElement("button");
                done.classList.add("todo-lists__done");
                done.textContent = "Done";
                newList.appendChild(done);
                const text = document.createElement('div');
                text.classList.add('todo-lists__text');
                text.textContent = i.text;
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
                date.textContent = i.date;
                delDate.appendChild(date);
                newList.id = i.id;
            }
            if (i.isChecked == false) {
                count++;
                countComplete++;
                const newList = document.createElement('div');
                newList.classList.add("todo-Complete");
                todo.appendChild(newList);
                const done = document.createElement("button");
                done.classList.add("todo-lists__done-Complete");
                done.textContent = "Done";
                newList.appendChild(done);
                const text = document.createElement('div');
                text.classList.add('todo-lists__text-Complete');
                text.textContent = i.text;
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
                date.textContent = i.date;
                delDate.appendChild(date);
                newList.id = i.id;
                complete.textContent = `Completed: ${countComplete}`;
            }
        }
        localCount = localTodos[localTodos.length - 1].id;
    } 
};

window.addEventListener('DOMContentLoaded', getName());



