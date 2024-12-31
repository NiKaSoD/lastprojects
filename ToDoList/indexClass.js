const formCreateTask = document.querySelector("#new-task-form")
const buttonCreateTask = document.querySelector("#add-task-button")
const taskList = document.querySelector(".tasks")
const taskListElement = ((task) => {
    const li = document.createElement("li")
    li.classList.add("bg-color")
    li.innerHTML= `${task.text}`
    
    li.id = "task-" + task.id
    li.classList.add("task")
    if(task.status == "done"){
        li.classList.add("done")
    }
    return li
})
const formFilter = document.querySelector(".filter-task-form")


function setData(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}

function getData(key, defaultValue = null){
    const dataValue = localStorage.getItem(key)

    if(!dataValue){
        setData(key, defaultValue)
        return defaultValue
    }
    return JSON.parse(dataValue)
}

function getLastId(){
    const lastId  = getData("lastTaskId", 0) + 1
    setData("lastTaskId", lastId)
    return lastId
}

const tasks = getData("tasks", [])

let filter = getData("filter", null)

class Task{
    id
    text
    status
    created
    constructor(lastId = null, text = "", status = "do", date = Date()){
        this.id = lastId,
        this.text = text, 
        this.status = status,
        this.created = date
    }

    addTask(){
        tasks.push(this)
        setData("tasks", tasks)
        renderForm()
    }

    //просмотреть как сделать редактирование таска и его удаление
}

function renderForm() {
    taskList.innerHTML = ""
    
    let filteredTasks = []


    if(filter){
        filteredTasks = tasks.filter((task) => {
            return task.status === filter
        })
    }else{
        filteredTasks = tasks
    }

    filteredTasks.forEach((task) => taskList.append(taskListElement(task)))
}

function renderFilter(){
    const filterSelector = filter === null ? "" : filter

    const selectedButton = document.querySelector(`input[name="filter"][value="${filterSelector}"]`)
    
    if(selectedButton){
        selectedButton.checked = true
    }
    else{
        console.log("smth went wrong")
    }
}

buttonCreateTask.addEventListener("click", () =>{
    const text = (new FormData(formCreateTask)).get("task-name")

    if(!text){
        return
    }

    const task = new Task(getLastId(), text)    
    task.addTask()

    document.querySelector("#add-task-input").value = ""
})

formFilter.addEventListener("change", (event) => {
    filter = event.target.value || null
    setData("filter", filter)
    
    renderForm()
});

taskList.addEventListener("click", (event) => {
    const taskElement = event.target.closest(".task")
    if(!taskElement) {
        return
    }

    showModal(taskElement)
})

const showModal = (...content) => {
    const contentBlock = document.createElement("div")
    contentBlock.classList.add("modal-content")
    contentBlock.addEventListener("click", (e) => {
        e.stopPropagation()
    })
    contentBlock.append(...content)

    const container = document.createElement("div")
    container.classList.add("modal-container")
    container.append(contentBlock)

    const hideModal = () => {
        container.parentElement.removeChild(container)
    }

    container.addEventListener("click", hideModal)

    document.body.append(container)

    return hideModal
}


renderFilter()
renderForm()
