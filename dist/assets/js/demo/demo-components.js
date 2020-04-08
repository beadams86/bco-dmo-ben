//
// NO NEED FOR THIS! Just used for demo'ng of components in Component Library !!! 
//

//Toggle Show Code Button and Snippets
$('#show-code').click(function(){
    var $this = $(this);
    $this.toggleClass('toggled');
    if($this.hasClass('toggled')){
        $('.code-snippet').toggleClass('is-hidden');
        $this.html('<i class="fa fa-close margin-right-1"></i> Hide Code');        
    } else {
        $('.code-snippet').toggleClass('is-hidden');
        $this.html('<i class="fa fa-code margin-right-1"></i> Show Code');
    }
})

// Sticky Left Nav
$(function() {
    //caches a jQuery object containing the header element
    var header = $(".sticky-menu");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 450) {
            header.addClass("scrolled");
        } else {
            header.removeClass("scrolled");
        }
    });
});

//Facet Dropdown Menu
var dropdown = document.querySelector('#demo-dropdown');
if (dropdown){
  dropdown.addEventListener('click', function(event) {
    event.stopPropagation();
    dropdown.classList.toggle('is-active');
  });
}

//Scroll to top button
$('#scrollTop').click(function(){
    $('html, body').animate({scrollTop:0}, 300);
})