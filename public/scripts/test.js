
document.getElementById("testbutton").onclick = doSomething;

function doSomething(){

    const app = require('../../app.js');    
    console.log(typeof app);
    app.predict;
}


