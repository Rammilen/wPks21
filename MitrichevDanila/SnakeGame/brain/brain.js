var cvs		= document.getElementById('canvas'),
ctx		= cvs.getContext('2d');

//	Одна клетка
var box = 32;

//	Загрузка изображений
var bgImg 			= new Image();
bgImg.src 			= "../MitrichevDanila/SnakeGame/img/ground.png";
var foodImg 		= new Image();
foodImg.src 		= "../MitrichevDanila/SnakeGame/img/food.png";
var speedFoodImg	= new Image();
speedFoodImg.src 	= "../MitrichevDanila/SnakeGame/img/speedFood.png"
var scoreFoodImg	= new Image();
scoreFoodImg.src 	= "../MitrichevDanila/SnakeGame/img/scoreFood.png"
var goldFoodImg	= new Image();
goldFoodImg.src 	= "../MitrichevDanila/SnakeGame/img/goldFood.png";

//	Змея
var snake 	= [{
	x: box * 9,
	y: box * 10}];

//	Еда
var food 	= {
	x: Math.floor(Math.random() * 17 + 1) * box,
	y: Math.floor(Math.random() * 15 + 3) * box,
	prop: Math.floor(Math.random() * 5 - 2)};

//	Счёт и скорость
var score 	= 0;
var speed 	= 200;
var boxPerSecond = 1000 / 200;

//	Чит-коды
var god = false;
var GOD = [71, 79, 68];	//	Последовательность нажатий
var BOT = [66, 79, 84];
//	Направление змеи
var d;

//	Управление змеёй
document.addEventListener('keydown', keyPress);
function keyPress(e){
	if(e.keyCode == 65 &&	d !== 'right'	|| e.keyCode == 65 && god == true){
		d = 'left';
	}else if(e.keyCode == 87 &&	d !== 'down'	|| e.keyCode == 87 && god == true){
		d = 'up';
	}else if(e.keyCode == 68 &&	d !== 'left'	|| e.keyCode == 68 && god == true){
		d = 'right';
	}else if(e.keyCode == 83 &&	d !== 'up'	|| e.keyCode == 83 && god == true){
		d = 'down';
	}

	if(e.keyCode == 109) speed += 50;
	if(e.keyCode == 107) speed -= 50;
	console.clear();
	console.log('FPS игры:' + speed);

	if(e.keyCode == GOD[0])	GOD.shift();

	if(e.keyCode == BOT[0]) BOT.shift();
	console.log('Код кнопки: ' + window.event.keyCode);
}

//	Столкновеновение с собой
function collision(newHead,snake){
	for(var i = 0; i < snake.length; i++){
		if(newHead.x == snake[i].x && newHead.y == snake[i].y){
			if(god){
				return false;
			}else {
				return true;
			}
		}
	}
	return false;
}

//	Рисование в канвасе
function draw() {
	ctx.drawImage(bgImg, 0, 0);
	if(GOD.length == 0)	god = true;
	if(BOT.length == 0)	snakeBot();
/*
	console.clear();
	console.table(snake);
	console.log(food);
	*/

	for (var i = 0; i < snake.length; i++) {
		ctx.fillStyle = (i == 0)? "#339933" : "#44aa44";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);

		ctx.strokeStyle = "#44ff44";
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);
	}

	if(food.prop <= -1){
		food.prop = -food.prop;
	}else {
		if (food.prop == 0)	ctx.drawImage(speedFoodImg, food.x, food.y);
		if (food.prop == 1)	ctx.drawImage(scoreFoodImg, food.x, food.y); 
		if (food.prop == 2)	ctx.drawImage(foodImg, food.x, food.y);		
		if (food.prop == 5)	ctx.drawImage(goldFoodImg, food.x, food.y);		
	}

	 //	Старая позиция головы
	 var snakeX		= snake[0].x;
	 var snakeY		= snake[0].y;


	 if( d == "left")	snakeX -= box;
	 if( d == "up")		snakeY -= box;
	 if( d == "right")	snakeX += box;
	 if( d == "down")	snakeY += box;

	 //	Поедание еды
	 if(snakeX == food.x &&	snakeY == food.y){	
	 	score++;	//	Счет очков

	 	console.clear();	//	Очистка консоли

	 	clearInterval(game);	//	Остановка времени

	 //	Бонусы
	 if(food.prop == 0)	speed += 50;	//	Замедление
	 if(food.prop == 1)	score += Math.round(Math.random() * 5 * Math.random() * 10);	//	Доп. очки
	 if(food.prop == 2 && snake.length > 1)	snake.pop();	//	Удаление хвоста
	 if(food.prop == 5)	{
	 	score += Math.round(Math.random() * 50);
	 	timerGod = 5;
	 	sec = 0; 
	 	secGod = 2500; 
	 	godTimer 	= setInterval(godTime, 50);
	 }	//	Запуск режима бога

	 boxPerSecond = Math.round( 1000 / speed);	//	Подсчет скорости
	 speed -= 10 	//	Увеличение скорости
	 boxPerSecond = Math.round( 1000 / speed);	//	Подсчет скорости

	 game = setInterval(draw, speed);	//	Запуск времени
	 while(food.x == snake[0].x || food.y == snake[0].y){
		 food 	= {	//	Создание новой еды
		 	x: Math.floor(Math.random() * 17 + 1) * box,
		 	y: Math.floor(Math.random() * 15 + 3) * box,
		 	prop: Math.floor(Math.random() * 5 - 2)};
	 }

	 	if(food.prop <= -1)	food.prop = -food.prop;	//	Унарный минус	|Модуль свойства еды|

	 	
	 	console.log('Режим бога: ' + god);
	 	console.log('Свойства еды: ' + food.prop);
	 	console.log('FPS игры: ' + speed);
	 	console.log('Кол-во очков: ' + score);
	 	console.log('Скорость: ' + boxPerSecond);
	 	console.log('Длина змеи: ' + snake.length);
	 }
	 else{
	 	snake.pop();
	 }


	 //	Новая голова
	 var newHead = {
	 	x: snakeX,
	 	y: snakeY,
	 };

	 


	 //	Конец игры
	 if(god == false){
	 	if(snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17 || collision(newHead,snake)){
	 		clearInterval(game);
	 		ctx.fillStyle = "#dd4444";
	 		ctx.font = "104px Arial";
	 		ctx.fillText("Game Over", box, box * (15/2+3));
	 	}
	 }
	 

	 snake.unshift(newHead);

	 ctx.fillStyle = "white";
	 ctx.font = '45px Arial';
	 ctx.fillText(score, box * 2, box * 1.6);	//	Кол-во очков вывод на экран

	 ctx.fillText(boxPerSecond, box * 5, box * 1.6);	//	Спидометр

	 ctx.font = '35px Arial';
	 ctx.fillText('куб/сек', box * 6.5, box * 1.6);	//	куб/сек

	 ctx.fillText(minutes, box * 14, box * 1.6);	// Таймер - минуты
	 ctx.fillText(':', box * 15.5, box * 1.6);	// Таймер - разделение
	 ctx.fillText(seconds, box * 16, box * 1.6);	// Таймер - секунды

	 if(god == true){	//Надпись "режим бога"
	 	ctx.font = '15px Arial';
	 ctx.fillText('Режим бога', box , box * 2.75);
	 ctx.fillText(timerGod, box * 4, box * 2.75);
	}else {
		secGod = 2500;
	}
}

	var game 	= setInterval(draw, speed);	//	Скорость игры

	//	Секундамер
	var time 		= setInterval(timer, 1000);	//	Секундамер и таймер спавна голдФуда
	var godTimer 	= setInterval(godTime, 50);	//	Время бога
	clearInterval(godTimer);
	var seconds 	= 0,	//	Секунды
	sec 			= 0,	//	Секунды для спавна голдФуда
	timerGod 	= 5,	//	Длительность режима бога
	secGod ,	//	Длительность "режима бога"
	minutes 	= 0;	//	Минуты

	function timer(){	//	Секундамер и таймер спавна голдФуда
		seconds++;
		sec++;
		if(god == true){
			timerGod--;
		}
		if(timerGod < 0 && god == true){
			timerGod = 5;
		}
		
		if(seconds == 60){
			seconds = 0;
			minutes += 1;
		}
		if(god == true || GOD.length != 0){
			if(sec % 20 == 0){
				while(food.x == snake[0].x || food.y == snake[0].y){
						 food 	= {	//	Создание новой еды
						 	x: Math.floor(Math.random() * 17 + 1) * box,
						 	y: Math.floor(Math.random() * 15 + 3) * box,
						 	prop: 5};
					 }
			}
				if(sec % 25 == 0){
					while(food.x == snake[0].x || food.y == snake[0].y){
						 food 	= {	//	Создание новой еды
						 	x: Math.floor(Math.random() * 17 + 1) * box,
						 	y: Math.floor(Math.random() * 15 + 3) * box,
						 	prop: Math.floor(Math.random() * 5 - 2)};
					 }
				}
		}
	}


	function godTime(){
		if(secGod >= 25){
			god = true;
			secGod -= 25;
				}

				if(secGod <= 0 ){
					god = false;
					clearInterval(godTime);
					clearInterval(godTimer);
				}else {

				}
			}

//					{x: 32, y: 96}
//					{x: 544, y: 544}
function snakeBot(){
//speed = 100;
	if(food.y < snake[0].y && d !== 'down') 	d = 'up';		// Вверх 
	if(food.y > snake[0].y && d !== 'up')	d = 'down';			// Вниз
	if(food.x < snake[0].x && d !== 'right')	d = 'left';		//Влево
	if(food.x > snake[0].x && d !== 'left')	d = 'right';	//	Вправо
	
	/*
	if(d == 'up' && snake[0].y !== 96)	d = 'up';
	if(d == 'up' && snake[0].y == 96 && snake[0].x >= 32)	d = 'right';
	if(d == 'right' && snake[0].y == 96 && snake[0].x == 544)	d = 'down';

	if(d == 'right' && snake[0].y >= 96 && snake[0].x == 544) d = 'down';
	if(d == 'down' && snake[0].y == 544 && snake[0].x == 544) d = 'left';

	if(d == '')
		*/
	/*
	if(food.y == snake[0].y && snake[0].x >= 32 && snake[0].x < 544 && d != 'left'){
		d = 'right';
	}else if(food.y == snake[0].y && snake[0].x >= 32 && snake[0].x < 544 && d != 'right'){
		d = 'right';
	}
	*/
}