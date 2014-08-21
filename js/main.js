var app = angular.module('TicTac', []);
app.controller('TicTacControl', function($scope) {
	$scope.gameBoard = [['','',''],['','',''],['','','']];

	$scope.takeOver = function(x,y,symbol) {
		$scope.gameBoard[x][y] = symbol;
		console.log($scope.gameBoard);
	}
	console.log('IM WORKING')

});
