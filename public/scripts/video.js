var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d')
var image = document.getElementById('source');

vendURL = window.URL || window.webkitURL;
navigator.getUserMedia =    navigator.getUserMedia ||
                            navigator.oGetUserMedia ||
                            navigator.msGetUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia;

if(navigator.getUserMedia){
    navigator.getUserMedia({video: true}, streamCam, throwErr);
}

function streamCam(stream){
    video.src = window.URL.createObjectURL(stream);
    video.play();
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
}

function throwErr(e){
    alert(e.name);
}


/***********************/


var lengthBetweenCapture = 1 * 1000* 60 * 60; // how long till next capture
var fequencyOfCaptures = 2 * 1000; //seconds between photos
var amountOfPhotos = 100; // amount of photos to capture
var counter = 0;
// the capture function
var capture = function () {    
    counter = counter + 1;
    if(counter < amountOfPhotos){  // do we need more images?
        // only create timer events as needed.
        setTimeout(capture, fequencyOfCaptures); //set time till next image
    }
    // context.drawImage(this, 0, 0);
    context.drawImage(canvas, 0, 0, 300, 227, 0, 0, 300, 227);


    // context.drawImage(video, 0, 0, video.width, video.height, 0, 0, canvas.width, canvas.height);
    // var image = document.getElementById("imagen");
    // imagen.href = canvas.toDataURL("image/png");
    // imagen.download = filename + ".png"; // Make sure the browser downloads the image
    // imagen.click(); // Trigger the click
}

function captures() {
    // request next batch of captures by only creating one timer event as we need
    setTimeout(captures,lengthBetweenCapture);
    counter = 0; // reset counter
    capture(); // capture timages
}

// start captures.
captures();

