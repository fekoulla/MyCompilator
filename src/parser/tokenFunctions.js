const Token = require('../grammar/token.js')

const addToken = (type, value) => {
    tokens.push(new Token(type, value, current))
  }


function carriageReturn(){
        addToken('line-break', '\n')
        cursor_y += 1
        cursor_x = 1
        current++
}

function doubleCote(){
	sub_current = 1
        sub_char = slice.charAt(sub_current)
		var isString= false;
        while (sub_current < slice.length) {
          sub_char = slice.charAt(sub_current)
		  if (sub_char === '"') {
			sub_current++
			addToken('object-string', slice.substring(0, sub_current))
			current += sub_current;
			isString= true;
            break;
          }
          sub_current++
        }
		if(!isString){
			throw `if you start a string ${cursor_y}:${cursor_x} ${char} you have to end it.`
		}
}


function equalOperator(){
	addToken('equal', '=')
        current++
}

function variableDeclaration(){
	addToken('variable-declaration', '$', cursor_y)
    current++
}

function substractionOperator(){
	addToken('substraction', '-')
        current++
}

function additionOperator(){
	addToken('addition', '+')
        current++
}

function multiplicationOperator(){
	addToken('multiplication', '*')
        current++
}

function divisionOperator(){
	addToken('division', '/')
        current++
}

function endInstruction(){
	addToken('instruction-end', ';');
        current++
}

function point(){
	addToken('point', '.');
        current++
}

function virgule(){
	addToken('virgule', ',');
        current++
}

function parenthesisStart(){
	addToken('parenthesis-start', '(');
        current++
}

function parenthesisEnd(){
	addToken('parenthesis-end', ')');
        current++
}




































