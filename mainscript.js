(function(){

	attachEvents();

	function attachEvents() {
		attachUserNameHandler();
		attachMoreButtonHandler();
	}

	function attachUserNameHandler(){
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

})()