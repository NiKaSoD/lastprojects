const formCreateTask = document.querySelector("#new-task-form")
const buttonCreateTask = document.querySelector("#add-task-button")
const taskList = document.querySelector(".task")
const taskListElement = ((task) => {
    const li = document.createElement("li")
    li.classList.add("bg-color")
    li.innerHTML= `${task.text}`
    
    
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

const tasks = getData("tasks", [])

let filter = getData("filter", null)

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

function addTask(task){
    tasks.push(task)
    setData("tasks", tasks)
    renderForm()
}

buttonCreateTask.addEventListener("click", () =>{
    const text = (new FormData(formCreateTask)).get("task-name")

    if(!text){
        return
    }

    const lastId = getData("lastTaskId", 0) + 1
    setData("lastTaskId", lastId)

    const task = {
        id: lastId,
        text: text,
        status: "do",
        created: Date()
    }
    
    addTask(task)
   
    document.querySelector("#add-task-input").value = ""
})

formFilter.addEventListener("change", (event) => {
    filter = event.target.value || null
    setData("filter", filter)
    
    renderForm()
});


renderFilter()
renderForm()




// setData("filter", null)

