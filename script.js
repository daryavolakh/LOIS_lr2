/*
    //////////////////////////////////////////////////////////////////////////////////////
// Лабораторная работа 2 по дисциплине ЛОИС
// Выполнена студенткой группы 621702 БГУИР Волах Д.Ю.
// **************.
// 26.02.2019
//
// https://learn.javascript.ru/
//
    //////////////////////////////////////////////////////////////////////////////////////
*/

var constants = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '0'];
var operations = ['~', '->', '|', '&', '!'];
var formula;

function findInArray(array, temp) {
    for (var index = 0; index < array.length; index++) {
        if (array[index].toString() == temp.toString()) {
            return true;
        }
    }
    return false;
}

function getSubFormula(memory, subFormulas, priority) {
    var open = 0;
    var close = 0;
    var subFormula = new Array();

    for (var index = memory; index < formula.length; index++) {
        subFormula.push(formula[index]);
        if (formula[index] == '(') {
            open++;
        }

        if (formula[index] == ')') {
            close++;
        }

        if (open == close) {
            if (findInArray(subFormulas, subFormula) == false) {
                var temp = new Array();
                temp.push(priority, subFormula);
                subFormulas.push(temp);
            }
            return;
        }
    }
}

function findSubformulas(subFormulas, variables) {
    var numOfOpen = 0;
    //var numOfClose = 0;
    for (var index = 0; index < formula.length; index++) {
        if (formula[index] == '(') {
            numOfOpen++;
            getSubFormula(index, subFormulas, numOfOpen);
        }

        else if (formula[index] == ')') {
            numOfOpen--;
        }

        else if (findInArray(constants, formula[index]) && !findInArray(variables, formula[index])) {
            variables.push(formula[index]);
            console.log("VARIABLE -> " + formula[index]);
        }
    }
}

function changeConstant(constant){
    if (constant == 0){
        return 1;
    }
    else {
        return 0;
    }
}

function createTable(table, variables){
    for (var indexI = variables.length - 1; indexI >= 0; indexI--){
        var row = new Array();
        var changeConst = Math.pow(2, indexI);
        var constant = 0;
        for (var indexJ = 0; indexJ < Math.pow(2,variables.length); indexJ++){
            row.push(constant);
            console.log("CHANGE CONSTANT: " + changeConst);
            if((indexJ + 1) % changeConst == 0){
                constant = changeConstant(constant);
            }
        }
        table.push(row);
    }
    console.log(table);
}

function findOperation(subFromula){
    for (var index = 0; index < subFormula.length; index++){
        if (findInArray(operations, formula[index])){
            return formula[index];
        }

        if (formula[index] == '-' && formula[index + 1] == ">"){
            var operation = formula[index] + formula[index + 1];
            return operation;
        }
    }
}

//нужно как-то доставать нужные связки из больших формул или заменять обработанные формулы какими-то буквами (для упрощения).
//один массив, где на первом месте подформула, на втором - соответствующая ей колонка со значениями. 

function withOutName(table, subFormulas){  /* rename */
    for (var index = subFormulas.length - 1; index >= 0; index--){
        var operation = findOperation(subFormulas[index]);
        var row = new Array();
        if (operation == "!"){
            for (var indexJ = 0; indexJ < Math.pow(2,variables.length); indexJ++){
                place = ; /*индекс, соответствующий переменной в ТИ*/
                var value = changeConstant(variable[place]);
                row.push(value);
            }

        } else if (operation == "&"){

        } else if (operation == "|"){
            
        } else if (operation == "~"){
            
        } else if (operation == "->"){

        }
    }
}

function start() {
    var input = document.getElementById("form");
    var subFormulas = new Array();
    var variables = new Array();
    var table = new Array();
    formula = input.elements[0].value;

    if (formula == "") {
        alert("Empty field! Please, enter formula!")
        return;
    }

    findSubformulas(subFormulas, variables);
    createTable(table, variables);
    var body = document.querySelector("body");
    var newDiv = document.createElement("div");
    var ol = document.createElement("ol");
    var mainDiv = document.getElementById("gener_div");
    mainDiv.innerHTML = "";

    newDiv.setAttribute("class", "div_with_ol");

    for (index1 = 0; index1 < subFormulas.length; index1++) {
        var str = '';
        for (index2 = 0; index2 < subFormulas[index1].length; index2++) {
            str += subFormulas[index1][index2];
        }
        var content = document.createTextNode(str);
        var li = document.createElement("li");
        li.appendChild(content);
        ol.appendChild(li);
    }
    newDiv.appendChild(ol);
    mainDiv.appendChild(newDiv);

    var answer = document.createElement("p");
    var answerContent = document.createTextNode("Answer: " + subFormulas.length + ".");
    answer.appendChild(answerContent);
    mainDiv.appendChild(answer);
}
//((P~Q)~((!W)&(!P)))