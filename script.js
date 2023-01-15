let itemId = 0;
let localTodos = [];


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
    </form>
    <div  class="root-container-lists"></div>`;
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
            if (i.isChecked == false) {
                all.textContent = `All: ${localTodos.length}`;
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
                const allComplete = localTodos.filter((item) => item.isChecked === true).length;
            }
            if (i.isChecked == true) {
                all.textContent = `All: ${localTodos.length}`;
                const allComplete = localTodos.filter((item) => item.isChecked === true).length;
                complete.textContent = `Completed: ${allComplete}`;
                const newList = document.createElement('div');
                newList.classList.add("todo-Complete");
                newList.id = i.id; 
                lists.appendChild(newList);
                const done = document.createElement("button");
                done.classList.add("todo-lists__done-Complete");
                done.textContent = "Done";
                done.id = i.id; 
                newList.appendChild(done);
                const text = document.createElement('div');
                text.classList.add('todo-lists__text-Complete');
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
                newList.id = i.id;
            }
        }
    };

    function eventHandler(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (input.value === ""){return};
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
    document.addEventListener('keydown', eventHandler);

add.addEventListener("click", setName);



function setName(){
    if (input.value === ""){return};
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
    generateList();
    all.textContent = `All: ${localTodos.length}`;
    const allComplete = localTodos.filter((item) => item.isChecked === true).length;
                complete.textContent = `Completed: ${allComplete}`;
};

delAll.addEventListener("click", deleteAll);

const deleteLast = () => {
    localTodos.pop();
    localStorage.setItem('localTodos' , JSON.stringify(localTodos));
    generateList();
    all.textContent = `All: ${localTodos.length}`;
    const allComplete = localTodos.filter((item) => item.isChecked === true).length;
                complete.textContent = `Completed: ${allComplete}`;
}

delLast.addEventListener("click", deleteLast);

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

const delList = (e) => {
    if (e.target.closest('.todo-lists-delDate__delList')){
        let ID = e.target.id;
        console.log(ID)
        localTodos = localTodos.filter((i) => i.id != ID);
        generateList();
        localStorage.setItem('localTodos' , JSON.stringify(localTodos));
        all.textContent = `All: ${localTodos.length}`;
        const allComplete = localTodos.filter((item) => item.isChecked === true).length;
        complete.textContent = `Completed: ${allComplete}`;
    }
}

document.querySelector('.root-container-lists').addEventListener('click', delList);

const done = (e) => {
    if (e.target.closest('.todo-lists__done')){
        let ID = e.target.id;
        for (let i of localTodos){
            if (i.id == ID) {
                i.isChecked = true;
            }
        }
    }
    localStorage.setItem('localTodos' , JSON.stringify(localTodos));
    generateList();
    all.textContent = `All: ${localTodos.length}`;
}

document.querySelector('.root-container-lists').addEventListener('click', done);


let getName = () => {
    if (localStorage.length){
        localTodos = JSON.parse(localStorage.getItem('localTodos')).filter((i) => i);
        itemId = localTodos.length;
        generateList();
    }
};

window.addEventListener('DOMContentLoaded', getName());






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








