	var rain = 0;
	$(document).ready(function(){
		var cvs = document.getElementById('canvas'),
		c   = cvs.getContext('2d');


		cvs.width = cvs.offsetWidth/2;
		cvs.height = cvs.offsetHeight/2;
//cvs.offsetWidth
//cvs.offsetHeight
var drops = [{}];
var color = '#431be3';
update();
function update(){
	brain();
	draw();
	requestAnimationFrame(update);
} 
function brain(){
	if(rain == 1 || rain == 'blod' || rain == 'rainbow'){
		addDrop();
		for(i in drops){
			drops[i].oy += drops[i].ySpeed;
			if(drops[i].oy > cvs.offsetHeight + 1000){
				drops.shift();
			}
		}
	}
	if(rain == 1){
		color = '#431be3';
	}else if(rain == 'blod'){
		color = '#640509';
	}else if(rain == 'rainbow'){
		color = randColor();
	}
}
function addDrop(){
	drops.push ({
		y: Math.round(Math.random()*10),
		x: 1,
		ox: Math.round(1 - 0.5 + Math.random() * (cvs.width - 1 + 1)),
		oy: -10,
		ySpeed: Math.round(2 - 0.5 + Math.random()*(5 - 2 + 1)),
		rgb: color
	});
}
function draw(){
	if(rain != 'blod'){
		c.fillStyle = '#ececec';
		c.fillRect(0,0,cvs.width,cvs.height);
	}
	for(i in drops){
		c.fillStyle = drops[i].rgb;
		c.fillRect(drops[i].ox, drops[i].oy, drops[i].x, drops[i].y);
	}
}

function randColor(rndclr){
	var r = Math.floor(Math.random() * 256),
	g = Math.floor(Math.random() * 256),
	b = Math.floor(Math.random() * 256);
	var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);

	var page = rndclr;

	if(page == '5'){
		$('body').css({'background-color': color});
		$('button').css({'background-color': 'white'});
		$('button').css({'color': color});
		$('button').html(color.toString());
		console.clear();
		console.log('R: ' + r);
		console.log('G: ' + g);
		console.log('B: ' + b);
	}

	return color;
}
});