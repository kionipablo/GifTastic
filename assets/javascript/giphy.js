$(document).ready(function(){
    var topics = ["J Cole", "Drake", "Ed Sheeran", "Beyonce", "Marshmello", "Jay Z", "Eminem", "Rihanna"];
    console.log(topics);



    //Function to create buttons
    function createButtons(){

        //To empty giphy button to avoid repeat buttons
        $("#giphy-button").empty();

        //For loop used to go through topics array and then generate a button for each artist
        for (var i = 0; i < topics.length; i++){

            var newButton = $("<button/>");
            newButton.attr("data-name",topics[i]);
            newButton.addClass("artist-button");
            newButton.text(topics[i]);

            $("#giphy-button").append(newButton);
        };
    };

    $("#submit").on("click", function(event) {

        //Prevents submit botton from trying to send a form
        event.preventDefault();

        //Taking the user input in the search box and assigning it a variable and push it into the topics array
        var userSearch = $("#add-artist").val().trim();

        if (userSearch === ""){

        }else{
            topics.push(userSearch);
        }
        createButtons();
        console.log(topics);
    });

    createButtons();

    $(document).on("click",".artist-button",function(){

        $("#giphy-images").empty();
        var person = $(this).attr("data-name");
        console.log(person);
        var APIKey = "&api_key=Cs3xYChN25pFn0Gy09deyv1OzTZtGOj1&limit=10"
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + APIKey ;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>").addClass("giphs");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(p);
            gifDiv.append(personImage);

            $("#giphy-images").prepend(gifDiv);
            }
        });
    });
});