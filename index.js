function debounce(func, delay) {
    let timer;

    return function() {
        const args = arguments;
        const scope = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {func.apply(scope, args);}, delay);
    };
}

function setup_canvas(canvas) {
    let dpr = window.devicePixelRatio || 1,
        rect = canvas.getBoundingClientRect();
    let context = canvas.getContext("2d");

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    context.scale(dpr, dpr);

    return context
}

canvas = document.querySelector("#editor");
context = setup_canvas(canvas);


window.addEventListener("resize", () => {
    context = setup_canvas(canvas);
});

function distance(x0, y0, x1, y1) {
    return Math.sqrt((x0 - x1) * (x0 - x1)  + (y0 - y1) * (y0 - y1));
}

class Node {
    constructor(id, radius) {
        this.id = id;
        this.radius = radius;
        this.font = "700 24px Roboto Mono";
        this.x = Math.random() * (canvas.width - 2 * this.radius) + this.radius;
        this.y = Math.random() * (canvas.height - 2 * this.radius) + this.radius;
    }
    
    draw (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.lineWidth = 4;
        context.font = this.font;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(this.id, this.x, this.y);
        context.stroke();
        context.closePath();
    }
    
    update(x, y, context) {
        this.x = x;
        this.y = y;
        this.draw(context);
    }
}

class Graph {
    constructor(adjList = undefined) {
        this.graph = adjList ? {...adjList} : {}; //Create new object using spread operator 
    }
    
    draw_graph(context) {
        for (const key in this.graph) {
            
        }
    }
}

let dummy = new Node(1, 30);

dummy.draw(context);

window.addEventListener("keyup", debounce(() => {
    let input = document.getElementById("graph").value;
    input = input.split(" ");
    adjList = {}
    for (let i = 0; i < input.length; i+=2) {
        if (i + 1 < input.length) break;
        // if (!adjList.input[i]) adjList.input[i] = Array; TODO; Fixme
        // if (!adjList.input[i+1]) adjList.input[i+1] = Array; TODO: Fix me too
    }
}, 200));


document.addEventListener("click", debounce((e) => {
    console.log(e.target, e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop);
}, 200));

