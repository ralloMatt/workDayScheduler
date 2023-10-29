// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

var today = dayjs(); // get todays information using dayjs

var calendarContainer = $("#calendarContainer"); // get container for input fields

displayCurrentDate(); // call the function to display the current day on webpage
displayInputFields(); // diplays all the input fields on the webpage

function displayCurrentDate(){ // displays date on webpage
  var weekDay = dayjs(today, "M-D-YYYY").format("dddd"); // get the day of the week
  $("#currentDay").text(weekDay + ", " + today.format("MMMM DD, YYYY")); // add to paragraph element in index
}

function displayInputFields(){

  var hour = 9; // hour of input field

  while(hour < 18){ // loop through each hour (military time XD)

    // create div for each hour of workday calendar
    var hourContainer = $("<div>");
    hourContainer.addClass("row time-block past"); // add classes
    hourContainer.attr("id", "hour-" + hour); // set id for each container (to use later)

    // create hour field
    var hourDisplay = $("<div>"); // for the hour display
    hourDisplay.addClass("col-2 col-md-1 hour text-center py-3"); // add classes

    if(hour < 13){
      hourDisplay.text(hour + " AM");
    } else {
        hourDisplay.text(hour - 12 + " PM"); // subract 12 to get standard time
    }

    hourContainer.append(hourDisplay); // put the hour in element

    // create input field
    var inputField = $("<textarea>");
    inputField.addClass("col-8 col-md-10 description"); // add classes
    inputField.attr("rows", "3"); // set rows for textarea
    // check hour to set background color class
    // grey for past, red for present, green for future
    // classes are set in style.css
    var currentHour = dayjs().format("H");
    if(hour < currentHour){ // means past
      inputField.addClass("past"); // add classes
    } else if (hour == currentHour){ // current hour
      inputField.addClass("present");
    } else { // future
      inputField.addClass("future");
    }

    hourContainer.append(inputField); // put the input field in element

    // create button
    var button = $("<button>");
    button.addClass("btn saveBtn col-2 col-md-1");
    button.attr("aria-label", "save");
    // create i element for button
    var i = $("<i>");
    i.addClass("fas fa-save");
    i.attr("aria-hidden", "true");
    button.append(i); // append i to button
    hourContainer.append(button); // put the button inthe element

    calendarContainer.append(hourContainer); 

    hour ++; // go to next hour
  }
}