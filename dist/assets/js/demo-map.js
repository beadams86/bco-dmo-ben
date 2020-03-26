var mymap = L.map('map').setView([25.0258, -78.0358], 5);
var marker = L.marker([25.0258, -78.0358]).addTo(mymap);
var circle = L.circle([26.5, -75.1], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50000
}).addTo(mymap);

var accessToken = 'pk.eyJ1IjoiYmVhZGFtczg2IiwiYSI6ImNqOHg2a2RrYjBnYXQzM25yNmg0MjlmNWoifQ.Sh9NMeUrVExCPmGgCoHfOQ';
var layer = L.esri.basemapLayer('Oceans').addTo(mymap);

//Handle the Expand Map button
var mapCanvas = document.querySelector('#map');
var mapColumn = document.querySelector('.map-column');
var contentColumn = document.querySelector('.content-column');
var expandButton = document.querySelector('#expand-map');

var mapExpanded = false;

function expandMap () {
  mapExpanded = !mapExpanded;
  if (mapExpanded === true){
    mapColumn.classList.add('expanded');
    contentColumn.classList.add('is-one-third');
    mapCanvas.style.width = '100%';
    expandButton.innerHTML='<i class="fa fa-arrow-right"></i> Reduce Map';
  }
  else{
    mapColumn.classList.remove('expanded');
    contentColumn.classList.remove('is-one-third');
    mapCanvas.style.width = '100%';
    expandButton.innerHTML='<i class="fa fa-expand"></i> Expand Map';
  }
  setTimeout(function(){ mymap.invalidateSize()}, 100);
}

if (expandButton){
  expandButton.addEventListener('click', function (e) {
    expandMap();
});
}


//Handle Toggling the Map hidden/shown
var hideButton = document.querySelector('#hide-map');
var showButton = document.querySelector('#show-map');

function hideMap(value){

  if (value === true){
    mapExpanded = false;
    mapColumn.classList.remove('expanded');
    mapColumn.classList.add('toggled');
    contentColumn.classList.remove('is-one-third', 'is-two-thirds');
    mapCanvas.style.width = '100%';
    expandButton.classList.add('is-hidden');
    showButton.classList.remove('is-hidden');
  }
  else{
    mapExpanded = false;
    mapColumn.classList.remove('toggled');
    contentColumn.classList.add('is-two-thirds');
    expandButton.classList.remove('is-hidden');
    expandButton.innerHTML='<i class="fa fa-expand"></i> Expand Map';
    showButton.classList.add('is-hidden');
  }
}

if (hideButton){
  hideButton.addEventListener('click', function (e) {
    hideMap(true);
  });
}

if (showButton){
  showButton.addEventListener('click', function (e) {
    hideMap(false);
  });
}
