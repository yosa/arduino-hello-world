(function($) {
    
    $(document).ready(function() {
        
        var socket = io.connect('http://localhost:9000');
        
        $('.btn').click(function(e) {
            
            var action = $(this).attr('data-bind');
            
            socket.emit(action);
            e.preventDefault();
            
        });
        
        $('#btnInicio').click(function(e) {
            
            socket.emit('led:reloj', {
                horaInicio: $('#horaInicio').val(),
                minutoInicio: $('#minutoInicio').val(),
                horaFin: $('#horaFin').val(),
                minutoFin: $('#minutoFin').val()
            });
            
            e.preventDefault();
            
        });
        
    });    

})(jQuery);
