export const deleteLast = (localTodos, generateList) => {
    localTodos.pop();
    localStorage.setItem('localTodos' , JSON.stringify(localTodos));
    generateList();
}