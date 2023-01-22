export const deleteAll = (generateList, localTodos) => {
    localStorage.clear();
    localTodos.length = 0;
    generateList();
};
