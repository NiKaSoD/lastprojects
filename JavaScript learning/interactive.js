let slider = document.getElementById("myRange");
let output = document.getElementById("valueSlider");

let modalElement = document.querySelector(".modalWindow");
let modalText = document.querySelector("#modalValue");

let summ;
output.innerHTML = slider.value;

let anecdoteList = ["В ресторане: - Это курица? - Нет, это кушается.",
     "Если сова упадет, то это будет совпадение.", 
     "Штирлиц пытался установить личность. Личность все время падала."];

slider.oninput = function() {
    output.innerHTML = this.value;
    let opacity = this.value/100;
    // console.log(opacity);
    let color = 'rgba(255, 255, 255, ' + opacity +')';
    // console.log(color);
    document.querySelectorAll(".form").forEach(function(element){
        element.style.backgroundColor = color;
        // console.log(element.style.backgroundColor);
    })
}   

function generateTask (){
    
    let minGT = 5, maxGT = 100; 
    let firstValueTest = Math.floor(Math.random() * (maxGT - minGT + 1 )) + minGT;
    let secondValueTest = Math.floor(Math.random() * (maxGT - minGT + 1 )) + minGT;
    summ = firstValueTest + secondValueTest;

    document.querySelector("#firstValueTest").innerHTML = firstValueTest;
    document.querySelector("#secondValueTest").innerHTML = secondValueTest;

    try{
        document.querySelector("#testAnswer").value = null;
        modalElement.removeAttribute("open");
    }catch{
        console.log("can't close modal or set null for inputText");
    }

    
}

function checkResult() {
    testValue = document.querySelector("#testAnswer").value;
    if (parseInt(testValue) === summ){ 
        modalElement.style.boxShadow = "0px 0px 50px 7px var(--bs-modal-window-true)";
    }
    else {
        modalElement.style.boxShadow = "0px 0px 50px 7px var(--bs-modal-window-false)";
    };


    modalText.innerHTML = "Answer " + summ + `<br>${parseInt(testValue)===summ? 'True' : 'False'}` ;
    modalElement.setAttribute("open","");
}

function showAnecdote() {
    let minSA = 0, maxSA = anecdoteList.length-1; 
    let choosedAnecdote = Math.floor(Math.random()*(maxSA - minSA + 1)) + minSA;
    
    anecdoteWindow = document.querySelector(".anecdoteWindow");
    hideAnecdote();
    let p = document.createElement("p");
    anecdoteWindow.append(p);
    p.append(anecdoteList[choosedAnecdote])

}

function hideAnecdote() {
    anecdoteWindow = document.querySelector(".anecdoteWindow");
    try {
        let previousAnecdote = anecdoteWindow.querySelector("p");
        anecdoteWindow.removeChild(previousAnecdote);
    }
    catch{
        console.log("nth to dlt");
    }
}

document.onload(generateTask());