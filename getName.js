export const getName = (startInfo, generateList) => {
    if (localStorage.length){
        startInfo.localTodos = JSON.parse(localStorage.getItem('localTodos'));
        startInfo.itemId = startInfo.localTodos[startInfo.localTodos.length -1]?.id ?? 0;
        generateList();
    }
};