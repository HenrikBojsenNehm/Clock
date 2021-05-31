//all my variabels
var ttimer = document.getElementById("ttimer");
var thAdd = document.getElementById("thadd");
var tmAdd = document.getElementById("tmadd");
var tsAdd = document.getElementById("tsadd");
var thSub = document.getElementById("thsub");
var tmSub = document.getElementById("tmsub");
var tsSub = document.getElementById("tssub");
var tstartStop = document.getElementById("tss");
var tpause = document.getElementById("tp");
var hours = 0;
var minutes = 0;
var seconds = 0;
var tinterval;
var talertinterval;
var addHoursinterval;
var addMinutesinterval;
var addSecondsinterval;
var subHoursinterval;
var subMinutesinterval;
var subSecondsinterval;
var iah = 0;
var iam = 0;
var ias = 0;
var ish = 0;
var ism = 0;
var iss = 0;
var ctrl = 0;
var shift = 0;
var audio = new Audio ('sweep.mp3');
audio.volume = 0.1;
var isOn = false;

//format the timer
function update() {
    ttimer.textContent = (hours > 9 ? hours : "0" + hours) + " : " + (minutes > 9 ? minutes : "0" + minutes) + " : " + (seconds > 9 ? seconds : "0" + seconds);
};

//run the timer evry second
function interval() {
    tinterval = setInterval(runTimer, 1000);
};

//play the sound evry 2.1 seconds
function alertinterval() {
    talertinterval = setInterval(sound, 2100);
};

//run the timer
function runTimer() {
    seconds--;
    update();
    //if seconds is less than or equel to 0 check minutes
    if (seconds <= 0) {
        //if minutes is less than or equel to 0 check hours
        if (minutes <= 0) {
            //if hours is less than or equel to 0 start alarm
            if (hours <= 0) {
                alert();
            }
            //else subtract 1 from hours and restart minutes and seconds
            else {
                hours--;
                minutes = 59;
                seconds = 59;
                update();
            }
        }     
        //else subtract 1 from minutes and restart seconds     
        else {
            minutes--;
            seconds = 59;
            update();
        }
    }
    //if minutes is less than or equel to 0 check hours
    if (minutes <= 0) {
        //if hours is less than or equel to 0 set hours to 0
        if (hours <= 0) {
            hours = 0;
            update();
        }
        //else subtract 1 from hours and restart minutes and seconds
        else {
            hours--;
            minutes = 59;
            seconds = 59;
            update();
        }
    }
    //if hours is less than or equel to 0 set hours to 0
    if (hours <= 0) {
        hours = 0;
        update();
    }
};

//start the timer
function start() {
    if (!isOn) {
        tstartStop.textContent = "Stop";
        isOn = true;
        interval();
    }
};

//stop the timer and reset it
function stop() {
    if (isOn) {
        tstartStop.textContent = "Start"
        isOn = false;
        clearInterval(tinterval);
        clearInterval(talertinterval);
        ttimer.textContent = "00 : 00 : 00";
        seconds = 0; minutes = 0; hours = 0;
        audio.pause();
        audio.currentTime = 0;
        console.log(audio.currentTime);
    }
};

//the timer is done and will now rest and play the alert
function alert() {
    clearInterval(tinterval);
    ttimer.textContent = "00 : 00 : 00";
    seconds = 0; minutes = 0; hours = 0;
    alertinterval();
};

//play the alert
function sound() {
    audio.play();
};

//pause the timer
function pause() {
    if (isOn) {
        isOn = false;
        tstartStop.textContent = "Start";
        clearInterval(tinterval);
    }
};

//check if spicific keys are pressed
document.addEventListener('keydown', function(event1) {
    //if ctrl is pressd
    if (event1.ctrlKey) {
        ctrl = 1;
    }
    //if shift is pressd
    if (event1.shiftKey) {
        shift = 1;
    }
    //if boath ctrl and shift is pressd (used to stop a bug)
    if (event1.ctrlKey && event1.shiftKey) {
        ctrl = 0;
        shift = 0;
        clearInterval(addHoursinterval);
        clearInterval(addMinutesinterval);
        clearInterval(addSecondsinterval);
        clearInterval(subHoursinterval);
        clearInterval(subMinutesinterval);
        clearInterval(subSecondsinterval);
    }
});


document.addEventListener('keyup', function() {
    ctrl = 0;
    shift = 0;
});

//add hours on the clock
function addHours() {
    //if ctrl is pressd
    if (ctrl == 1 && shift != 1) {
        //if hours is above or equel to 89 set hours to 99
        if (hours >= 89) {
            hours = 99;
            update();
        }
        //else add 10 to hours
        else {
            hours = hours + 10;
            update();
        }
    }
    //if shift is pressd 
    else {
        //if hours is above or equel to 99 set hours yo 99
        if (hours >= 99) {
            hours = 99;
            update();
        }
        //else add 1 to hours
        else {
            hours++;
            update();
        }
    }
};

//add minutes on the clock
function addMinutes() {
    //if ctrl is pressd
    if (ctrl == 1 && shift != 1) {
        //if minutesis above or equl to 49 set minutes to 0 and check hours
        if (minutes >= 49) {
            minutes = 0;
            //if hours is above or equel to 99 set hours to 99
            if (hours >= 99) {
                hours = 99;
                update();
            }
            //else add 1 to hours
            else {
                hours++;
                minutes = 0;
                update();
            }
        }
        //else add 10 to minutes
        else {
            minutes = minutes + 10;
            update();
        }
    }
    //if shift is pressd
    else {
        //if minutes above or equl to 59 set minutes to 0 and check hours
        if (minutes >= 59) {
            minutes = 0;
            //if hours is above or equel to 99 set hours to 99
            if (hours >= 99) {
                hours = 99;
                update();
            }
            //else add 1 to hours
            else {
                hours++;
                minutes = 0;
                update();
            }
        }
        //else add 1 to minutes
        else {
            minutes++;
            update();
        }
    }
};

//add seconds on the timer
function addSeconds() {
    //if ctrl is pressd
    if (ctrl == 1 && shift != 1) {
        //if seconds above or equl to 49 set seconds to 0 and check minutes
        if (seconds >= 49) {
            seconds = 0;
            //if minutes above or equl to 59 set minutes to 0 and check hours
            if (minutes >= 59) {
                minutes = 0;
                //if hours is above or equel to 99 set hours to 99
                if (hours >= 99) {
                    hours = 99;
                    update();
                }
                //else add 1 to hours
                else {
                    hours++;
                    minutes = 0;
                    update();
                }
            }
            //else add 1 to minutes
            else {
                minutes++;
                seconds = 0;
                update();
            }
        }
        //else add 10 to seconds
        else {
            seconds = seconds + 10;
            update();
        }
    }
    //if shift is pressd
    else {
        //if seconds above or equl to 59 set seconds to 0 and check minutes
        if (seconds >= 59) {
            seconds = 0;
            //if minutes above or equl to 59 set minutes to 0 and check hours
            if (minutes >= 59) {
                minutes = 0;
                //if hours is above or equel to 99 set hours to 99
                if (hours >= 99) {
                    hours = 99;
                    update();
                }
                //else add 1 to hours
                else {
                    hours++;
                    minutes = 0;
                    update();
                }
            }
            //else add 1 to minutes
            else {
                minutes++;
                seconds = 0;
                update();
            }
        }
        //else add 1 to seconds
        else {
            seconds++;
            update();
        }
    }
};

//subtract hours form the timer
function subHours() {
    //if ctrl is pressd
    if (ctrl == 1 && shift != 1) {
        //if hours is bellow or equl to 9 set hours to 0 and check minutes
        if (hours <= 9) {
            hours = 0;
            //if minutes is bellow or equel to 9 set minutes to 0 and chek seconds
            if (minutes <= 9) {
                minutes = 0;
                //if secondes is bellow or equel to 9 set seconds to 0
                if (seconds <= 9) {
                    seconds = 0;
                    update();
                }
                //else subtract 10 from seconds
                else {
                    seconds = seconds - 10;
                    update();
                }
            }
            //else subtract 10 form minutes
            else {
                minutes = minutes - 10;
                update();
            }
        }
        //else subtract 10 ffrom hours
        else {
            hours = hours - 10;
            update();
        }
    }
    //if shift is pressd
    else {
        //if hours is bellow or equel to 0 set hours to 0 and check minutes
        if (hours <= 0) {
            hours = 0;
            //if minutes is bllow or equel to 0 set minutes 0 and check seconds
            if (minutes <= 0) {
                minutes = 0;
                //if seconds is bellow or equel to 0 set seconds to 0
                if (seconds <= 0) {
                    seconds = 0;
                    update();
                }
                //else subtract 1 form seconds
                else {
                    seconds--;
                    update();
                }
            }
            //else subtract 1 from minutes
            else {
                minutes--;
                update();
            }
        }
        //else subtract 1 form hours
        else {
            hours--;
            update();
        }
    }
};

//subtract minutes form the timer
function subMinutes() {
    //if ctrl is pressd
    if (ctrl == 1 && shift != 1) {
        //if minutes is bellow or equel to 9 set minutes to 0 and chek seconds
        if (minutes <= 9) {
            minutes = 0;
            //if secondes is bellow or equel to 9 set seconds to 0
            if (seconds <= 9) {
                seconds = 0;
                update();
            }
            //else subtract 10 form seconds
            else {
                seconds = seconds - 10;
                update();
            }
        }
        //else subtract 10 form minutes
        else {
            minutes = minutes - 10;
            update();
        }
    }
    //if shift is pressd
    else {
        //if minutes is bllow or equel to 0 set minutes 0 and check seconds
        if (minutes <= 0) {
            minutes = 0;
            //if seconds is bellow or equel to 0 set seconds to 0
            if (seconds <= 0) {
                seconds = 0;
                update();
            }
            //else subtract 1 form seconds
            else {
                seconds--;
                update();
            }
        }
        //else subtract 1 from minutes
        else {
            minutes--;
            update();
        }
    }
};

//subtract seconds from the timer
function subSeconds() {
    //if ctrl is pressd
    if (ctrl == 1 && shift != 1) {
        //if secondes is bellow or equel to 9 set seconds to 0
        if (seconds <= 9) {
            seconds = 0;
            update();
        }
        //else subtract 10 form seconds
        else {
            seconds = seconds - 10;
            update();
        }
    }
    //if shift is pressd
    else {
        //if seconds is bellow or equel to 0 set seconds to 0
        if (seconds <= 0) {
            seconds = 0;
            update();
        }
        //else subtract 1 form seconds
        else {
            seconds--;
            update();
        }
    }
};

//run addHours
thAdd.addEventListener('mousedown', function() {
    addHours();
    //if shift is pressd run addHours evry 0.075 seconds
    if (shift == 1) {
        addHoursinterval = setInterval(addHours, 75);
    }
    //else run addHours evry 0.25 seconds
    else {
        addHoursinterval = setInterval(addHours, 250);
    }
});

//stop addHours
thAdd.addEventListener('mouseup', function() {
    clearInterval(addHoursinterval);
});

//run addMinuts
tmAdd.addEventListener('mousedown', function() {
    addMinutes();
    //if shift is pressd run addMinuts evry 0.075 seconds
    if (shift == 1) {
        addMinutesinterval = setInterval(addMinutes, 75);
    }
    //else run addMinuts evry 0.25 seconds
    else {
        addMinutesinterval = setInterval(addMinutes, 250);
    }
});

//stop addMinues
tmAdd.addEventListener('mouseup', function() {
    clearInterval(addMinutesinterval);
});

//run addSeconds
tsAdd.addEventListener('mousedown', function() {
    addSeconds();
    //if shift is pressd run addSeconds evry 0.075 seconds
    if (shift == 1) {
        addSecondsinterval = setInterval(addSeconds, 75);
    }
    //else run addSeconds evry 0.25 seconds
    else {
        addSecondsinterval = setInterval(addSeconds, 250);
    }
});

//stop addSeconds
tsAdd.addEventListener('mouseup', function () {
    clearInterval(addSecondsinterval);
});

//run subHours
thSub.addEventListener('mousedown', function() {
    subHours();
    //if shift is pressd run subHours evry 0.075 seconds
    if (shift == 1) {
        subHoursinterval = setInterval(subHours, 75);
    }
    //else run subHours evry 0.25 seconds
    else {
        subHoursinterval = setInterval(subHours, 250);
    }
});

//stop subHours
thSub.addEventListener('mouseup', function () {
    clearInterval(subHoursinterval);
});

//run subMinues
tmSub.addEventListener('mousedown', function() {
    subMinutes();
    //if shift is pressd run subMinutes evry 0.075 seconds
    if (shift == 1) {
        subMinutesinterval = setInterval(subMinutes, 75);
    }
    //else run subMinutes evry 0.25 seconds
    else {
        subMinutesinterval = setInterval(subMinutes, 250);
    }
});

//stop subMinutes
tmSub.addEventListener('mouseup', function() {
    clearInterval(subMinutesinterval);
});

//run subSeconds
tsSub.addEventListener('mousedown', function() {
    subSeconds();
    //if shift is pressd run subSeconds evry 0.075 seconds
    if (shift == 1) {
        subSecondsinterval = setInterval(subSeconds, 75);
    }
    //else run subSeconds evry 0.25 seconds
    else {
        subSecondsinterval = setInterval(subSeconds, 250);
    }
});

//stop subSeconds
tsSub.addEventListener('mouseup', function() {
    clearInterval(subSecondsinterval);
});

//if clicked 'start' run start else run stop
tstartStop.addEventListener('click', function() {
    isOn ? stop() : start();
  });

//if clicked 'pause' run pause
tpause.addEventListener('click', function() {
    pause();
});
