


// Initialize Firebase
var config = {
  apiKey: "AIzaSyCCMvKeJWfWvxkyzKzyLDE4ffeZpDiJUsk",
  authDomain: "traintime-4256e.firebaseapp.com",
  databaseURL: "https://traintime-4256e.firebaseio.com",
  projectId: "traintime-4256e",
  storageBucket: "traintime-4256e.appspot.com",
  messagingSenderId: "445704002184"
};

firebase.initializeApp(config);

var database = firebase.database();
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  var trnName = $("#train-name-input").val().trim();
  var dest = $("#destination-input").val().trim();
  var firsttime = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#freq-input").val().trim();

  var newTrn = {
    name: trnName,
    destination: dest,
    firsttime: firsttime,
    frequency: frequency,
  };
  database.ref().push(newTrn);

  console.log(newTrn.name);
  console.log(newTrn.destination);
  console.log(newTrn.firsttime);
  console.log(newTrn.frequency);

  alert("train successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train time-input").val("");
  $("#freq-input").val("");

});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var trnName = childSnapshot.val().name;
  var trnDestination = childSnapshot.val().destination;
  var trnFirstTime = childSnapshot.val().firsttime;
  var trnFrequency = childSnapshot.val().frequency;

  console.log("========================================");

  console.log(trnName);
  console.log(trnDestination);
  console.log(trnFirstTime);
  console.log(trnFrequency);

  var tFrequency = 12;

  var firstTime = "02:45";

  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

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
  

})
