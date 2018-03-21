module.exports = tokens => {
    var AST = { body: [] };
    var last_token = null;
    var php_start = false;

    if(tokens.shift().type != 'script-php-start'){
        throw 'You need to start your code with "<?php"'
    }
    while (tokens.length > 0) {
        var current_token = tokens.shift();
        switch(current_token.type){
            case 'php-echo-command':
                var next = tokens.shift();
                current_token= next;
                switch(next.type){
                    case 'object-string':
                    case 'number':
                    case 'number-float':
                        expression.value = next;
                        break;
                    default:
                        throw 'You have to assign a known type to echo command '+last_token.value;
                }
                AST.body.push(expression);
                next = tokens.shift();
                current_token= next;
                if(next.type != "instruction-end"){
                    throw 'You need to terminate your instruction with ; at line ' + next.line
                }
                break;
            case 'variable-declaraction':
                var expression = {
                    type: 'VariableDeclarationExpression',
                    value: ''
                }
                var next = tokens.shift();
                current_token= next;
                if(next.type==="equal"){
                    expression.value= next.value;
                }else{
                    throw 'You have to define your variable with an equal at line ' + next.line;
                }
                AST.body.push(expression);
                break;
                var next = tokens.shift();
                current_token= next;
                if(next.type==="identifier"){
                    expression.value= next.value;
                }else{
                    throw 'You have to define a identifier for a variable.';
                }
                AST.body.push(expression);
                next = tokens.shift();
                current_token= next;
                if(next.type != "instruction-end"){
                    throw 'You need to terminate your instruction with ; at line ' + next.line
                }
                break;
            case 'equal':
                if(last_token.type=="identifier"){
                    var expression = {
                        type: 'VariableAssignationExpression',
                        identifier: last_token.value,
                        value: ''
                    }
                    var next = tokens.shift();
                    current_token= next;
                    switch(next.type){
                        case 'object-string':
                        case 'number':
                        case 'number-float':
                            expression.value = next;
                            next = tokens.shift();
                            current_token= next;
                            if(next.type != "instruction-end"){
                                throw 'You need to terminate your instruction with ; at line ' + next.line
                            }
                            break;
                        case 'variable-declaration':
                            break;
                        default:
                            throw 'You have to assign a known type to variable ' + last_token.value + ' at line ' + next.line;
                    }
                    AST.body.push(expression);

                } else {
                    throw 'Empty equal at line ' + next.line
                }
                break;

            case 'operator':
                if(last_token.type=="identifier"){
                    var expression = {
                        type: 'VariableAssignationExpression',
                        identifier: last_token.value,
                        value: ''
                    }
                    var next = tokens.shift();
                    current_token= next;
                    switch(next.type){
                        case 'object-string':
                        case 'number':
                        case 'number-float':
                            expression.value = next;
                            break;
                        case 'variable-declaration':
                            next = tokens.shift();
                            current_token= next;
                            if(next.type != "identifier"){
                                throw 'No variable declaration at line ' + current_token.line
                            }
                            next = tokens.shift();
                            current_token= next;
                            if(next.type != "instruction-end"){
                                throw 'You need to terminate your instruction with ; at line ' + next.line
                            }
                            break;
                        default:
                            throw 'You have to assign a known type to variable ' + last_token.value;
                    }
                    AST.body.push(expression);
                } else {
                    throw 'Empty operator at line ' + next.line
                }
                break;

            case 'console-object':
                var next = tokens.shift();
                current_token= next;
                if(next.type=="point"){
                    var expression = {
                        type: 'ConsoleUseMethodeExpression',
                        methode: '',
                        arguments: [],
                    }
                    next = tokens.shift();
                    current_token= next;
                    if(next.type==="identifier"){
                        expression.methode= next.value;
                        next = tokens.shift();
                        current_token= next;
                        if(next.type==="parenthesis-start"){
                            var isEnding= false;
                            do{
                                next= tokens.shift();
                                current_token= next;
                                switch(next.type){
                                    case 'object-string':
                                    case 'number':
                                    case 'number-float':
                                    case 'identifier':
                                        expression.arguments.push(next);
                                        break;
                                    case 'parenthesis-end':
                                        isEnding= true;
                                        break
                                        case 'virgule':
                                        break;
                                    default:
                                        throw 'Error of using arguments';
                                }
                            } while(next.type!="parenthesis-end" && tokens.length > 0);
                            if(!isEnding){
                                throw 'You have to close parenthesis when you use method.';
                            }else{
                                AST.body.push(expression);
                                if(next.type != "instruction-end"){
                                    throw 'You need to terminate your instruction with ; at line ' + next.line
                                }
                            }
                        }else{
                            throw 'You have to use parenthesis to use method.';
                        }
                    }else{
                        throw 'You have to define a identifier for a variable next to a console pbject.';
                    }
                }
                if(next.type != "instruction-end"){
                    throw 'You need to terminate your instruction with ; at line ' + next.line;
                }
                break;
            case 'instruction-end':
                break;
            case 'line-break':
                break;

        }
        last_token= current_token;
    }
    return AST;
}