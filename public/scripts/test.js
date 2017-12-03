$('#button1').click(function(){
    console.log('button clicked');
    $.ajax({url: 'test1', success:function(res){
        console.log('server response is', res);
    }});
});


