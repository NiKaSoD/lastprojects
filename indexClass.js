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
    // const text = (new FormData(formCreateTask)).get("task-name")

    // if(!text){
    //     return
    // }

    // const task = new Task(getLastId(), text)    
    // task.addTask()


    showCreateWindow()
    // document.querySelector("#add-task-input").value = ""
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

const showCreateWindow = (element) => {
    const mainForm = document.createElement("form")
    mainForm.classList.add("modal-create-form")

    const nameTaskDiv = document.createElement("div")
    const nameTaskP = document.createElement("p")
    nameTaskP.innerHTML = "Назва задачі"
    const nameTaskInput = document.createElement("input")
    nameTaskInput.placeholder = "Введіть назву задачі"
    nameTaskInput.id = "add-task-input"
    nameTaskInput.name = "task-name"
    nameTaskInput.autocomplete = "off"
    nameTaskInput.setAttribute("required", "")

    nameTaskDiv.append(nameTaskP)
    nameTaskDiv.append(nameTaskInput)


    const descriptionTaskDiv = document.createElement("div")
    const descriptionTaskP = document.createElement("p")
    descriptionTaskP.innerHTML = "Опис задачі"
    const descriptionTaskTextarea = document.createElement("textarea")
    descriptionTaskTextarea.placeholder = "Введіть опис задачі"
    descriptionTaskTextarea.id = "add-task-textarea"
    descriptionTaskTextarea.name = "task-description"
    descriptionTaskTextarea.autocomplete = "off"
    descriptionTaskTextarea.setAttribute("required", "")

    descriptionTaskDiv.append(descriptionTaskP)
    descriptionTaskDiv.append(descriptionTaskTextarea)


    const priorityTaskDiv = document.createElement("div")
    const priorityTaskP = document.createElement("p")
    priorityTaskP.innerHTML = "Пріоритет задачі"
    const priorityTaskSelect = document.createElement("select")
    priorityTaskSelect.id = "add-task-select"
    priorityTaskSelect.name = "task-priority"
    priorityTaskSelect.setAttribute("required", "")

    let prioritysArray = [{text: "Високий пріоритет", value: 3}, {text: "Середній пріоритет", value: 2}, {text: "Низький пріорітет", value: 1}]
    prioritysArray.forEach((element) => {
        const option = document.createElement("option")
        option.text = element.text
        option.value = element.value
        priorityTaskSelect.append(option)
    })
    priorityTaskSelect.value = "2"
    
    priorityTaskDiv.append(priorityTaskP)
    priorityTaskDiv.append(priorityTaskSelect)

    
    const deadlineTaskDiv = document.createElement("div")
    const deadlineTaskP = document.createElement("p")
    deadlineTaskP.innerHTML = "Пріоритет задачі"
    const deadlineTaskInput = document.createElement("input")
    deadlineTaskInput.type = "datetime-local"
    deadlineTaskInput.id = "task-datetime"
    
    deadlineTaskDiv.append(deadlineTaskP)
    deadlineTaskDiv.append(deadlineTaskInput)

    
    const createTaskDiv = document.createElement("div")
    const createTaskButton = document.createElement("input")
    createTaskButton.type = "button"
    createTaskButton.value = "Додати нову задачу"
    createTaskButton.id = "add-task-button"
    
    createTaskDiv.append(createTaskButton)


    mainForm.append(nameTaskDiv)
    mainForm.append(descriptionTaskDiv)
    mainForm.append(priorityTaskDiv)
    mainForm.append(deadlineTaskDiv)
    mainForm.append(createTaskDiv)

    showModal(mainForm)
}


renderFilter()
renderForm()
