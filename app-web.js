var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public_html'));
 
app.get('/', function(req, res) {
    
    res.sendFile(__dirname + '/public_html/index.html');
    
});
 
module.exports = {
    app: app
};
