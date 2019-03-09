module.exports = function solveSudoku(matrix) {
  function getCords(mainArray) {
      const cordArray = [];
         for (let i = 0; i < mainArray.length; i++) {
          for (let j = 0; j < mainArray[i].length; j++) {
            if (mainArray[i][j] === 0) {
              cordArray.push(i, j);
              return cordArray;
            }
          }
        }
        return false;
    }
  function horisontalCollect(mainArray, cordY) {
      const matchArray = [];
      mainArray.forEach((e, i) => {
        if(mainArray[cordY][i] !== 0) {
          matchArray.push(mainArray[cordY][i]);
        }
      });

      return matchArray;
    }
  function verticalCollect(mainArray, cordX, horColl) {
      const newArray = [];
      mainArray.forEach((e, i) => {
        if (mainArray[i][cordX] !== 0) {
          newArray.push(mainArray[i][cordX]);
        }
      });
      return horColl.concat(newArray.filter((e) => horColl.indexOf(e) === -1));
    }
  function squareCollect(mainArray, cordY, cordX, vertColl) {
      const localArray = [];
      let row = Math.floor(cordY / 3) * 3;
      let col = Math.floor(cordX / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (mainArray[row + i][col + j] !== 0) {
            localArray.push(mainArray[row + i][col + j]);
          }
        }
      }
      return vertColl.concat(localArray.filter((e) => vertColl.indexOf(e) === -1));
    }

  function getTotalResult(sqrColl) {
      const arrayTen = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = 0; i < arrayTen.length; i++) {
        for (let j = 0; j < sqrColl.length; j++) {
          if(arrayTen[i] === sqrColl[j]) {
            arrayTen.splice(i, 1);
            i--;
          }
        }
      }
      return arrayTen;
    }
  function availableIntengers(mainArray, cordY, cordX) {
      let horColl = horisontalCollect(mainArray, cordY);
      let vertColl = verticalCollect(mainArray, cordX, horColl);
      let sqrColl = squareCollect(mainArray, cordY, cordX, vertColl);
        return getTotalResult(sqrColl);
    }
  function getAvailableArr(mainArray) {
        let availableArray = [];
        let getCordsArray = getCords(mainArray);
          availableArray.push(availableIntengers(mainArray, getCordsArray[0], getCordsArray[1]));
      return availableArray;
    }
  function fillFinal(mainArray, currentAvVaray) {
      const newArrayNew = mainArray.map((e, i, array) => {
        return [...array[i]];
      });
      const cordY = getCords(mainArray)[0];
      const cordX = getCords(mainArray)[1];
      newArrayNew[cordY][cordX] = currentAvVaray.shift();
      return newArrayNew;
    }
  function wetherEmptyCell(mainArray) {
    return getAvailableArr(mainArray).some((elem) => {
        return (elem.length == 0) ? true : false;
      });
    }
    function wetherEmpty(mainArray, backUpArray) {
      if (wetherEmptyCell(mainArray)) {
        good:
        for (;;) {
          if (backUpArray[backUpArray.length - 1].arrayVar.length === 0) {
            backUpArray.pop();
            continue good;
          } else {
            break;
          }
        }
        mainArray = backUpArray[backUpArray.length - 1].array.map((e, i, array) => {
          return [...array[i]];
        });
      } else {
        backUpArray.push({array: mainArray, arrayVar: []});
        for (var i = 0; i < getAvailableArr(mainArray)[0].length; i++) {
          backUpArray[backUpArray.length - 1].arrayVar.push(getAvailableArr(mainArray)[0][i]);
        }
      }
    }
    let newArray = matrix.map((e, i, array) => {
      return [...array[i]];
    });
    const backUp = [];
    backUp.push({array: newArray, arrayVar: []});
    for (var i = 0; i < getAvailableArr(newArray)[0].length; i++) {
      backUp[0].arrayVar.push(getAvailableArr(newArray)[0][i]);
    }
    let newArrayNew = [];
    do {
      newArrayNew = fillFinal(backUp[backUp.length - 1].array, backUp[backUp.length - 1].arrayVar);
      if (getCords(newArrayNew) !== false) {
        wetherEmpty(newArrayNew, backUp);
      }
    } while (getCords(newArrayNew))
    return newArrayNew;
}
