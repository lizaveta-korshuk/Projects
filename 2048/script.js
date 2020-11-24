"use strict";

function PageModel() {


    var self = this;
    var myView = null;
    var SPAState = {};


    self.start = function(view) {
        myView = view;
        self.switchToStateFromURLHash();
    }

    self.updateView = function() {
        if (myView) {
        } 
    };

    self.switchToStateFromURLHash = function() {

        var URLHash = window.location.hash;
        var stateStr = URLHash.substr(1);

        if (stateStr != "") {
            SPAState = stateStr;
        } else
            SPAState = 'Main';

        switch (SPAState) {
            case 'Main':
                myView.mainPage();
                break;
            case 'Game':
                myView.gamePage();
                break;
            case 'Results':
                myView.resultsPage();
                break;
        }

    }

    self.switchToState = function(newState) {
        location.hash = newState;
    }

    self.switchToMainPage = function() {
        self.switchToState('Main');
    }

    self.switchToGamePage = function() {
        self.switchToState('Game');
    }

    self.switchToResultsPage = function() {
        self.switchToState('Results');
    }



};


function PageView() {
    var self = this;
    var myModel = null;
    var container = document.getElementById('container');
    container.style.width=container.offsetHeight*0.7+'px';
    var buttonAudio = new Audio("click.wav");

    function clickSoundInit() {
        buttonAudio.play();
        buttonAudio.pause();

    }

    self.buttonSound = function() {
        if (needSounds === 'true') {
            buttonAudio.currentTime = 0;
            buttonAudio.play();
        }
    }

    self.start = function(model) {
        myModel = model;
        clickSoundInit();
    }

    self.gameCanvas = function(div) {
        var cv = null;
        var pic = null;

        cv = document.createElement('canvas');
        cv.setAttribute('width', div.offsetWidth);
        cv.setAttribute('height', div.offsetHeight);
        div.appendChild(cv);

        pic = cv.getContext('2d');

        pic.beginPath();
        pic.rect(container.offsetHeight*0.03, container.offsetHeight*0.03, container.offsetHeight*0.34, container.offsetHeight*0.34);
        pic.fillStyle = '#a19a8c';
        pic.fill();
        pic.strokeStyle = '#a19a8c';
        pic.lineJoin = 'round';
        pic.lineWidth = container.offsetHeight*0.06;
        pic.stroke();

        return [cv, pic];
    }


    self.buildCell = function(num, x, y, cv, pic) {

        var w = container.offsetHeight*0.07;
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
        pic.lineWidth = container.offsetHeight*0.02;
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

    self.mainPage = function() {
        container.innerHTML = '';
        var img = document.createElement('div');
        img.setAttribute('class', 'canvas');
        container.appendChild(img);

        img.style.width = container.offsetHeight*0.4+'px';
        img.style.height = img.offsetWidth + 'px';
        img.style.top = container.offsetHeight*0.07+'px';

        var data = self.gameCanvas(img);
        var cv = data[0];
        var pic = data[1];
        var between = cv.width / 16.7
        var w = cv.width / 5.71;

        self.buildCell(0, between, between, cv, pic);
        self.buildCell(0, between * 2 + w, between, cv, pic);
        self.buildCell(0, between * 3 + w * 2, between, cv, pic);
        self.buildCell(4, between * 4 + w * 3, between, cv, pic);
        self.buildCell(0, between, between * 2 + w, cv, pic);
        self.buildCell(0, between * 2 + w, between * 2 + w, cv, pic);
        self.buildCell(16, between * 3 + w * 2, between * 2 + w, cv, pic);
        self.buildCell(8, between * 4 + w * 3, between * 2 + w, cv, pic);
        self.buildCell(0, between, between * 3 + w * 2, cv, pic);
        self.buildCell(4, between * 2 + w, between * 3 + w * 2, cv, pic);
        self.buildCell(4, between * 3 + w * 2, between * 3 + w * 2, cv, pic);
        self.buildCell(32, between * 4 + w * 3, between * 3 + w * 2, cv, pic);
        self.buildCell(4, between, between * 4 + w * 3, cv, pic);
        self.buildCell(8, between * 2 + w, between * 4 + w * 3, cv, pic);
        self.buildCell(4, between * 3 + w * 2, between * 4 + w * 3, cv, pic);
        self.buildCell(16, between * 4 + w * 3, between * 4 + w * 3, cv, pic);

        var rules = document.createElement('div');
        rules.innerHTML = 'Двигайте плитки, соединяя одинаковые цифры. Для того, чтобы передвинуть плитки, смахните пальцем в нужную сторону (для мобильных устройств) или воспользуйтесь следующими клавишами клавиатуры: &larr; &uarr; &rarr; &darr;.';

        rules.style.position = 'absolute';
        rules.style.width = container.offsetHeight*0.65+'px';
        rules.style.textAlign = 'center';
        rules.style.fontFamily = 'Arial, sans-serif';
        rules.style.fontSize = container.offsetHeight*0.028+'px';
        rules.style.top = container.offsetHeight*0.5+'px';
        rules.style.right = '0';
        rules.style.bottom = '0';
        rules.style.left = '0';
        rules.style.marginLeft = 'auto';
        rules.style.marginRight = 'auto';
        container.appendChild(rules);

        var startGame = document.createElement('div');
        startGame.setAttribute('class', 'mainPageButtons');
        startGame.setAttribute('id', 'startGame');
        startGame.addEventListener('click', myModel.switchToGamePage);
        startGame.addEventListener('click', self.buttonSound);
        startGame.innerHTML = 'НАЧАТЬ ИГРУ!';
        startGame.style.top = container.offsetHeight*0.7+'px';
        startGame.style.width = container.offsetHeight*0.5+'px';
        startGame.style.height = container.offsetHeight*0.078+'px';
        startGame.style.lineHeight = container.offsetHeight*0.08+'px';
        startGame.style.fontSize = container.offsetHeight*0.028+'px';
        container.appendChild(startGame);

        var records = document.createElement('div');
        records.setAttribute('class', 'mainPageButtons');
        records.setAttribute('id', 'records');
        records.addEventListener('click', myModel.switchToResultsPage);
        records.innerHTML = 'ТАБЛИЦА РЕКОРДОВ';
        records.addEventListener('click', self.buttonSound);
        records.style.top = container.offsetHeight*0.8+'px';
        records.style.width = container.offsetHeight*0.5+'px';
        records.style.height = container.offsetHeight*0.078+'px';
        records.style.lineHeight = container.offsetHeight*0.08+'px';
        records.style.fontSize = container.offsetHeight*0.028+'px';
        container.appendChild(records);

        var sounds = document.createElement('div');
        sounds.setAttribute('class', 'mainPageButtons');
        sounds.setAttribute('id', 'sounds');
        sounds.addEventListener('click', onOffSounds);
        sounds.addEventListener('click', self.buttonSound);
        sounds.innerHTML = 'ВКЛЮЧИТЬ/ВЫКЛЮЧИТЬ ЗВУКИ';
        sounds.style.top = container.offsetHeight*0.9+'px';
        sounds.style.width = container.offsetHeight*0.5+'px';
        sounds.style.height = container.offsetHeight*0.078+'px';
        sounds.style.lineHeight = container.offsetHeight*0.08+'px';
        sounds.style.fontSize = container.offsetHeight*0.028+'px';
        container.appendChild(sounds);
    }



    self.gamePage = function() {

        container.innerHTML = '';
        var gModel = new GameModel();
        var gView = new GameView();
        var gController = new GameController();

        var table = document.createElement('table');
        var tr1 = document.createElement('tr');
        var tr2 = document.createElement('tr');
        var lab = document.createElement('td');
        lab.setAttribute('colspan', '2');
        lab.setAttribute('rowspan', '2');
        var sc = document.createElement('td');
        var rec = document.createElement('td');
        var step = document.createElement('td');
        var newG = document.createElement('td');
        tr1.appendChild(lab);
        tr1.appendChild(sc);
        tr1.appendChild(rec);
        tr2.appendChild(step);
        tr2.appendChild(newG);
        table.appendChild(tr1);
        table.appendChild(tr2);
        container.appendChild(table);

        table.style.position = 'absolute';
        table.style.width = container.offsetWidth*0.95+'px';
        table.style.top = container.offsetHeight*0.1+'px';


        var label = document.createElement('div');
        label.setAttribute('id', 'label');
        label.style.fontSize=container.offsetHeight*0.1+'px';
        label.innerHTML = '2048';
        lab.appendChild(label);


        var buttScore = document.createElement('div');
        buttScore.setAttribute('class', 'scoreButtons');
        buttScore.style.height = container.offsetHeight*0.1+'px';
        buttScore.style.position = 'relative';
        sc.appendChild(buttScore);

        var textScore = document.createElement('div');
        textScore.setAttribute('class', 'inside');
        textScore.style.top = '10%';
        textScore.style.fontSize=container.offsetHeight*0.03+'px';
        textScore.innerHTML = 'СЧЕТ';
        buttScore.appendChild(textScore);

        var currScore = document.createElement('div');
        currScore.setAttribute('class', 'inside');
        currScore.setAttribute('id', 'score');
        currScore.style.fontSize = container.offsetHeight*0.03+'px';
        currScore.style.top = '50%';
        currScore.innerHTML = '0';
        buttScore.appendChild(currScore);

        var sum = document.createElement('div');
        sum.style.position = 'relative';
        sum.style.height = container.offsetHeight*0.1+'px';
        sum.setAttribute('class', 'scoreButtons');
        rec.appendChild(sum);

        var textSum = document.createElement('div');
        textSum.setAttribute('class', 'inside');
        textSum.style.top = '10%';
        textSum.style.fontSize=container.offsetHeight*0.03+'px';
        textSum.innerHTML = 'РЕКОРД';
        sum.appendChild(textSum);

        var currSum = document.createElement('div');
        currSum.setAttribute('class', 'inside');
        currSum.setAttribute('id', 'record');
        currSum.style.fontSize = container.offsetHeight*0.03+'px';
        currSum.style.top = '50%';
        currSum.innerHTML = '0';
        sum.appendChild(currSum);

        var back = document.createElement('div');
        back.setAttribute('class', 'gamePageButtons');
        back.style.fontSize=container.offsetHeight*0.03+'px';
        back.style.height = container.offsetHeight*0.09+'px';
        back.style.lineHeight = container.offsetHeight*0.09+'px';
        back.innerHTML = 'НАЗАД';
        myModel.gameWasStarted=true;
        back.addEventListener('click', gModel.leaveTheGame);
        back.addEventListener('click', gModel.stop);
        back.addEventListener('click', self.buttonSound);
        back.addEventListener('click', gView.stop);
        back.addEventListener('click', gController.stop);
        back.addEventListener('click', clearGame);
        back.addEventListener('click', myModel.switchToMainPage);
        back.style.cursor = 'pointer';
        step.appendChild(back);

        var startNew = document.createElement('div');
        startNew.setAttribute('class', 'gamePageButtons');
        startNew.style.fontSize=container.offsetHeight*0.03+'px';
        startNew.style.height = container.offsetHeight*0.09+'px';
        startNew.style.lineHeight = container.offsetHeight*0.09+'px';
        startNew.innerHTML = 'СНАЧАЛА';
        startNew.addEventListener('click', gModel.stop);
        startNew.addEventListener('click', gView.stop);
        startNew.addEventListener('click', self.buttonSound);
        startNew.addEventListener('click', gController.stop);
        startNew.addEventListener('click', clearGame);
        startNew.addEventListener('click', self.gamePage);
        startNew.style.cursor = 'pointer';
        newG.appendChild(startNew);


        function clearGame() {
            gModel = null;
            gView = null;
            gController = null;
        }

        gController.start(gModel);
        gView.start(gModel);
        gModel.start(gView);


    }

    self.resultsPage = function() {


        container.innerHTML = '';
        var img = document.createElement('div');
        img.setAttribute('class', 'canvas');
        container.appendChild(img);

        img.style.width = container.offsetHeight*0.4+'px';
        img.style.height = img.offsetWidth + 'px';
        img.style.top = container.offsetHeight*0.07+'px';

        var data = self.gameCanvas(img);
        var cv = data[0];
        var pic = data[1];
        var between = cv.width / 16.7
        var w = cv.width / 5.71;

        self.buildCell(0, between, between, cv, pic);
        self.buildCell(0, between * 2 + w, between, cv, pic);
        self.buildCell(0, between * 3 + w * 2, between, cv, pic);
        self.buildCell(4, between * 4 + w * 3, between, cv, pic);
        self.buildCell(0, between, between * 2 + w, cv, pic);
        self.buildCell(0, between * 2 + w, between * 2 + w, cv, pic);
        self.buildCell(16, between * 3 + w * 2, between * 2 + w, cv, pic);
        self.buildCell(8, between * 4 + w * 3, between * 2 + w, cv, pic);
        self.buildCell(0, between, between * 3 + w * 2, cv, pic);
        self.buildCell(4, between * 2 + w, between * 3 + w * 2, cv, pic);
        self.buildCell(4, between * 3 + w * 2, between * 3 + w * 2, cv, pic);
        self.buildCell(32, between * 4 + w * 3, between * 3 + w * 2, cv, pic);
        self.buildCell(4, between, between * 4 + w * 3, cv, pic);
        self.buildCell(8, between * 2 + w, between * 4 + w * 3, cv, pic);
        self.buildCell(4, between * 3 + w * 2, between * 4 + w * 3, cv, pic);
        self.buildCell(16, between * 4 + w * 3, between * 4 + w * 3, cv, pic);

        var table = document.createElement('table');
        table.setAttribute('id', 'rec');
        table.style.width=container.offsetHeight*0.4+'px';
        table.style.height=container.offsetHeight*0.4+'px';
        table.style.top=container.offsetHeight*0.5+'px';
        table.style.left=(container.offsetWidth/2)-(container.offsetHeight*0.2) + 'px';
        table.style.fontSize=container.offsetHeight*0.02+'px';
        var tr0 = document.createElement('tr');
        var th1 = document.createElement('th');
        th1.innerHTML = '№';
        var th2 = document.createElement('th');
        th2.innerHTML = 'Результат';
        tr0.appendChild(th1);
        tr0.appendChild(th2);

        var tr1 = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.innerHTML = '1';
        var td2 = document.createElement('td');
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        var tr2 = document.createElement('tr');
        var td3 = document.createElement('td');
        td3.innerHTML = '2';
        var td4 = document.createElement('td');
        tr2.appendChild(td3);
        tr2.appendChild(td4);
        var tr3 = document.createElement('tr');
        var td5 = document.createElement('td');
        td5.innerHTML = '3';
        var td6 = document.createElement('td');
        tr3.appendChild(td5);
        tr3.appendChild(td6);
        var tr4 = document.createElement('tr');
        var td7 = document.createElement('td');
        td7.innerHTML = '4';
        var td8 = document.createElement('td');
        tr4.appendChild(td7);
        tr4.appendChild(td8);
        var tr5 = document.createElement('tr');
        var td9 = document.createElement('td');
        td9.innerHTML = '5';
        var td10 = document.createElement('td');
        tr5.appendChild(td9);
        tr5.appendChild(td10);
        var tr6 = document.createElement('tr');
        var td11 = document.createElement('td');
        td11.innerHTML = '6';
        var td12 = document.createElement('td');
        tr6.appendChild(td11);
        tr6.appendChild(td12);
        var tr7 = document.createElement('tr');
        var td13 = document.createElement('td');
        td13.innerHTML = '7';
        var td14 = document.createElement('td');
        tr7.appendChild(td13);
        tr7.appendChild(td14);
        var tr8 = document.createElement('tr');
        var td15 = document.createElement('td');
        td15.innerHTML = '8';
        var td16 = document.createElement('td');
        tr8.appendChild(td15);
        tr8.appendChild(td16);
        var tr9 = document.createElement('tr');
        var td17 = document.createElement('td');
        td17.innerHTML = '9';
        var td18 = document.createElement('td');
        tr9.appendChild(td17);
        tr9.appendChild(td18);
        var tr10 = document.createElement('tr');
        var td19 = document.createElement('td');
        td19.innerHTML = '10';
        var td20 = document.createElement('td');
        tr10.appendChild(td19);
        tr10.appendChild(td20);

        table.appendChild(tr0);
        table.appendChild(tr1);
        table.appendChild(tr2);
        table.appendChild(tr3);
        table.appendChild(tr4);
        table.appendChild(tr5);
        table.appendChild(tr6);
        table.appendChild(tr7);
        table.appendChild(tr8);
        table.appendChild(tr9);
        table.appendChild(tr10);
        container.appendChild(table);

        var records;

        function results() {
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
                if (records[0]) {
                    td2.innerHTML = records[0];
                }
                if (records[1]) {
                    td4.innerHTML = records[1];
                }
                if (records[2]) {
                    td6.innerHTML = records[2];
                }
                if (records[3]) {
                    td8.innerHTML = records[3];
                }
                if (records[4]) {
                    td10.innerHTML = records[4];
                }
                if (records[5]) {
                    td12.innerHTML = records[5];
                }
                if (records[6]) {
                    td14.innerHTML = records[6];
                }
                if (records[7]) {
                    td16.innerHTML = records[7];
                }
                if (records[8]) {
                    td18.innerHTML = records[8];
                }
                if (records[9]) {
                    td20.innerHTML = records[9];
                }

            }
        }

        function errorHandler(jqXHR, statusStr, errorStr) {
            alert(statusStr + ' ' + errorStr);
        }

        results();

        var backButt = document.createElement('div');
        backButt.setAttribute('class', 'back');

        backButt.innerHTML = 'НАЗАД';
        backButt.style.position = 'absolute';
        backButt.style.width=container.offsetHeight*0.4+'px';
        backButt.style.height=container.offsetHeight*0.05+'px';
        backButt.style.top=container.offsetHeight*0.93+'px';
        backButt.style.left=(container.offsetWidth/2)-(container.offsetHeight*0.2) + 'px';
        backButt.style.fontSize=container.offsetHeight*0.026+'px';
         backButt.style.lineHeight=container.offsetHeight*0.05+'px';
        backButt.addEventListener('click', myModel.switchToMainPage);
        backButt.addEventListener('click', self.buttonSound);
        container.appendChild(backButt);


    }
}

function PageController() {
    var self = this;
    var myModel = null;


    self.start = function(model) {
        myModel = model;
        window.onhashchange = myModel.switchToStateFromURLHash;
    }


}

var pView = new PageView();
var pModel = new PageModel();
var pController = new PageController();

pController.start(pModel);
pView.start(pModel);
pModel.start(pView);