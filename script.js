let allInfo = {
    itemId: 0,
    localTodos: [],
    allComplete: 0
}

let {itemId, localTodos, allComplete} = allInfo;

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
formTwo.innerHTML = `
    <div class="todo__info">
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
        </form>
    <div  class="root-container-lists">
    </div>
`;
    const lists = document.querySelector('.root-container-lists')
    const all = document.querySelector(".todo__info-all");
    const complete = document.querySelector(".todo__info-complete");
    const showAll = formTwo.getElementsByTagName("button")[0];
    const showCompleted = formTwo.getElementsByTagName("button")[1];
    const search = formTwo.getElementsByTagName("input")[0];

    let dateNow = () => {
        let date = new Date();
        return date.getDate() + "." + (Number(date.getMonth()) +1 )  + "." + date.getFullYear();
    }

const generateList = () => {
    lists.innerHTML = '';
    for ( let i of localTodos) {
                const newList = document.createElement('div');
                newList.id = i.id; 
                newList.classList.add("todo-lists");
                lists.appendChild(newList);
                const done = document.createElement("button");
                done.classList.add("todo-lists__done");
                done.textContent = "Done";
                done.id = i.id;
                newList.appendChild(done);
                const text = document.createElement('div');
                text.classList.add('todo-lists__text');
                text.textContent = i.text;
                newList.appendChild(text);
                const delDate = document.createElement('div');
                delDate.classList.add("todo-lists-delDate");
                newList.appendChild(delDate);
                const delList = document.createElement("button");
                delList.classList.add("todo-lists-delDate__delList");
                delList.id = i.id;
                delList.textContent = "Del"
                delDate.appendChild(delList);
                const date = document.createElement('div');
                date.classList.add("todo-lists-delDate__date");
                date.textContent = i.date;
                delDate.appendChild(date);
            if (i.isChecked === true) {
                newList.classList.add("todo-Complete");
                newList.classList.remove("todo-lists");
                done.classList.add("todo-lists__done-Complete");
                done.classList.remove("todo-lists__done");
                text.classList.add('todo-lists__text-Complete');
                text.classList.remove('todo-lists__text');
            }
        }
        all.textContent = `All: ${localTodos.length}`;
        allComplete = localTodos.filter((item) => item.isChecked === true).length;
        complete.textContent = `Completed: ${allComplete}`;
    };

    function eventHandler(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (input.value === ""){
                search.value = "";
                return;
            };
            itemId++;
            const listInfo = {
                id: itemId,
                date: dateNow(),
                text: input.value,
                isChecked: false
            };
            input.value = '';
            localTodos.push(listInfo);
            localStorage.setItem('localTodos' , JSON.stringify(localTodos));
            generateList();
            search.value = "";
        }
    };

function setName(){
    if (input.value === ""){
        return;
    };
    itemId++;
    const listInfo = {
        id: itemId,
        date: dateNow(),
        text: input.value,
        isChecked: false
    };
    input.value = '';
    localTodos.push(listInfo);
    localStorage.setItem('localTodos' , JSON.stringify(localTodos));
    generateList();
};

const deleteAll = () => {
    localStorage.clear();
    localTodos = [];
    all.textContent = `All: ${localTodos.length}`;
    allComplete = localTodos.filter((item) => item.isChecked === true).length;
    generateList();
};

const deleteLast = () => {
    localTodos.pop();
    localStorage.setItem('localTodos' , JSON.stringify(localTodos));
    all.textContent = `All: ${localTodos.length}`;
    allComplete = localTodos.filter((item) => item.isChecked === true).length;
    generateList();
}

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

const delList = (e) => {
    if (e.target.closest('.todo-lists-delDate__delList')){
        let id = e.target.id;
        localTodos = localTodos.filter((i) => i.id !== Number(id));
        localStorage.setItem('localTodos' , JSON.stringify(localTodos));
        all.textContent = `All: ${localTodos.length}`;
        allComplete = localTodos.filter((item) => item.isChecked === true).length;
        generateList();
    }
}

const done = (e) => {
    if (e.target.closest('.todo-lists__done')){
        let id = e.target.id;
        for (let i of localTodos){
            if (i.id === Number(id)) {
                i.isChecked = true;
            }
        }
    }
    localStorage.setItem('localTodos' , JSON.stringify(localTodos));
    generateList();
    console.log(12)
}

let getName = () => {
    if (localStorage.length){
        localTodos = JSON.parse(localStorage.getItem('localTodos'));
        itemId = localTodos.length;
        generateList();
    }
};


showCompleted.addEventListener("click", ()=>{
    let check = lists.getElementsByTagName("div");
    for (let i = check.length - 1; i >= 0; i--){
        if (check[i].className === "todo-lists"){
            check[i].style.display = "none";
        }}
});

showAll.addEventListener("click", ()=>{
    let check = lists.getElementsByTagName("div");
    for (let i of check){
        i.style.display = "flex";
    };
});


document.addEventListener('keydown', eventHandler);
add.addEventListener("click", setName);
window.addEventListener('DOMContentLoaded', getName());
document.querySelector('.root-container-lists').addEventListener('click', done);
document.querySelector('.root-container-lists').addEventListener('click', delList);
delLast.addEventListener("click", deleteLast);
delAll.addEventListener("click", deleteAll);
search.addEventListener("input", searchList);

