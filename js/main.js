var app = angular.module('TicTac', []);
app.controller('TicTacControl', function($scope) {
	$scope.gameBoard = [['','',''],['','',''],['','','']];
	$scope.players = [{name:'player 1', symbol: 'x'},{name: 'player 2', symbol: 'o'}]
	$scope.currentPlayer = $scope.players[0];

	$scope.takeOver = function(x,y,symbol) {
		$scope.gameBoard[x][y] = symbol;
		console.log($scope.gameBoard);
	}

	var switchPlayer = function() {
      if ($scope.currentPlayer == $scope.players[0]) {
        $scope.currentPlayer = $scope.players[1];
      } else {
        $scope.currentPlayer = $scope.players[0];
      }
      console.log(currentPlayer);
    };
  
    $scope.currentSymbol = function() {
    if ($scope.currentPlayer == $scope.players[0]) {
     return 'X';
    } else {
      return 'O';
    }
  };






	console.log('IM WORKING')


});
