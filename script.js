const display = document.querySelector(".calculator-display")
const keypad = document.querySelector(".calculator-keypad")

if (!display) {
  throw new Error("No se encontró el display de la calculadora")
}

if (!keypad) {
  throw new Error("No se encontró el keypad de la calculadora")
}

const calculatorState = {
  currentValue: "0",
  previousValue: null,
  operator: null
}

const buttons = [
  { label: "7", type: "number" },
  { label: "8", type: "number" },
  { label: "9", type: "number" },
  { label: "/", type: "operator" },
  { label: "4", type: "number" },
  { label: "5", type: "number" },
  { label: "6", type: "number" },
  { label: "*", type: "operator" },
  { label: "1", type: "number" },
  { label: "2", type: "number" },
  { label: "3", type: "number" },
  { label: "-", type: "operator" },
  { label: "0", type: "number" },
  { label: "C", type: "clear" },
  { label: "=", type: "equals" },
  { label: "+", type: "operator" },
  { label: "<-", type: "delete" },
  { label: ",", type: "decimal"}
]

function renderDisplay () {
  display.textContent = calculatorState.currentValue
}

function createButton () {
  const button = document.createElement("button")
  return button
}

buttons.forEach(function (buttonConfig) {
  const button = createButton()

  button.textContent = buttonConfig.label
  button.dataset.type = buttonConfig.type
  button.dataset.value = buttonConfig.label
  button.classList.add("calculator-button")

  if (buttonConfig.type === "operator") {
    button.classList.add("operator")
  }

  keypad.append(button)
})

function handleNumber (value) {
  if (calculatorState.currentValue === "0") {
    calculatorState.currentValue = value
    return
  }

  calculatorState.currentValue += value
}

function handleOperator (operator) {
  calculatorState.previousValue = calculatorState.currentValue
  calculatorState.operator = operator
  calculatorState.currentValue = "0"
}

function clearCalculator () {
  calculatorState.currentValue = "0"
  calculatorState.previousValue = null
  calculatorState.operator = null
}

function addHistoryEntry (previous, current, operator, result)
{
    const historyList = document.querySelector(".history-list")
    const entry = document.createElement("li");
    entry.textContent = `${previous} ${operator} ${current} = ${result}`;
    historyList.appendChild(entry);
}

function calculateResult () {
  if (calculatorState.previousValue === null || calculatorState.operator === null) {
    return
  }

  const previous = Number(calculatorState.previousValue)
  const current = Number(calculatorState.currentValue)
  let result = 0

  switch (calculatorState.operator){
  case "+":
    result = previous + current;
    break;

  case "-":
    result = previous - current;
    break;

  case "*":
    result = previous * current;
    break;

  case "/":
    if (current === 0) {
      result = "Error: División por cero";
    } else {
      result = previous / current;
    }
    break;
}
  addHistoryEntry (previous, current, calculatorState.operator, result);
  calculatorState.currentValue = String(result)
  calculatorState.previousValue = null
  calculatorState.operator = null
}

function deleteLastDigit () {
    if (calculatorState.currentValue.length > 1) {
        calculatorState.currentValue= calculatorState.currentValue.slice(0, -1);
    }
    else{
        calculatorState.currentValue = "0";
    }
}

function AddDecimal(){
    if (!calculatorState.currentValue.includes(".")) {
        calculatorState.currentValue += ".";
    }
}

function buttonPress (event) {
  const button = event.target.closest("button")

  if (!button) {
    return
  }

  const type = button.dataset.type
  const value = button.dataset.value

  console.log("Button clicked:", type, value)

  switch (type){
    case "number":
      handleNumber(value);
      break;    
    
    case "operator":
      handleOperator(value);
      break;
    
    case "clear":
      clearCalculator();
      break;

    case "equals":
      calculateResult();
      break;

    case "delete":
        deleteLastDigit();
        break;
    
    case "decimal":
        AddDecimal();
        break;
  }

  renderDisplay()
}

keypad.addEventListener("click", buttonPress)