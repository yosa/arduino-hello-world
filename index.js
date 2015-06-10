/* sudo usermod -a -G dialout <username>
sudo chmod a+rw /dev/ttyACM0

*/

var five = require('johnny-five'),
    board = new five.Board(),
    
    appWeb = require('./app-web').app,
    httpServer = require('http').createServer(appWeb),
    io = require('socket.io').listen(httpServer);

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
        
    }); 

});
