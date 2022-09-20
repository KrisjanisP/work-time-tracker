function showTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s ;
    
    document.getElementById("digital-clock").innerText = time;
    document.getElementById("digital-clock").textContent = time;

    setTimeout(showTime, 1000);

}

showTime();

let started = false;

function toggleStopwatch() {
    btn = document.getElementById('stopwatch-btn')
    work_select = document.getElementById('selected-work');
    curr_work = document.getElementById('current-work');
    task_desc = document.getElementById('task-description');

    if(started) {
        // STOP the stopwatch
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-success');
        btn.innerText = "Start";

        // show work selector
        work_select.classList.remove('d-none');
        // hide current work
        curr_work.classList.add('d-none');

        task_desc.readOnly = false;

        started = false;
    } else {
        // START the stopwatch
        btn.classList.remove('btn-success');
        btn.classList.add('btn-danger');
        btn.innerText = "Stop ";

        // hide work selector
        work_select.classList.add('d-none');

        // show current work
        curr_work.classList.remove('d-none');
        curr_work.innerText = work_select.value;

        task_desc.readOnly = true;
        started = true;
    }
}
