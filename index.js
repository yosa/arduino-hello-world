var five = require('johnny-five'),
    board = new five.Board(),
    
    appWeb = require('./app-web').app,
    httpServer = require('http').createServer(appWeb),
    io = require('socket.io').listen(httpServer),
    schedule = require('node-schedule'),
    jobOn,
    jobOff;

board.on('ready', function() {
    
    httpServer.listen(9000);
    
    led = new five.Led(13);
  
    io.sockets.on('connection', function (socket) {
        
        socket.on('led:toggle', function () {
            led.toggle();
        });
        
        socket.on('led:poweroff', function () {
            led.off();
        });
        
        socket.on('led:poweron', function () {
            led.on();
        });
        
        socket.on('led:reloj', function (data) {
            
            if( jobOn) {
                
                jobOn.cancel();
                jobOff.cancel();
                
            }
            
            var date = new Date(),
                age = date.getFullYear(),
                month = date.getMonth(),
                day = date.getDate(),
                dateOn = new Date(
                    age, 
                    month,
                    day,
                    data.horaInicio,
                    data.minutoInicio,
                    0,
                    0),
                dateOff = new Date(
                    age, 
                    month,
                    day,
                    data.horaFin,
                    data.minutoFin,
                    0,
                    0);

            jobOn = schedule.scheduleJob(dateOn, function() {
                
                led.on();
                
            });

            jobOff = schedule.scheduleJob(dateOff, function() {
                
                led.off();
                
            });
            
            
        });
        
    }); 

});
