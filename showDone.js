export let showDone = (lists) => {
    let check = lists.getElementsByTagName("div");
    for (let i = check.length - 1; i >= 0; i--){
        if (check[i].className === "todo-lists"){
            check[i].style.display = "none";
        }}
};