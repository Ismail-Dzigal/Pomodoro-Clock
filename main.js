var app = angular.module("Pomodoro", []);

app.controller("MainCtrl", function($interval){
  var self = this;
  self.pomodoroTimer = 1500;
  self.breakTimer = 300;
  self.mainTimerS = self.pomodoroTimer;
  self.mainTimer = transformTime(Math.floor(self.mainTimerS / 60)) + ":" + transformTime(self.mainTimerS % 60);
  self.start = false;
  self.startTxt = "Start";
  self.session = false;
  self.header = "Session";
 
  self.intervalPomodoro = $interval(function () {
    if(self.mainTimerS > 0 && self.start){
      self.mainTimerS -= 1;
      self.mainTimer = transformTime(Math.floor(self.mainTimerS / 60)) + ":" + transformTime(self.mainTimerS % 60);  
    } else if(self.mainTimerS === 0 && self.start && !self.session){
      self.mainTimerS = self.breakTimer;
      self.session = !self.session;
      self.header = "Break";
    } else if(self.mainTimerS === 0 && self.start && self.session){
      self.mainTimerS = self.pomodoroTimer;
      self.session = !self.session;
      self.header = "Session";
    }
  }, 1000); 
 
  self.startPomodoro = function(){
    self.start = !self.start;
    if(self.start){
      self.startTxt = "Pause";
    } else {
      self.startTxt = "Resume";
    }
  }
  
  self.stopPomodoro = function(){
    self.pomodoroTimer = 1500;
    self.mainTimerS = self.pomodoroTimer;
    self.mainTimer = transformTime(Math.floor(parseInt(self.mainTimerS)/60)) + ":" + transformTime(parseInt(self.mainTimerS)%60);
    self.start = false;
    self.startTxt = "Start";
    self.session = false;
  }
    
  self.increasePomodoroTimer = function(){
    self.pomodoroTimer += 60;
    self.mainTimerS = self.pomodoroTimer;
    self.mainTimer = transformTime(Math.floor(self.mainTimerS / 60)) + ":" + transformTime(self.mainTimerS % 60);
  }
  
  self.decreasePomodoroTimer = function(){
    if(self.pomodoroTimer > 60){
      self.pomodoroTimer -= 60;
      self.mainTimerS = self.pomodoroTimer;
      self.mainTimer = transformTime(Math.floor(self.mainTimerS / 60)) + ":" + transformTime(self.mainTimerS % 60);
    }  
  }
  
  self.increaseBreakTimer = function(){
    self.breakTimer += 60;
  }
  
  self.decreaseBreakTimer = function(){
    if(self.breakTimer > 60){
      self.breakTimer -= 60;
    } 
  }
  
  function transformTime(x){
    if(x < 10){
      return "0" + x;
    } else {
      return x;
    }
  }
});
