const formConfig = document.querySelector("#custom-config");
const parsedConfig = JSON.parse(formConfig.value);



function checkElement(element, text){
  if(!element){
    alert(`we need ${text} in formConfig`);
    return false;
  }
  
  return true;
}

function testAlert(){
  alert("test");
}

const setAttributes = (elem, config, reservedKeys = []) => {
  Object.entries(config).forEach(([key, value]) => {
    if(!reservedKeys.includes(key)){
      elem.setAttribute(key, value);
    }
  });
}

function render(){
  const ourForm = document.createElement("form");
  
  //title set text
  if(checkElement(parsedConfig.title, "title")){
    const title = document.createElement("h3");
    title.textContent=parsedConfig.title
    ourForm.appendChild(title);
  }
  
  //create new elements
  parsedConfig.fields.forEach((field, idx) => {
    if(!checkElement(field.input, `input for ${idx+1} element`)){
      return;
    }
    if(!checkElement(field.label, `label for ${idx+1} element`)){
      return;
    }

    //create and set div attributes
    const divElement = document.createElement("div");
    Object.entries(field).forEach(([key, value]) => {
      if(key !== "idFor" || key !== "label" || key !== "button"){
        divElement.setAttribute(key, value);
      }
    });

    //create and set label attributes
    const labelElement = document.createElement("label");
    Object.entries(field.label).forEach(([key, value]) => {
      if(key !== "textContent"){
        labelElement.setAttribute(key, value);
      }
    });
    labelElement.textContent = field.label.textContent;
    
    //create and set input attributes
    const inputElement = document.createElement("input");
    Object.entries(field.input).forEach(([key, value]) => {
      inputElement.setAttribute(key, value);
    });
    if(inputElement.hasAttribute("id")){
      labelElement.setAttribute("for", inputElement.getAttribute("id"));
    }
    else if(field.idFor){
      labelElement.setAttribute("for", field.idFor);
      inputElement.setAttribute("id", field.idFor);
    }


    labelElement.appendChild(inputElement);
    divElement.appendChild(labelElement);
    
    
    ourForm.appendChild(divElement);
  });

  document.body.appendChild(ourForm);  
}

render();