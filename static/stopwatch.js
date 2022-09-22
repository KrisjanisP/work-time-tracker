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

function save_entry(entryId) {
    console.log("save "+entryId)
    
}

function delete_entry(entryId) {
    console.log("delete "+entryId);
}

var mainContainer = document.getElementById('main-container');

function append_entry(entry) {
    console.log(entry.id);
    mainContainer.innerHTML += `
        <div id="entry-${entry.id}" class="input-group mb-3">
            <div class="form-control flex-grow-0 w-auto">
                Elapsed: ${milliseconds_to_miliary(entry.elapsed)}
            </div>
            <span type="text" class="form-control">
                ${entry.desc}
            </span>
            <span class="form-control flex-grow-0 w-auto">
                ${entry.work}
            </span>
            <button id="edit-entry-${entry.id}" onclick="edit_entry(${entry.id})" type="button" class="btn btn-secondary">
                Edit <i class="bi bi-pencil"></i>
            </button>
        </div>
        <div id="entry-${entry.id}" class="input-group mb-3">
            <input type="text" class="form-control" value="34:00:21">
            <input type="text" class="form-control" value="${entry.desc}">
            </input>
            <select id="selected-work" class="form-select flex-grow-0 w-auto">
                <option value="LU MII">LU MII</option>
                <option value="LU MD">LU MD</option>
                <option value="PPS">PPS</option>
            </select>
            <button id="save-entry-${entry.id}" onclick="save_entry(${entry.id})" type="button" class="btn btn-primary">
                Save <i class="bi bi-save"></i>
            </button>
            <button id="delete-entry-${entry.id}" onclick="delete_entry(${entry.id})" type="button" class="btn btn-danger">
                Delete <i class="bi bi-trash"></i>
            </button    >
        </div>
    `;
}

function displayPrevTasks() {
    tasks = [
        {
            id: 0,
            desc: "12345",
            elapsed: 123441237,
            work: "PPS"
        },
        {
            id: 1,
            desc: "12341231231321235",
            elapsed: 12341237,
            work: "LU"
        },
        {
            id: 2,
            desc: "11231232345",
            elapsed: 1231237,
            work: "MII"
        }
    ]
    for (let entry of tasks) {
        append_entry(entry);
    }
}
for(let i=0;i<1;i++)
    displayPrevTasks();