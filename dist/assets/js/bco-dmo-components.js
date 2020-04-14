// The majority of this JS is just here to help demo the core functionality and be 
// used as a reference once development begins, not optimized at all or written to scale.


// Control the search category pre-selected in Dataset Search / Catalog Search
var selectedScheme = window.localStorage.getItem('category');
setUIElements(selectedScheme);
function setSearchCategory(category){
  //Set selected Search Category/Catalog via local storage
  window.localStorage.setItem('category', category);
  selectedScheme = category; 
  setUIElements(category);
}

function openSearchCategory(category){
  //Set selected Search Category/Catalog via local storage
  setSearchCategory(category);
  window.open("dataset-search.html","_self");
}

function setUIElements(category){
  $('#search-category').val(category); //Set Search Bar selected category
  $('#searchBreadcrumb .is-active a').text(' ' + category + ' Search'); // Set Breadcrumb Title
  //Hard-coded UI demo of switching Category / Catalog values from Dataset to All, Awards, and People
  if (category === 'People'){
    $('.demo-datasets, .demo-all, .demo-awards, #expand-map').addClass('is-hidden');
    $('.demo-people').removeClass('is-hidden');
    $('.content-column').removeClass('is-two-thirds');
    $('.map-column').addClass('toggled');
    $('#show-map').removeClass('is-hidden');
  }     
  if (category === 'All'){
    $('.demo-datasets, .demo-people, .demo-awards').addClass('is-hidden');
    $('.demo-all').removeClass('is-hidden');
    $('.content-column').addClass('is-two-thirds');
    $('.map-column').removeClass('toggled');
    $('#show-map').addClass('is-hidden');
  }   
  if (category === 'Datasets'){
    $('.demo-people, .demo-all, .demo-awards').addClass('is-hidden');
    $('.demo-datasets, #expand-map').removeClass('is-hidden');
    $('.map-column').removeClass('is-closed');
    $('.content-column').addClass('is-two-thirds');
    $('.map-column').removeClass('toggled');
    $('#show-map').addClass('is-hidden');
  }             
  if (category === 'Awards'){
    $('.demo-datasets, .demo-all, .demo-people, #expand-map').addClass('is-hidden');
    $('.demo-awards').removeClass('is-hidden');
    $('.content-column').removeClass('is-two-thirds is-one-third');
    $('.map-column').addClass('toggled');
    $('#show-map').removeClass('is-hidden');
  } 
}

$('#search-category').change(function(){
  setSearchCategory($(this).val());
  console.log($(this).val());
});
      

document.addEventListener('DOMContentLoaded', () => {

    //+++ CONTROL MOBILE HAMBURGER CLICK/TOGGLE +++//
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
  
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
    //Toggle Navbar Dropdown Menus onClick only on Mobile
    if ($(window).width() < 1024 || $( window ).resize()) {
     $('#navbar .navbar-item.has-dropdown').click(function(){
          $('#navbar .navbar-item.has-dropdown').not(this).each(function(){
              $(this).removeClass('is-active')
          });
          $(this).toggleClass('is-active');
      })
    }
    //Toggle Navbar Search
    $('.toggle-search').on('click', function(e) {
      $('.navbar-search').toggleClass("is-hidden"); //you can list several class names 
      $('.toggle-search i').toggleClass("fa-close"); //you can list several class names 
      e.preventDefault();
    });

    var menuToggled = true;
    $('.access-data').click(function () {
        if (menuToggled) {
          $('.navbar-dropdown.access-data-menu').toggleClass('is-hidden');
        } else {
          $('.navbar-dropdown.access-data-menu').toggleClass('is-hidden');
        }
        menuToggled = !menuToggled;
      })

      //Toggle Collapsible Card
      let cardToggles = document.getElementsByClassName('card-toggle');
      for (let i = 0; i < cardToggles.length; i++) {
        cardToggles[i].addEventListener('click', e => {
          e.currentTarget.parentElement.childNodes[3].classList.toggle('is-hidden');
        });
      }


// Handle horizontally overflowing facets 
  let facetsExpanded = false;
  var expandFacets = document.getElementById('showAllFacets');
  var expandButton = document.querySelector('#showAllFacets');
  if (expandFacets){
    expandFacets.addEventListener('click', function (e) {
      facetsExpanded = !facetsExpanded;
      this.parentNode.classList.toggle("expanded");
      console.log(this);
      if (facetsExpanded === true){
        expandButton.innerHTML = '<i class="fa fa-chevron-up margin-right-1"></i> Less';
      }
      else{
        expandButton.innerHTML = '<i class="fa fa-ellipsis-v margin-right-1"></i> More';
      }
    });
  }


// Demo Facet Dropdown elements on click 
  $('.search-facet').click(function(){
      if(!$(this).is('.is-active')) {
          $(this).addClass('is-active');
      }
      else{
          $(this).removeClass('is-active');
      }
  });


  //Dummy logic to add is-selected state to search facet based on checkbox
  $(".facet-search-item[facet-value='coralcalcifyfluid_pH'] input").change(function() {
      if(this.checked) {
          //Do stuff
          $('#project-dropdown').addClass('is-selected');
          $('#demo-tag').removeClass('is-hidden');
      }
      else{
          $('#project-dropdown').removeClass('is-selected');
          $('#demo-tag').addClass('is-hidden');
      }
  });

  //Delete Tag and Reset Facet Dropdown
  $('#demo-tag .is-delete').click(function(){
    $(this).parent().parent().addClass('is-hidden');
    $(".facet-search-item[facet-value='coralcalcifyfluid_pH'] input").prop( "checked", false );
    $('#project-dropdown').removeClass('is-selected');
  })

  // Wrap clickable elements in .dropdown-item to prevent from closing the facet dropdown on click
  $('.dropdown-item').click(function(event){
      event.stopPropagation();
  });

  //Typeahead search/filter inside facet dropdown
  $('[facet-search]').on('keyup', function() {
      var searchVal = $(this).val();
      var filterItems = $('.facet-search-item');
  
      if ( searchVal != '' ) {
          filterItems.addClass('is-hidden');
          $('.facet-search-item[facet-value*="' + searchVal.toLowerCase() + '"]').removeClass('is-hidden');
      } else {
          filterItems.removeClass('is-hidden');
      }
  });

 
//Sticky Map for Dataset Search page
$(function() {
  //caches a jQuery object containing the header element
  var header = $(".map-column");
  $(window).scroll(function() {
      var scroll = $(window).scrollTop();
  
      if (scroll >= 40) {
          header.addClass("scrolled");
      } else {
          header.removeClass("scrolled");
      }
  });
  });

  // Toggle Demo Modal from Contribute Data
  $("#show-modal").click(function() {
    $(".modal").addClass("is-active");  
  });
  
  $(".delete").click(function() {
     $(".modal").removeClass("is-active");
  });

  //Smooth Scroll for all anchor links
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });

  //Scroll to top of page button above footer
  $("a[href='#top']").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "fast");
    return false;
  });

  //Sticky Tabs on Submit/Contribute Data Page (Hero Tabs)
      $(function() {
        //caches a jQuery object containing the header element
        var header = $(".hero-foot .tabs");
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
    
            if (scroll >= 560) {
                header.addClass("scrolled");
            } else {
                header.removeClass("scrolled");
            }
        });
    });

    //Accordion 
    $(function() {
        // first, reset all accordions
        var allPanels = $('.accordion-section').removeClass('is-active');

        // Handle opening of correct Accordion Section based on url with hash ( ie. faq.html#about )
        if (window.location.hash != "") {
            $(window.location.hash).addClass('is-active');
        }

        //Toggle sections open/closed based on click of title anchor
        $('.accordion-section > .accordion-title > a').click(function() {
          $this = $(this);
          $target =  $this.parent().parent();

          if($target.hasClass('is-active')){
            $target.removeClass('is-active'); 
          }else{
            allPanels.removeClass('is-active');
            $target.addClass('is-active');
          }
          
        //Scroll to top of selected accordion item
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 50
        });
        return false;
      });
    });

    //Set Active Tabs on Scroll and Click (Submit Data Page)
    function onScroll(event){
      var scrollPos = $(document).scrollTop();
      $('.tabs.is-sticky li a').each(function () {
          var currLink = $(this);
          var currLinkParent = $(this).closest( "li" );
          var refElement = $(currLink.attr("href"));
          if (refElement.position().top - 60 <= scrollPos) {
              $('.tabs.is-sticky li.is-active').removeClass("is-active");
              currLinkParent.addClass("is-active");
          }
          else{
              currLinkParent.removeClass("is-active");
          }
      });
      }
      $(document).on("scroll", onScroll);

      // Handle Tab Show/Hide functionality
      $(document).ready(function () {

        //Fire the scroll function above for 'sticky tabs' 

        $('.tabs a').on('click', function (event) {
          event.preventDefault();

          var target = $(this.rel); //Get ID of tab content div associated with anchor tab via rel=""
          $('.is-active').removeClass('is-active');
          $(this).parent().addClass('is-active');
          $('.tab-content').addClass('is-hidden');
          target.removeClass('is-hidden');
        });

      });

});
