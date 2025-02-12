const canvas = document.querySelector("#cnvs")

const width = 400, height = 300

/**
 * @type CanvasRenderingContext2D
 */
const ctx = canvas.getContext("2d")
ctx.translate(0.5, 0.5);

// let mouseX = width/2, mouseY = height/2

// canvas.addEventListener("mousemove", (e)=>{
//     mouseX = e.offsetX
//     mouseY = e.offsetY
// })

// function render() {
//     ctx.clearRect(0, 0, width, height)

//     ctx.fillStyle = "#FF0000"
//     ctx.strokeStyle = "#000000"
//     ctx.strokeWidth = 3

//     ctx.beginPath()
//     ctx.arc(mouseX, mouseY, 30, 0, Math.PI * 2)

//     ctx.fill()
//     ctx.stroke()

//     window.requestAnimationFrame(render, canvas)
// }

// render()

function smthToPlot(x) {
    return x * x
}

ctx.beginPath()
ctx.moveTo(0, height - smthToPlot(0))
for (let i = 1; i < width; i += 1) {
    const x = i
    const y = height - smthToPlot(x / 20)
    ctx.lineTo(x, y)
}

ctx.strokeStyle = "red"
ctx.strokeWidth = 3
ctx.stroke()


function copy(){
    canvas.toBlob(function(blob) {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
    });
}