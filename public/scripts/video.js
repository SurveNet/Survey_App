(function(){
    var video = getElementById('video'),
    vendURL = window.URL || window.webkitURL;

    navigator.getMedia =    navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia;

    navigator.getMedia({
        video: true, 
        audio: false
    }, function(stream){
        video.src = vendURL.createObjectURL(Stream);
        video.play();
    }, function(error){
        console.log(error);
    });
})();