function GameModel() {

  var self = this;
  var myView;
  self.gameWasStarted = false;
  self.content = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  self.indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  self.percent = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
  var val;
  var first;
  var second;
  var index;
  self.cv;
  self.pic;
  self.between;
  self.w;
  self.status = 'free';
  self.score = 0;
  var container = document.getElementById('container');

  function best() {
    $.ajax({
      url: "https://fe.it-academy.by/AjaxStringStorage2.php",
      type: 'POST',
      cache: false,
      dataType: 'json',
      data: {
        f: 'READ',
        n: 'Korshuk_2048_test2'
      },
      success: ok,
      error: errorHandler
    });
  }

  function ok(data) {
    if (data.result !== '') {
      records = JSON.parse(data.result);
      self.records = records;
      var bestScoreButton = document.getElementById('record');
      bestScoreButton.innerHTML = records[0];
    }
  }

  function errorHandler(jqXHR, statusStr, errorStr) {
    alert(statusStr + ' ' + errorStr);
  }

  best();


  self.randomCoord = function () {
    var val = self.percent[Math.floor(Math.random() * self.percent.length)];
    var one = self.indices[Math.floor(Math.random() * self.indices.length)];

    self.content.splice(one, 0, val);
    self.content.splice(one + 1, 1);

    index = self.indices.indexOf(one);
    self.indices.splice(index, 1);

    return one;
  }

  self.start = function (view) {
    myView = view;

    first = self.randomCoord();
    second = self.randomCoord();

    self.update();
    myView.newCell(first, self.cv.width / 30);
    myView.newCell(second, self.cv.width / 30);
  }

  self.stop = function () {
    myView = null;
  }

  self.update = function () {
    var data = myView.gameCanvas(container.offsetHeight * 0.6 + 'px', container.offsetHeight * 0.36 + 'px');

    self.cv = data[0];
    self.pic = data[1];
    self.between = self.cv.width / 16.7
    self.w = self.cv.width / 5.71;
    var between = container.offsetHeight * 0.024;
    var w = container.offsetHeight * 0.07;

    for (var i = 0; i < 16; i++) {
      var c = myView.coord(i);
      myView.buildCell(0, self.w, self.between + parseInt(self.between + self.w) * c[0], self.between + parseInt(self.between + self.w) * c[1], self.cv, self.pic);
    }
  }

  self.moveCell = function (code, phase) {

    if (self.status === 'free' || phase === 'last') {

      if (code === 37) { //влево

        self.status = 'busy';
        self.gameWasStarted = true;
        var speedX = -30;
        var speedY = 0;

        var x0 = [];
        var x1 = [];
        var x2 = [];
        var x3 = [];

        var needToMove = [];
        var noMove = [];

        var free = function (c) {
          var count = 0;
          var coordinate = 16 / 4 * c[1] + c[0];
          if (c[0] !== 0) {
            for (var i = c[0] - 1; i >= 0; i--) {
              coordinate--;
              if (self.content[coordinate] === 0) {
                count++;
              }
            }
          }
          return count;

        }

        for (var i = 0; i < 16; i++) {

          if (self.content[i] !== 0) {
            if (myView.coord(i)[0] === 0) {
              x0.push(i);
            } else if (myView.coord(i)[0] === 1) {
              x1.push(i);
            } else if (myView.coord(i)[0] === 2) {
              x2.push(i);
            } else if (myView.coord(i)[0] === 3) {
              x3.push(i);
            }
          }
        }



        var order = x0.concat(x1).concat(x2).concat(x3);

        var indicesOfMovingCells = [];

        for (var i = 0; i < order.length; i++) {
          let c = myView.coord(order[i]);
          let num = self.content[order[i]];

          var f = free(c);


          if (f !== 0) {


            var newIndex = 16 / 4 * c[1] + (c[0] - f);
            self.content.splice(newIndex, 0, num);
            self.content.splice(newIndex + 1, 1);

            self.content.splice(order[i], 0, 0);
            self.content.splice(order[i] + 1, 1);

            index = self.indices.indexOf(newIndex);
            self.indices.splice(index, 1);
            self.indices.splice(0, 0, order[i]);
            self.indices.sort(function (a, b) {
              return a - b;
            });

            var info = {};
            info.num = num;


            var s = myView.coord(order[i]);

            var e = myView.coord(newIndex);

            var startCoordX = self.between + parseInt(self.between + self.w) * s[0];
            var startCoordY = self.between + parseInt(self.between + self.w) * s[1];
            var endCoordX = self.between + parseInt(self.between + self.w) * e[0];
            var endCoordY = self.between + parseInt(self.between + self.w) * e[1];


            info.startX = startCoordX;
            info.startY = startCoordY;
            info.endX = endCoordX;
            info.endY = endCoordY;
            info.endCoord = newIndex;
            info.speedX = speedX;
            info.speedY = speedY;

            needToMove.push(info);
            indicesOfMovingCells.push(newIndex);


          }
        }
        for (var q = 0; q < 16; q++) {
          if (self.content[q] !== 0) {
            noMove.push(q);
          }
        };

        for (var i = 0; i < indicesOfMovingCells.length; i++) {
          if (noMove.includes(indicesOfMovingCells[i])) {
            noMove.splice(noMove.indexOf(indicesOfMovingCells[i]), 1);;
          }
        };

        var replaceCell = [];
        var rows = [
          [0, 1, 2, 3],
          [4, 5, 6, 7],
          [8, 9, 10, 11],
          [12, 13, 14, 15]
        ];

        if (phase === 'first') {
          for (var r = 0; r < rows.length; r++) {
            for (var d = 0; d < rows[r].length - 1; d++) {
              if (self.content[rows[r][d]] === self.content[rows[r][d + 1]] && self.content[rows[r][d]] !== 0) {

                var a = [rows[r][d], rows[r][d + 1]];
                replaceCell.push(a);
                d++
              }
            }
          }
        }
        myView.slide(needToMove, noMove, replaceCell, code, phase);
      };

      if (code === 38) { //вверх
        self.status = 'busy';
        self.gameWasStarted = true;
        var speedX = 0
        var speedY = -30;

        var y0 = [];
        var y1 = [];
        var y2 = [];
        var y3 = [];


        var needToMove = [];
        var noMove = [];

        var free = function (c) {
          var count = 0;
          if (c[1] !== 0) {
            for (var i = c[1] - 1; i >= 0; i--) {
              if (self.content[16 / 4 * i + c[0]] === 0) {
                count++;
              }
            }
          }
          return count;
        }

        for (var i = 0; i < 16; i++) {

          if (self.content[i] !== 0) {
            if (myView.coord(i)[1] === 0) {
              y0.push(i);
            } else if (myView.coord(i)[1] === 1) {
              y1.push(i);
            } else if (myView.coord(i)[1] === 2) {
              y2.push(i);
            } else if (myView.coord(i)[1] === 3) {
              y3.push(i);
            }
          }
        }



        var order = y0.concat(y1).concat(y2).concat(y3);

        var indicesOfMovingCells = [];

        for (var i = 0; i < order.length; i++) {

          let c = myView.coord(order[i]);
          let num = self.content[order[i]];

          var f = free(c);

          if (f !== 0) {


            var newIndex = 16 / 4 * (c[1] - f) + c[0];
            self.content.splice(newIndex, 0, num);
            self.content.splice(newIndex + 1, 1);

            self.content.splice(order[i], 0, 0);
            self.content.splice(order[i] + 1, 1);

            index = self.indices.indexOf(newIndex);
            self.indices.splice(index, 1);
            self.indices.splice(0, 0, order[i]);
            self.indices.sort(function (a, b) {
              return a - b;
            });

            var info = {};
            info.num = num;


            var s = myView.coord(order[i]);

            var e = myView.coord(newIndex);

            var startCoordX = self.between + parseInt(self.between + self.w) * s[0];
            var startCoordY = self.between + parseInt(self.between + self.w) * s[1];
            var endCoordX = self.between + parseInt(self.between + self.w) * e[0];
            var endCoordY = self.between + parseInt(self.between + self.w) * e[1];


            info.startX = startCoordX;
            info.startY = startCoordY;
            info.endX = endCoordX;
            info.endY = endCoordY;
            info.endCoord = newIndex;
            info.speedX = speedX;
            info.speedY = speedY;

            needToMove.push(info);

            indicesOfMovingCells.push(newIndex);

          }
        }
        for (var q = 0; q < 16; q++) {
          if (self.content[q] !== 0) {
            noMove.push(q);
          }
        };

        for (var i = 0; i < indicesOfMovingCells.length; i++) {
          if (noMove.includes(indicesOfMovingCells[i])) {
            noMove.splice(noMove.indexOf(indicesOfMovingCells[i]), 1);;
          }
        };


        var replaceCell = [];
        var cols = [
          [0, 4, 8, 12],
          [1, 5, 9, 13],
          [2, 6, 10, 14],
          [3, 7, 11, 15]
        ];

        if (phase === 'first') {
          for (var c = 0; c < cols.length; c++) {
            for (var d = 0; d < cols[c].length - 1; d++) {
              if (self.content[cols[c][d]] === self.content[cols[c][d + 1]] && self.content[cols[c][d]] !== 0) {

                var a = [cols[c][d], cols[c][d + 1]];
                replaceCell.push(a);
                d++
              }
            }
          }

        }

        myView.slide(needToMove, noMove, replaceCell, code, phase);
      };

      if (code === 39) { //вправо
        self.status = 'busy';
        self.gameWasStarted = true;
        var speedX = 30;
        var speedY = 0;

        var x0 = [];
        var x1 = [];
        var x2 = [];
        var x3 = [];

        var needToMove = [];
        var noMove = [];

        var free = function (c) {
          var count = 0;
          var coordinate = 16 / 4 * c[1] + c[0];
          if (c[0] !== 3) {
            for (var i = c[0] + 1; i <= 3; i++) {
              coordinate++;
              if (self.content[coordinate] === 0) {
                count++;
              }
            }
          }
          return count;
        }

        for (var i = 0; i < 16; i++) {

          if (self.content[i] !== 0) {
            if (myView.coord(i)[0] === 3) {
              x0.push(i);
            } else if (myView.coord(i)[0] === 2) {
              x1.push(i);
            } else if (myView.coord(i)[0] === 1) {
              x2.push(i);
            } else if (myView.coord(i)[0] === 0) {
              x3.push(i);
            }
          }
        }



        var order = x0.concat(x1).concat(x2).concat(x3);

        var indicesOfMovingCells = [];

        for (var i = 0; i < order.length; i++) {

          let c = myView.coord(order[i]);
          let num = self.content[order[i]];

          var f = free(c);

          if (f !== 0) {


            var newIndex = 16 / 4 * c[1] + (c[0] + f);
            self.content.splice(newIndex, 0, num);
            self.content.splice(newIndex + 1, 1);

            self.content.splice(order[i], 0, 0);
            self.content.splice(order[i] + 1, 1);

            index = self.indices.indexOf(newIndex);
            self.indices.splice(index, 1);
            self.indices.splice(0, 0, order[i]);
            self.indices.sort(function (a, b) {
              return a - b;
            });

            var info = {};
            info.num = num;


            var s = myView.coord(order[i]);

            var e = myView.coord(newIndex);

            var startCoordX = self.between + parseInt(self.between + self.w) * s[0];
            var startCoordY = self.between + parseInt(self.between + self.w) * s[1];
            var endCoordX = self.between + parseInt(self.between + self.w) * e[0];
            var endCoordY = self.between + parseInt(self.between + self.w) * e[1];


            info.startX = startCoordX;
            info.startY = startCoordY;
            info.endX = endCoordX;
            info.endY = endCoordY;
            info.endCoord = newIndex;
            info.speedX = speedX;
            info.speedY = speedY;

            needToMove.push(info);

            indicesOfMovingCells.push(newIndex);

          }
        }
        for (var q = 0; q < 16; q++) {
          if (self.content[q] !== 0) {
            noMove.push(q);
          }
        };

        for (var i = 0; i < indicesOfMovingCells.length; i++) {
          if (noMove.includes(indicesOfMovingCells[i])) {
            noMove.splice(noMove.indexOf(indicesOfMovingCells[i]), 1);;
          }
        };

        var replaceCell = [];
        var rows = [
          [3, 2, 1, 0],
          [7, 6, 5, 4],
          [11, 10, 9, 8],
          [15, 14, 13, 12]
        ];

        if (phase === 'first') {
          for (var r = 0; r < rows.length; r++) {
            for (var d = 0; d < rows[r].length - 1; d++) {
              if (self.content[rows[r][d]] === self.content[rows[r][d + 1]] && self.content[rows[r][d]] !== 0) {

                var a = [rows[r][d], rows[r][d + 1]];
                replaceCell.push(a);
                d++
              }
            }
          }
        }
        myView.slide(needToMove, noMove, replaceCell, code, phase);
      };

      if (code === 40) { //вниз

        self.status = 'busy';
        self.gameWasStarted = true;
        var speedX = 0
        var speedY = 30;

        var y0 = [];
        var y1 = [];
        var y2 = [];
        var y3 = [];

        var needToMove = [];
        var noMove = [];

        var free = function (c) {
          var count = 0;
          if (c[1] !== 3) {
            for (var i = c[1] + 1; i <= 3; i++) {
              if (self.content[16 / 4 * i + c[0]] === 0) {
                count++;
              }
            }
          }
          return count;
        }

        for (var i = 0; i < 16; i++) {

          if (self.content[i] !== 0) {
            if (myView.coord(i)[1] === 3) {
              y0.push(i);
            } else if (myView.coord(i)[1] === 2) {
              y1.push(i);
            } else if (myView.coord(i)[1] === 1) {
              y2.push(i);
            } else if (myView.coord(i)[1] === 0) {
              y3.push(i);
            }
          }
        }


        var order = y0.concat(y1).concat(y2).concat(y3);

        var indicesOfMovingCells = [];

        for (var i = 0; i < order.length; i++) {

          let c = myView.coord(order[i]);
          let num = self.content[order[i]];

          var f = free(c);

          if (f !== 0) {


            var newIndex = 16 / 4 * (c[1] + f) + c[0];
            self.content.splice(newIndex, 0, num);
            self.content.splice(newIndex + 1, 1);

            self.content.splice(order[i], 0, 0);
            self.content.splice(order[i] + 1, 1);

            index = self.indices.indexOf(newIndex);
            self.indices.splice(index, 1);
            self.indices.splice(0, 0, order[i]);
            self.indices.sort(function (a, b) {
              return a - b;
            });

            var info = {};
            info.num = num;


            var s = myView.coord(order[i]);

            var e = myView.coord(newIndex);

            var startCoordX = self.between + parseInt(self.between + self.w) * s[0];
            var startCoordY = self.between + parseInt(self.between + self.w) * s[1];
            var endCoordX = self.between + parseInt(self.between + self.w) * e[0];
            var endCoordY = self.between + parseInt(self.between + self.w) * e[1];


            info.startX = startCoordX;
            info.startY = startCoordY;
            info.endX = endCoordX;
            info.endY = endCoordY;
            info.endCoord = newIndex;
            info.speedX = speedX;
            info.speedY = speedY;

            needToMove.push(info);

            indicesOfMovingCells.push(newIndex);

          }
        }
        for (var q = 0; q < 16; q++) {
          if (self.content[q] !== 0) {
            noMove.push(q);
          }
        };

        for (var i = 0; i < indicesOfMovingCells.length; i++) {
          if (noMove.includes(indicesOfMovingCells[i])) {
            noMove.splice(noMove.indexOf(indicesOfMovingCells[i]), 1);;
          }
        };

        var replaceCell = [];
        var cols = [
          [12, 8, 4, 0],
          [13, 9, 5, 1],
          [14, 10, 6, 2],
          [15, 11, 7, 3]
        ];

        if (phase === 'first') {
          for (var c = 0; c < cols.length; c++) {
            for (var d = 0; d < cols[c].length - 1; d++) {
              if (self.content[cols[c][d]] === self.content[cols[c][d + 1]] && self.content[cols[c][d]] !== 0) {

                var a = [cols[c][d], cols[c][d + 1]];
                replaceCell.push(a);
                d++
              }
            }
          }
        }
        myView.slide(needToMove, noMove, replaceCell, code, phase);
      };
    };
  }

  self.move = function (EO) {
    self.moveCell(EO.keyCode, 'first')
  }

  self.leaveTheGame = function () {
    if (self.gameWasStarted) {
      alert('Прогресс игры будет потерян. Вы точно хотите выйти?');
    }
  }
}


function GameView() {

  var self = this;
  var myModel = null;
  var container = document.getElementById('container');

  function clickSoundInit() {
    moveAudio.play();
    moveAudio.pause();
    buttonAudio.play();
    buttonAudio.pause();

  }


  self.start = function (model) {
    myModel = model;
    clickSoundInit();
  }

  self.stop = function () {
    myModel = null;
  }

  self.gameCanvas = function (width, top) {
    var cv = null;
    var pic = null;

    if (container.children[1]) {
      container.removeChild(container.lastChild);
    }

    var div = document.createElement('div');

    div.setAttribute('class', 'canvas');
    container.appendChild(div);

    div.style.width = width;
    div.style.height = div.offsetWidth + 'px';
    div.style.top = top;
    cv = document.createElement('canvas');
    cv.setAttribute('width', div.offsetWidth);
    cv.setAttribute('height', div.offsetHeight);
    div.appendChild(cv);

    pic = cv.getContext('2d');

    pic.beginPath();
    pic.rect(container.offsetHeight * 0.03, container.offsetHeight * 0.03, container.offsetHeight * 0.54, container.offsetHeight * 0.54);
    pic.fillStyle = '#a19a8c';
    pic.fill();
    pic.strokeStyle = '#a19a8c';
    pic.lineJoin = 'round';
    pic.lineWidth = container.offsetHeight * 0.06;
    pic.stroke();

    return [cv, pic];
  }


  self.buildCell = function (num, width, x, y, cv, pic) {

    var w = width;
    var color;

    if (num === 2) {
      color = '#f5e3c9';
    } else if (num === 4) {
      color = '#f2d9a7';
    } else if (num === 8) {
      color = '#f2ba66';
    } else if (num === 16) {
      color = '#f29c5e';
    } else if (num === 32) {
      color = '#ed7440';
    } else if (num === 64) {
      color = '#eb421c';
    } else if (num === 128) {
      color = '#ede27b';
    } else if (num === 256) {
      color = '#d9e874';
    } else if (num === 512) {
      color = '#cfdb4d';
    } else if (num === 1024) {
      color = '#b9a5f2';
    } else if (num >= 2048) {
      color = '#b08fdb';
    } else if (num == 0 || isNaN(num)) {
      color = '#d4d0c7';
    }

    pic.beginPath();
    pic.rect(x, y, w, w);
    pic.fillStyle = color;
    pic.fill();
    pic.strokeStyle = color;
    pic.lineJoin = 'round';
    pic.lineWidth = container.offsetHeight * 0.03;
    pic.stroke();
    if (num !== 0 && !(isNaN(num))) {
      dig(num, x, y);
    }

    function dig(num, x, y) {
      if (num === 2 || num === 4) {
        pic.fillStyle = 'black';
      } else {
        pic.fillStyle = 'white';
      }
      pic.font = 'bold ' + w / 1.8 + 'px Arial';
      pic.textAlign = 'center';
      pic.textBaseline = 'middle';
      pic.fillText(num, x + w / 2, y + w / 2);
    }
  };

  self.coord = function (i) {
    var x;
    var y = 0;
    var dig = i;
    x = dig;
    while (dig >= 4) {
      x = dig - 4;
      dig = x;
      y++;
    }
    return [x, y];
  };

  self.newCell = function (i, r) {

    var www = r;
    var c = self.coord(i);
    self.buildCell(myModel.content[i], www, myModel.between + parseInt(myModel.between + myModel.w) * c[0], myModel.between + parseInt(myModel.between + myModel.w) * c[1], myModel.cv, myModel.pic);
    www += 10;
    if (www < myModel.w) {
      setTimeout(function () {
        self.newCell(i, www)
      }, 20);
    } else {
      self.buildCell(myModel.content[i], myModel.w, myModel.between + parseInt(myModel.between + myModel.w) * c[0], myModel.between + parseInt(myModel.between + myModel.w) * c[1], myModel.cv, myModel.pic);
      if (myModel.indices.length === 0) {
        self.endOfGame();
      }
    }
  }


  self.slide = function (info, noMove, replaceCell, code, phase) {

    if (info.length !== 0) {
      var timer = setInterval(function () {
        drive()
      }, 20);

      function drive() {

        for (var i = 0; i < info.length; i++) {
          info[i].startX += info[i].speedX;
          info[i].startY += info[i].speedY;

          if (code === 37) {
            if (info[i].startX <= info[i].endX) {
              info[i].speedX = 0;
              info[i].startX = info[i].endX;
            }
          }

          if (code === 38) {
            if (info[i].startY <= info[i].endY) {
              info[i].speedY = 0;
              info[i].startY = info[i].endY;
            }
          }

          if (code === 39) {
            if (info[i].startX >= info[i].endX) {
              info[i].speedX = 0;
              info[i].startX = info[i].endX;
            }
          }

          if (code === 40) {
            if (info[i].startY >= info[i].endY) {
              info[i].speedY = 0;
              info[i].startY = info[i].endY;
            }
          }
        }

        myModel.update();

        for (var b = 0; b < noMove.length; b++) {
          var d = self.coord(noMove[b]);
          self.buildCell(myModel.content[noMove[b]], myModel.w, myModel.between + parseInt(myModel.between + myModel.w) * d[0], myModel.between + parseInt(myModel.between + myModel.w) * d[1], myModel.cv, myModel.pic);
        }

        for (var i = 0, count = 0; i < info.length; i++) {

          self.buildCell(info[i].num, myModel.w, info[i].startX, info[i].startY, myModel.cv, myModel.pic);

          if ((info[i].speedX === 0) && (info[i].speedY === 0)) {
            count++
          }
          if (count === info.length) {
            clearInterval(timer);
            if (phase === 'first') {
              self.link(replaceCell, code);
              myModel.moveCell(code, 'last');
            } else if (phase === 'last') {
              var plus = myModel.randomCoord();
              self.newCell(plus, myModel.cv.width / 30);
              myModel.status = 'free';

            }

          }
        }

      }
    } else {
      if (phase === 'first') {
        if (replaceCell.length !== 0) {
          self.link(replaceCell, code);
          myModel.moveCell(code, 'last');
        } else {
          myModel.status = 'free';
        }

      } else if (phase === 'last') {
        var plus = myModel.randomCoord();
        self.newCell(plus, myModel.cv.width / 30);
        myModel.status = 'free';
      }
    }

  }

  self.link = function (replaceCell, code) {
    if (needSounds === 'true') {
      moveSound();
    }

    for (var rep = 0; rep < replaceCell.length; rep++) {
      var sum = myModel.content[replaceCell[rep][1]] * 2;
      myModel.score += sum;
      var scoreButton = document.getElementById('score');
      scoreButton.innerHTML = myModel.score;

      var z = self.coord(replaceCell[rep][1]);
      self.buildCell(sum, myModel.w, myModel.between + parseInt(myModel.between + myModel.w) * z[0], myModel.between + parseInt(myModel.between + myModel.w) * z[1], myModel.cv, myModel.pic);

      myModel.content.splice(replaceCell[rep][1], 0, sum);
      myModel.content.splice(replaceCell[rep][1] + 1, 1);

      myModel.content.splice(replaceCell[rep][0], 0, 0);
      myModel.content.splice(replaceCell[rep][0] + 1, 1);

      myModel.indices.splice(0, 0, replaceCell[rep][0]);
      myModel.indices.sort(function (a, b) {
        return a - b;
      });


      for (var i = 0; i < 16; i++) {
        var c = self.coord(i);
        self.buildCell(myModel.content[i], myModel.w, myModel.between + parseInt(myModel.between + myModel.w) * c[0], myModel.between + parseInt(myModel.between + myModel.w) * c[1], myModel.cv, myModel.pic);
      }
    }

  }

  self.endOfGame = function () {
    var replaceCell = [];
    var rowsAndCols = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15]
    ];

    var password;

    function rememberScore() {
      password = Math.random();
      $.ajax({
        url: "https://fe.it-academy.by/AjaxStringStorage2.php",
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: {
          f: 'LOCKGET',
          n: 'Korshuk_2048_test2',
          p: password
        },
        success: updateData,
        error: errorHandler
      });

    };


    function updateData(data) {
      var records;
      if (data.result === '') {
        records = [];
      } else {
        records = JSON.parse(data.result);
      }
      records.push(myModel.score);
      records.sort(function (a, b) {
        return b - a;
      });
      var bestTen = records.slice(0, 10);
      var jsonRec = JSON.stringify(bestTen);

      $.ajax({
        url: "https://fe.it-academy.by/AjaxStringStorage2.php",
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: {
          f: 'UPDATE',
          n: 'Korshuk_2048_test2',
          p: password,
          v: jsonRec
        },
        success: ok,
        error: errorHandler
      });
    }

    function ok(data) { }

    function errorHandler(jqXHR, statusStr, errorStr) {
      alert(statusStr + ' ' + errorStr);
    }

    for (var c = 0; c < rowsAndCols.length; c++) {
      for (var d = 0; d < rowsAndCols[c].length - 1; d++) {
        if (myModel.content[rowsAndCols[c][d]] === myModel.content[rowsAndCols[c][d + 1]] && myModel.content[rowsAndCols[c][d]] !== 0) {

          var a = [rowsAndCols[c][d], rowsAndCols[c][d + 1]];
          replaceCell.push(a);
          d++
        }
      }
    }

    if (replaceCell.length === 0) {

      myModel.pic.beginPath();
      myModel.pic.rect(15, 15, myModel.cv.width - 30, myModel.cv.height - 30);
      myModel.pic.fillStyle = '#a19a8cbd';
      myModel.pic.fill();

      myModel.pic.font = 'bold 32px Arial';
      myModel.pic.textAlign = 'center';
      myModel.pic.textBaseline = 'middle';
      myModel.pic.fillStyle = 'white';
      myModel.pic.shadowColor = "black";
      myModel.pic.shadowBlur = 20;
      myModel.pic.shadowOffsetX = 15;
      myModel.pic.shadowOffsetY = 15;
      myModel.pic.fillText('Конец игры', (myModel.cv.width - 30) / 2, (myModel.cv.height - 30) / 2 - 40);

      myModel.pic.font = 'bold 32px Arial';
      myModel.pic.textAlign = 'center';
      myModel.pic.shadowColor = "black";
      myModel.pic.shadowBlur = 20;
      myModel.pic.shadowOffsetX = 15;
      myModel.pic.shadowOffsetY = 15;
      myModel.pic.textBaseline = 'middle';
      myModel.pic.fillStyle = 'white';
      myModel.pic.fillText('Ваш счет: ' + myModel.score, (myModel.cv.width - 30) / 2, (myModel.cv.height - 30) / 2 + 50);

      rememberScore();
    }

  }
}

function GameController() {
  var self = this;
  var myModel = null;


  self.start = function (model) {
    myModel = model;
    window.addEventListener('keydown', myModel.move);

    var initialPoint;
    var finalPoint;
    document.addEventListener('touchstart', function (event) {
      event.preventDefault();
      event.stopPropagation();
      initialPoint = event.changedTouches[0];
    }, false);
    document.addEventListener('touchend', function (event) {
      event.preventDefault();
      event.stopPropagation();
      finalPoint = event.changedTouches[0];
      var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
      var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
      if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
          if (finalPoint.pageX < initialPoint.pageX) {
            myModel.moveCell(37, 'first');
          }
          else {
            myModel.moveCell(39, 'first');
          }
        }
        else {
          if (finalPoint.pageY < initialPoint.pageY) {
            myModel.moveCell(38, 'first');
          }
          else {
            myModel.moveCell(40, 'first');
          }
        }
      }
    }, false);

    self.stop = function () {
      myModel = null;
    }


  }
}

var moveAudio = new Audio("move.wav");
var buttonAudio = new Audio("click.aif");
var needSounds = 'true';

function onOffSounds() {
  if (needSounds === 'true') {
    needSounds = 'false';
  } else if (needSounds === 'false') {
    needSounds = 'true';
  }
}

function moveSound() {
  moveAudio.currentTime = 0;
  moveAudio.play();
}



