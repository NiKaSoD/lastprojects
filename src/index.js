const addNewTaskButton = document.querySelector("#create-task-button")
const taskListContainer = document.querySelector(".tasks")
const filterForm = document.querySelector(".filter-task-form")

const createTaskElement = ((task) => {
    const listItem = document.createElement("li")
    listItem.classList.add("bg-color")
    listItem.innerHTML = `${task.name}`
    
    listItem.id = "task-" + task.id
    listItem.classList.add("task")
    if(task.status === "done"){
        listItem.classList.add("done")
    }

    return listItem
})

function setLocalStorageData(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}

function getLocalStorageData(key, defaultValue = null){
    const storedValue = localStorage.getItem(key)

    if(!storedValue){
        setLocalStorageData(key, defaultValue)
        return defaultValue
    }
    return JSON.parse(storedValue)
}

function generateNewTaskId(){
    const newId = getLocalStorageData("lastTaskId", 0) + 1
    setLocalStorageData("lastTaskId", newId)
    return newId
}

const tasksList = getLocalStorageData("tasks", [])
let activeFilter = getLocalStorageData("filter", null)

class Task {
    constructor(taskId, name = "Task", description = "Description", priority = 2, status = "do", date = new Date().toISOString(), deadline = null) {
        this.id = parseInt(taskId)
        this.name = name
        this.description = description
        this.priority = priority
        this.status = status
        this.created = date
        this.deadline = deadline
    }
    
    save() {
        tasksList.push(this)
        setLocalStorageData("tasks", tasksList)
        renderTasksList()
    }

    update(name, description, priority, deadline) {
        this.name = name
        this.description = description
        this.priority = priority
        this.deadline = deadline
        
        setLocalStorageData("tasks", tasksList)
        renderTasksList()
    }
}

function renderTasksList() {
    taskListContainer.innerHTML = ""
    
    let tasksToShow = []

    if(activeFilter){
        tasksToShow = tasksList.filter((task) => {
            return task.status === activeFilter
        })
    }else{
        tasksToShow = tasksList
    }

    tasksToShow.forEach((task) => taskListContainer.append(createTaskElement(task)))
}

function renderActiveFilter(){
    const filterValue = activeFilter === null ? "" : activeFilter
    const selectedFilterButton = document.querySelector(`input[name="filter"][value="${filterValue}"]`)
    
    if(selectedFilterButton){
        selectedFilterButton.checked = true
    }
    else{
        console.log("Filter selection error")
    }
}

const showModal = (...content) => {
    const modalContent = document.createElement("div")
    modalContent.classList.add("modal-content")
    modalContent.addEventListener("mousedown", (e) => {
        e.stopPropagation()
    })
    modalContent.append(...content)

    const modalContainer = document.createElement("div")
    modalContainer.classList.add("modal-container")
    modalContainer.append(modalContent)

    const closeModal = () => {
        modalContainer.parentElement.removeChild(modalContainer)
    }

    modalContainer.addEventListener("mousedown", closeModal)
    document.body.append(modalContainer)

    return closeModal
}

function createInputField(labelText, type = "text", isRequired = true, placeholder = "") {
    const containerDiv = document.createElement("div")
    const label = document.createElement("p")
    label.innerHTML = labelText
    
    const input = document.createElement("input")
    input.type = type
    if (placeholder) input.placeholder = placeholder
    if (isRequired) input.setAttribute("required", "")
    input.setAttribute("disabled", "")
    
    containerDiv.append(label, input)
    return { containerDiv, input }
}

function createTextArea(labelText, isRequired = true, placeholder = "") {
    const containerDiv = document.createElement("div")
    const label = document.createElement("p")
    label.innerHTML = labelText
    
    const textarea = document.createElement("textarea")
    if (placeholder) textarea.placeholder = placeholder
    if (isRequired) textarea.setAttribute("required", "")
    textarea.setAttribute("disabled", "")
    textarea.id = "task-description"
    
    containerDiv.append(label, textarea)
    return { containerDiv, textarea }
}

function createPrioritySelect(labelText, selectedValue = "2") {
    const containerDiv = document.createElement("div")
    const label = document.createElement("p")
    label.innerHTML = labelText
    
    const select = document.createElement("select")
    select.setAttribute("required", "")
    select.setAttribute("disabled", "")

    const priorities = [
        {text: "Високий пріоритет", value: "3"},
        {text: "Середній пріоритет", value: "2"},
        {text: "Низький пріоритет", value: "1"}
    ]
    
    priorities.forEach(({text, value}) => {
        const option = document.createElement("option")
        option.text = text
        option.value = value
        select.append(option)
    })
    
    select.value = selectedValue
    
    containerDiv.append(label, select)
    return { containerDiv, select }
}

const showCreateTaskForm = () => {
    const taskForm = document.createElement("form")
    taskForm.classList.add("modal-form")

    const { containerDiv: nameContainer, input: nameInput } = 
        createInputField("Назва задачі", "text", true, "Введіть назву задачі")
    nameInput.removeAttribute("disabled")

    const { containerDiv: descContainer, textarea: descriptionTextarea } = 
        createTextArea("Опис задачі", true, "Введіть опис задачі")
    descriptionTextarea.removeAttribute("disabled")

    const { containerDiv: priorityContainer, select: prioritySelect } = 
        createPrioritySelect("Пріоритет задачі")
    prioritySelect.removeAttribute("disabled")

    const { containerDiv: deadlineContainer, input: deadlineInput } = 
        createInputField("Крайній срок", "datetime-local", true)
    deadlineInput.removeAttribute("disabled")

    const buttonContainer = document.createElement("div")
    const submitButton = document.createElement("input")
    submitButton.type = "button"
    submitButton.value = "Створити задачу"
    submitButton.className = "form-button"
    buttonContainer.append(submitButton)    


    taskForm.append(
        nameContainer, 
        descContainer, 
        priorityContainer, 
        deadlineContainer, 
        buttonContainer
    )

    const closeModal = showModal(taskForm)

    buttonContainer.addEventListener("click", () => {
        const name = nameInput.value.trim()
        const description = descriptionTextarea.value.trim()
        const priority = prioritySelect.value 
        const deadline = deadlineInput.value

        if(!name || !description || !priority || !deadline) {
            return
        }

        const newTask = new Task(generateNewTaskId(), name, description, priority, "do", new Date().toISOString(), deadline)    
        newTask.save()
        closeModal()
    })
}

function findTaskById(id){
    const taskData = tasksList.find((task) => task.id === parseInt(id))
    if (!taskData) return null
    
    const task = new Task(
        taskData.id,
        taskData.name,
        taskData.description,
        taskData.priority,
        taskData.status,
        taskData.created,
        taskData.deadline
    )
    
    const taskIndex = tasksList.findIndex((t) => t.id === parseInt(id))
    if (taskIndex !== -1) {
        tasksList[taskIndex] = task
    }
    
    return task
}

const showTaskDetailsForm = (taskId) => {
    const task = findTaskById(taskId)
    const editableElements = []

    const taskForm = document.createElement("form")
    taskForm.classList.add("modal-form")

    const { containerDiv: nameContainer, input: nameInput } = 
        createInputField("Назва задачі", "text", true)
    nameInput.value = task.name
    editableElements.push(nameInput)

    const { containerDiv: descContainer, textarea: descriptionTextarea } = 
        createTextArea("Опис задачі", true)
    descriptionTextarea.value = task.description
    editableElements.push(descriptionTextarea)

    const { containerDiv: priorityContainer, select: prioritySelect } = 
        createPrioritySelect("Пріоритет задачі", task.priority)
    editableElements.push(prioritySelect)

    const { containerDiv: deadlineContainer, input: deadlineInput } = 
        createInputField("Крайній срок", "datetime-local", true)
    deadlineInput.value = task.deadline
    editableElements.push(deadlineInput)

    const buttonsContainer = document.createElement("div")
    buttonsContainer.style.display = "flex"
    buttonsContainer.style.gap = "10px"
    
    const editButton = document.createElement("input")
    editButton.type = "button"
    editButton.value = "Редагувати"
    editButton.className = "form-button edit-button"
    editButton.style.flex = "1"
    
    const toggleStatusButton = document.createElement("input")
    toggleStatusButton.type = "button"
    toggleStatusButton.value = task.status === "done" ? "Повернути до роботи" : "Відзначити виконаним"
    toggleStatusButton.className = `form-button ${task.status === "done" ? "undone-button" : "done-button"}`
    toggleStatusButton.style.flex = "1"
    
    const deleteButton = document.createElement("input")
    deleteButton.type = "button"
    deleteButton.value = "Видалити"
    deleteButton.className = "form-button delete-button"
    deleteButton.style.flex = "1"

    buttonsContainer.append(toggleStatusButton, editButton, deleteButton)

    taskForm.append(
        nameContainer,
        descContainer,
        priorityContainer,
        deadlineContainer,
        buttonsContainer
    )

    const closeModal = showModal(taskForm)

    editButton.addEventListener("click", () => {
        if(editButton.value === "Редагувати") {
            editableElements.forEach(element => element.removeAttribute("disabled"))
            editButton.value = "Зберегти"
            editButton.className = "form-button save-button"
        } else {
            const name = nameInput.value.trim()
            const description = descriptionTextarea.value.trim()
            const priority = prioritySelect.value
            const deadline = deadlineInput.value

            if(!name || !description || !priority || !deadline) {
                return
            }

            task.update(name, description, priority, deadline)
            closeModal()
        }
    })

    toggleStatusButton.addEventListener("click", () => {
        task.status = task.status === "done" ? "do" : "done"
        setLocalStorageData("tasks", tasksList)
        closeModal()
        renderTasksList()
    })

    deleteButton.addEventListener("click", () => {
        if (confirm("Вы уверены, что хотите удалить эту задачу?")) {
            const taskIndex = tasksList.findIndex(t => t.id === task.id)
            if (taskIndex !== -1) {
                tasksList.splice(taskIndex, 1)
                setLocalStorageData("tasks", tasksList)
                closeModal()
                renderTasksList()
            }
        }
    })
}

addNewTaskButton.addEventListener("click", showCreateTaskForm)

filterForm.addEventListener("change", (event) => {
    activeFilter = event.target.value || null
    setLocalStorageData("filter", activeFilter)
    renderTasksList()
})

taskListContainer.addEventListener("click", (event) => {
    const taskElement = event.target.closest(".task")
    if(!taskElement) return
    
    const taskId = taskElement.id.replace("task-", "")
    showTaskDetailsForm(taskId)
})

renderActiveFilter()
renderTasksList()