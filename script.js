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
}

function validateStepTwo() {
	const topicButtons = [
		document.getElementById("software-development"),
		document.getElementById("user-experience"),
		document.getElementById("graphic-design"),
	];
	topicButtons.forEach((topic) => {
		if (topic.classList.contains("topic--active"))
			userInfo.topics.push(topic.textContent);
	});

	nextStep(step, step + 1); //Args: (currentStepIndex, nextStepIndex)
}

function runStepThree() {
	step = 2;
	const nameSpan = document.getElementById("name-span");
	const emailSpan = document.getElementById("email-span");
	const topics = document.getElementById("topics");

	nameSpan.textContent = userInfo.name;
	emailSpan.textContent = userInfo.email;
	userInfo.topics.forEach((topic) => {
		topics.innerHTML += `<li>${topic}</li>`;
	});
}
function validateStepThree() {
	alert("✅ Success");
}

function toggleTopic(event) {
	event.target.classList.toggle("topic--active");
}

function nextStep(currentStepIndex, nextStepIndex) {
	stepDivs[currentStepIndex].classList.remove("step--active");
	continueButton.removeEventListener("click", validateSteps[currentStepIndex]);
	continueButton.remove();

	stepDivs[nextStepIndex].classList.add("step--active");
	stepDivs[nextStepIndex].appendChild(continueButton);
	continueButton.addEventListener("click", validateSteps[nextStepIndex]);

	document.getElementById("step-number").textContent = nextStepIndex + 1;
	steps[nextStepIndex]();
}

runStepOne();
