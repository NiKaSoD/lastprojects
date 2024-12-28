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

function getData(key, defaultValue = null){
    const dataValue = localStorage.getItem(key)

    if(!dataValue){
        return defaultValue
    }
    return JSON.parse(dataValue)
}

function setData(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}


const tasks = getData("tasks", [])



function renderForm(filter = null) {
    taskList.innerHTML = ""
    
    let filteredTasks = []
    if(filter){
        filteredTasks = tasks.filter((task) => {

            const task1 = task.status === filter
            console.log(task1)
            return task1
        })
    }else{
        filteredTasks = tasks
        console.log("all")
    }
    
    filteredTasks.forEach((task) => taskList.append(taskListElement(task)))
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

    console.log(getData("tasks"))
    


    document.querySelector("#add-task-input").value = ""
})

setData("filter", null)
let filter = getData("filter")
renderForm(filter)
console.log(getData("filter"))