// Initialize Firebase
    var config = {
        apiKey: "AIzaSyCRLvKe768FNOHKkVnV6zPrh5VpsZ1keH0",
        authDomain: "train-time-52a98.firebaseapp.com",
        databaseURL: "https://train-time-52a98.firebaseio.com",
        projectId: "train-time-52a98",
        storageBucket: "train-time-52a98.appspot.com",
        messagingSenderId: "25381474474"
    };

    firebase.initializeApp(config);

    var dataRef = firebase.database();

// Initial Values
    var name = "";
    var destination = "";
    var firstTrain = 0;
    var frequency = 0;

// Capture Button Click
    $("#add-train").on("click", function (event) {
        event.preventDefault();

// provide initial data to Firebase database.
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();

// Code for the push
    dataRef.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });

// Firebase watcher + initial loader HINT: .on("value")
    dataRef.ref().on("child_added", function (snapshot) {

// Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);

// Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#destination-display").text(snapshot.val().destination);
    $("#firstTime-display").text(snapshot.val().firstTime);
    $("#frequency-display").text(snapshot.val().frequency);

// Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    // database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    // console.log(childSnapshot.val());
    // console.log(snapshot.val().trainName);
    // console.log(snapshot.val().trainDest);
    // console.log(snapshot.val().trainFirst);
    // console.log(snapshot.val().trainFrequency);



    $("#train-name-input").text(snapshot.val().trainName);
    $("#destination-input").text(snapshot.val().trainDest);
    $("#first-time-input").text(snapshot.val().trainFirst);
    $("#frequency-input").text(snapshot.val().trainFrequency);


// // Store everything into a variable.
// var trainName = childSnapshot.val().name;
// var trainDest = childSnapshot.val().destination;
// var firstTime = childSnapshot.val().first;
// var trainFequency = childSnapshot.val().frequency;

// // train Info
// console.log(trainName);
// console.log(trainDest);
// console.log(firstTime);
// console.log(trainFrequency);

// Prettify the first train time
var firstTimePretty = moment.unix(firstTime).format("MM/DD/YY");

// Calculate the minutes since the First Train Time
var newTrain = moment().diff(moment.unix(firstTime, "-"), "minutes");
console.log(newTrain);

// Calculate the total billed rate
var nextTime = newTrain - firstTime;
console.log(nextTime);

// Add each train's data into the table
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    firstTimePretty + "</td><td>" + newTrain + "</td><td>" + trainFrequency + "</td><td>" + nextTime + "</td></tr>");


//assumptions
var tFrequency = 15;

// Time is 3:30 AM
var firstTime = "03:30";

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
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

