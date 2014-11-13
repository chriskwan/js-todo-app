$(document).ready(function(){

	main();

	function main() {
		attachEvents();		
	}

	function attachEvents() {
		attachLoadTasks();
		attachUserNameHandler();
		attachMoreButtonHandler();
	}

	function attachLoadTasks() {
		//jQuery practice
		$("#loadTasksLink").click(function(event){
			//using success
			// $.ajax({
			// 	url: "http://localhost:8080/tasks.json",
			// 	success: function(data){
			// 		var mydata = data;
			// 	}
			// });

			//using done
			$.ajax({
				url: "http://localhost:8080/tasks.json",
				type: "GET", //POST gets 404
				data: {
					cats: 12, 
					lions: false
				}
			}).done(function(data){
				//add new tasks
				var $tasks = $('#tasklist');
				for (var i=0; i<data.length; i++) {
					var item = data[i];
					var $newTask = getTaskElement(
						item.isDone,
						item.name,
						item.description
					);
					$tasks.append($newTask);
				}
			});
		})
	}

	function getTaskElement(isTaskCompleted, taskName, taskDetails) {
		var $newTask = $('<li></li>');
		$newTask.addClass('task');
		
		var $taskHeader = $('<div></div>');
		$taskHeader.addClass('task-header');
		$taskHeader.append($('<input>', {
			type: "checkbox",
			checked: isTaskCompleted
		}));
		$taskHeader.append($('<span></span>').text(taskName));
		$taskHeader.append(
			$('<button></button>')
			.text("More")
			.addClass('more-button show-more')
		);
		$newTask.append($taskHeader);

		var $taskDetails = $('<div></div>');
		$taskDetails.addClass('task-details');
		$taskDetails.addClass('is-hidden');
		$taskDetails.append($('<p></p>').text(taskDetails));
		$newTask.append($taskDetails);

		return $newTask;
	}

	function attachUserNameHandler() {
		var userNames = document.querySelectorAll(".user-name");
		var complimentName = function() {
			alert("You've got a nice name!");
		};
		attachClickHandlerToElements(userNames, complimentName);
	}

	function attachMoreButtonHandler() {
		var moreButtons = document.querySelectorAll(".more-button");
		attachClickHandlerToElements(moreButtons, moreButtonClick);
	}

	function moreButtonClick(event) {
		var targetBtn = event.target;
		var taskHeader = targetBtn.parentNode;
		var task = taskHeader.parentNode;

		if (targetBtn.classList.contains("show-more")) {
			targetBtn.classList.remove("show-more");	
			targetBtn.classList.add("show-less");
			targetBtn.innerText = "Less";
			var taskDetails = task.querySelectorAll(".task-details");
			for (var i=0; i<taskDetails.length; i++) {
				taskDetails[i].classList.remove("is-hidden");
			}
		} else if (targetBtn.classList.contains("show-less")) {
			targetBtn.classList.remove("show-less");
			targetBtn.classList.add("show-more");
			targetBtn.innerText = "More";
			var taskDetails = task.querySelectorAll(".task-details");
			for (var i=0; i<taskDetails.length; i++) {
				taskDetails[i].classList.add("is-hidden");
			}
		}
	}

	function attachClickHandlerToElements(elements, clickHandler) {
		for (var i=0; i<elements.length; i++) {
			elements[i].addEventListener("click", clickHandler);
		}
	}

});