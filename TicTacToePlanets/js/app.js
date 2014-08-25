var TicTac = angular.module("TicTac", []);
// [] dependencies
// a module contains models, controllers, views and services

TicTac.controller('TicTacController', function ($scope) {
  $scope.cells = ["", "", "", "", "", "", "", "", ""];
  $scope.userToken = 1;

$scope.player1Name = function() {
  $scope.player1 = prompt('Player 1 Name: ', 'Player 1');
}
$scope.player2Name = function() {
  $scope.player2 = prompt('Player 2 Name: ', 'Player 2');
}





$scope.token = function(position) {
    

    if ($scope.userToken === 1 && $scope.cells[position] !== 'X' && $scope.cells[position] !== 'O') {
      
      this.cellToken = 'player1';
      $scope.cells[position] = $scope.currentSymbol();

    
      
      
    } else if ($scope.userToken === 2 && $scope.cells[position] !== 'O' && $scope.cells[position] !== 'X') {
      this.cellToken = 'player2';
      $scope.cells[position] = $scope.currentSymbol();
       
      
    } else if ($scope.userToken === 1) { 
      $scope.userToken += 1;
      $scope.cells[position] = $scope.cells[position];
    } else if ($scope.userToken === 2) {
      $scope.userToken -= 1;
      $scope.cells[position] = $scope.cells[position];
    }
    console.log("token " + $scope.userToken)

    $scope.checkForTie();
    $scope.checkForWin();

//console.log($scope.checkForTie());
//console.log('win: ' + $scope.checkForWin());

    }

  


  $scope.switch = function() {


    if ($scope.userToken === 1) { 
      $scope.userToken += 1;
      
  
    } else {
      $scope.userToken -= 1;
     
      }
    //console.log($scope.userToken)
    
};

$scope.currentSymbol = function() {
    if ($scope.userToken === 1) {
     return 'X';
    } else {
      return 'O';
    }
  };


$scope.player1Name();
$scope.player2Name();

  //tie if for every element in array, element != ''.

$scope.checkForTie = function() {
  for (i = 0; i < $scope.cells.length; i ++) {
    if ($scope.cells.indexOf('') == -1) {
    return true;
  } else {
    return false;
  }
  }
};


$scope.checkForWin = function() {
  $scope.row1 = $scope.cells.slice(0,3);
  $scope.row2 = $scope.cells.slice(3,6); 
  $scope.row3 = $scope.cells.slice(6,9); 
  $scope.column1 = [$scope.row1[0],$scope.row2[0], $scope.row3[0]];
  $scope.column2 = [$scope.row1[1], $scope.row2[1], $scope.row3[1]];
  $scope.column3 = [$scope.row1[2], $scope.row2[2], $scope.row3[2]];
  $scope.diag1 = [$scope.row1[0], $scope.row2[1], $scope.row3[2]];
  $scope.diag2 = [$scope.row1[2], $scope.row2[1], $scope.row3[0]];

  $scope.winningConditions = [$scope.row1.toString(), $scope.row2.toString(), $scope.row3.toString(), $scope.column1.toString(), $scope.column2.toString(), $scope.column3.toString(), $scope.diag1.toString(), $scope.diag2.toString()];

  for (i = 0; i < $scope.winningConditions.length; i ++) {
    if ($scope.winningConditions[i] === 'X,X,X') {
      return true;
    } else if ($scope.winningConditions[i] === 'O,O,O') {
      return true;
    }
  }

}

$scope.reset = function() {
  $scope.cells = ["", "", "", "", "", "", "", "", ""];
  $scope.userToken = 1;
}





  /*if ($scope.row1 === 'X,X,X' || $scope.row2 === 'X,X,X' || $scope.row3 === 'X,X,X') {
    return true;
  } else if ($scope.row1 === 'O,O,O' || $scope.row2 === 'O,O,O' || $scope.row3 === 'O,O,O') {
    return true;
  } else if (for (i = 0; 1 < 9; i ++) {
    $scope.col1[] = ($scope.cells[(i % 3 == 0)]) === 'X') {
    return true;
  }
  } 
}*/


  /*if ($scope.row1 === 'X,X,X') {
    return true;
  } else {
    return false; 
  }
    
  };*/
  
  







/*  if ($scope.cells.indexOf(['X','X','X'])) {
  return true;
} else {
  return false;
}
}*/



  //winner if array = [X,X,X]








  
    /*if ($scope.cells[position] == ''){
      $scope.cells[position] = $scope.userToken;
      console.log(position);
    }*/

});


