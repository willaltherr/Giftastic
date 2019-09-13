// Global Variables
var topics = ["Brazil", "Germany", "Australia", "France", "Japan", "India", "Egypt", "China", "Cuba", "Russia", "South Africa", "Italy", "Saudi Arabia"]

function renderButtons() {

  $('.recent-search').empty();
  for (var i = 0; i < topics.length; i++) {
    var buttonName = topics[i];

    var button = `
      <div class="wrap-buttons">
        <button
          class="btn btn-search"
          data-name="${buttonName}"
        >${buttonName}</button>
        <button
          data-name="${buttonName}"
          class="btn btn-delete fas fa-times"
        ></button>
      <div>
    `;

    $('.recent-search').append(button);

  }
}

renderButtons();

$("#submit-button").on('click', function(event){
  event.preventDefault();

  var value = $('#search').val();

  topics.push(value);

  renderButtons();

});