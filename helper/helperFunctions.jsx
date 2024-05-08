export function captureList(e, addOrRemove) {
    let theList = document.querySelector('.box-content__list')
    if (addOrRemove) {
        theList.classList.add("opacity-visible")
        return;
    }
    theList.classList.remove("opacity-visible")
}

export function handleAlert(message) {
    alert(message);
};
