$(document).ready(function() {
    
    var socket = io();

    $('form').submit(function() {
        var msg = $('#m').val();
        if (msg.trim()) {
            socket.emit('chat-message', msg);
            $('#m').val('');            
        }        
        return false;
    });

    socket.on('chat-message', function(msg) {
        msg = msg.replace('\n', '</br>');
        $('#messages').append($('<li>').html(msg));
        $("html, body").stop().animate({ scrollTop: $(document).height() }, 1000);
    });

    $('textarea').keyup(function(e) {
        if (e.keyCode === 13 && !e.shiftKey && $('#m').val().trim()) {
            $('form').submit();
        }
    });

    $(window).resize(function() {
        
    });
});

