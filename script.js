import  { dateNow } from './date.js';
import { deleteAll } from './delAll.js';
import { setName } from './setName.js';
import { showAllList } from './showAll.js';
import { showDone } from './showDone.js';
import { deleteLast } from './delLast.js';
import { searchList } from './search.js';
import { delList } from './delList.js';
import { done } from './done.js';
import { getName } from './getName.js';

let startInfo = {
    itemId: 0,
    localTodos: []
};

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


const generateList = () => {
    lists.innerHTML = '';
    for ( let i of startInfo.localTodos) {
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
        all.textContent = `All: ${startInfo.localTodos.length}`;
        complete.textContent = `Completed: ${startInfo.localTodos.filter((item) => item.isChecked === true).length}`;
    };

    function eventHandler(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            setName(input, startInfo, dateNow, generateList);
            search.value = "";
        }
    };

const searchParams = {
    todo, 
    search,
}

showAll.addEventListener("click", ()=> showAllList(lists));
document.addEventListener('keydown', eventHandler);
add.addEventListener("click",() => setName(input, startInfo, dateNow, generateList ));
window.addEventListener('DOMContentLoaded',() => getName(startInfo, generateList));
document.querySelector('.root-container-lists').addEventListener('click', (e) => done(e)(startInfo, generateList));
document.querySelector('.root-container-lists').addEventListener('click',(e) => delList(e)(startInfo, generateList));
delLast.addEventListener("click",() => deleteLast(startInfo.localTodos, generateList));
delAll.addEventListener("click", () => deleteAll(generateList, startInfo.localTodos));
search.addEventListener("input",() => searchList(searchParams));
showCompleted.addEventListener("click", () => showDone(lists));

