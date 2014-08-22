var TicTac = angular.module("TicTac", []);
// [] dependencies
// a module contains models, controllers, views and services

TicTac.controller('TicTacController', function ($scope) {
  $scope.cells = ["", "", "", "", "", "", "", "", ""];
  $scope.userToken = 1;


$scope.token = function(position) {
    

    if ($scope.userToken === 1 && this.cellToken !== 'player2' && this.cellToken !== 'player1') {
      this.cellToken = 'player1';
      $scope.cells[position] = currentSymbol();
      
      
    } else if ($scope.userToken === 2 && this.cellToken !== 'player1' && this.cellToken !== 'player2') {
      this.cellToken = 'player2';
       
      
    } else if ($scope.userToken === 1) { 
      $scope.userToken += 1;
    } else if ($scope.userToken === 2) {
      $scope.userToken -= 1;
    }
    console.log("token " + $scope.userToken)

    }

  


  $scope.switch = function() {


    if ($scope.userToken === 1) { 
      $scope.userToken += 1;
      
  
    } else {
      $scope.userToken -= 1;
     
      }
    console.log($scope.userToken)
    


$scope.currentSymbol = function() {
    if ($scope.userToken === 1) {
     return 'X';
    } else {
      return 'O';
    }
  };




  };
    /*if ($scope.cells[position] == ''){
      $scope.cells[position] = $scope.userToken;
      console.log(position);
    }*/

});