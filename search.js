export const  searchList = ({ todo, search }) => {
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