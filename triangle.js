var gl;
var points;

var newTheta = 0.0;
var theta;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    let star = [
        [0, 0.5],
        [-0.5, -0.25],
        [0.5, -0.25],
        [0, -0.5],
        [-0.5, 0.25],
        [0.5, 0.25],
    ].map(x => [x[0] / 6, x[1] / 6])

    let verticlesArray = [];

    for (let x = 0; x < 20; x++) {
        let p = x / 20 * 2 * Math.PI;
        let a = Math.sin(p);
        let b = Math.cos(p);
        let s = star.map(x => [x[0] + a / 1.2, x[1] + b / 1.2]);

        verticlesArray = [...verticlesArray, ...s];

    }

    var reducedArray = verticlesArray
        .reduce((acc, x) => [...acc, ...x], [])
        ;

    var vertices = new Float32Array(reducedArray);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.1, 0.2, 0.7, 0.4);
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);
    var vP = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vP, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vP);
    theta = gl.getUniformLocation(program, "theta");
    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    newTheta += 0.1;
    gl.uniform1f(theta, newTheta);
    gl.drawArrays(gl.TRIANGLES, 0, 3 * 2 * 20);
    
    window.requestAnimFrame(render);
}
