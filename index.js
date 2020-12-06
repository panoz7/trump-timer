
const bidenInnaguration = new Date(2021,0,20,12,1);
const trumpInnaugration = new Date(2017,0,20,12,1);

const timeOut = document.getElementById('timeRemaining');
const progressWholeBox = document.getElementById('progress-whole');
const progressPartialBox = document.getElementById('progress-partial');


window.addEventListener('resize', (e) => {
    renderProgress(getPercentageComplete(trumpInnaugration, bidenInnaguration));
})


outputTimeRemaining(bidenInnaguration);
renderProgress(getPercentageComplete(trumpInnaugration, bidenInnaguration));

setInterval(() => {
    outputTimeRemaining(bidenInnaguration);
    renderProgress(getPercentageComplete(trumpInnaugration, bidenInnaguration));
}, 1000)


function renderProgress(percent) {

    const windowArea = window.innerWidth * window.innerHeight;

    const filledPixels = percent * windowArea;
    
    console.log(filledPixels);

    const wholeBoxHeight = Math.floor(filledPixels / window.innerWidth);
    const partialBoxWidth = filledPixels - (wholeBoxHeight * window.innerWidth);

    console.log(partialBoxWidth);

    progressWholeBox.style.height = wholeBoxHeight;


    progressPartialBox.style.width = partialBoxWidth;

}


function outputTimeRemaining(time) {
    const timeUntil = getTimeUntil(time);
    const timeString = `${timeUntil.days}:${timeUntil.hours.toString().padStart(2,0)}:${timeUntil.minutes.toString().padStart(2,0)}:${timeUntil.seconds.toString().padStart(2,0)}`
    timeOut.innerHTML = timeString;
}


function getPercentageComplete(startTime, endTime) {
    const now = new Date();

    const totalTime = endTime.getTime() - startTime.getTime();
    const timeRemaining = endTime.getTime() - now.getTime();

    return 1 - (timeRemaining / totalTime);

}


function getTimeUntil(time) {
    const now = new Date();
    const msToTime = time.getTime() - now.getTime();
    
    return msToDays(msToTime);
}


function msToDays(ms) {
    let remaining = ms;
    
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    remaining -= days * (24 * 60 * 60 * 1000);

    const hours = Math.floor(remaining / (60 * 60 * 1000));
    remaining -= hours * (60 * 60 * 1000);

    const minutes = Math.floor(remaining / (60 * 1000));
    remaining -= minutes * (60 * 1000);

    const seconds = Math.floor(remaining / 1000);

    return {days, hours, minutes, seconds}
}