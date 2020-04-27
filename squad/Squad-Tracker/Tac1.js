$(document).ready($(function () {
  console.info('Tac1.js Loaded!');
  var $chk = $('#check');
  var endD = $('#multiple');
  endD.hide();

  $chk.change(function () {
    endD.toggle();
  })

  document.getElementById('button').addEventListener('click', function () {
    data();
  })
}))

var nullDateTime;
var mom = moment().tz("Europe/London");

function data() {

  var frm1 = document.getElementById('frm1');
  var formData = document.forms[0];

  var startTime = formData['sTime'].value;
  var endTime = formData['eTime'].value;
  var startDate = formData['sDate'].value;
  var endDate = formData['eDate'].value;

  var newStartTime;
  var newEndTime;
  var newStartDate;
  var newEndDate;

  // if the start time was not provided
  if (startTime == "" || startTime == null) {
    // if the start Date was not provided
    if (startDate == "" || startDate == null) {
      // go 24 hours ago and set the newStartDate to this variable as it gets the whole timeframe
      newStartDate = moment().tz("Europe/London").subtract(24, 'hours').format();
      console.log("StartTime = " + newStartDate);
    } else {
      // Start date was provided
      // Start at beginning of day provided
      newStartDate = moment(startDate).startOf('day').subtract(6, 'hours').format();
      console.log("StartTime = " + newStartDate);
    }
  } else if (startTime != "" || startTime != null) {
    // A time was provided
    // Check to see if a date was provided
    if (startDate == "" || startDate == null) {
      // no date provided, go back 24 hours from the time provided.
      newStartDate = moment(startTime).subtract(24, 'hours').format();
      console.log("StartTime = " + newStartDate);
    } else {
      // date provided, format with date and time
      newStartDate = moment(startDate + " " + startTime).format();
      console.log("StartTime = " + newStartDate);
    }
  }

  // if the end time was not provided
  if (endTime == "" || endTime == null) {
    // if the end Date was not provided
    if (endDate == "" || endDate == null) {
      // get now
      newEndDate = moment().tz("Europe/London").format();
      console.log("StartTime = " + newEndDate);
    } else {
      // end date was provided
      // end at end of day provided
      newEndDate = moment(endDate).endOf('day').format();
      console.log("StartTime = " + newEndDate);
    }
  } else if (startTime != "" || startTime != null) {
    // A time was provided
    // Check to see if a date was provided
    if (startDate == "" || startDate == null) {
      // no date provided, go back 24 hours from the time provided.
      newEndDate = moment(startTime).subtract(24, 'hours').format();
      console.log("StartTime = " + newEndDate);
    } else {
      // date provided, format with date and time
      newEndDate = moment(startDate + " " + startTime).format();
      console.log("StartTime = " + newEndDate);
    }
  }

  sendRequest(newStartDate, newEndDate);
}

function sendRequest(startDate, endDate) {

  var sDate = startDate.toString();
  var eDate = endDate.toString();
  var sD = sDate.substring(0, sDate.length - 6);
  var eD = eDate.substring(0, eDate.length - 6);
  var p = document.createElement('p');
  var spot = document.getElementById('data')
  $.ajax({
    type: 'GET',
    url: `https://api.battlemetrics.com/servers/442917/relationships/sessions?include=player&start=${sD}Z&stop=${eD}Z`,
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI5ODdkMDEwZjZmNzg4NzAiLCJpYXQiOjE1ODc5MTI3MjMsIm5iZiI6MTU4NzkxMjcyMywiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjoxMjM3MDEifQ.EogtksOFfM-CAHQY8hXBi4lOJfz05AevjA3wizxtooM`
    },
    contentType: "application/json; charset-utf-8",
    dataType: "json",
    success: function (data) {
      var $cont = $('#contain');
      var p = document.createElement('p');
      data.included.forEach(user => {
        if (user.attributes.name != null) {
          if(user.attributes.name.startsWith('=7Cav='))
          {
            p.innerHTML += user.attributes.name + "<br>";
          }
        }
      });
      spot.appendChild(p);
    }
  })
}