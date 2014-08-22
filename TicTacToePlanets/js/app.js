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

console.log($scope.checkForTie());
console.log('win: ' + $scope.checkForWin());

    }

  


  $scope.switch = function() {


    if ($scope.userToken === 1) { 
      $scope.userToken += 1;
      
  
    } else {
      $scope.userToken -= 1;
     
      }
    console.log($scope.userToken)
    
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

/*$scope.checkForWin = function() {
  $scope.cells.toString();
  if 







  if ($scope.cells.indexOf(['X','X','X'])) {
  return true;
} else {
  return false;
}
}*/

console.log($scope.checkForTie());

  //winner if array = [X,X,X]








  
    /*if ($scope.cells[position] == ''){
      $scope.cells[position] = $scope.userToken;
      console.log(position);
    }*/

});


