var topics = ["J Cole", "Drake", "Ed Sheeran", "Beyonce", "Marshmello", "Jay Z", "Eminem", "Rihanna"];



//Function to create buttons
function createButtons(){

    //To empty giphy button to avoid repeat buttons
    $("#giphy-button").empty();

    //For loop used to go through topics array and then generate a button for each artist
    for (var i = 0; i < topics.length; i++){
        var newButton = $('<button/>');
        newButton.attr("data",topics[i]);
        newButton.addClass("button");
        newButton.text(topics[i]);
        $("#giphy-button").append(newButton);
    };
};

createButtons();


$("#submit").on("click", function() {

    //Prevents submit botton from trying to send a form
    event.preventDefault();

    //Taking the user input in the search box and assigning it a variable and push it into the topics array
    var userSearch = $("#add-artist").val();

    if (userSearch === ""){

    }else{
        topics.push(userSearch);
    }

    createButtons();
});

$("button").on("click",function(){
    
    var userSearch = $(this).attr("data");
    var APIKey = "&api_key=Cs3xYChN25pFn0Gy09deyv1OzTZtGOj1&limit=10"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userSearch + APIKey ;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
          console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img>");
          personImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.append(p);
          gifDiv.append(personImage);

          $("#giphy-images").prepend(gifDiv);
        }
      });
});