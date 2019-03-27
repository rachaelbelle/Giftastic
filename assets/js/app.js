var topics = ["karl lagerfeld", "coco chanel", "christian louboutin", "yves saint laurent", "christian dior", "alexander mcqueen", "andre leon talley", "anna wintour", "gianni versace", "stella mccartney", "john galliano",];

  var fashionista;

  function createButtons() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
      var addButton = $("<button>");
      //addButton.addClass("topics");
      addButton.attr("data-person", topics[i]);
      addButton.text(topics[i]);
      $("#buttons").append(addButton);
      console.log(addButton)
    }
  }

$(document).ready(function() {

  createButtons();

  $("button").on("click", function() {
    fashionista = $(this).attr("data-person");
      console.log(this)

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      fashionista + "&api_key=6fm3CsPIAvOTSTPUGVp7PvO66HQRmwyX&limit=10";

      $.ajax({
      url: queryURL,
      method: "GET"
    })

    .then(function(response) {

      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        console.log("api" + JSON.stringify(results[i]))
       console.log("*******************")
      var gifDiv = $("<div>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);

      var personImage = $("<img>");
      personImage.attr("src", results[i].images.fixed_height.url);
      console.log(personImage)

      gifDiv.prepend(p);
      gifDiv.prepend(personImage);

      $("#gifs-appear-here").prepend(gifDiv);
      console.log(gifDiv)

      var stillImage = results[i].still_image;
      var animatedImage = results[i].url;
      //var initialState = "animated";
      //var newImg = $("<img>");
      personImage.attr("data-still", stillImage);
      personImage.attr("data-amimate", animatedImage);
      //newImg.attr("data-state", initialState);
      //newImg.attr("src", animatedImage);
     }


 $(".gif").on("click", function() {
  var state = $(this).attr("data-state");

 // If the clicked image's state is still, update its src attribute to what its data-animate value is.
 // Then, set the image's data-state to animate
 // Else set src to the data-still value
 if (state === "still") {
   $(this).attr("src", $(this).attr("data-animate"));
   $(this).attr("data-state", "animate");
   console.log(this)
 } else {
   $(this).attr("src", $(this).attr("data-still"));
   $(this).attr("data-state", "still");
 }
});




      //buttons
      //var buttonsDiv = $("<div>");

      //var gifButtons = $("<button>");
     // var person = results[i].person;
      //gifButtons.attr("data-person", results[i].person);

     // var personArray = ["parker posey", "steve zahn", "ethan hawk", "ally sheedy"]

     // buttonsDiv.append(gifButtons);

    });

 });
})
