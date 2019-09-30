$('.menu-btn1').on('click', function(e) {
  e.preventDefault();
  $(this).toggleClass('menu-btn1_active');
  $('.menu-nav').toggleClass('menu-nav_active');
});

$('.menu-btn').on('click', function(e) {
  e.preventDefault();
  $('.menu').toggleClass('menu_active');
  $('.content').toggleClass('content_active');
})