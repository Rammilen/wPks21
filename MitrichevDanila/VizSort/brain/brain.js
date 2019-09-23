var 	cvs 	= document.getElementById('cvsViz'),
c 	= cvs.getContext('2d');
c.font 		= '14px Arial';

var cWidth 		= 800;	//	Ширина канваса
var cHeight 	= 450;	//	Длина канваса
var arr 			= [];		//	Основной массив
var arrTemp 	= [];		//	Доп. массив
var j 			= 0;		//	Для цикла for(;;);
var i 			= 0;		//	Для цикла for(;;);
var tic 			= 0;		//	Для цикла for(;;);
var toc 			= 0;		//	Для цикла for(;;);
var sortSpeed	= document.getElementById('speed').value*1;		//	Скорость сортировки
var line 		= document.getElementById('lines').value*1;		//	Количество линий
var sortTimer;		//	Таймер вызова функции сортировки
var temp 		= 0;		//	Для подсчета массива
var lineHeight = 1.125;	//	Высота линии
var lineWidth 	= 1;	//	Ширина линии
var lineStep 	= 0;	//	Отступ между линиями
var left 		= 0;	//	Для коктельной сортировки левая позития
var coctailTemp = 1;
var right 		= arr.length - 1;	//	Для коктельной сортировки правая
var milliseconds = 0; // Миллисекунды
var seconds 	= 0;	// Секунды
var minutes 	= 0;	// Минуты

function updateValues(){
j 					= 0;		//	Для цикла for(;;);
i 					= 0;		//	Для цикла for(;;);
tic 				= 0;		//	Для цикла for(;;);
toc 				= 0;		//	Для цикла for(;;);
temp 				= 0;		//	Для подсчета массива
left 				= 0;	//	Для коктельной сортировки левая позития
coctailTemp 	= 1;
right 			= arr.length - 1;	//	Для коктельной сортировки правая
}

drawArray();	
// 	Рисование массива
function drawArray(){
	line 			= document.getElementById('lines').value*1;		
	arr.length 	= line;
	switch (line) {		//	Подгонка рамера линий
		case 100: 	
		lineHeight = 4.5;		
		lineWidth = 4.5;		
		lineStep 	= 6; break;

		case 200: 	
		lineHeight = 2.25;	
		lineWidth = 2.25;		
		lineStep 	= 2; break;

		case 300: 	
		lineHeight = 1.5;		
		lineWidth = 1.5; 		
		lineStep 	= 0.67; break;

		case 400: 	
		lineHeight = 1.125;	
		lineWidth = 1.125; 	
		lineStep 	= 0; break;

		case 500: 	
		lineHeight = 0.9;	
		lineWidth = 1; 	
		lineStep 	= -0.4; break;

		default: /*alert("Эмм.. Ошибка?")*/;
	};
	c.fillStyle = '#333333';
	c.fillRect(0, 0, cWidth, cHeight);
	c.fillStyle = '#dddddd';
	c.fillText(line, 10, 20);
	for(i = 0; i < line; i++){		//	Отрисовка массива
		c.fillRect(( 2+lineStep) * i , cHeight - i * lineHeight, lineWidth, i * lineHeight);
		arr[i] 		= i;
		arrTemp[i] 	= i;
	}
	right = arr.length - 1;
	toc = right;
	updateValues();
}


// 	Выбор сортировки
function sort(){
	var chooseSort = document.getElementById('select-sort').value;
	switch (chooseSort) {
		case 'Bubble': 		bubbleSort(); break;
		case 'Coctail': 		coctailSort(); break;
		case 'Selection': 	selectionSort(); break;
	}

}


// 	Перемешивание массива
function shuffle(a, b){
	return Math.random() - 0.5;
}


// 	Отрисовка перемешанного массива
function drawShuffleArray(){
	arr.sort(shuffle);		//	Перемешивание
	c.clearRect(0, 0, cWidth, cHeight);
	c.fillStyle = '#dddddd';
	c.fillText(line, 10, 20);
	for(i in arr){
		c.fillRect(( 2+lineStep) * i, cHeight - arr[i] * lineHeight, lineWidth, arr[i] * lineHeight);		//	Отрисовка перемешанного массива
	}
	i = 0;
	j = 0;
}


// 	Сортировка пузырьком
function bubbleSort(){
	sortSpeed	= document.getElementById('speed').value;
	sortTimer = setTimeout(bubbleSort, sortSpeed);		
	c.clearRect(0, 0, cWidth, cHeight);

	for(i in arr){		//	Отрисовка массива
		c.fillStyle = '#dddddd';
		c.fillRect(( 2+lineStep) * i, cHeight - arr[i] * lineHeight, lineWidth, arr[i] * lineHeight);
	}
	c.fillText(line, 10, 20);

	if(arr[j] > arr[j+1]){		//	Элемент массива
		c.fillStyle = '#dd3333';
		c.fillRect(( 2+lineStep) * j, cHeight - arr[j] * lineHeight, lineWidth, arr[j] * lineHeight);
		var a = arr[j];			// Начало сортировки
		var b = arr[j+1];
		arr[j] = b;
		arr[j+1] = a;
		j++;
		
	}else if(arr[j] < arr[j+1]){
		//	Остановка сортировки
		for(i in arr){
			if(arr[i] == arrTemp[i]){
				temp++;
				if(temp >= line){
					j = 0;
					i = 0;
					right = arr.length - 1;
					temp = 0;
					clearTimeout(sortTimer);
					updateValues();
				}
			}else {
				temp = 0;
			}
		}
		var a = arr[j];
		var b = arr[j+1];
		arr[j] = b;
		arr[j+1] = a;
	}else {
		j = 0;
	}
}

//	Коктель-сортировка
function coctailSort(){
	sortSpeed	= document.getElementById('speed').value*1;
	sortTimer = setTimeout(coctailSort, sortSpeed)*1;		
	c.clearRect(0, 0, cWidth, cHeight);

	for(i in arr){		//	Отрисовка массива
		c.fillStyle = '#dddddd';
		c.fillRect(( 2+lineStep) * i, cHeight - arr[i] * lineHeight, lineWidth, arr[i] * lineHeight);
	}
	c.fillText(line, 10, 20);

	//	Остановка сортировки
	if(left > right){		
		tic = 0;
		left = 0;
		right = arr.length - 1;
		toc = right;
		temp = 0;
		clearTimeout(sortTimer);
		updateValues();
	}

	for(i in arr){		//	Проверка на отсортировки
		if(arr[i] == arrTemp[i]){
			temp++;
			if(temp >= line){
				tic = 0;
				left = 0;
				right = arr.length - 1;
				toc = right;
				temp = 0;
				clearTimeout(sortTimer);
				updateValues();
			}
		}else{
			temp = 0;
		}
	}

	if(tic >= right){		//	Справа - налево
		coctailTemp = 0;
		right--;
		tic = left;
		//console.log('tic: ' + tic);
		//console.log('right: ' + right);
	}

	if(toc <= left){		//	Слева - направо
		coctailTemp = 1;
		left++;
		toc = right;
		//console.log('toc: ' + toc);
		//console.log('left: ' + left);
	}
	if(left < right){		
		if(tic < right && coctailTemp == 1){ 	// Сортировка слева направо
			if(arr[tic] > arr[tic + 1]){
				var swap 	 = arr[tic];
				arr[tic] 	 = arr[tic + 1];
				arr[tic + 1] = swap;
				c.fillStyle = '#dd3333';
				c.fillRect(( 2+lineStep) * tic, cHeight - arr[tic+1] * lineHeight, lineWidth, arr[tic+1] * lineHeight);
			}
			tic++;
		}

		if(toc > left && coctailTemp == 0){		// Сортировка справа налево
			if(arr[toc] < arr[toc - 1]){
				swap 			 = arr[toc];
				arr[toc] 	 = arr[toc - 1];
				arr[toc - 1] = swap;
				c.fillStyle = '#dd3333';
				c.fillRect(( 2+lineStep) * toc, cHeight - arr[toc-1] * lineHeight, lineWidth, arr[toc-1] * lineHeight);
			}
			toc--;
		}
	}
}


function selectionSort(){
	sortSpeed	= document.getElementById('speed').value*1;
	sortTimer = setTimeout(selectionSort, sortSpeed)*1;		
	c.clearRect(0, 0, cWidth, cHeight);

	for(i in arr){		//	Отрисовка массива
		c.fillStyle = '#dddddd';
		c.fillRect(( 2+lineStep) * i, cHeight - arr[i] * lineHeight, lineWidth, arr[i] * lineHeight);
	}
	c.fillText(line, 10, 20);

	right = arr.length;

	if(tic < right){
		c.fillStyle = '#dd3333';
		var min = tic;
		for(j = tic+1; j < right; j++){
			if(arr[j] < arr[min])	min = j;
		}
		var t 		= arr[min];
		c.fillRect(( 2+lineStep) * min, cHeight - arr[min] * lineHeight, lineWidth, arr[min] * lineHeight);
		arr[min] 	= arr[tic];
		c.fillRect(( 2+lineStep) * tic, cHeight - arr[tic] * lineHeight, lineWidth, arr[tic] * lineHeight);
		arr[tic] 	= t;
		tic++;
	}


	for(i in arr){
		if(arr[i] == arrTemp[i]){
			temp++;
			if(temp >= line+2){
				for(i in arr){
					c.fillStyle = '#dddddd';
					c.fillRect(( 2+lineStep) * i, cHeight - arr[i] * lineHeight, lineWidth, arr[i] * lineHeight);
				}
				updateValues();
				clearTimeout(sortTimer);
			}
		}else{
			temp = 0;
		}
	}
}


// 	Остановка сортировки
function stopSort(){
	c.fillStyle = '#333333';
	c.fillRect(0, 0, cWidth, cHeight);
	c.fillStyle = '#dddddd';
	for(i in arr){
		c.fillRect(( 2+lineStep) * i, cHeight - arr[i] * lineHeight, lineWidth, arr[i] * lineHeight);
	}
	clearTimeout(sortTimer);
	updateValues();
}
/*
function stopwatch(){
	if(milliseconds == 1000){
		milliseconds = 0;
		if(seconds != 60){
			seconds++;
		}
		if(seconds == 60){
			seconds = 0;
			minutes++;
		}
	}
	c.fillText(seconds, 400, 20);
}*/