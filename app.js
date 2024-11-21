document.addEventListener('DOMContentLoaded', ()=> {

//milisecs selectors and counts
const mil_underten = document.querySelector('.miliseconds-below-ten');
const mil_overten = document.querySelector('.miliseconds-over-ten');

let milisecs_count = 0;
let miliseconds_overcount = 0;

//secs selectors and counts
const secs_underten = document.querySelector('.seconds-below-ten');
const secs_overten = document.querySelector('.seconds-over-ten');

let seconds_under_count = 0;
let seconds_over_count = 0;

//mins selectors and counts
const mins_underten = document.querySelector('.mins-below-ten');
const mins_overten = document.querySelector('.mins-over-ten');

let mins_under_count = 0;
let mins_over_count = 0;

//buttons selectors and counts
const start_timer = document.querySelector('.start');
const play_pause = document.querySelector('.play');
const stop_mark = document.querySelector('.stop-watch');


function updateMilisecs() {
    milisecs_count++;
    mil_underten.innerText = milisecs_count;

    if (milisecs_count == 10) {
        milisecs_count = 0;
        mil_underten.innerText = 0;
        if (parseInt(mil_overten.innerText) < 9) {
            miliseconds_overcount++;
            mil_overten.innerText = miliseconds_overcount;
        } else {
            miliseconds_overcount = 0;
            mil_overten.innerText = 0;
        }
    }
}

function updateSeconds() {
    seconds_under_count++;
    secs_underten.innerText = seconds_under_count;

    if (seconds_under_count==10) {
        seconds_under_count = 0;
        secs_underten.innerText = 0;
        if (parseInt(secs_overten.innerText) < 5) {
            seconds_over_count++;
            secs_overten.innerText = seconds_over_count;
        } else {
            secs_overten.innerText = 0;
            seconds_over_count = 0;
        }
    }
}

function updateMinutes() {
    mins_under_count++;
    mins_underten.innerText = mins_under_count;

    if (mins_under_count == 10) {
        mins_under_count = 0;
        mins_underten.innerText = 0;

        if (mins_overten < 5) {
            mins_over_count++;
            mins_overten.innerText = mins_over_count;
        } else {
            mins_over_count = 0;
            mins_overten.innerText = 0;
        }
    }


}

function createTiming() {
    let li = document.createElement('li');
    li.classList.add('timing');
    let span = document.createElement('span');
    span.setAttribute('id','index');
    let div = document.createElement('div');
    div.setAttribute('id', 'recorded-time');

    li.appendChild(span);
    li.appendChild(div);

    return li;
}

let milsecs_interval, seconds_interval, mins_interval;

start_timer.addEventListener('click', ()=>{
    play_pause.classList.remove('hidden');
    stop_mark.classList.remove('hidden');

    start_timer.classList.add('hidden');

    milsecs_interval = setInterval(updateMilisecs, 10);
    seconds_interval = setInterval(updateSeconds, 1000);
    mins_interval = setInterval(updateMinutes, 60000);
})



play_pause.addEventListener('click', ()=>{
    
    if (play_pause.matches('.state-pause')) {

        play_pause.classList.remove('state-pause');
        play_pause.classList.add('state-play');

        stop_mark.classList.remove('state-mark');
        stop_mark.classList.add('state-stop');

        resetTimerIntervals(milsecs_interval, seconds_interval, mins_interval);

    } else if (play_pause.matches('.state-play')){

        play_pause.classList.remove('state-play');
        play_pause.classList.add('state-pause');
        
        stop_mark.classList.remove('state-stop');
        stop_mark.classList.add('state-mark');

        milsecs_interval = setInterval(updateMilisecs, 10);
        seconds_interval = setInterval(updateSeconds, 1000);
        mins_interval = setInterval(updateMinutes, 60000);
        }
    
    });

const timer_container = document.querySelector('.timer-container');
const timings_container = document.querySelector('.timings');
const Minutes = document.querySelector('.mins');
const Seconds = document.querySelector('.seconds');
const Miliseconds = document.querySelector('.miliseconds');

let insertli_index = 0;
stop_mark.addEventListener('click', ()=>{
    if (stop_mark.matches('.state-mark')) {

        if (timer_container.matches('.scaled')) timer_container.classList.remove('scaled');

        let li = createTiming();
        let currentTime = `${Minutes.innerText}${Seconds.innerText}${Miliseconds.innerText}`;
        insertli_index++;
        li.querySelector('#index').innerText = insertli_index;
        li.querySelector('#recorded-time').innerText = currentTime;
        timings_container.appendChild(li);
    } else if (stop_mark.matches('.state-stop')) {

        timer_container.classList.add('scaled');
        timings_container.replaceChildren();
        

        resetTimerIntervals(milsecs_interval, seconds_interval, mins_interval);

        milisecs_count, miliseconds_overcount, seconds_under_count,
        seconds_over_count, mins_under_count, mins_over_count, insertli_index = 0;

        secs_underten.innerText = 0;
        secs_overten.innerText = 0;
        mins_underten.innerText = 0;
        mins_overten.innerText = 0;
        mil_underten.innerText = 0;
        mil_overten.innerText = 0;
    }
});

function resetTimerIntervals(milsecs, seconds, mins){
    clearInterval(milsecs);
    clearInterval(seconds);
    clearInterval(mins);
}


});

