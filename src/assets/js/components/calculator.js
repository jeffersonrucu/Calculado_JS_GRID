window.onload = function () {
    var display_expression = document.querySelectorAll('.calculator__expression');
    var display_result = document.querySelectorAll('.calculator__result');
    var btn_calculator = document.querySelectorAll('.calculator__btn');
    var mathematical_expression = '';
    var result = '';
    var new_expression = false;

    function additionsSpanBetweenOperators(string) {
        var array = string.split('');
        var new_string = ''
        array.forEach(value => {
            if(isNaN(value)) {
                new_string += '<span>' + value + '</span>'
            } else {
                new_string += value
            }
        })
        return new_string;
    }

    function resetDisplay () {
        display_expression.forEach(display => {
            display.innerHTML = '0'
        })

        display_result.forEach(display => {
            display.innerHTML = '0';
        })
    }

    function resetMathematicalExpression () {
        mathematical_expression = '';
        new_expression = true;
    }

    function suspendCalculation () {
        mathematical_expression = '';
        resetDisplay();
    }

    function displayMathematicalExpression () {   
        var expression_HTML = additionsSpanBetweenOperators(mathematical_expression);
        
        if (new_expression) {
            resetDisplay();
            new_expression = false;
        } 

        display_expression.forEach(display => {
            display.innerHTML = expression_HTML;
        })
    }

    function displayResult () {
        console.log(result)
        display_result.forEach(display => {
            display.innerHTML = '= ' + result;
        })
    }

    function storeValues (value) {
        mathematical_expression += value;
        displayMathematicalExpression();
    }

    function calculateExpression () {
        result = eval(mathematical_expression);
        displayResult();
        resetMathematicalExpression();
    }

    function checkValueType (event) {
        let btn_value = event.target.dataset.value;

        if (btn_value == '=') {
            calculateExpression();
        } 
        else if (btn_value == 'AC') {
            suspendCalculation();
        } 
        else {
            storeValues(btn_value);
        }
    }

    btn_calculator.forEach(btn => {
        btn.addEventListener('click', checkValueType);
    });
}