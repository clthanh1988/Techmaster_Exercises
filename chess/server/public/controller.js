const socket = io('http://localhost:4000');

socket.on('server-send-loginFail', function() {
    alert('Sai User name. Co nguoi da dang ki voi ten nay !!!');
})

socket.on('server-send-loginSuccess', function(data) {
    $('#currentUser').html(data);
    $('#loginForm').hide(2000);
    $('#chatForm').show(1000);

})

socket.on('server-send-usersList', function(data) {
    $('#boxContent').html('');
    data.forEach(function(i) {
        $('#boxContent').append('<div class="user">' + i + '</div>');
    })

})

socket.on('server-send-mess', function(data) {
    $('#listMessages').append('<div class="msg">' + data.userName + ': ' + data.mess + '</div>')


})

socket.on('someone-typing', function(data){
    $('#notification').html('<img width="20" src="giphy.gif">' + data);
})

socket.on('someone-stop-typing', function(){
    $('#notification').html('');
})

$(document).ready(function () {
    // alert('Hello Jquery')
    // $('#mrA').click(function () {

    //   // alert(1);
    //   socket.emit('Client-send-data', 'Hello')

    // })

    // alert(1);
    $('#loginForm').show();
    $('#chatForm').hide();

    $('#btnRegister').click(function() {
        socket.emit('client-send-userName', $('#userName').val())

    })
    $('#btnSendMessage').click(function() {
        socket.emit('client-send-mess', $('#txtMessage').val());
        
       


    })
    $('#btnLogout').click(function() {
        socket.emit('client-logout');
        
        $('#chatForm').hide(2000);
        $('#loginForm').show(1000);


    })

    $('#txtMessage').focusin(function() {
        socket.emit('client-typing')
    })
    $('#txtMessage').focusout(function() {
        socket.emit('client-not-typing')
    })





  })