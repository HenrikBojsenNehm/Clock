//the clock mecanisem
function runClock() {
    var now = new Date()
    var hour = now.getHours() % 12
    var min = now.getMinutes()
    var sec = now.getSeconds()
    var week = now.getDay()
    var weekDay
    var day = new Date();
    document.getElementById("day").innerHTML = day.getDate()
    //if the day is less than or equel to 9 write a 0 in front of it
    if (day.getDate() <= 9) {
        document.getElementById("day").innerHTML = "0".concat(day.getDate())
    }

    var month = new Date();
    document.getElementById("month").innerHTML = month.getMonth() + 1
    //if the month is less than or equel to 9 write a 0 in front of it    
    if (month.getMonth() + 1 <= 9) {
        document.getElementById("month").innerHTML = "0".concat(month.getMonth() + 1)  
    }

    var clock = document.querySelector("div.clock")
    var hourHand = clock.querySelector("div.hour")
    var minHand = clock.querySelector("div.min")
    var secHand = clock.querySelector("div.sec")

    
    //what day is it
    if (week == 1) {
       weekDay = "Mon." 
    }
    else if (week == 2) {
        weekDay = "Tue."
    }
    else if (week == 3) {
        weekDay = "Wed."
    }
    else if (week == 4) {
        weekDay = "Thu."
    }
    else if (week == 5) {
        weekDay = "Fri."
    }
    else if (week == 6) {
        weekDay = "Sat."
    }
    else if (week == 0) {
        weekDay = "Sun."
    }

    document.getElementById("weekday").innerHTML = weekDay


    //rotation of the clocks arms
    var secRotation = (sec / 60) * 360;
    var minRotation = (min / 60) * 360 + (secRotation / 60);
    var hourRotation = (hour / 12) * 360 + (minRotation / 12);


    hourHand.style.transform = "rotate(" + hourRotation + "deg)"
    minHand.style.transform = "rotate(" + minRotation + "deg)"
    secHand.style.transform = "rotate(" + secRotation + "deg)"

    requestAnimationFrame(runClock)
}


//digital watch
function runDigi() {
    var digi = new Date();
    var digiH = document.getElementById("wh").innerHTML = digi.getHours()
    var digiM = document.getElementById("wm").innerHTML = digi.getMinutes()
    var digiS = document.getElementById("ws").innerHTML = digi.getSeconds()

    if (digiH.toString().length < 2) {
        digiH = document.getElementById("wh").innerHTML = "0".concat(digi.getHours())
    }
    if (digiM.toString().length < 2) {
        digim = document.getElementById("wm").innerHTML = "0".concat(digi.getMinutes())
    }
    if (digiS.toString().length < 2) {
        digiS = document.getElementById("ws").innerHTML = "0".concat(digi.getSeconds())
    }

    requestAnimationFrame(runDigi)
}

runClock()
runDigi()