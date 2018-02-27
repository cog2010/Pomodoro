/*Pomodoro clock for Free Code Camp
A timer that counts down from 25 minutes then times a 5 minute break.
The clock will count down through the work/break interval
   then be ready to start again.
The durations on the clock can be customized.*/
$(document).ready(function(){
   $("#reset").hide();
   $("#timerType").hide();
   $("#timer").hide()

   var workTime = 600;
   var breakTime = 300;
   $("#workSet").html("<h2>" + convertTime(workTime) + "</h2>");
   $("#breakSet").html("<h2>" + convertTime(breakTime) + "</h2>");
   //Thanks to Dylan at Coding Tutorials 360 on Youtube for how to add sound
   var workStart = $("#workStart")[0];
   var breakStart = $("#breakStart")[0];
   var breakEnd = $("#breakEnd")[0];

   $("#start").on("click", function(){
      workStart.play();
      $("#workClock , #breakClock , #start").hide();
      $("#timerType").show().html("Work Time Left:");
      $("#timer").show().html(convertTime(workTime));
      function workCount(sec) {
         workTime --;
         $("#timer").html(convertTime(workTime));
            if (workTime <= 0){
               breakStart.play();
               clearInterval(workTimer);
               $("#timerType").html("Break Time Left:");
               $("#timer").html(convertTime(breakTime));
               var breakTimer = setInterval(breakCount, 1000);
               function breakCount(sec) {
                  breakTime --;
                  $("#timer").html(convertTime(breakTime));
                  if (breakTime <= 0) {
                     clearInterval(breakTimer);
                     $("#timerType").html("Pomodoro Complete!");
                     $("#timerType, #timer").hide();
                     $("#reset").show();
                     breakEnd.play();
                  }
               }
            }
      }
      var workTimer = setInterval(workCount, 1000);
   });
   function convertTime(seconds) {
      var min = Math.floor(seconds / 60);
      var sec;
      if (seconds % 60 > 9){
         sec = (seconds % 60);
      } else {
         sec = "0" + seconds % 60;
      }
   return min + ":" + sec;
   }
   $("#reset").on("click", function(){
      $("#reset , #timerType , #timer").hide();
      $("#workClock , #breakClock , #start").show();
      workTime = 1500;
      breakTime = 300;
      $("#workSet").html("<h2>" + convertTime(workTime) + "</h2>");
      $("#breakSet").html("<h2>" + convertTime(breakTime) + "</h2>");
   });
   $("#workDown").on("click", function(){
      if (workTime > 60){
         workTime -= 60;
         $("#workSet").html("<h2>" + convertTime(workTime) + "</h2>");
      }
   });
   $("#workUp").on("click", function(){
         workTime += 60;
         $("#workSet").html("<h2>" + convertTime(workTime) + "</h2>");

   });
   $("#breakDown").on("click", function(){
      if (breakTime > 60){
         breakTime -= 60;
         $("#breakSet").html("<h2>" + convertTime(breakTime) + "</h2>");
      }
   });
   $("#breakUp").on("click", function(){
         breakTime += 60;
         $("#breakSet").html("<h2>" + convertTime(breakTime) + "</h2>");

   });
});
