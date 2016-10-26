var mraa = require("mraa"); //require mraa
var WebSocket = require('ws');

//var ws = new WebSocket('ws://echo.websocket.org');
var ws = null;
var connect_interval=3000; 
var ON_OFF = 0.0 ;

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

function send(command,data_)
{
    if (ws==null)
        return;
    if (ws.readyState!=1)//we are connected 
        {
            console.log("Cant send ...s");
            return;
        }
    var d={};
    d.cmd=command;
    d.data=data_;
    ws.send(JSON.stringify(d));
}

var restart_limit=5; 
var restart_counter=restart_limit;
function connect(){
   // console.log("connection hard beat");
    
   // console.log("connection attempt:%s",ws.readyState);
    if (ws!=null)
    {
        console.log("connection attempt:%s",ws.readyState);
        if (ws.readyState==1)//we are connected 
        {
            console.log("Connection success");
            restart_counter=restart_limit;
            return;
        }
        if (ws.readyState==0)//we are connected 
        {
            restart_counter-=1;
            console.log("prepare to reconnect");
            setTimeout(connect,3000);
            console.log("get out reconnect");
            if (restart_counter!=0)
                {
                     return;
                    
                }
           restart_counter=restart_limit;
        }
    }
    ws = new WebSocket('ws://104.198.196.211:8000');
    ws.on('open', function open() {
        /*if (ON_OFF == 0.0){
            console.log("send led is on");
            var ledStringon='{"cmd": "led_status", "status": "on"}';
            ws.send(ledStringon);
        }
        else{
            console.log("send led is off");
            var ledStringooff='{"cmd": "led_status", "status": "off"}';
            ws.send(ledStringoff);
        }*/
        
    //var jsonString='{"cmd": "led", "data": "on"}';
     //   ws.send(jsonString);
      console.log("Connection open");
    });
 //   console.log("Connection after open");
    ws.on('close', function open() {
        console.log("connection closed:%s",ws.readyState);
        connect()

     });
    console.log("Connection before on msg");
    ws.on('message',on_message); 
 //   console.log("Connection after message"); 
    
    
    setTimeout(connect,connect_interval);
//    console.log("Connection after connect back");
}


function on_message(data, flags) {
// console.log("inside on_msg");  
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

   console.log("Connection after msg recv");
  if (json.cmd == "led"){
    if (json.data == "on") {
            ON_OFF = 1.0;
       //     send("led_status","off");
            console.log("send led is closed");
        }
        else{
            ON_OFF = 0.0;
      //      send("led_status","on");
            console.log("send led is closed");
        }
  }
    
    if (json.cmd == "led") {
        /*
        if (json.data == "on") {
            ON_OFF = 1.0;
            send("led_status","on")
        }
        else{
            ON_OFF = 0.0;
            send("led_status","off")
        }
       */ 
      pwm3.enable(true);
      pwm3.period_us(2000);
      pwm3.write(1.0); 
    }
//    else{
//      pwm3.enable(true);
//      pwm3.period_us(2000);
//      pwm3.write(0.0);
//    }
    
    
   if (json.cmd == "led") {
       /*
       if (json.data == "on") {
            ON_OFF = 1.0;
        }
        else{
            ON_OFF = 0.0;
        }
       */
      pwm5.enable(true);
      pwm5.period_us(2000);
      pwm5.write(ON_OFF); 
    }
 //   else{
 //     pwm5.enable(false);
 //     pwm5.period_us(2000);
 //     pwm5.write(0.0);
//    } 
    
    
  if (json.cmd == "led") {
      /*
      if (json.data == "on") {
            ON_OFF = 1.0;
        }
        else{
            ON_OFF = 0.0;
        }
      */
      pwm6.enable(true);
      pwm6.period_us(2000);
      pwm6.write(ON_OFF); 
    }
 //   else{
  //    pwm6.enable(false);
 //     pwm6.period_us(2000);
 //     pwm6.write(0.0);
 //   }

    
    if (json.cmd == "led") {
        if (json.data == "on") {
           // ON_OFF = 1.0;
            console.log("send led is closed");
        //    send("led_status","off");
            setTimeout(send("led_status","on"),10000);
            
        }
        else{
            //ON_OFF = 0.0;
            console.log("send led is closed");
          //  send("led_status","on");
            setTimeout(send("led_status","off"),10000);
        }
    }
}





// var mraa = require("mraa"); //require mraa

var pwm3 = new mraa.Pwm(3); 
pwm3.enable(true);
pwm3.period_us(2000);
pwm3.write(1.0);

var pwm5 = new mraa.Pwm(5); 
pwm5.enable(true);
pwm5.period_us(2000);
pwm5.write(0.0); 

var pwm6 = new mraa.Pwm(6); 
pwm6.enable(true);
pwm6.period_us(2000);
pwm6.write(0.0);


connect();

// console.log("Connection before msg recv");




    
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

 
    
  /*  
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
*/