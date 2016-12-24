 function openList(evt, listName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].className = "tabcontent";
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(listName).className = "tabcontent active";
    wheel.update()
}


  drinks = {};

      drinkNames = document.getElementsByClassName("drink-name");
        for (i = 0; i < drinkNames.length; i++) {
              drinks.push( this.value );
        }

    var drinkContainer = document.getElementsByClassName("active")[0];

    for (i = 0; i < drinks.length; i++) {
        var newDiv = document.createElement("div");
        drinkContainer.appendChild(newDiv);                   
                segments.push(drinkNames[i]);
                wheel.update();
        } 

  var wheel = {

    timerHandle : 0,
    timerDelay : 33,

    angleCurrent : 0,
    angleDelta : 0,

    size : 290,

    canvasContext : null,

    colors : [ "#006432", "#f60000", "#fce300", "#5feedf", "#0036a1", "#ff8100"],

    // colors : [ "#c34234", "#d55e0f", "#3c5064", "#3386bc", "#20a48a"],


    segments : [],

    seg_colors : [], // Cache of segments to colors
    
    maxSpeed : Math.PI / 16,

    upTime : 500, // How long to spin up for (in ms)
    downTime : 5000, // How long to slow down for (in ms)

    spinStart : 0,

    frames : 0,

    centerX : 350,
    centerY : 300,

    spin : function() {

      // Start the wheel only if it's not already spinning
      if (wheel.timerHandle == 0) {
        wheel.spinStart = new Date().getTime();
        wheel.maxSpeed = Math.PI / (16 + Math.random()); // Randomly vary how hard the spin is
        wheel.frames = 0;
        wheel.sound.play();

        wheel.timerHandle = setInterval(wheel.onTimerTick, wheel.timerDelay);
      }
    },

    onTimerTick : function() {

      wheel.frames++;

      wheel.draw();

      var duration = (new Date().getTime() - wheel.spinStart);
      var progress = 0;
      var finished = false;

      if (duration < wheel.upTime) {
        progress = duration / wheel.upTime;
        wheel.angleDelta = wheel.maxSpeed
            * Math.sin(progress * Math.PI / 2);
      } else {
        progress = duration / wheel.downTime;
        wheel.angleDelta = wheel.maxSpeed
            * Math.sin(progress * Math.PI / 2 + Math.PI / 2);
        if (progress >= 1)
          finished = true;
      }

      wheel.angleCurrent += wheel.angleDelta;
      while (wheel.angleCurrent >= Math.PI * 2)
        // Keep the angle in a reasonable range
        wheel.angleCurrent -= Math.PI * 2;

      if (finished) {
        clearInterval(wheel.timerHandle);
        wheel.timerHandle = 0;
        wheel.angleDelta = 0;

      
      }

    },

    init : function(optionList) {
      try {
        wheel.initWheel();
        wheel.initAudio();
        wheel.initCanvas();
        wheel.draw();
      } catch (exceptionData) {
        alert('Wheel is not loaded ' + exceptionData);
      }

    },

    initAudio : function() {
      var sound = document.createElement('audio');
      sound.setAttribute('src', 'booze.mp3');
      wheel.sound = sound;
    },

    initCanvas : function() {
      var canvas = document.getElementById('canvas');

      canvas.addEventListener("click", wheel.spin, false);
      wheel.canvasContext = canvas.getContext("2d");

    },

    initWheel : function() {
      wheel.colors;
    },

    // Called when segments have changed
    update : function() {
          var segments = new Array();
          var activeTab = document.getElementsByClassName('active')[0];
          var drinkList = activeTab.getElementsByClassName('drink-name')
  



        for (var i = 0; i < drinkList.length; i++) {
            segments.push(drinkList[i].value) ;
        }

          wheel.segments = segments;
            // Ensure we start mid way on a item
      //var r = Math.floor(Math.random() * wheel.segments.length);
      var r = 0;
      wheel.angleCurrent = ((r + 0.5) / wheel.segments.length) * Math.PI * 2;

  
      var len      = segments.length;
      var colors   = wheel.colors;
      var colorLen = colors.length;

      // Generate a color cache (so we have consistant coloring)
      var seg_color = new Array();
      for (var i = 0; i < len; i++)
        if (i < colorLen) { seg_color.push( colors[i] )}
      // Prevent the edge case of the first and last segment having the same color
        else if ( i === len - 1 && i % colorLen === 0) {  seg_color.push( colors[(i % colorLen) + 2]) }

        else { seg_color.push( colors[i % colorLen])}
      ;

      wheel.seg_color = seg_color;
      wheel.draw();
    },

    draw : function() {
      wheel.clear();
      wheel.drawWheel();
      wheel.drawNeedle();

    },

    clear : function() {
      var ctx = wheel.canvasContext;
      ctx.clearRect(0, 0, 1500, 800);
    },

    drawNeedle : function() {
      var ctx = wheel.canvasContext;
      var centerX = wheel.centerX;
      var centerY = wheel.centerY;
      var size = wheel.size;

      ctx.lineWidth = 6;
      ctx.strokeStyle = '#8b1e00';
      ctx.fillStyle = '#df1e00';

      ctx.beginPath();

      ctx.moveTo(centerX + size - 40, centerY);
      ctx.lineTo(centerX + size + 100, centerY - 20);
      ctx.lineTo(centerX + size + 100, centerY + 20);
      ctx.closePath();

      ctx.stroke();
      ctx.fill();

      // Which segment is being pointed to?
      var i = wheel.segments.length - Math.floor((wheel.angleCurrent / (Math.PI * 2)) * wheel.segments.length) - 1;

      // Now draw the winning name
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillStyle = 'darkred';
      ctx.font = "2.5em Papa";
      ctx.fillText(wheel.segments[i], centerX + size + 150, centerY);
    },

    drawSegment : function(key, lastAngle, angle) {
      var ctx = wheel.canvasContext;
      var centerX = wheel.centerX;
      var centerY = wheel.centerY;
      var size = wheel.size;

      var segments = wheel.segments;
      var len = wheel.segments.length;
      var colors = wheel.seg_color;

      var value = segments[key];
      
      ctx.save();
      ctx.beginPath();

      // Start in the centre
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, size, lastAngle, angle, false); // Draw a arc around the edge
      ctx.lineTo(centerX, centerY); // Now draw a line back to the centre

      // Clip anything that follows to this area
      //ctx.clip(); // It would be best to clip, but we can double performance without it
      ctx.closePath();

      ctx.fillStyle = colors[key];
      ctx.fill();
      ctx.stroke();

      // Now draw the text
      ctx.save(); // The save ensures this works on Android devices
      ctx.translate(centerX, centerY);
      ctx.rotate((lastAngle + angle) / 2);

      ctx.fillStyle = '#000000';
      ctx.fillText(value.substr(0, 20), size / 2 + 10, 0);
      ctx.restore();

    },

    drawWheel : function() {
      var ctx = wheel.canvasContext;

      var angleCurrent = wheel.angleCurrent;
      var lastAngle    = angleCurrent;

      var segments  = wheel.segments;
      var len       = wheel.segments.length;
      var colors    = wheel.colors;
      var colorsLen = wheel.colors.length;

      var centerX = wheel.centerX;
      var centerY = wheel.centerY;
      var size    = wheel.size;

      var PI2 = Math.PI * 2;

      ctx.lineWidth    = 1;
      ctx.strokeStyle  = '#8b1e00';
      ctx.textBaseline = "middle";
      ctx.textAlign    = "center";
      ctx.font         = "bold 1.5em Papa";

      for (var i = 1; i <= len; i++) {
        var angle = PI2 * (i / len) + angleCurrent;
        wheel.drawSegment(i - 1, lastAngle, angle);
        lastAngle = angle;
      }
      // Draw a center circle shadow 
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.shadowColor = 'black';
      ctx.strokeStyle = "#8b1e00";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.arc(centerX, centerY, 30, 0, PI2, false);
      ctx.stroke();
      ctx.restore();


      ctx.save
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, PI2, false);
      ctx.closePath();

      ctx.fillStyle   = '#ecdabe';
      ctx.strokeStyle = '#8b1e00';
      ctx.lineWidth   = 4;
      ctx.fill();
      ctx.stroke();
      ctx.restore

      // Draw outer circle inner shadow
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 6;
      ctx.shadowColor = 'black';
      ctx.strokeStyle = "rgba(139,30,0,0.7)";
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.arc(centerX, centerY, size - 5, 0, PI2, false);
      ctx.stroke();
      ctx.restore();

      // Draw outer circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, size, 0, PI2, false);
      ctx.closePath();
      ctx.lineWidth   = 10;
      ctx.strokeStyle = '#df1e00';
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, size + 3, 0, PI2, false);
      ctx.closePath();
      ctx.lineWidth   = 5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.restore();
    },
  }

  window.onload = function() {
    wheel.init();


    wheel.update();

    // Hide the address bar (for mobile devices)!
    setTimeout(function() {
      window.scrollTo(0, 1);
    }, 0);

    
  }

