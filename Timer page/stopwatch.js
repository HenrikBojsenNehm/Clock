//all my variabels
var watch = document.getElementById('stimer');
var sstartstop = document.getElementById('sss');
var spause = document.getElementById('sp');
var extra = document.getElementById('eh');
var milliseconds = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var eHours = 0;
var ohh = false;
var t;
var isOn = false;

//run the stopwatch
function add() {
    milliseconds++;
    
    //if milliseconds is above or equel to 100 add 1 to seconds and reset milliseconds
    if (milliseconds >= 100) {
        seconds++;
        milliseconds = 0;
    }
    
    //if seconds is above or equel to 60 add 1 to minutes and reset seconds
    if (seconds >= 60) {
        minutes++;
        seconds = 0;
    }
    
    //if minutes is above ro equel to 60 add 1 to hours and reset minutes
    if (minutes >= 60) {
            hours++;
            minutes = 0;
    }

    //if hours is above or equel to 100 add 100 to eHours, show extra and reset hours
    if (hours >= 100) {
        eHours = eHours + 100;
        ohh = true;
        hours = 0;
    }

    //formattin on the watch
    watch.textContent = (hours > 9 ? hours : "0" + hours) + " : " + (minutes > 9 ? minutes : "0" + minutes) + " : " + (seconds > 9 ? seconds : "0" + seconds) + " : " + (milliseconds > 9 ? milliseconds : "0" + milliseconds);
    
    //extra hours
    if (ohh) {
        //extra formatting
        extra.textContent = "Stopur + " + eHours + " extra timer."
    }
}

//run add evry 10 milliseconds
function timer() {
    t = setInterval(add, 10);
}

//start the timer
function start() {
    if (!isOn) {
        sstartstop.textContent = "Stop";
        isOn = true;
        timer();
    }
}

//stop the timer and reset it
function stop() {
    if (isOn) {
        sstartstop.textContent = "Start"
        isOn = false;
        clearInterval(t);
        watch.textContent = "00 : 00 : 00 : 00";
        milliseconds = 0; seconds = 0; minutes = 0; hours = 0;
    }
}

//pause the timer
function pause() {
    if (isOn) {
        isOn = false;
        sstartstop.textContent = "Start";
        clearInterval(t);
    }
}

//if 'start' is pressd run start else run stop
sstartstop.addEventListener('click', function() {
    isOn ? stop() : start();
  });

//run pause
spause.addEventListener('click', function() {
    pause();
});