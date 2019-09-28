$(document).ready(function(){
	$('.socialLinks').click(function(e){
		e.preventDefault();
		$(this).toggleClass('socialLinks_active');
		$('.container').toggleClass('container_socialLinks_active');
		$('.greyScreen').toggleClass('greyScreen_on');
		var timerStop = setTimeout(Stop200sec, 550);
		function Stop200sec(){
			$('.links').toggleClass('links_active');
		}
	})

$("html,body").css("overflow","hidden");
$("body").css("overflow-y","hidden");

function timer() {
    var nowDate = new Date();
    var achiveDate = new Date(2020,0,28,17,0,0); //Задаем дату, к которой будет осуществляться обратный отсчет
    var result = (achiveDate - nowDate)+1000;
    if (result < 0) {
        var elmnt = document.getElementById('timer');
        elmnt.innerHTML = ' - : - - : - - : - - ';
        return undefined;
    }
    var seconds = Math.floor((result/1000)%60);
    var minutes = Math.floor((result/1000/60)%60);
    var hours = Math.floor((result/1000/60/60)%24);
    var days = Math.floor(result/1000/60/60/24);
    if (seconds < 10) seconds = '0' + seconds;
    if (minutes < 10) minutes = '0' + minutes;
    if (hours < 10) hours = '0' + hours;
    var elmnt = document.getElementById('timer');
    elmnt.innerHTML = days + ':' + hours + ':' + minutes + ':' + seconds;
    setTimeout(timer, 1000);
}
window.onload = function() {
    timer();
}

});
var secret = 0;

var timerSecret = setInterval(function() {
    if(secret == 'lol'){
        $('.me_png').attr('src', 'unnamed.jpg');
    }
}, 500);