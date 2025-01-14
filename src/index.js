const buttonCreateTask = document.querySelector("#create-task-button")
const taskList = document.querySelector(".tasks")
const taskListElement = ((task) => {
    const li = document.createElement("li")
    li.classList.add("bg-color")
    li.innerHTML= `${task.name}`
    
    li.id = "task-" + task.id
    li.classList.add("task")
    if(task.status === "done"){
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
    name
    description
    priority
    status
    created
    deadline
    constructor(lastId, name = "Task", description = "Description", priority = 2, status = "do", date = Date(), deadline = null){
        this.id = lastId,
        this.name = name,
        this.description = description,
        this.priority = priority,
        this.status = status,
        this.created = date,
        this.deadline = deadline
    }

    addTask(){
        tasks.push(this)
        setData("tasks", tasks)
        renderForm()
    }
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
    showCreateWindow()
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
    
    const id = taskElement.id.replace("task-", "")
    showEditWindow(id)
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

const showCreateWindow = () => {
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
    deadlineTaskP.innerHTML = "Кінцевий термін"
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

    const hide =  showModal(mainForm)


    createTaskButton.addEventListener("click", () => {
        const name = nameTaskInput.value.trim()
        const description = descriptionTaskTextarea.value.trim()
        const priority = priorityTaskSelect.value 
        const status = "do" 
        const created = new Date()
        const deadline = deadlineTaskInput.value

        if(!name||!description||!priority||!status||!created||!deadline){
            return
        }
        console.log(created, deadline)
        const task = new Task(getLastId(), name, description, priority, status, created, deadline)    
        task.addTask()
        hide()
    })
}

function getTaskById(id){
    return tasks.find((task) => task.id === parseInt(id))
}

const showEditWindow = (elementId) => {
    const task = getTaskById(elementId)
    const elementsInputData = []


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
    nameTaskInput.setAttribute("disabled", "")
    nameTaskInput.setAttribute("required", "")
    nameTaskInput.value = task.name
    elementsInputData.push(nameTaskInput)
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
    descriptionTaskTextarea.setAttribute("disabled", "")
    descriptionTaskTextarea.value = task.description
    elementsInputData.push(descriptionTaskTextarea)    
    descriptionTaskDiv.append(descriptionTaskP)
    descriptionTaskDiv.append(descriptionTaskTextarea)


    const priorityTaskDiv = document.createElement("div")
    const priorityTaskP = document.createElement("p")
    priorityTaskP.innerHTML = "Пріоритет задачі"
    const priorityTaskSelect = document.createElement("select")
    priorityTaskSelect.id = "add-task-select"
    priorityTaskSelect.name = "task-priority"
    priorityTaskSelect.setAttribute("required", "")
    priorityTaskSelect.setAttribute("disabled", "")

    let prioritysArray = [{text: "Високий пріоритет", value: 3}, {text: "Середній пріоритет", value: 2}, {text: "Низький пріорітет", value: 1}]
    prioritysArray.forEach((element) => {
        const option = document.createElement("option")
        option.text = element.text
        option.value = element.value
        priorityTaskSelect.append(option)
    })

    priorityTaskSelect.value = task.priority
    elementsInputData.push(priorityTaskSelect)
    priorityTaskDiv.append(priorityTaskP)
    priorityTaskDiv.append(priorityTaskSelect)

    const deadlineTaskDiv = document.createElement("div")
    const deadlineTaskP = document.createElement("p")
    deadlineTaskP.innerHTML = "Кінцевий термін"
    const deadlineTaskInput = document.createElement("input")
    deadlineTaskInput.type = "datetime-local"
    deadlineTaskInput.id = "task-datetime"
    deadlineTaskInput.setAttribute("disabled", "")
    deadlineTaskInput.value = task.deadline
    elementsInputData.push(deadlineTaskInput)
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

    const hide =  showModal(mainForm)

    createTaskButton.addEventListener("click", () => {
        elementsInputData.forEach((element) => element.removeAttribute("disabled"))
    })
}

renderFilter()
renderForm()