let operation = "None";
        let erase = false;

        // Clear Display
        const clear = document.querySelector(`#clear`);
        clear.addEventListener('click', clearDisplay);

        function clearDisplay(event) {
            const display = document.querySelector(`.display`);
            display.textContent = "0";
            operation = "None";
        }

        // Display Number
        const buttons = document.querySelectorAll(`.numbers div  button`);
        buttons.forEach(button => button.addEventListener('click', displayNumber));

        function displayNumber(event) {
            const display = document.querySelector(`.display`);
            const displayText = display.textContent;

            const input = document.querySelector(`#${event.target.id}`);
            const inputText = input.textContent;

            if(inputText === `.`) {
                const lastVal = displayText[displayText.length-1];
                if(lastVal === `.`) {
                    return;
                }
                else if(lastVal === operation || lastVal === `-`) {
                    display.textContent += `0.`;
                }
                else {
                    display.textContent += inputText;
                }
            }
            else if(inputText === `+/-`) {
                if(displayText === `0`) {
                    display.textContent = `-`;
                }
                else if(displayText === `-`) {
                    display.textContent = `0`;
                }
                else if(displayText[displayText.length-1] === operation) {
                    display.textContent += `-`;
                }
                else if(displayText.indexOf(operation) !== -1) {
                    const nums = displayText.split(operation);
                    const num = Number(nums[1]);
                    display.textContent = `${nums[0]}${operation}${num*-1}`;
                }
                else {
                    const num = Number(displayText);
                    display.textContent = num*(-1);
                }
            }
            else if(input.className === 'operate') {
                if('+−/x'.indexOf(displayText[displayText.length-1]) > -1) {
                    return;
                } 
                display.textContent += inputText;
                erase = false;
            }
            else if(displayText === `0`) {
                display.textContent = inputText;
            }
            else if(erase) {
                display.textContent = inputText;
                erase = false;
            }
            else {
                display.textContent += inputText;
            }
            return;
        }

        // Logs operation
        const operators = document.querySelectorAll(`.operate`);
        operators.forEach(op => op.addEventListener('click', logOperation));

        function logOperation(event) {
            const displayText = document.querySelector(`.display`).textContent;
            operation = displayText[displayText.length-1];
        }

        // Gets number and calculates
        const equals = document.querySelector(`#equals`);
        equals.addEventListener('click', calculate);

        function calculate(event) {
            const display = document.querySelector(`.display`);
            const nums = display.textContent.split(operation);
            if(nums.length === 1 || nums[1] === '') {
                return;
            }
            const firstNum = Number(nums[0]);
            const secondNum = Number(nums[1]);

            display.textContent = Math.round(operate(operation, firstNum, secondNum) * 10000) / 10000;
            erase = true;
        }

        // Delete button
        const del = document.querySelector(`#delete`);
        del.addEventListener('click', deleteNum);

        function deleteNum(event) {
            const display = document.querySelector(`.display`);
            display.textContent = display.textContent.substring(0,display.textContent.length-1);
            if(display.textContent.length === 0) {
                display.textContent = 0;
            }
        }


        // Operation Logic
        function add(a,b) {
            return a + b;
        }

        function subtract(a,b) {
            return a - b;
        }

        function multiply(a,b) {
            return a * b;
        }

        function divide(a,b) {
            return a / b;
        }

        function operate(operator, a, b) {
            switch(operator) {
                case "+":
                    return add(a,b);
                case "−":
                    return subtract(a,b);
                case "x":
                    return multiply(a,b);
                case "/":
                    return divide(a,b);
                default:
                    return "Operator Error"
            }
        }