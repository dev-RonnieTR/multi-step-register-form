const stepOne = document.getElementById("step-one");
const stepTwo = document.getElementById("step-two");
const stepThree = document.getElementById("step-three");

const steps = [stepOne, stepTwo, stepThree]; 
let step = 0; //index that will access the steps array

const userInfo = {
	name: null,
	email: null,
	topics: [],
};

/*Continue Button*/
const continueButton = document.createElement("button");
const continueButtonText = document.createTextNode("Continue");
continueButton.appendChild(continueButtonText);
continueButton.id = "continue-button";
continueButton.type = "button";
stepOne.appendChild(continueButton);

/* EVENT LISTENERS */
continueButton.addEventListener("click", validateStepOne);

function validateStepOne() {
	const name = document.getElementById("name-input").value.trim();
	const email = document.getElementById("email-input").value;
	if (name === "" || email === "") {
		alert("All fields should be filled out");
		return;
	}
	userInfo.name = name;
	userInfo.email = email;

	nextStep();
}

function nextStep() {
    steps[step].classList.remove('step--active');

    step++;
    steps[step].classList.add('step--active');
    steps[step].appendChild(continueButton);
}
