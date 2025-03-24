const stepOne = document.getElementById("step-one");
const stepTwo = document.getElementById("step-two");
const stepThree = document.getElementById("step-three");

const userInfo = {
    name: null,
    email: null,
    topics: [],
}

/*Continue Button*/
const continueButton = document.createElement("button");
const continueButtonText = document.createTextNode("Continue");
continueButton.appendChild(continueButtonText);
continueButton.id = "continue-button";
stepOne.appendChild(continueButton);

