var mraa = require("mraa"); //require mraa
var WebSocket = require('ws');

//var ws = new WebSocket('ws://echo.websocket.org');
var ws = new WebSocket('ws://104.198.196.211:8000');
ws.on('open', function open() {
    var jsonString='{"cmd": "led", "data":"on"}';
        ws.send(jsonString);
    //ws.send(3,1);
});
     var mraa = require("mraa"); //require mraa

     var pwm3 = new mraa.Pwm(3); 
 pwm3.enable(false);
pwm3.period_us(2000);
pwm3.write(0);
ws.on('message', function(data, flags) {
    console.log("received:"+data);
    var json=null;
    try {
           json=JSON.parse(data);
        }
        catch (e) {
           // statements to handle any exceptions
           console.log(e); // pass exception object to error handler
            return;
        }
	
	//json.cmd //led
	//json.data //on/off
    

   
    if (json.cmd == "led") {
      //pwm3.enable(true);
      //pwm3.period_us(2000);
      //pwm3.write(1.0); 
    }
    else{
      pwm3.enable(false);
      pwm3.period_us(2000);
      pwm3.write(0.0);
    }
    
    //myOnboardLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
    //data.value = ledState;
    //io.emit('toogle led', data);
    //ledState = !ledState; //invert the ledState
});