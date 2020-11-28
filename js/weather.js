function gettingJSON(){
    var api_key = "b1cd29ead6afb388407faade1d4a6e66";
    //var api_call = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + api_key;

    //Display the forecast
    // Your code here.
    console.log("get weather button");


    //Set default location if one isn't provided
    let location;
    // Your code here.
    location = document.getElementById("location").value;
    if (location == "") {
      location = "Ann Arbor";
    }
    console.log("Location is : " + location);


    //set default temperature format if one isn't provided
    let format;
    // Your code here.
    let c = document.getElementById("celcius").checked;
    if (c == true) {
      format = "metric"; //celcius
    } else {
      format = "imperial"; //fahrenheit
    }
    console.log("Format is " + format);


    //set the query
    let query;
    // Your code here. this will be a list of the json stuff from the weather api
    var r = /\d/;
    if (location.match(r) != null) { //is a zip
      let x = location.split(",");
      query = "https://api.openweathermap.org/data/2.5/weather?zip=" + x[0].trim() + "," + x[1].trim() + "&units=" + format + "&appid=" + api_key;
    } else { //not zip
      let x = location.split(",");
      query = "https://api.openweathermap.org/data/2.5/weather?q=" + x[0].trim() + "&units=" + format + "&appid=" + api_key;
    }
    console.log("Query is :" + query);


    //Create and set variables for each of the elements you
    //need to update, location, temp, the image, etc.

    let loc;
    let temp;
    let tempImg;
    // Your code here.

    document.getElementById("forecast").style.display = "block";

    $.getJSON(query,function(json){
        //Use returned json to update the values of the three
        //elements in HTML.
        //I would print the JSON to the console
        // Your code here.
        // console.log(json);

        loc = json["name"];
        document.getElementById("loc").innerHTML = loc;

        temp = json["main"]["temp"];
        let conditions = " with " + json["weather"][0]["description"];
        document.getElementById("temp").innerHTML = temp + conditions;
        //document.getElementById("temp").innerHTML = main.temp + " with " + weather.description;

        tempImg = json["weather"][0]["icon"];
        let x = document.getElementById("tempImg");
        x.setAttribute("alt", json["weather"][0]["description"]);
        x.setAttribute("src", "https://openweathermap.org/img/wn/" + tempImg + "@2x.png");
    });
}
