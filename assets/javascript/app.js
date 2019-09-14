// Global Variables
var topics = ["Brazil", "Germany", "Australia", "France", "Japan", "India", "Egypt", "China", "Cuba", "Russia"]
var apiKey = "lKCQFbbk9oVhGTx0XIBwEiyIDWaJtjTc"
var endpoint = "http://api.giphy.com/v1/gifs/search?api_key=lKCQFbbk9oVhGTx0XIBwEiyIDWaJtjTc"

function renderButtons() {

  $('.recent-search').empty();
  for (var i = 0; i < topics.length; i++) {
    var buttonName = topics[i];

    var button = `
      <div class="wrap-buttons">
        <button
          class="btn btn-search"
          data-name="${buttonName}"
          data-index="${i}"
        >${buttonName}</button>
      <div>
    `;

    $('.recent-search').append(button);

  }
}

renderButtons();

function addButton(value) {
  topics.push(value);

  renderButtons();

}

function createGiphyTemplate(giphy) {
  var images = giphy.images;
  var template = `
    <div class="giphy">
      <div class="giphy-image">
          <img 
            src="${images.original_still.url}" 
            data-still="${images.original_still.url}"
            data-animate="${images.original.url}"
            data-state="still">
          <i class="fa fa-play img-play"></i>
      </div>
      <div class="giphy-info">
          <p>Rating: g</p>
      </div>
    </div>
    `;

    return template;
}

function renderGiphys(giphys) {

  $('.giphy-content').empty();
  for(var i = 0; i < giphys.length; i++) {
    var giphy = giphys[i];
    var giphyTemplate = createGiphyTemplate(giphy);
    $('.giphy-content').append(giphyTemplate);
  }
}

function fetchGiphy(value) {
  var url = endpoint + '&q=' + value + '&limit=10';

  $.ajax({ url: url })
    .then(function(response){
      var giphys = response.data;
      renderGiphys(giphys);

    });
}


function searchGiphy(event) {
  event.preventDefault();

  var value = $('#search').val();
  addButton(value);
  fetchGiphy(value);
  
}

$("#submit-button").on('click', searchGiphy);