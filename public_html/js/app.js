(function($) {
    
    $(document).ready(function() {
        
        var socket = io.connect('http://localhost:9000');
        
        $('.btn').click(function(e) {
            
            var action = $(this).attr('data-bind');
            
            socket.emit(action);
            e.preventDefault();
            
        });
        
    });    

})(jQuery);
