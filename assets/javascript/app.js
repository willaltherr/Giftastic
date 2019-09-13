// Global Variables
var topics = ["Brazil", "Germany", "Australia", "France", "Japan", "India", "Egypt", "China", "Cuba", "Russia"]
var apiKey = "lKCQFbbk9oVhGTx0XIBwEiyIDWaJtjTc"
var endpoint = "http://api.giphy.com/v1/gifs/search?api_key=lKCQFbbk9oVhGTx0XIBwEiyIDWaJtjTc&q=germany&limit=10"

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

function searcGiphy(event) {
  event.preventDefault();

  var value = $('#search').val();
  addButton(value);

  
}

$("#submit-button").on('click', searcGiphy);