export const done = (e) => (startInfo, generateList) => {
    if (e.target.closest('.todo-lists__done')){
        for (let i of startInfo.localTodos){
            if (i.id === Number(e.target.id)) {
                i.isChecked = true;
            }
        }
    }
    localStorage.setItem('localTodos' , JSON.stringify(startInfo.localTodos));
    generateList();
}