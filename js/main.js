const form = document.querySelector('#form');
const taskInput= document.querySelector('#taskInput');
const tasksList =document.querySelector('#tasksList');
const emptyList =document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task) {
    renderTask(task)
})

checkEmptyList();

form.addEventListener('submit',addTask)

tasksList.addEventListener('click', deleteTask)

tasksList.addEventListener('click', doneTask)



function addTask (event){
    event.preventDefault();


    const  taskTeskt =taskInput.value

    const newTasks= {
        id: Date.now(),
        text: taskTeskt,
        done: false,
    };

    tasks.push(newTasks)
    saveToLocalStorage()

    renderTask(task)

    taskInput.value= ""
    taskInput.focus()


    checkEmptyList()
}

function deleteTask(event){
    if (event.target.dataset.action !== 'delete'){
        return
    }

       const parentNode = event.target.closest('.list-group-item')

    const id = Number(parentNode.id);

    tasks = tasks.filter( (task) => task.id !== id )

    saveToLocalStorage()

    parentNode.remove()


    checkEmptyList()
}

function doneTask(event){
if (event.target.dataset.action !== "done") return;

    const parentNode = event.target.closest('.list-group-item');

    const id =Number(parentNode.id);

   const task = tasks.find(function (task){
        if (task.id === id){
            return true
        }
    })

    task.done = !task.done

    saveToLocalStorage()

    const taskTitele = parentNode.querySelector('.task-title')
    taskTitele.classList.toggle('task-title--done')
}

function checkEmptyList(){
    if (tasks.length === 0){
        const emptyListHTML= `<li id="emptyList" class="list-group-item empty-list">
\t\t\t\t\t<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
\t\t\t\t\t<div class="empty-list__title">Список справ пустий</div>
\t\t\t\t</li>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }

    if (tasks.length > 0){
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const cssClass = task.done ? 'task-title task-title --done' : 'task-title';

    const taskHTML= `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
\t\t\t\t\t<span class="${cssClass}">${task.text}</span>
\t\t\t\t\t<div class="task-item__buttons">
\t\t\t\t\t\t<button type="button" data-action="done" class="btn-action">
\t\t\t\t\t\t\t<img src="./img/tick.svg" alt="Done" width="18" height="18">
\t\t\t\t\t\t</button>
\t\t\t\t\t\t<button type="button" data-action="delete" class="btn-action">
\t\t\t\t\t\t\t<img src="./img/cross.svg" alt="Done" width="18" height="18">
\t\t\t\t\t\t</button>
\t\t\t\t\t</div>
\t\t\t\t</li>`


    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}