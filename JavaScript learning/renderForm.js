const formConfig = {
  title: "Login form",
  fields: [
    {
      class: "red-bg",
      idFor: "username",
      label: {
        textContent: "Username: ",
      },
      input: {
        name: "username",
        type: "text",
        required: true,
        placeholder: "hi",
      },
    },
    {
      idFor: "password",
      label: {
        textContent: "Password: ",
      },
      input: {
        name: "password",
        type: "password",
        required: true,
        value: 12123,
      }
    },
    {
      idFor: "email",
      label: {
        textContent: "Email: ",
      },
      input: {
        name: "email",
        type: "email",
        required: true,
      }
    },
    {
      label: {},
      input: {
        value: "Get test alert",
        type: "button",
        onclick: "testAlert()",
      }
    },
  ]
}

function checkElement(element, text){
  if(!element){
    alert(`we need ${text} in formConfig`);
    return false;
  }
  else{
    return true;
  }
}

function testAlert(){
  alert("test");
}

function render(){
  const ourForm = document.createElement("form");
  
  //title set text
  if(checkElement(formConfig.title, "title")){
    const title = document.createElement("h3");
    title.textContent=formConfig.title
    ourForm.appendChild(title);
  }
  
  //create new elements
  formConfig.fields.forEach((field, idx) => {
    if(!checkElement(field.input, `input for ${idx+1} element`)){
      return false;
    }
    if(!checkElement(field.label, `label for ${idx+1} element`)){
      return false;
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