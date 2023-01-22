export const showAllList = (lists) => {
    let check = lists.getElementsByTagName("div");
    for (let i of check){
        i.style.display = "flex";
    };
};