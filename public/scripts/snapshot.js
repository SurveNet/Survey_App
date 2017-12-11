import { error } from "util";


var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
    
var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

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

function capture() {    
    context.drawImage(video, 0, 0, 2200, 1500, 0, 0, 600, 480);
    var img = null;    
    var canvasObj = document.getElementById("canvas");
    img = canvasObj.toDataURL();

    $.ajax({
        type: "POST",
        url:  "https://model-serve.herokuapp.com/model",
        headers: { 'Access-Control-Allow-Origin': '*' },
        contentType : 'application/json',
        dataType : 'json',
        data: img,
        success: function(data){
            console.log('successful post to model api');
            $('#h3').text('Emotion Detected: '+data);
            console.log('Emotion Detected: ' + data)
        }   
    }).fail(function(xhr, textStatus, errorThrown) {
        if(errorThrown){
            console.log(errorThrown)
        }
    });
}
