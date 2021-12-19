let currentDay = $("#today");
var today = moment().format('LLLL');
currentDay.text("Today is " + today);
var tasks = [];

// var loadTasks = function() {
//     tasks = JSON.parse(localStorage.getItem("tasks"));
// }



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

var saveTasks = function() {localStorage.setItem("tasks", JSON.stringify(tasks));};

//creating button to save tasks//


$(".task-item").on("click", ".btn-primary", function() {
    
    var taskText = $(".task-title").val();
    var taskDate = $(".task-time").val();

    var taskObj = {
        text : taskText,
        date : taskDate,
    };

    tasks.push(taskObj);
  
    // console.log('button clicked');
    // console.log("taskText");
    // console.log("taskDate");

    saveTasks();

});



// loadTasks();



//time pass function//

$(".task-item").each(function () {
 let timeItemValue = localStorage.getItem(this.id);
 if (timeItemvalue) {
     $(this).find("h4").text(timeItemValue);
 }

 let time = $(this).attr("data-time");


 if (parseInt(time) == parseInt(moment().format("LLLL"))) {
    $(this).addClass("present");
 }

 if (parseInt(time) < parseInt(moment().format("LLLL"))) {
    $(this).addClass("past");
 }

 if (parseInt(time) > parseInt(moment().format("LLLL"))) {
    $(this).addClass("future");
 }
});

// $(".btn-primary").click(function() {

//     var taskText = $(".task-title").val();
    
//     if (taskText) {
//       createTask(taskText);
  
//       tasks.push({
//         text: taskText});
  
//       saveTasks();
//     }
//   });
