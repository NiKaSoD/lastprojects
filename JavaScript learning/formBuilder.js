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
HTMLElement.prototype.SetAttributes = function (config, ignoreKeys = []){
    for(const [key, value] of Object.entries(config)){
        if(!ignoreKeys.includes(key)){
            this.SetAttribute(key, value);
        }
    }
    return this;
}
Object.prototype.has = function(...fields){
    for(const field of fields){
        if(!Object.hasOwn(this, field)){
            return false
        }
    }
    return true
}

const capitalizeFirst = (text) => text.charAt(0).toUpperCase() + text.substring(1)

const defaultFieldConfig = {
    type: "text"
}

class FormBuilder {
    /**
    * @typedef {Object} Elements
    * @property {HTMLElement} parent Parent element for a form
    * @property {HTMLFormElement} form Form element
    */

    /**
     * @type Elements
     */
    e = {}

    
    config = {}

    /**
     * 
     * @param {HTMLElement} parent - Parent element for a form
     * @param {Object} config
     */
    constructor(parent, config) {
        this.config = config

        if(!this.config.has("title")){
            throw Error("Invalid form field config")
        }

        this.e.parent = parent
        this.e.form = document.createElement("form")
            .AddClass("by-builder")
            .Append(
                document.createElement("h3")
                    .SetInnerHTML(config.title),
                ...config.fields.map(c => this.createField(c))
            )

        this.e.parent.append(this.e.form)
    }

    createField(fieldConfig){
        const field = {
            ...defaultFieldConfig,
            ...fieldConfig
        }

        if(!field.has("name")){
            throw Error("Invalid form field config")
        }

        field.id = field.id ?? `field-${field.name}`

        const fieldDiv = document.createElement("div")
            .AddClass("field")    

        if(field.label === true){
            fieldDiv.Append(
                document.createElement("label")
                    .SetInnerHTML(capitalizeFirst(field.name))
                    .SetAttribute("for", field.id)
            )
        } else if(field.label){
            fieldDiv.Append(
                document.createElement("label")
                    .SetInnerHTML(field.label)
                    .SetAttribute("for", field.id)
            )
        }

        if(field.type==="radio"){
            fieldDiv.Append(
                ...field.values.map(v => {
                    let optionConfig = v;
                    if(typeof v === 'string' || v instanceof String){
                        console.log(v)
                        optionConfig = {
                            title: v,
                            value: v
                        }
                    }

                    const optionId = `${field.id}-${optionConfig.value}`;
                    const radio = document.createElement("input")
                        .SetAttribute("type", "radio")
                        .SetAttribute("id", optionId)
                        .SetAttribute("value", optionConfig.value)
                        .SetAttribute("name", field.name)
                    
                    const label = document.createElement("label")
                        .SetInnerHTML(optionConfig.title)
                        .Append(radio)
    
                    return label;
                })
            )   
        } else {
            const input = document.createElement("input")
                .SetAttributes(field, ["label"])
            fieldDiv.Append(input)   
        }             

        return fieldDiv;
    }

}

const testConfig = {
    title: "Test Form",
    fields: [
        {
            name: "email",
            type: "email",
            label: "E-mail"
        },
        {
            name: "password",
            type: "password",
            label: true
        },
        {
            name: "sex",
            type: "radio",
            label: true,
            values: [
                {
                    title: "Female",
                    value: "f"
                },
                "Male"
            ]
        }
    ]
}

const builder = new FormBuilder(document.body, testConfig);