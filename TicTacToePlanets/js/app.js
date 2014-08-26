var TicTac = angular.module("TicTac", ["firebase"]);


TicTac.controller('TicTacController', ["$scope", "$firebase", function ($scope, $firebase) {
  $scope.box = {cells:["", "", "", "", "", "", "", "", ""], userToken: 1}
  //$scope.userToken = 1;
  $scope.box.player1Counter = 0;
  $scope.box.player2Counter = 0;


 var ref = $firebase( new Firebase("https://unicorn-poo.firebaseio.com/data") );
 ref.$bind($scope,'box');

$scope.$watch('box', function(){
  console.log('Hello!');
});



$scope.player1Name = function() {
  $scope.player1 = prompt('Player 1 Name: ', 'Player 1');
}
$scope.player2Name = function() {
  $scope.player2 = prompt('Player 2 Name: ', 'Player 2');
}



$scope.player1Name();
$scope.player2Name();



$scope.token= function(position) {

    if ($scope.box.userToken === 1 && $scope.box.cells[position] === "") {
      $scope.box.cells[position] = $scope.currentSymbol(); 
      
    } else if ($scope.box.userToken === 2 && $scope.box.cells[position] ==="") {
      $scope.box.cells[position] = $scope.currentSymbol();
       
    } else if ($scope.box.userToken === 1) { 
      $scope.box.userToken += 1;
      $scope.box.cells[position] = $scope.box.cells[position];

    } else if ($scope.box.userToken === 2) {
      $scope.box.userToken -= 1;
      $scope.box.cells[position] = $scope.box.cells[position];
    }
    
    console.log("token " + $scope.box.userToken)
    $scope.switch();
    $scope.checkForTie();
    $scope.checkForWin();

    if ($scope.checkForWin() === true) {
      if ($scope.box.userToken === 2) {
      $scope.box.player1Counter += 1;
    } else {
      $scope.box.player2Counter += 1;
    }
    }

//console.log($scope.checkForTie());
//console.log('win: ' + $scope.checkForWin());

    };
  

  


  $scope.switch = function() {

    if ($scope.box.userToken === 1) { 
      $scope.box.userToken += 1;
 
    } else {
      $scope.box.userToken -= 1;
      }
    
};



$scope.currentSymbol = function() {
    if ($scope.box.userToken === 1) {
     return 'X';
    } else {
      return 'O';
    }
  };




  //tie if for every element in array, element != ''.

$scope.checkForTie = function() {
  for (i = 0; i < $scope.box.cells.length; i ++) {
    if ($scope.box.cells.indexOf('') == -1) {
    return true;
  } else {
    return false;
  }
  }
};



$scope.checkForWin = function() {
  $scope.row1 = $scope.box.cells.slice(0,3);
  $scope.row2 = $scope.box.cells.slice(3,6); 
  $scope.row3 = $scope.box.cells.slice(6,9); 
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
  $scope.box.cells = ["", "", "", "", "", "", "", "", ""];
  $scope.box.userToken = 1;
  

}
//check for end game and add to counter




//$scope.player1Name();
//$scope.player2Name();

}]);


