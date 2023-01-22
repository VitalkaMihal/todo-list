export const delList =  (e) => (startInfo, generateList) => {
    if (e.target.closest('.todo-lists-delDate__delList')){
        startInfo.localTodos = startInfo.localTodos.filter((i) => i.id !== Number(e.target.id));
        localStorage.setItem('localTodos' , JSON.stringify(startInfo.localTodos));
        generateList();
    }
}