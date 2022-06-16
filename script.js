
let num1 = "";
let num2 = "";
let operator = "";

const currentDisplayNumber = document.querySelector(".a");
const previousDisplayNumber = document.querySelector(".b");

window.addEventListener("keydown", handleKeyPress);

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
  if (num1 != "" && num2 != "") {
    compute();}
});
const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
  addDecimal();
});
const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalculator);
const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);});
});
function handleNumber(number) {
  if (num2 !== "" && num1 !== "" && operator === "") {
    num2 = "";
    currentDisplayNumber.textContent = num1;
  }
  if (num1.length <= 11) {
    num1 += number;
    currentDisplayNumber.textContent = num1;
  }
}
operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});
function handleOperator(op) {
  if (num2 === "") {
    num2 = num1;
    checkOp(op);
  } else if (num1 === "") {
    checkOp(op);
  } else {
    compute();
    operator = op;
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = num2 + " " + operator;
  }
}
function checkOp(text) {
  operator = text;
  previousDisplayNumber.textContent = num2 + " " + operator;
  currentDisplayNumber.textContent = "0";
  num1 = "";
}
function compute() {
  num2 = Number(num2);
  num1 = Number(num1);
  if (operator === "+") {
    num2 += num1;
  } else if (operator === "-") {
    num2 -= num1;
  } else if (operator === "x") {
    num2 *= num1;
  } else if (operator === "/") {
    if (num1 <= 0) {
      num2 = "ERROR!";
      displayResults();
      return;
    }
    num2 /= num1;
  }
  num2 = roundNumber(num2);
  num2 = num2.toString();
  displayResults();
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}
function displayResults() {
  if (num2.length <= 11) {
    currentDisplayNumber.textContent = num2;
  } else {
    currentDisplayNumber.textContent = num2.slice(0, 11) + "...";
  }
  previousDisplayNumber.textContent = "";
  operator = "";
  num1 = "";
}

function del(){
  currentDisplayNumber.value=currentDisplayNumber.value.slice(0,-1);
}

function clearCalculator() {
  num1 = "";
  num2 = "";
  operator = "";
  currentDisplayNumber.textContent = "0";
  previousDisplayNumber.textContent = "";
}
function addDecimal() {
  if (!num1.includes(".")) {
    num1 += ".";
    currentDisplayNumber.textContent = num1;
  }
}
function handleKeyPress(e) {
  e.preventDefault();
	  if (e.key >= 0 && e.key <= 9) {
     handleNumber(e.key);
  }
  if (
    e.key === "Enter" ||
    (e.key === "=" && num1 != "" && num2 != "")
  ) {
    compute();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    handleOperator(e.key);
  }
  if (e.key === "*") {
    handleOperator("x");
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Backspace") {
    backSpace();
  }
}
function backSpace() {
  if (num1 !== "") {
    num1 = num1.slice(0, -1);
    currentDisplayNumber.textContent = num1;
    if (num1 === "") {
      currentDisplayNumber.textContent = "0";
    }
  }
  if (num1 === "" && num2 !== "" && operator === "") {
    num2 = num2.slice(0, -1);
    currentDisplayNumber.textContent = num2;
  }
}
function inputPercent() {
	currentDisplayNumber.textContent = (currentDisplayNumber.textContent/100).toString();
}
function setOperator(){
	let sign =currentDisplayNumber.textContent.toString()[0];
	 	 if( sign==="-")
	 	 { currentDisplayNumber.textContent=currentDisplayNumber.textContent.slice(1);
			num2=Number(currentDisplayNumber.textContent);
		 }
	 	 else{
				sign="-";
			currentDisplayNumber.textContent=sign.concat(currentDisplayNumber.textContent); 
			num2=Number(currentDisplayNumber.textContent);
}}

