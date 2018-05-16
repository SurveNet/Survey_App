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
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

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

var perAngry = 0.0
var perFear = 0.0
var perHappy = 0.0
var perNeutral = 0.0
var perSad = 0.0
var perSuprise = 0.0

var numFear=0
var numAngry = 0
var numHappy = 0
var numNeutral = 0
var numSuprise = 0
var numSad = 0
var total = 0

console.log("TESTING")

function record(){
  /** Initialise timing variables **/
  var lengthBetweenCapture = 2 * 1000* 60 * 60; // how long till next capture
  var fequencyOfCaptures = 1 * 1000; //seconds between photos
  var amountOfPhotos = 100; // amount of photos to capture
  var counter = 0;

  var capture = function () {    
    counter = counter + 1;
    if(counter < amountOfPhotos){ 
        setTimeout(capture, fequencyOfCaptures); //set time till next image
        document.getElementById('snap-count').innerHTML = "Snapshot: " + counter.toString();
        ctx.drawImage(video, rectX+ 120, rectY +100, rect_width +80,  rect_height +60, 0, 0, 200, 150);
          
        var canvasObj = document.getElementById('c2')
        var image = canvasObj.toDataURL();

        $.ajax({
            type: "POST",
            // url: "http://127.0.0.1:5000/api",  // Change this if not testing locally
            url: "https://servable.herokuapp.com/api",
            data: image, 
            success: function(data){
                    console.log(data)

                    if(data == 'x'){
                        numFear++  
                        document.getElementById('detected').innerHTML = "Emotion Detected: " + data;
                    }
                    else if(data == 'Angry'){
                        numAngry++
                        document.getElementById('detected').innerHTML = "Emotion Detected: " + data;
                    }
                    else if(data == 'Happy'){
                        numHappy++
                        document.getElementById('detected').innerHTML = "Emotion Detected: " + data;
                    }
                    else if(data == 'Fear'){
                        numNeutral++
                        document.getElementById('detected').innerHTML = "Emotion Detected: " + 'Neutral';
                    }
                    else if(data == 'Sad'){
                        numSad++
                        document.getElementById('detected').innerHTML = "Emotion Detected: " + data;
                    }
                    else{
                        numSuprise++
                    }
                 }
            });
            total  = numAngry + numFear + numHappy + numNeutral + numSad + numSuprise

           
            if(isNaN(perAngry) || isNaN(perHappy) || isNaN(perFear) || isNaN(perNeutral) || isNaN(perSad) || isNaN(perSuprise)){
                perAngry = 0;
                perHappy = 0;
                perFear = 0;
                perSad = 0;
                perSuprise = 0;
                perNeutral = 0;
            }


            // Change percentages of emotions detected after every image
            document.getElementById('angry').innerHTML = "Anger: " + perAngry + "%";
            document.getElementById('fear').innerHTML = "Fear: " + perFear + "%";
            document.getElementById('happy').innerHTML = "Happiness: " + perHappy + "%";
            document.getElementById('neutral').innerHTML = "Neutral: " + perNeutral + "%";
            document.getElementById('sad').innerHTML = "Sadness: " + perSad + "%";
            document.getElementById('suprise').innerHTML = "Surprise: " + perSuprise + "%";

            perAngry = Math.floor((numAngry/total) * 100);
            perFear = Math.floor((numFear / total) * 100);
            perHappy = Math.floor((numHappy / total) * 100);
            perNeutral = Math.floor((numNeutral / total) * 100);
            perSad = Math.floor((numSad / total) * 100);
            perSuprise =Math.floor((numSuprise / total) * 100);

            if(counter > 4 && perHappy < 40){
                document.getElementById('check').src = '../examples/assets/close.png'
            }
            else if (counter > 4 && perHappy > 40 || perAngry == NaN){
                document.getElementById('check').src = '../examples/assets/check.png'
            }
        }
        if(counter+1 > amountOfPhotos){

            if(perHappy < 40){
                alert("You gave bad customer service\nHappiness level was "+ perHappy+ "%");
                location.reload();
            }else{
                alert("You gave good customer service\nHappiness level was " + perHappy +"%");
                location.reload();
            }
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







