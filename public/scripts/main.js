var video;
var canvas;
var context;
var canvas2
var ctx;

var rect_width;
var rect_height;

var rectX = 0 ;
var rectY = 0; ;

var i = 0;


window.onload = function(){
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    canvas2 = document.getElementById('c2');

    context = canvas.getContext('2d');
    ctx = canvas2.getContext('2d');

    distanceAlert = document.getElementById('distance');

    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(.5);
    tracker.setEdgesDensity(0.1);
    tracking.track('#video', tracker, { camera: true });
    tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    event.data.forEach(function(rect) {
        /**Make rectangle ticker**/
        context.beginPath();
        context.moveTo(10, 10);
        context.lineTo(50, 10);
        context.lineWidth = 3;
        context.stroke();

        /** Draw Rectangle and pixel dimensions */
        context.strokeStyle = '#ffff00';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '15px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

        if(i <= 1){
            console.log("Video width: ", video.width)
            console.log("Rect width: ", rect.width)
            console.log("Rect height: ", rect.height)
            console.log("Rect X: ", rect.x)
            console.log("Rect Y: ", rect.y)
            i++;
        }


        if(rect.width && rect.height < 105){
            distanceAlert.innerHTML = "<p style='color:red;'>Please come closer to the camera. Face area: " + rect.width + " X " + rect.height + " </p>" 
        }
        else{
            distanceAlert.innerHTML = '<p>Perfect distance. Face area: ' + rect.width + ' X '  + rect.height + ' </p>'            
        }
            rect_width = rect.width;
            rect_height = rect.height;
            rectX = rect.x;
            rectY = rect.y;
            // ctx.drawImage(video, rect.x + 100, rect.y +100, rect.width +70,  rect.height +50, 0, 0, 100, 100);
        });
    });
}   

function record(){
  /** Initialise timing variables **/
  var lengthBetweenCapture = 1 * 1000* 60 * 60; // how long till next capture
  var fequencyOfCaptures = 1 * 1000; //seconds between photos
  var amountOfPhotos = 100; // amount of photos to capture
  var counter = 0;

  var capture = function () {    
    counter = counter + 1;
    if(counter < amountOfPhotos){ 
        setTimeout(capture, fequencyOfCaptures); //set time till next image
        document.getElementById('snap-count').innerHTML = "Snapshot: " + counter.toString();
        ctx.drawImage(video, rectX+ 100, rectY +90, rect_width +70,  rect_height +50, 0, 0, 300, 150);
      }
    }

    //Recursive function called 
    function captures() {
        // request next batch of captures by only creating one timer event as we need
        setTimeout(captures,lengthBetweenCapture);
        counter = 0; // reset counter
        capture(); // capture timages
    }
    // start capturing
    captures();
}
