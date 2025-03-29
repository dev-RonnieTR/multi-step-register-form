/* STEPS */
const stepDivs = [
	document.getElementById("step-one"),
	document.getElementById("step-two"),
	document.getElementById("step-three"),
];
const validateSteps = [validateStepOne, validateStepTwo, validateStepThree];
const steps = [runStepOne, runStepTwo, runStepThree];
let step = 0; //index that will access the steps, stepDivs and validateSteps array

/* CONTINUE BUTTON */
const continueButton = document.createElement("button");
const continueButtonText = document.createTextNode("Continue");
continueButton.appendChild(continueButtonText);
continueButton.id = "continue-button";
continueButton.type = "button";

/* STEPPER CIRCLES */
const circles = [...document.getElementsByClassName("circle")];

/* INFOMRATION COLLECTED */
const userInfo = {
	name: null,
	email: null,
	topics: [],
};

function runStepOne() {
	step = 0;
	stepDivs[step].appendChild(continueButton);
	continueButton.addEventListener("click", validateStepOne);
	circles[0].onclick = enableCircleClick;
	circles[1].onclick = ""; //Locks user from going to next steps if they just clicked on a previous step.
	circles[2].onclick = "";
}

function validateStepOne() {
	const name = document.getElementById("name-input").value.trim();
	const email = document.getElementById("email-input").value;
	if (name === "" || email === "") {
		alert("All fields should be filled out");
		return;
	}
	userInfo.name = name;
	userInfo.email = email;

	nextStep(step, step + 1); //Args: (currentStepIndex, nextStepIndex)
}

function runStepTwo() {
	step = 1;
	const topicButtons = [
		document.getElementById("software-development"),
		document.getElementById("user-experience"),
		document.getElementById("graphic-design"),
	];
	topicButtons.forEach((button) =>
		button.addEventListener("click", toggleTopic)
	);
	circles[1].onclick = enableCircleClick;
	circles[2].onclick = "";
}

function validateStepTwo() {
	//Button declarations
	const topicButtons = [
		document.getElementById("software-development"),
		document.getElementById("user-experience"),
		document.getElementById("graphic-design"),
	];
	//Reset Values
	userInfo.topics = [];

	//Implementation
	topicButtons.forEach((topic) => {
		if (topic.classList.contains("topic--active"))
			userInfo.topics.push(topic.textContent);
	});

	if (userInfo.topics.length === 0) {
		alert("You must select at least one topic");
		return;
	}
	nextStep(step, step + 1); //Args: (currentStepIndex, nextStepIndex)
}

function runStepThree() {
	//Element declarations
	const nameSpan = document.getElementById("name-span");
	const emailSpan = document.getElementById("email-span");
	const topics = document.getElementById("topics");
	//Reset values
	topics.innerHTML = "";

	nameSpan.textContent = userInfo.name;
	emailSpan.textContent = userInfo.email;
	userInfo.topics.forEach((topic) => {
		topics.innerHTML += `<li class="topic-chosen">${topic}</li>`;
	});
	step = 2;
}
function validateStepThree() {
	alert("✅ Success");
}

function toggleTopic(event) {
	event.target.classList.toggle("topic--active");
}

function nextStep(currentStepIndex, nextStepIndex) {
	stepDivs[currentStepIndex].classList.remove("step--active");
	circles[currentStepIndex].classList.remove("circle--active");
	continueButton.removeEventListener("click", validateSteps[currentStepIndex]);
	continueButton.remove();

	stepDivs[nextStepIndex].classList.add("step--active");
	circles[nextStepIndex].classList.add("circle--active");
	stepDivs[nextStepIndex].appendChild(continueButton);
	continueButton.addEventListener("click", validateSteps[nextStepIndex]);

	document.getElementById("step-number").textContent = nextStepIndex + 1;
	steps[nextStepIndex]();
}

function enableCircleClick(event) {
	circles.forEach((circle, index) => {
		if (event.target === circle) {
			circlesLogic(index);
			return;
		}
	});
}

function circlesLogic(nextStepIndex) {
	stepDivs.forEach((div, index) => {
		if (div.classList.contains("step--active")) {
			nextStep(index, nextStepIndex);
			return;
		}
	});
}

runStepOne();
