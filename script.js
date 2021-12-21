let currentDay = $("#today");
var today = moment().format('LLLL');
currentDay.text("Today is " + today);
var currentHour = moment().format("H");
var tasks = [];
var $timeBlocks = $(".time-slot");



//edit task
$(".task-item").on("click", ".task-title", function () {
    //get text
var text = $(this).text().trim();
    //replace with new texarea
var textInput = $("<textarea>").addClass("form-control").val(text);

$(this).replaceWith(textInput);

textInput.trigger("foucs");

});

//unfocusing texting area

$(".task-item").on("blur", "textarea", function (){
var text = $(this).val();
var h4 = $("<h4>").addClass("item-title").text(text);
// var id = $(this).parent()[0].id;
$(this).replaceWith(h4);

});



var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function() {
    var savedTasks = localStorage.getItem("tasks");
  
        savedTasks = JSON.parse(savedTasks);

        
  // loop through savedTasks array
  for (var i = 0; i < savedTasks.length; i++) {
    createTask(savedTasks[i]);
  }
};


//creating button to save tasks in local storage as object//

$(".task-item").on("click", ".btn-primary", function() {
    
    
    var taskText = $(this).siblings("h4").text();
    var taskDate = $(this).siblings("span").text();
    

     //saving date and time in tasks object

    var taskObj = {
        text : taskText,
        date : taskDate,
    };

    tasks.push(taskObj);
  

    // console.log("taskText");
    // console.log("taskDate");
     console.log($(this).parent().attr("id"));
     //this refers to the button
     // parent to the div
     
    saveTasks();
});

// coloring the slot
function slotColors(){
    var $taskSlot = $(".task-slot");
    $taskSlot.each(function(){
      var $thisSlot = $(this);
      var slotHour = parseInt($thisSlot.attr("data-time"));

//styling blocks if matched the if terms
      if (slotHour == currentHour) {
        $thisSlot.addClass("present").removeClass("past future");
      }
      if (slotHour < currentHour) {
        $thisSlot.addClass("past").removeClass("present future");
      }
      if (slotHour > currentHour) {
        $thisSlot.addClass("future").removeClass("past present");
      }
    });
}

slotColors();


loadTasks();