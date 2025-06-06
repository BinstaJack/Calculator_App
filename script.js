document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.btn');
  const display = document.getElementById('display');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const value = this.dataset.value;
      const action = this.dataset.action;

      if (value) {
        if (this.classList.contains('operator')) {
          handleOperator(value);
        } else {
          updateDisplay(value);
        }
      } else if (action) {
        if (action === 'ac') {
          clearDisplay();
        } else if (action === 'equals') {
          calculateResult();
        } else if (action === 'sqrt') {
          calculateCustom('sqrt');
        } else if (action === 'pow2') {
          calculateCustom('pow2');
        } else if (action === 'pow3') {
          calculateCustom('pow3');
        }
      }
    });
  });

  function updateDisplay(value) {
    if (display.innerText === '0') {
      display.innerText = value;
    } else {
      display.innerText += value;
    }
  }

  function clearDisplay() {
    display.innerText = '0';
  }

  function handleOperator(operator) {
    const lastChar = display.innerText.slice(-1);
    if ("+-*/".includes(lastChar)) {
      display.innerText = display.innerText.slice(0, -1) + operator;
    } else {
      display.innerText += operator;
    }
  }

  function calculateResult() {
    try {
      const result = eval(display.innerText);
      display.innerText = result;
    } catch (error) {
      display.innerText = "Error";
      setTimeout(clearDisplay, 1500);
    }
  }

  function calculateCustom(type) {
    try {
      const value = parseFloat(display.innerText);
      let result;
      if (type === 'sqrt') {
        result = Math.sqrt(value);
      } else if (type === 'pow2') {
        result = Math.pow(value, 2);
      } else if (type === 'pow3') {
        result = Math.pow(value, 3);
      }
      display.innerText = result;
    } catch {
      display.innerText = "Error";
      setTimeout(clearDisplay, 1500);
    }
  }
});
