function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    expr = expr.trim();
    expr = expr.replace(/\(\s/g, '(').replace(/\s\)/g, ')');
    let elements = expr.split(' ');
    if (elements.length === 1){
        elements = elements[0].split('');
    }   
 
        let indexL;
        let indexR;
        while (indexR !== -1){
            indexR = elements.indexOf(')');
            indexL = elements.lastIndexOf('(', indexR);
                if (indexR !== -1){
                calculaterPart(elements);
                }
        }

        for (let i=0; i<elements.length; i++){    //! почему с result=0 - ошибки, если не ставить исключение в условии: elements[i] != '0'   ??
            if ( !Number(elements[i]) && elements[i] !== '+' && elements[i] !== '-' && elements[i] !== '*' && elements[i] !== '/' && elements[i] !== '(' && elements[i] !== ')' && elements[i] != '0'){
                throw ("ExpressionError: Brackets must be paired"); 
            }
        }

// добивание
    let index = null;
        while ( index !== -1){                          
        index = elements.indexOf('/');
        if (index !== -1 && elements[index+1] == 0){
            throw ("TypeError: Division by zero.");
        } else
        if (index !== -1){
        result = +elements[index-1] / +elements[index+1];   
        elements.splice(index-1, 3, result);             
        }
    }
        index = null; 
        while ( index !== -1){                          
        index = elements.indexOf('*');
        if (index !== -1){
        result = +elements[index-1] * +elements[index+1];   
        elements.splice(index-1, 3, result);             
        }
    }
        index = null;
        while ( index !== -1){                          
        index = elements.indexOf('-');
        if (index !== -1){
        result = +elements[index-1] - +elements[index+1];   
        elements.splice(index-1, 3, result);               
        } 
    }
        index = null; 
        while ( index !== -1){                          
        index = elements.indexOf('+');
        if (index !== -1){
        result = +elements[index-1] + +elements[index+1];   
        elements.splice(index-1, 3, result);              
        }
    }

        function calculaterPart (elements) {       
          indexR = elements.indexOf(')');
          indexL = elements.lastIndexOf('(', indexR);
          let arrayPart = elements.splice(indexL, indexR-indexL+1);  //часть массива с внутренними ()  
          
          let index = null;
          while ( index !== -1){                          
            index = arrayPart.indexOf('/');
            if (index !== -1 && arrayPart[index+1] == 0){
              throw ("TypeError: Division by zero.");
            } else
            if (index !== -1){
            result = +arrayPart[index-1] / +arrayPart[index+1];   
            arrayPart.splice(index-1, 3, result);               
            }
          }
          index = null; 
          while ( index !== -1){                          
            index = arrayPart.indexOf('*');
            if (index !== -1){
            result = +arrayPart[index-1] * +arrayPart[index+1];  
            arrayPart.splice(index-1, 3, result);               
            }
          }
          index = null;
          while ( index !== -1){                          
            index = arrayPart.indexOf('-');
            if (index !== -1){
            result = +arrayPart[index-1] - +arrayPart[index+1];   
            arrayPart.splice(index-1, 3, result);              
            } 
          }
          index = null; 
          while ( index !== -1){                          
            index = arrayPart.indexOf('+');
            if (index !== -1){
            result = +arrayPart[index-1] + +arrayPart[index+1];   
            arrayPart.splice(index-1, 3, result);               
            }
          }
          elements.splice(indexL, 0, result);   //замена внутренних () на результат
          return result;
        }

    return result;
}

module.exports = {
    expressionCalculator
}