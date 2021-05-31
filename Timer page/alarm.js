//all my variabels
var ahAdd = document.getElementById("ahadd");
var amAdd = document.getElementById("amadd");
var aHours = document.getElementById("ahour");
var aMinutes = document.getElementById("amin");
var ahSub = document.getElementById("ahsub");
var amSub = document.getElementById("amsub");
var addAalarm = document.getElementById("aa");
var clearOne = document.getElementById("aco");
var clearAll = document.getElementById("aca");
var muteAll = document.getElementById("muteAll");
var mute = document.getElementById("mute");
var at = document.getElementsByClassName('at');
var i = 0;
var m = 0;
var checkNum = 0;
var soundNum = 0;
var hours = [];
var minutes = [];
var alarm = [];
var shift = 0;
var AHours = 0;
var AMinutes = 0;
var alarmNum = 0;
var totalMute = 0;
var audio = new Audio ('sweep.mp3');
audio.volume = 0.1;
var checkInterval
var audioInterval


checkInterval = setInterval(check, 100);


//check if the alarm should run
function check() {
    var now = new Date();
    var nowHours = now.getHours();
    var nowMinutes = now.getMinutes();
    if (hours[checkNum] == nowHours && minutes[checkNum] == nowMinutes) {
        soundNum = 1;
        sound();
        delete alarm[checkNum]
        delete hours[checkNum]
        delete minutes[checkNum]
    }
    else {
        soundNum = 0;
    }
    if (checkNum <= 9) {
        checkNum++;
    }
    else {
        checkNum = 0;
    }
}


//alarm
function sound() {   
    //if it's not in total mute play the alarm evry 2.1 seconds
    if (soundNum == 1 && totalMute == 0) {
        audioInterval = setInterval(playSound, 2100);
        soundNum = 1
    }
    //else dont play the alarm
    else if (totalMute == 1) {
        clearInterval(audioInterval);
    }
}

//the sound that is played
function playSound() {
    audio.play();
}


//formatting
function update() {
    aHours.textContent = (AHours > 9 ? AHours : "0" + AHours);
    aMinutes.textContent = (AMinutes > 9 ? AMinutes : "0" + AMinutes);
};

//check if shift is pressd
document.addEventListener('keydown', function(event1) {
    if (event1.shiftKey) {
        shift = 1;
    }
});

//release shift
document.addEventListener('keyup', function() {
    shift = 0;
});

//add hours
function addHours() {
    //if hours is above or equel to 23 set hours to 0
    if (AHours >= 23) {
        AHours = 0;
        update();
    }
    //else add 1 to hours
    else {
        AHours++;
        update();
    }
};

//add minutes
function addMinutes() {
    //if minutes is above or equel to 59 set minutes to 0 and check hours
    if (AMinutes >= 59) {
        AMinutes = 0;
        update();
        //if hours is above or equel to 23 set hours to 0
        if (AHours >= 23) {
            AHours = 0;
            update();
        }
        //else add 1 to hours
        else {
            AHours++;
            update();
        }
    }
    //else add 1 to minutes
    else {
        AMinutes++;
        update();
    }
};

//subtract hours
function subHours() {
    //if hours is bellow or equel to 0 set hours to 23 and check minutes
    if (AHours <= 0) {
        AHours = 23;
        update();
        //if minutes is bellow or equel to 0 set minutes to 59
        if (AMinutes <= 0) {
            AMinutes = 59;
            update();
        }
        //else subtract 1 from minutes
        else {
            AMinutes--;
            update();
        }
    }
    //else subtract 1 from hours
    else {
        AHours--;
        update();
    }
};

//subtract minutes
function subMinutes() {
    //if minutes is bellow or equel to 0 set minutes to 59 and check hours
    if (AMinutes <= 0) {
        AMinutes = 59;
        update();
        //if hours is bellow or equel to 0 set hours to 23
        if (AHours <= 0) {
            AHours = 23;
            update();
        }
        //else subtract 1 from hours
        else {
            AHours--;
            update();
        }
    }
    //else subtract 1 from hours
    else {
        AMinutes--;
        update();
    }
};


//add alarm
function aa() {
    if (i < alarmNum) {
        i++;
        aa();
    }
    else if (i == 1) {
        hours[i] = AHours;
        minutes[i] = AMinutes;
        alarm[i] = document.getElementById("a" + alarmNum).textContent = (hours[i] > 9 ? hours[i] : "0" + hours[i]) + " : " + (minutes[i] > 9 ? minutes[i] : "0" + minutes[i]);
    }
    else if (i == alarmNum && i > 1) {
        if (AHours != hours[1] && AHours != hours[2] && AHours != hours[3] && AHours != hours[4] && AHours != hours[5] && AHours != hours[6] && AHours != hours[7] && AHours != hours[8] && AHours != hours[9] && AHours != hours[10] || AMinutes != minutes[1] && AMinutes != minutes[2] && AMinutes != minutes[3] && AMinutes != minutes[4] && AMinutes != minutes[5] && AMinutes != minutes[6] && AMinutes != minutes[7] && AMinutes != minutes[8] && AMinutes != minutes[9] && AMinutes != minutes[10]) {
            hours[i] = AHours;
            minutes[i] = AMinutes;
            alarm[i] = document.getElementById("a" + alarmNum).textContent = (hours[i] > 9 ? hours[i] : "0" + hours[i]) + " : " + (minutes[i] > 9 ? minutes[i] : "0" + minutes[i]);
        }
        else {
            alarmNum--;
            i--;
            console.log("Du kan ikke have flere af de samme alamer...")
        }
    }
};


//delete one alarm
function s1a() {
    if (i > alarmNum) {
        alarm[i] = document.getElementById("a" + i).textContent = null;
        delete alarm[i]
        delete hours[i]
        delete minutes[i]
        i--;
    }
};


//deleteall alarms
function saa() {
    if (alarmNum == 0) {
       if (i != 0) {
           alarm[i] = document.getElementById("a" + i).textContent = null;
           delete alarm[i]
           delete hours[i]
           delete minutes[i]
           i--;
           saa();
       }
       else {
           i = 0;
       }
    }
};

//run addHours
ahAdd.addEventListener('mousedown', function() {
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
ahAdd.addEventListener('mouseup', function() {
    clearInterval(addHoursinterval);
});

//run addMinuts
amAdd.addEventListener('mousedown', function() {
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
amAdd.addEventListener('mouseup', function() {
    clearInterval(addMinutesinterval);
});

//run subHours
ahSub.addEventListener('mousedown', function() {
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
ahSub.addEventListener('mouseup', function() {
    clearInterval(subHoursinterval);
});

//run subMinues
amSub.addEventListener('mousedown', function() {
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
amSub.addEventListener('mouseup', function() {
    clearInterval(subMinutesinterval);
});

//add 1 alarm
addAalarm.addEventListener('click', function() {
    //if there is more or equel to 9 alarms dont add a alarm
    if (alarmNum <= 9) {
        alarmNum++;
        aa();
    }
    else {
        return;
    }
});

//delete 1 alarm
clearOne.addEventListener('click', function() {
    //if ther is 1 or more alarms delete the last one
    if (alarmNum >= 1) {
        alarmNum--;
        s1a();
    }
    else {
        return;
    }
});

//delete all alarms
clearAll.addEventListener('click', function() {
    alarmNum = 0;
    saa();
});

//mute all alarms
muteAll.addEventListener('click', function() {
    //if it's not muted mute
    if (totalMute == 0) {
        totalMute = 1;
        soundNum = 0;
        clearInterval(audioInterval);
    }
    //else unmute
    else {
        totalMute = 0;
    }
    console.log(totalMute)
});

//mute alarm
mute.addEventListener('click', function() {
    clearInterval(audioInterval);
    audio.pause();
    audio.currentTime = 0;
    console.log(audio.currentTime);
});
