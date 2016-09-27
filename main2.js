var mraa = require("mraa"); //require mraa

function init()
{
    //Initialize PWM on Digital Pin #3 (D3) and enable the pwm pin
    var pwm3 = new mraa.Pwm(3);
    pwm3.enable(true);

}
function set_led(led, fade, on_time, off_time){
    
}
var main_interval_ms=10; 
function main_loop()
{
    //get message 
    //convert message to kled params 
    //set led params 
}

function run()
{
    init();
    setInterval(main_loop,main_interval_ms);
}
run();