(function ($) {

  $(document).ready(function () {
    $('.toc-icon').on('click', function () {
      $('.toc-container').addClass('toc-container--shown');
      $('body').addClass('menu--shown');
    });

    $('.toc-close').on('click', function () {
      $('.toc-container').removeClass('toc-container--shown');
      $('body').removeClass('menu--shown');
    });

    $('.toc-nav a').on('click', function (e) {
      e.preventDefault();
      $('.toc-container').removeClass('toc-container--shown');
      $('body').removeClass('menu--shown');
    });

    $('a[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var $target = $(this.hash);
        $target = $target.length ? $target : $('[name=' + this.hash.slice(1) + ']');
        if ($target.length) {
          $('html, body').animate({
            scrollTop: $target.offset().top
          }, 1000);
          return false;
        }
      }
    });

  });

})(jQuery);
