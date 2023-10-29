var today = dayjs(); // get todays information using dayjs

var calendarContainer = $("#calendarContainer"); // get container for input fields

displayCurrentDate(); // call the function to display the current day on webpage
displayInputFields(); // diplays all the input fields on the webpage
displayTaskData(); // display current tasks available

//create a click event for each button
for(var i = 9; i < 18; i++){
  var button = $("#button-hour-" + i);
  button.on('click', buttonClickEvent);
}

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
    inputField.attr("id", "input-hour-" + hour); // set id for each input (to use later)
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
    button.attr("id", "button-hour-" + hour); // set id for each button (to use later)
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

function displayTaskData(){ // display tasks if available
  var hour = 9;

  while (hour < 18){ // loop through hours (which i utilized as my keys for storage)
    var task = localStorage.getItem("workSchedule" + hour); // get task from local storage

    // set input text to task
    var inputField = $("#input-hour-" + hour);
    inputField.val(task);

    hour++
  }
}

function buttonClickEvent(){ // handles button clicks

  var hour = $(this).attr("id").match(/\d+/g); // get string id of button and find hour integer within said string 
  // d refers to digits (regexp) and g finds all matches
  // .match then sees if it matches

  // get input
  var task = $(this).parent().children('textarea').val(); 
  
  // save input into local storage
  localStorage.setItem("workSchedule" + hour, task); //use hour for key
}