	var rain = 0;
	$(document).ready(function(){
		var cvs = document.getElementById('canvas'),
		c   = cvs.getContext('2d');


		cvs.width = cvs.offsetWidth/2;
		cvs.height = cvs.offsetHeight/2;
//cvs.offsetWidth
//cvs.offsetHeight
var drops = [{}];
update();
function update(){
	brain();
	draw();
	requestAnimationFrame(update);
} 
function brain(){
	if(rain == 1){
		addDrop();
		for(i in drops){
			drops[i].oy += drops[i].ySpeed;
			if(drops[i].oy > cvs.offsetHeight + 1000){
				drops.shift();
			}
		}
	}
}
function addDrop(){
	drops.push ({
		y: Math.round(Math.random()*10),
		x: 1,
		ox: Math.round(1 - 0.5 + Math.random() * (cvs.width - 1 + 1)),
		oy: -10,
		ySpeed: Math.round(2 - 0.5 + Math.random()*(5 - 2 + 1)),
		rgb: '#431be3'
	});
}
function draw(){
	c.fillStyle = '#ececec';
	c.fillRect(0,0,cvs.width,cvs.height);
	for(i in drops){
		c.fillStyle = drops[i].rgb;
		c.fillRect(drops[i].ox, drops[i].oy, drops[i].x, drops[i].y);
	}
}
});