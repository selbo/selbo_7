var mraa = require("mraa"); //require mraa
var WebSocket = require('ws');

var ws = new WebSocket('ws://echo.websocket.org');
//var ws = new WebSocket('ws://104.198.196.211:8000');
ws.on('open', function open() {
    var jsonString='{"cmd": "led2", "data": 1 }';
        ws.send(jsonString);
    
});



// var mraa = require("mraa"); //require mraa

var pwm3 = new mraa.Pwm(3); 
pwm3.enable(true);
pwm3.period_us(2000);
pwm3.write(0);

var pwm5 = new mraa.Pwm(5); 
pwm5.enable(true);
pwm5.period_us(2000);
pwm5.write(0.0); 

var pwm6 = new mraa.Pwm(6); 
pwm6.enable(true);
pwm6.period_us(2000);
pwm6.write(0.0);

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
    

   
    if (json.cmd == "led1") {
      pwm3.enable(true);
      pwm3.period_us(2000);
      pwm3.write(json.data); 
    }
    else{
      pwm3.enable(true);
      pwm3.period_us(2000);
      pwm3.write(0.0);
    }
    
    
   if (json.cmd == "led2") {
      pwm5.enable(true);
      pwm5.period_us(2000);
      pwm5.write(json.data); 
    }
    else{
      pwm5.enable(false);
      pwm5.period_us(2000);
      pwm5.write(0.0);
    } 
    
    
  if (json.cmd == "led3") {
      pwm6.enable(true);
      pwm6.period_us(2000);
      pwm6.write(json.data); 
    }
    else{
      pwm6.enable(false);
      pwm6.period_us(2000);
      pwm6.write(0.0);
    }


    
    console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

 
    
    
var myDigitalPin8 = new mraa.Gpio(8); //setup digital read on Digital pin #6 (D6)
myDigitalPin8.dir(mraa.DIR_IN); //set the gpio direction to input

var analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
var analogPin1 = new mraa.Aio(1); //setup access analog input Analog pin #0 (A0)

    
    
periodicActivity(); //call the periodicActivity function

function periodicActivity() //
{
  var myDigitalValue =  myDigitalPin8.read(); //read the digital value of the pin
  console.log('Gpio is ' + myDigitalValue); //write the read value out to the console
  setTimeout(periodicActivity,1000); //call the indicated function after 1 second (1000 milliseconds)
   
    
var analogValue0 = analogPin0.read(); //read the value of the analog pin
    

    
console.log(analogValue0); //write the value of the analog pin to the console


var analogValue1 = analogPin1.read(); //read the value of the analog pin
console.log(analogValue1); //write the value of the analog pin to the console
}
    //myOnboardLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
    //data.value = ledState;
    //io.emit('toogle led', data);
    //ledState = !ledState; //invert the ledState
});