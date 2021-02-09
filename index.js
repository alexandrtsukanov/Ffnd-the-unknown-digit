function solveExpression(initExp) {
  let exp = initExp;
  if (initExp[0] === '-') {
    exp = initExp.slice(1);
  } else {
    for (let i = 0; i < initExp.length; i += 1) {
      if ((initExp[i] === '-' && initExp[i - 1] === '+') || (initExp[i] === '-' && initExp[i - 1] === '-') || (initExp[i] === '-' && initExp[i - 1] === '*') || (initExp[i] === '-' && initExp[i - 1] === '=')) {
        let expInt = initExp.split('')
        expInt.splice(initExp.indexOf(initExp[i]), 1)
        exp = expInt.join('');
      }
    }
  }
  let numbersWithoutMarks = exp.split(/[^0-9?]/).filter(el => el);
  let possibleSolutions = [];
  let onlyMarks = exp.replace(/[\d=?]/g, '');
  if (onlyMarks[0] === '*') {
    for (let i = 0; i <= 9; i += 1) {
      if (checker(numbersWithoutMarks, i)[0] * checker(numbersWithoutMarks, i)[1] === checker(numbersWithoutMarks, i)[2]) {
        if (!exp.includes(i)) {
          possibleSolutions.push(i)
        }
      }
    }
  } else {
    if (onlyMarks[0] === '+') {
      for (let i = 0; i <= 9; i += 1) {
        if (checker(numbersWithoutMarks, i)[0] + checker(numbersWithoutMarks, i)[1] === checker(numbersWithoutMarks, i)[2]) {
          if (!exp.includes(i)) {
            possibleSolutions.push(i)
          }
        }
      }
    } else {
      for (let i = 0; i <= 9; i += 1) {
        if (checker(numbersWithoutMarks, i)[0] - checker(numbersWithoutMarks, i)[1] === checker(numbersWithoutMarks, i)[2]) {
          if (!exp.includes(i)) {
            possibleSolutions.push(i)
          }
        }
      }
    }
  }
  for (let i = 0; i < numbersWithoutMarks.length; i+= 1) {
    if (numbersWithoutMarks[i][0] === '?' && possibleSolutions.includes(0)) {
      possibleSolutions.splice(possibleSolutions.indexOf(0), 1)
    }
  }
  if (possibleSolutions.length === 0) {
    return -1
  }
  return possibleSolutions.sort((a,b) => a - b)[0]
}
function checker(arr, randomDigit) {
  let str = arr.join('-').replace(/[?]/g, randomDigit.toString());
  let arrOfNumbers = str.split('-');
  let res = [];
  for (let i = 0; i < arrOfNumbers.length; i += 1) {
    res.push(Number(arrOfNumbers[i]))
  }
  return res
}
// console.log(solveExpression('-5?*-1=5?'))
console.log(checker('-5?*-1=5?'))


