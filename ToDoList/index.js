HTMLElement.prototype.SetAttribute = function (attr, value) {
    this.setAttribute(attr, value);
    return this;
}
HTMLElement.prototype.AddEventListener = function (event, callback) {
    this.addEventListener(event, callback);
    return this;
}
HTMLElement.prototype.AddClass = function (value) {
    this.classList.add(value);
    return this;
}
HTMLElement.prototype.RemoveClass = function (value) {
    this.classList.remove(value);
    return this;
}
HTMLElement.prototype.ToggleClass = function (value) {
    this.classList.toggle(value);
    return this;
}
HTMLElement.prototype.SetInnerHTML = function (value) {
    this.innerHTML = value;
    return this;
}
HTMLElement.prototype.Append = function () {
    this.append(...arguments);
    return this;
}
HTMLElement.prototype.OnClick = function (callback) {
    this.onclick = callback;
    return this;
}
HTMLElement.prototype.OnChange = function (callback) {
    this.onchange = callback;
    return this;
}



// const showModal = (...content) => {
//     const contentBlock = document.createElement("div")
//     .AddClass("modal-content")
//     .AddEventListener("click", (e) => {
//         e.stopPropagation()
//     })
//     .Append(...content)

//     const container = document.createElement("div")
//     .AddClass("modal-container")
//     .Append(contentBlock)

//     const hideModal = () => {
//         container.parentElement.removeChild(container)
//     }

//     container.AddEventListener("click", hideModal)

//     document.body.append(container)

//     return hideModal;
// }

// // showModal("Hello")



const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

const loadData = (key, defaultValue = null) => {
    const storedValue = localStorage.getItem(key);

    if(!storedValue){
        return defaultValue;
    }

    return JSON.parse(storedValue)
}

// const tasls = [
//     {
//         id: 1,
//         title: "Task 1",
//         description: "Do something",
//         status: "ToDo",
//         created: Date.now(),
//         deadline: Date.now()
//     },
//     {
//         id: 2,
//         title: "Task 2",
//         description: "Do something",
//         status: "ToDo",
//         created: Date.now(),
//         deadline: Date.now()
//     },
//     {
//         id: 3,
//         title: "Task 3",
//         description: "Do something",
//         status: "ToDo",
//         created: Date.now(),
//         deadline: Date.now()
//     }
// ]

// const filters = {
//     status: "ToDo",
//     orderBy: ["created", "asc"]
// }

const newTaskTitleInput = document.querySelector("#add-task-input")
const newTaskButton = document.querySelector("#add-task-button")

const taskList = document.querySelector("#task-list")

const taskListElement = (task) => {
    const li = document.createElement("li")
        .AddClass("bg-color")
        .SetInnerHTML(task.title)

    if(task.status == "done"){
        li.AddClass("done")
    }

    return li
}

const tasks = loadData("tasks", [])

const renderList = () => {
    taskList.innerHTML = ""
    tasks.forEach(task => taskList.append(taskListElement(task)))
}

const addTask = (task) => {
    tasks.push(task)
    saveData("tasks", tasks)
    renderList()
}

newTaskButton.addEventListener("click", () => {
    const lastId = loadData("lastTaskId", 0)
    saveData("lastTaskId", lastId + 1)

    const task = {
        id: lastId + 1,
        title: newTaskTitleInput.value,
        description: "NO DESCRIPTION",
        status: "ToDo",
        created: Date.now()
    }

    addTask(task)
})

renderList();


