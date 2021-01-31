var inputs = document.querySelectorAll("li p input")
for (let i = 0; i <inputs.length; i++){
    inputs[i].parentElement.parentElement.classList.add('task-list')
    inputs[i].parentElement.parentElement.parentElement.classList.add('task-list-container')
}