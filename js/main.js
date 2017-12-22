//Создание канвы
var canvas = document.getElementById("tetris");
var ctx = canvas.getContext("2d");

//Размер элементарного элемента
var width = 30;
var height = 30;

//Координата появления фигуры
var x=4;
var y=0;

//Массив игрового поля
var columnCount = canvas.width/width;
var rowCount = canvas.height/height;

//Количество очков
var scores=0;

//Скорость игры
var spdGame=800;

//Переключатель паузы
var pause=false;

//Обработчики события клавиш управления
//document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);

//Клавиша управления нажата
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        pressRightBtn();
    } else if (e.keyCode == 37) {
        pressLeftBtn();
    } else if (e.keyCode == 40) {
        pressDownBtn();
    } else if (e.keyCode == 38) {
        pressUpBtn();
    }
}
/*//Клавиша управления отпущена
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    } else if (e.keyCode == 40) {
        downPressed = false;
    } else if (e.keyCode == 38) {
        upPressed = false;
    }
}*/

//Поле canvas - массив [rowCount][columnCount] с координатами фигуры
var field = [];
for (var j=0; j<rowCount; j++) {
    field[j]=[];
    for (var i=0; i<columnCount; i++) {
        field[j][i]=0;
    }
}

//Поле canvas - массив [rowCount][columnCount] с координатами упавших фигуры
var building = [];
for (var j=0; j<rowCount; j++) {
    building[j]=[];
    for (var i=0; i<columnCount; i++) {
        building[j][i]=0;
    }
}

//Получить тип фигуры
function getTypeFigure(min, max) {
    var rand = min+Math.random()*(max+1-min);
    rand=Math.floor(rand);
    return rand;
}

function OFigure(cordX, cordY) {
    //Конфигурации фигуры
    this.config = [
        [0, 1, 1, 0, 1, 1, 0, 0, 0]
    ];
    this.curCfg=0;
    //Изменить конфигурацию фигуры на следующую
    this.setCfg = function() {
        if ((this.curCfg+1)<this.config.length) {
            this.curCfg += 1;
        } else {
            this.curCfg = 0;
        }
    };
    //Размер стороны фигуры в базовых элементах
    this.sideSize=3;
    //Получить рандом конфигурацию
    this.getRandCfg = function() {
        var min = 0;
        var max = this.config.length-1;
        var randCfg = 0+Math.random()*(max+1-min);
        randCfg=Math.floor(randCfg);
        return randCfg;
    };
}
function SFigure(cordX, cordY) {
    this.config = [
        [0, 1, 0, 0, 1, 1, 0, 0, 1],
        [0, 1, 1, 1, 1, 0, 0, 0, 0],
    ];
    this.curCfg=0;
    //Изменить конфигурацию фигуры на следующую
    this.setCfg = function() {
        if ((this.curCfg+1)<this.config.length) {
            this.curCfg += 1;
        } else {
            this.curCfg = 0;
        }
    };
    //Размер стороны фигуры в базовых элементах
    this.sideSize=3;
    //Получить рандом конфигурацию
    this.getRandCfg = function() {
        var min = 0;
        var max = this.config.length-1;
        var randCfg = 0+Math.random()*(max+1-min);
        randCfg=Math.floor(randCfg);
        return randCfg;
    };
}
function TFigure(cordX, cordY) {
    this.config = [
        [1, 1, 1, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 0, 1, 1, 0, 0, 1, 0],
    ];
    this.curCfg=0;
    //Изменить конфигурацию фигуры на следующую
    this.setCfg = function() {
        if ((this.curCfg+1)<this.config.length) {
            this.curCfg += 1;
        } else {
            this.curCfg = 0;
        }
    };
    //Размер стороны фигуры в базовых элементах
    this.sideSize=3;
    //Получить рандом конфигурацию
    this.getRandCfg = function() {
        var min = 0;
        var max = this.config.length-1;
        var randCfg = 0+Math.random()*(max+1-min);
        randCfg=Math.floor(randCfg);
        return randCfg;
    };
}
function ZFigure(cordX, cordY) {
    //Массив конфигураций фигуры
    this.config = [
        [0, 1, 0, 1, 1, 0, 1, 0, 0],
        [1, 1, 0, 0, 1, 1, 0, 0, 0],
    ];
    this.curCfg=0;
    //Изменить конфигурацию фигуры на следующую
    this.setCfg = function() {
        if ((this.curCfg+1)<this.config.length) {
            this.curCfg += 1;
        } else {
            this.curCfg = 0;
        }
    };
    //Размер стороны фигуры в базовых элементах
    this.sideSize=3;
    //Получить рандом конфигурацию
    this.getRandCfg = function() {
        var min = 0;
        var max = this.config.length-1;
        var randCfg = 0+Math.random()*(max+1-min);
        randCfg=Math.floor(randCfg);
        return randCfg;
    };
}
function LFigure(cordX, cordY) {
    this.config = [
        [0, 1, 0, 0, 1, 0, 0, 1, 1],
        [0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0],
    ];
    this.curCfg=0;
    //Изменить конфигурацию фигуры на следующую
    this.setCfg = function() {
        if ((this.curCfg+1)<this.config.length) {
            this.curCfg += 1;
        } else {
            this.curCfg = 0;
        }
    };
    //Размер стороны фигуры в базовых элементах
    this.sideSize=3;
    //Получить рандом конфигурацию
    this.getRandCfg = function() {
        var min = 0;
        var max = this.config.length-1;
        var randCfg = 0+Math.random()*(max+1-min);
        randCfg=Math.floor(randCfg);
        return randCfg;
    };
}
function JFigure(cordX, cordY) {
    this.config = [
        [0, 1, 0, 0, 1, 0, 1, 1, 0],
        [1, 1, 1, 0, 0, 1, 0, 0, 0],
        [1, 1, 0, 1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 1, 1, 0, 0, 0],
    ];
    this.curCfg=0;
    //Изменить конфигурацию фигуры на следующую
    this.setCfg = function() {
        if ((this.curCfg+1)<this.config.length) {
            this.curCfg += 1;
        } else {
            this.curCfg = 0;
        }
    };
    //Размер стороны фигуры в базовых элементах
    this.sideSize=3;
    //Получить рандом конфигурацию
    this.getRandCfg = function() {
        var min = 0;
        var max = this.config.length-1;
        var randCfg = 0+Math.random()*(max+1-min);
        randCfg=Math.floor(randCfg);
        return randCfg;
    };
}
function IFigure(cordX, cordY) {
    this.config = [
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.curCfg=0;
    //Изменить конфигурацию фигуры на следующую
    this.setCfg = function() {
        if ((this.curCfg+1)<this.config.length) {
            this.curCfg += 1;
        } else {
            this.curCfg = 0;
        }
    };
    //Размер стороны фигуры в базовых элементах
    this.sideSize=4;
    //Получить рандом конфигурацию
    this.getRandCfg = function() {
        var min = 0;
        var max = this.config.length-1;
        var randCfg = 0+Math.random()*(max+1-min);
        randCfg=Math.floor(randCfg);
        return randCfg;
    };
}
//Добавить новую фигуру на канву
function newFigure(array) {
    var typeObj=getTypeFigure(1, 7);
    var obj=0;
    switch (typeObj) {
        case 1:
            obj=new ZFigure(x, y);
            obj.curCfg=obj.getRandCfg();
            break;
        case 2:
            //s-зигзаг
            obj=new SFigure(x, y);
            obj.curCfg=obj.getRandCfg();
            break;
        case 3:
            //Квадрат
            obj=new OFigure(x, y);
            obj.curCfg=obj.getRandCfg();
            break;
        case 4:
            //тавр
            obj=new TFigure(x, y);
            obj.curCfg=obj.getRandCfg();
            break;
        case 5:
            //z-зигзаг
            obj=new ZFigure(x, y);
            obj.curCfg=obj.getRandCfg();
            break;
        case 6:
            //l-кочерга
            obj=new LFigure(x, y);
            obj.curCfg=obj.getRandCfg();
            break;
        case 7:
            //I-палка
            obj=new IFigure(x, y);
            obj.curCfg=obj.getRandCfg();
            break;
    }

    // j, i - координаты канвы; yj, xi - относительные координаты фигуры(её конфигурация)
    // Загружаем фигуру на канву
    for (var j=0, yj=0; j<obj.sideSize; j++, yj++)
        for (var i=x, xi=0; i<x+obj.sideSize; i++, xi++) {
            array[j][i]=obj.config[obj.curCfg][yj*obj.sideSize+xi]
        }
    return obj;
}

//Сдвинуть фигуру влево на единицу
function moveLeft(array, arrayBuilding) {
    if (!isLeftWall(array)&&!isLeftCollision(array, arrayBuilding)) {
        var temp=0;
        for (var j=0; j<rowCount; j++) {
            for (var i=0; i<columnCount-1; i++) {
                if (array[j][i+1]!=0) {
                    temp=array[j][i+1];
                    array[j][i+1] = 0;
                    array[j][i]=temp;
                }
            }
        }
        //Смещение начала относительных координат фигуры по оси абцисс
        x--;
    }
}
//Сдвинуть фигуру вправо на единицу
function moveRight(array, arrayBuilding) {
    if (!isRightWall(array)&&!isRightCollision(array, arrayBuilding)) {
        var temp=0;
        for (var j=rowCount-1; j>=0; j--) {
            for (var i=columnCount-1; i>0; i--) {
                if (array[j][i-1]!=0) {
                    temp=array[j][i-1];
                    array[j][i-1] = 0;
                    array[j][i]=temp;
                }
            }
        }
        //Смещение начала относительных координат фигуры по оси абцисс
        x++;
    }
}
//Повернуть фигуру
//i, j - абсолютные координаты
//xi, yj - относительные координаты
function rotate(array, obj, arrayBuilding, x, y) {
    if (isRotate(obj, arrayBuilding, x, y)) {
        obj.setCfg();
        for (var j=y, yj=0; j<y+obj.sideSize; j++, yj++)
            for (var i=x, xi=0; i<x+obj.sideSize; i++, xi++)
                array[j][i]=obj.config[obj.curCfg][yj*obj.sideSize+xi];
    }
}
//Уронить фигуру
function moveDown(array, arrayBuilding) {
    if (!isCollision(array, arrayBuilding) && !isBottomWall(array)) {
        for (var j=rowCount-1; j>=0; j--) {
            for (var i=columnCount-1; i>=0; i--) {
                if (array[j][i]!=0) {
                    var temp=array[j][i];
                    array[j][i]=0;
                    array[j+1][i]=temp;
                }
            }
        }
        y++;
        return true;
    }
    return false;
}

//Нажатие кнопки
function pressPause() {
    if (pause===false) {
        pause=true;
    }
    else {
        pause=false;
        startTimer();
    }
}

//Проверка столкновения фигуры с левой стеной
function isLeftWall(array) {
    var i=0;
    //Проверяем 0-колонку
    for (var j=0; j<rowCount; j++) {
        if (array[j][i]!=0) {
            //alert("Уперлось в стену");
            return true;
        }
    }
    return false;
}
//Проверка столкновения фигуры с правой стеной
function isRightWall(array) {
    var i=columnCount-1;
    for (var j=0; j<rowCount; j++)
        if (array[j][i]!=0) {
            //alert("Уперлось в стену");
            return true;
        }
    return false;
}
//Проверка возможности поворота фигуры
function isRotate(obj, arrayBuilding, x, y) {
    if ((x<=(columnCount-obj.sideSize))&&(x>=0)&&(y<=(rowCount-obj.sideSize))&&(!isRotateCollision(obj, arrayBuilding, x, y))) {
        return true;
    } else {
        return false;
    }
}

//Проверка столкновения фигуры с дном или постройкой
function isCollision(array, arrayBuilding, x, y) {
    for (var j=rowCount-2; j>=0; j--) {
        for (var i=columnCount-1; i>=0; i--) {
            if ((array[j][i]!=0)&&(arrayBuilding[j+1][i]!=0)) {
                return true;
            }
        }
    }
    return false;
}

function isRightCollision(array, arrayBuilding) {
    for (var j=rowCount-1; j>=0; j--) {
        for (var i=columnCount-2; i>=0; i--) {
            if ((array[j][i]!=0)&&(arrayBuilding[j][i+1]!=0)) {
                return true;
            }
        }
    }
    return false;
}

function isLeftCollision(array, arrayBuilding) {
    for (var j=0; j<rowCount; j++) {
        for (var i=0; i<columnCount-1; i++) {
            if ((arrayBuilding[j][i]!=0)&&(array[j][i+1]!=0)) {
                return true;
            }
        }
    }
    return false;
}

function isRotateCollision(obj, arrayBuilding, x, y) {
    for (var yj=y; yj<y+obj.sideSize; yj++) {
        for (var xi=x; xi<x+obj.sideSize; xi++) {
            if (arrayBuilding[yj][xi]!=0) {
                return true;
            }
        }
    }
    return false;
}

//Проверка столкновения с дном стакана
//index - jкоордината массива
function isBottomWall(array) {
    var j=rowCount-1;
    for (var i=columnCount-1; i>=0; i--) {
        if (array[j][i]!=0) {
            return true;
        }
    }
    return false;
}

//Обработка клавиш управления
function pressRightBtn() {
    moveRight(field, building);
}
function pressLeftBtn() {
    moveLeft(field, building);
}
function pressDownBtn() {
    moveDown(field, building);
}
function pressUpBtn() {
    rotate(field, a, building, x, y);
}

function displayFigure(context, obj, x, y) {
    clearPartDisplay(context, 0, 0, canvas.width, canvas.height)
    var count=obj.config[obj.curCfg].length;
    for (var k=0; k<count; k++) {
         if (obj.config[obj.curCfg][k]!=0) {
             var yj=Math.floor((k)/obj.sideSize);
             var xi=k-obj.sideSize*yj;

             context.beginPath();
             context.fillStyle = "white";
             context.fillRect((x+xi)*width, (y+yj)*height, width, height);
             context.fillStyle = "#ff1a1a";
             context.fillRect((x+xi)*width+width/6, (y+yj)*height+height/6, width*2/3, height*2/3);
             context.strokeStyle = "#ff1a1a";
             context.strokeRect((x+xi)*width, (y+yj)*height, width, height);
             context.closePath();
         }
    }
}

//отобразить
function displayBuilding(context, arrayBuilding) {
    context.beginPath();
    for (var j=0; j<rowCount; j++) {
        for (var i=0; i<columnCount; i++) {
            if (arrayBuilding[j][i]==1) {
                //context.clearRect(i*width, j*height, width, height);
                context.fillStyle="white";
                context.fillRect(i*width, j*height, width, height);
                context.fillStyle="#240466";
                context.fillRect(i*width+width/6, j*height+height/6, width*2/3, height*2/3);
                context.strokeStyle = "#240466";
                context.strokeRect(i*width, j*height, width, height);
            }
        }
    }
    context.closePath();
}

//Добавить фигуру в массив постройки
function addToBuilding(array, arrayBuilding) {
    for (var j=0; j<rowCount; j++)
        for (var i=0; i<columnCount; i++) {
            if(array[j][i]!=0) {
                arrayBuilding[j][i]=array[j][i];
            }
        }
}

//Очистить массив с элементами фигуры
function clearFigure(array) {
    for (var j=0; j<rowCount; j++) {
        field[j]=[];
        for (var i=0; i<columnCount; i++) {
            field[j][i]=0;
        }
    }
}

function clearPartDisplay(context, x, y, w, h) {
    context.clearRect(x, y, w, h);
}

//Функция завершения игры
function gameOver(array, arrayBuilding) {
    if (y==0 && !moveDown(array, arrayBuilding)) {
        return true;
    }
    return false;
}

//Удаление заполненной строки
function killRow(arrayBuilding) {
    for (var j=rowCount-1; j>=0; j--) {
        var flag=-1;
        for (var i=columnCount-1; i>=0; i--) {
            if (arrayBuilding[j][i]==0) {
                flag=0;
                continue;
            }
        }
        if (flag==-1) {
            for (var yj=j; yj>0; yj--) {
                for (var xi=columnCount-1; xi>=0; xi--) {
                    var temp=arrayBuilding[yj-1][xi];
                    arrayBuilding[yj][xi]=temp;
                    arrayBuilding[yj-1][xi]=0;
                }
            }
            j++;
            counterScores();
            setSpeedGame();
        }
    }
}

//Счетчик очков
function counterScores() {
    scores+=100;
    document.getElementById('scores').innerHTML='Счёт: '+scores;
}

//Задать скорость игры
function setSpeedGame() {
    var level=parseInt(scores/1000);
    spdGame=800-100*level;
    document.getElementById('level').innerHTML='Уровень: '+level;
}

//Сбросить выпавшую фигуру
function resetCurrentFigure(obj) {
    obj=null;
    x=4; y=0;
}

var a=newFigure(field);

var startTimer=function() {
    var timer=setInterval(function() {
        switch(pause) {
            case true:
                clearInterval(timer);
                break;
            case false:
                if (moveDown(field, building)) {
                    return;
                } else {
                    clearInterval(timer);
                    addToBuilding(field, building);
                    clearFigure(field);
                    killRow(building);
                    resetCurrentFigure(a);
                    a=newFigure(field);

                    if (gameOver(field, building)) {
                        clearInterval(timer2);
                        alert("Game over");
                    } else {
                        startTimer();
                    }
                }
                break;
        }
    }, spdGame);
}

timer2=setInterval(function() {
    displayFigure(ctx, a, x, y);
    displayBuilding(ctx, building);
}, 10);

startTimer();
