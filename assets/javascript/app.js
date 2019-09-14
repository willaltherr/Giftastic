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
  var rating = giphy.data;
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
          <p>Rating: G</p>
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
      console.log(giphys);
    });
}


function searchGiphy(event) {
  event.preventDefault();

  var value = $('#search').val();
  addButton(value);
  fetchGiphy(value);
  
  $('#search').val('');
}

function imgCardClick() {
  var giphyCard = $(this);

  var img = giphyCard.find('img');
  var icon = giphyCard.find('i');

  var still = img.attr('data-still');
  var animate = img.attr('data-animate');
  var state = img.attr('data-state');

  if (state === 'still') {
    img.attr({
      src: animate,
      'data-state': 'animate'
    });

    icon.removeClass('img-play');

  } else {
    img.attr({
      src: still,
      'data-state': 'still'
    });

    icon.addClass('img-play');

  }
}

$(document).on('click', '.giphy-image', imgCardClick);
$("#submit-button").on('click', searchGiphy);