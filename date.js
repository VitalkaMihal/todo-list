export const dateNow = () => {
    let date = new Date();
    return date.getDate() + "." + (Number(date.getMonth()) +1 )  + "." + date.getFullYear();
}