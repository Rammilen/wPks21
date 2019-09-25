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
});