let count = 0;
let countComplete = 0;


const allTodo = document.getElementById("root");
allTodo.innerHTML ="<div></div>";
const container = allTodo.querySelector("div");
container.classList.add("container");
container.innerHTML = "<div></div>";
const todo = container.getElementsByTagName("div")[0];
todo.classList.add("todo");
todo.innerHTML = "<form></form><form></form>";
const formOne = todo.getElementsByTagName("form")[0];
formOne.classList.add("todoForm");
formOne.innerHTML = `<button type="button">Delete All</button><button type="button">delete Last</button><input type="text" class="input" placeholder="enter todo..."><button type="button">Add</button>`;
const input = formOne.getElementsByClassName("input")[0];
const delAll = formOne.getElementsByTagName("button")[0];
delAll.classList.add("button");
delAll.classList.add("delAll");
const delLast = formOne.getElementsByTagName("button")[1];
delLast.classList.add("button");
delLast.classList.add("delLast");
const add = formOne.querySelectorAll("button")[2];
add.classList.add("button");
add.classList.add("add");
const formTwo = todo.getElementsByTagName("form")[1];
formTwo.innerHTML = 
`<div class="info">
    <div class="all">
        All: 0
    </div>
    <div class="complete">
        Completed: 0
    </div>
</div>
    <form class="search">
        <button class="button showAll" type="button">
            Show All
        </button>
        <button class="button showCompleted" type="button">
            Show Completed
        </button>
        <input class="search" type="text" placeholder="search">
    </form>`;
    const all = document.querySelector(".all");
    const complete = document.querySelector(".complete");
const showAll = formTwo.getElementsByTagName("button")[0];
const showCompleted = formTwo.getElementsByTagName("button")[1];
const search = formTwo.getElementsByTagName("input")[0];

add.addEventListener("click", createList);

function createList(){
    if (input.value === ""){return};
    count++;
    const newList = document.createElement('div');
    newList.classList.add("lists");
    todo.appendChild(newList);
    const done = document.createElement("button");
    done.classList.add("done");
    done.textContent = "Done";
    newList.appendChild(done);
    const text = document.createElement('div');
    text.classList.add("text");
    text.textContent = input.value;
    newList.appendChild(text);
    all.textContent = `All: ${count}`;
    const delDate = document.createElement('div');
    delDate.classList.add("delDate");
    newList.appendChild(delDate);
    const delList = document.createElement("button");
    delList.classList.add("delList");
    delList.textContent = "Del"
    delDate.appendChild(delList);
    const date = document.createElement('div');
    date.classList.add("date");
    date.textContent = new Date().getDate() + "." + +new Date().getMonth() +1  + "." + new Date().getFullYear();
    delDate.appendChild(date);
    input.value = "";
    
    delList.addEventListener("click", ()=>{
        todo.removeChild(newList);
        count--;
        if (done.className === "doneComplete"){
            countComplete--;
            complete.textContent = `Completed: ${countComplete}`;
        }
        all.textContent = `All: ${count}`;
    });

    done.addEventListener("click", ()=>{
        newList.classList.remove("lists");
        newList.classList.add("listsComplete");
        done.classList.remove("done");
        done.classList.add("doneComplete");
        text.classList.remove("text");
        text.classList.add("textComplete");
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
            if (check[i].className === "lists" || check[i].className === "listsComplete"){
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
        if (check[i].className === "lists" || check[i].className === "listsComplete"){
            if (check[i].className === "lists"){
                todo.removeChild(check[i]);
                count--;
                all.textContent = `All: ${count}`;
                break;
            };
            if (check[i].className === "listsComplete"){
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
        if (check[i].className === "lists"){
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
    let check = todo.querySelectorAll(".text");
    let checkComplete = todo.querySelectorAll(".textComplete");
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
