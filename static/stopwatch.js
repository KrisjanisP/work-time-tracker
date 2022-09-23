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

var started = false, startedDate;
var paused = false, pausedDate, pausedTime = 0;
var intervalId;

function upd_elapsed_time() {
    let time = new Date() - startedDate - pausedTime;
    let timeText = milliseconds_to_miliary(time);
    document.getElementById("time-elapsed").innerText = timeText;
    document.getElementById("time-elapsed").textContent = timeText;
}

function start_sw() {
    let inactiveInput = document.getElementById('inactive-input');
    let activeInput = document.getElementById('active-input');

    startedDate = new Date();
    intervalId = setInterval(upd_elapsed_time,1000)
    inactiveInput.classList.add('d-none');
    activeInput.classList.remove('d-none');
    pausedTime = 0;
}

function pause_sw() {
    let pauseBtn = document.getElementById('pause-sw-btn');
    let unpauseBtn = document.getElementById('unpause-sw-btn');
    
    pausedDate = new Date();
    pauseBtn.classList.add('d-none');
    unpauseBtn.classList.remove('d-none');
    clearInterval(intervalId);
}

function unpause_sw() {
    let pauseBtn = document.getElementById('pause-sw-btn');
    let unpauseBtn = document.getElementById('unpause-sw-btn');
        
    pauseBtn.classList.remove('d-none');
    unpauseBtn.classList.add('d-none');
    pausedTime += new Date() - pausedDate;
    intervalId = setInterval(upd_elapsed_time,1000);
}

function stop_sw() {
    let inactiveInput = document.getElementById('inactive-input');
    let activeInput = document.getElementById('active-input');

    document.getElementById("time-elapsed").innerText = "00:00:00";
    document.getElementById("time-elapsed").textContent = "00:00:00";
    clearInterval(intervalId);

    inactiveInput.classList.remove('d-none');
    activeInput.classList.add('d-none');
}

function edit_entry(entryId) {
    console.log("edit "+entryId)
    var entrySaveBtn = document.getElementById('save-entry-'+entryId);
    var entryEditBtn = document.getElementById('edit-entry-'+entryId)
    var entryDeleteBtn = document.getElementById('delete-entry-'+entryId);

    entryEditBtn.classList.add('d-none');
    entrySaveBtn.classList.remove('d-none');
    entryDeleteBtn.classList.remove('d-none');
}

var mainContainer = document.getElementById('main-container');

function stopwatch_entry(props) {
    return {
        $template: '#entry-template',
        time: props.time,
        started: 21342123,
        before: "4 days",
        desc: "1234",
        work: "PPS",
        hello: () => {alert("IT WORKS");}
    }
}

function edit_sw_entry(props) {
    return {
        $template: '#edit-template',
        time: "11:22:33",
        started: "2022-09-22T17:26",
        desc: props.desc
    }
}

function sw_history(props) {
    return {
        entries: [
            {
                $template: '#entry-template',
                time: 213,
                started: 21342123,
                before: "4 days",
                desc: "1234",
                work: "PPS",
                hello: () => {alert("IT WORKS");}
            },
            {
                $template: '#entry-template',
                time: 213,
                started: 21342123,
                before: "4 days",
                desc: "1234",
                work: "PPS",
                hello: () => {alert("IT WORKS");}
            }
        ]
    }
}