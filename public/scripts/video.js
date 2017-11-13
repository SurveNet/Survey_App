var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d')

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
    // canvas.drawImage(video, 0, 0);
}
function throwErr(e){
    alert(e.name);
}

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
    context.drawImage(video, 0, 0, 400, 400);
    var image = document.getElementById("imagen");
    imagen.href = canvas.toDataURL("image/png");

    var now = new Date();
    var filename = formatNumber(now.getHours()) + "-" + formatNumber(now.getMinutes()) + "-" + formatNumber(now.getSeconds());

    // imagen.download = filename + ".png"; // Make sure the browser downloads the image
    // imagen.click(); // Trigger the click

    // var img = document.getElementById("img").src=filename + ".png";

}

function captures() {
    // request next batch of captures by only creating one timer event as we need
    setTimeout(captures,lengthBetweenCapture);
    counter = 0; // reset counter
    capture(); // capture timages
}

// start captures.
captures();

