function HMS_to_military(h,m,s) {
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s ;

    return time;
}

function date_to_military(date) {
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    return HMS_to_military(h,m,s);
}

function milliseconds_to_miliary(milliseconds) {
    let seconds = Math.floor(milliseconds/1000);
    let s = seconds%60;
    seconds -= s;
    let minutes = Math.floor(seconds/60);
    let m = minutes%60;
    minutes -= m;
    let h = Math.floor(minutes/60);
    return HMS_to_military(h,m,s);
}

function show_time() {
    let date = new Date();
    
    let time = date_to_military(date);

    document.getElementById("digital-clock").innerText = time;
    document.getElementById("digital-clock").textContent = time;

    setTimeout(show_time, 1000);

}

show_time();

var started = false;
var startedDate;
var intervalId;

var inactiveInput = document.getElementById('inactive-input');
var activeInput = document.getElementById('active-input');
var pauseBtn = document.getElementById('pause-sw-btn');
var unpauseBtn = document.getElementById('unpause-sw-btn');

function upd_elapsed_time() {
    let time = milliseconds_to_miliary(new Date() - startedDate);
    document.getElementById("time-elapsed").innerText = time;
    document.getElementById("time-elapsed").textContent = time;
}

function start_sw() {
    startedDate = new Date();
    intervalId = setInterval(upd_elapsed_time,1000)
    inactiveInput.classList.add('d-none');
    activeInput.classList.remove('d-none');
}

function pause_sw() {
    pauseBtn.classList.add('d-none');
    unpauseBtn.classList.remove('d-none');
}

function unpause_sw() {
    pauseBtn.classList.remove('d-none');
    unpauseBtn.classList.add('d-none');
}

function stop_sw() {
    document.getElementById("time-elapsed").innerText = "00:00:00";
    document.getElementById("time-elapsed").textContent = "00:00:00";
    clearInterval(intervalId);

    inactiveInput.classList.remove('d-none');
    activeInput.classList.add('d-none');
}
