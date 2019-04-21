var topics = ["karl lagerfeld", "coco chanel", "christian louboutin", "yves saint laurent", "christian dior", "alexander mcqueen", "anna wintour", "andre leon talley", "gianni versace", "stella mccartney", "john galliano",];

var fashionista;

function createButtons() {
  $("#buttons").empty();
  for (var i = 0; i < topics.length; i++) {
    var addButton = $("<button class='btn btn-secondary designerBtn'>");
    //addButton.addClass("topics");
    addButton.attr("data-person", topics[i]);
    addButton.text(topics[i]);
    $("#buttons").append(addButton);
    console.log(addButton)
  }
}

$("#submit").on("click", function () {
  console.log($("#submit"))
  var myNewFashionista = $("#addFashionista").val().trim()
  topics.push(myNewFashionista)
  $("#addFashionista").val("") // clear input value
  createButtons()

})

$(document).ready(function () {

  createButtons();


  $(document).on("click", ".designerBtn", function(event) {
    event.preventDefault()
    fashionista = $(this).attr("data-person");
    console.log("fashonista ", fashionista)

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      fashionista + "&api_key=6fm3CsPIAvOTSTPUGVp7PvO66HQRmwyX&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function (response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          console.log("api" + JSON.stringify(results[i]))
          console.log("*******************")
          var gifDiv = $("<div class='col-md-4'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img class='gif'>");
          personImage.attr("src", results[i].images.fixed_height_still.url);
          console.log(personImage)

          gifDiv.prepend(p);
          gifDiv.prepend(personImage);

          $("#gifs-appear-here").prepend(gifDiv);
          console.log(gifDiv)

          var stillImage = results[i].images.fixed_height_still.url;
          var animatedImage = results[i].images.fixed_height.url;
          //var initialState = "animated";
          //var newImg = $("<img>");
          personImage.attr("data-still", stillImage);
          personImage.attr("data-animate", animatedImage);
          //personImage.attr("data-state", "still");

          //newImg.attr("data-state", initialState);
          //newImg.attr("src", animatedImage);
        }


        $(".gif").on("click", function () {
          console.log("clicked gif");

          var sourceUrl = $(this).attr("src")
          var stillUrl = $(this).attr("data-still")
          var animatedUrl = $(this).attr("data-animate")


          console.log("My source is: " + sourceUrl);
          console.log("My still string is: " + stillUrl);
          console.log("My animated string is: " + animatedUrl);

          if (sourceUrl === stillUrl) {
            console.log("My source is equal to the still url");
            $(this).attr("src", animatedUrl)
          } else {
            console.log("My source is NOT equal to the still url");
            $(this).attr("src", stillUrl)
          }

        });


      });

  });
})
