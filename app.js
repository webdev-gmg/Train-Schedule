  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAuF5axKytWph_D4aAfb0QTnDTyeFDzRus",
    authDomain: "trainproject-b87eb.firebaseapp.com",
    databaseURL: "https://trainproject-b87eb.firebaseio.com",
    projectId: "trainproject-b87eb",
    storageBucket: "trainproject-b87eb.appspot.com",
    messagingSenderId: "800988815225"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();
    var name = $("#newTrain").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var arrival = $("#arrival").val().trim();
    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        arrival: arrival
    })
})

var firstTime = "22:00";

database.ref().on("child_added", function(snapshot) {
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
    
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
        var tRemainder = diffTime % snapshot.val().frequency;
        console.log(tRemainder);
    
        // Minute Until Train
        var tMinutesTillTrain = snapshot.val().frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        nxtTrain = moment(nextTrain).format("hh:mm");

    $("tbody").append("<tr><th>" + snapshot.val().name + "</th><th>" + snapshot.val().destination + "</th><th>" + snapshot.val().frequency + "</th><th>" + nxtTrain + "</th><th>" + tMinutesTillTrain + "</th><th>" + '-' + "</th></tr>")
})