function randColor(rndclr){
	var r = Math.floor(Math.random() * 256),
	g = Math.floor(Math.random() * 256),
	b = Math.floor(Math.random() * 256);
	var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);

	var page = rndclr;

	if(page == '5'){
		//$('body').css({'background-color': color});
		//$('.colorGenerator').css({'background-color': 'white'});
		$('.colorGeneratorBtn').css({'color': color});
		//$('.colorGenerator').html(color.toString());
		console.clear();
		console.log('R: ' + r);
		console.log('G: ' + g);
		console.log('B: ' + b);
	}

	return color;
}