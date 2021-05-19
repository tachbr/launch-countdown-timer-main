const COUNTDOWNDATE = new Date('June 28, 2021 09:00:00');


function Time(days, hours, minutes, seconds) {
  this.days = days;
  this.hours = hours;
  this.minutes = minutes;
  this.seconds = seconds;
  this.timer;
}

setStartTime();

function setStartTime() {
  const currentDate = new Date();
  let timeDiff = COUNTDOWNDATE - currentDate;

  let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  displayTime('days', days);
  timeDiff = timeDiff - (days * 1000 * 60 * 60 * 24);


  let hours = Math.floor(timeDiff / (1000 * 60 * 60));
  displayTime('hours', hours);
  timeDiff = timeDiff - (hours * 1000 * 60 * 60);


  let minutes = Math.floor(timeDiff / (1000 * 60));
  displayTime('minutes', minutes);
  timeDiff -= (minutes * 1000 * 60);


  let seconds = Math.floor(timeDiff / (1000));
  displayTime('seconds', seconds);

  let countdownTime = new Time(days, hours, minutes, seconds);

  countdownTime.timer = setInterval(function() {
    countdownTime.seconds--;

    update(countdownTime);
  }, 1000);

}



function displayTime(type, amount) {
  let amountString;
  if (amount / 10 < 1) {
    amountString = '0' + amount;
  } else {
    amountString = amount;
  }

  switch(type){
    case('days'):
      $('[data-time="days"]').text(amountString);
      $('[data-time="days"]').addClass('number-opacity');
      $('[data-opacity="days"]').addClass('turn-card');
      setTimeout(function(){
        $('[data-time="days"]').removeClass('number-opacity');
      }, 300);
      setTimeout(function(){
        $('[data-opacity="days"]').removeClass('turn-card');
      }, 500);
      break;
    case('hours'):
      $('[data-time="hours"]').text(amountString);
      $('[data-time="hours"]').addClass('number-opacity');
      $('[data-opacity="hours"]').addClass('turn-card');
      setTimeout(function(){
        $('[data-time="hours"]').removeClass('number-opacity');
      }, 300);
      setTimeout(function(){
        $('[data-opacity="hours"]').removeClass('turn-card');
      }, 500);
      break;
    case('minutes'):
      $('[data-time="minutes"]').text(amountString);
      $('[data-time="minutes"]').addClass('number-opacity');
      $('[data-opacity="minutes"]').addClass('turn-card');
      setTimeout(function(){
        $('[data-time="minutes"]').removeClass('number-opacity');
      }, 300);
      setTimeout(function(){
        $('[data-opacity="minutes"]').removeClass('turn-card');
      }, 500);
      break;
    case('seconds'):
      $('[data-time="seconds"]').text(amountString);
      $('[data-time="seconds"]').addClass('number-opacity');
      $('[data-opacity="seconds"]').addClass('turn-card');
      setTimeout(function(){
        $('[data-time="seconds"]').removeClass('number-opacity');
      }, 300);

      setTimeout(function(){
        $('[data-opacity="seconds"]').removeClass('turn-card');
                $('[data-time="seconds"]').removeClass('number-opacity');
      }, 500);
      break;
  }
}

//update so that can tell when at end of countdown


function update(time) {
  let minutesChanged = false;
  let hoursChanged = false;
  let daysChanged = false;

  if (time.seconds < 0 && time.minutes == 0 && time.hours == 0 && time.days == 0) {
    stopCountdown();
  }

  if (time.seconds < 0) {
    time.seconds = 59;
    time.minutes--;
    minutesChanged = true;
    if (time.minutes < 0) {
      if (time.days > 0 && time.hours > 0){
        time.minutes = 59;
        time.hours--;
        hoursChanged = true;
      }
      else {
        time.minutes = 0;
      }


      if (time.hours < 0) {
        if (days > 0) {
          time.hours = 23;
          time.days--;
          daysChanged = true;
        } else {
          time.hours = 0;
        }
        if (time.days < 0) {
          time.days = 0;
        }
      }
    }
  }
  displayTime('seconds', time.seconds);

  if (minutesChanged) {
    displayTime('minutes', time.minutes);
    minutesChanged = false;
  }

  if (hoursChanged) {
    displayTime('hours', time.hours);
    hoursChanged = false;
  }

  if (daysChanged) {
    displayTime('days', time.days);
    daysChanged = false;
  }
}

function stopCountdown() {
  clearInterval(countdownTime.timer);
  $('h1').text('We are NOW open!!!!!!');
}
