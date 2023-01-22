const  setName = (input, startInfo, dateNow, generateList ) =>{
    if (input.value === ""){
        return;
    };
    console.log()
    startInfo.itemId++;
    const listInfo = {
        id: startInfo.itemId,
        date: dateNow(),
        text: input.value,
        isChecked: false
    };
    input.value = '';
    startInfo.localTodos.push(listInfo);
    localStorage.setItem('localTodos' , JSON.stringify(startInfo.localTodos));
    generateList();
};

export { setName }