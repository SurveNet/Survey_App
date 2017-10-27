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
    }
    function throwErr(e){
        alert(e.name);
    }

    function button(){
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
        canvas.drawImage(video, 0, 0);
    }
