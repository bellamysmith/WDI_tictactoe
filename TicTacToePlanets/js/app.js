var firebaseURL = "https://unicorn-poo.firebaseio.com/";
var TicTac = angular.module("TicTac", ["firebase", "ngFx"]);

TicTac.controller('TicTacController', ["$scope", "$firebase", function ($scope, $firebase) {
    var syncObject = null;    // Firebase synced data
    var unbindDB = null;      // function that unbinds the DB
    var initialDBValues = {
      //players: [],  // To remind me this is shared (but created later)
      cells:["","","","","","","","",""],
      currPlayer: 0,
      playerTurn: 0,
      gameInProgress: true,
      numberOfPlayers: 0,
      player1Counter: 0,
      player2Counter: 0
     };

    // Scope-wide variables
    $scope.dbConnected  = false;  // true when connected to FireBase
    $scope.dbConnecting = false;  // true when connecting to FireBase
    $scope.playerNumber = 0;      // locally, which player this is

    /**********************
    * FIREBASE FUNCTIONS
    **********************/

    /* Called once when we are sure $scope.db is bound to Firebase */
    function doneConnecting(unbindFunction) {
        // If a game is not in progress, initialize Firebase database
        if (!$scope.db.gameInProgress) {
          $scope.db = initialDBValues;
        }

        // Set the local player number then increment the total # of players
        $scope.playerNumber = $scope.db.numberOfPlayers;
        $scope.db.numberOfPlayers += 1;
        
        
        // Set player name by default to "Player <playerNumber>", if nothing entered
        $scope.db.players = $scope.db.players || (new Array());
        if ($scope.db.players.length < $scope.db.numberOfPlayers) {
          var finalPlayerName = $scope.playerName || ("Player " + $scope.playerNumber);

          $scope.db.players.push({'name': finalPlayerName});
        }
        
        // We are done connecting!
        $scope.dbConnecting = false;
        $scope.dbConnected = true;

        unbindDB = unbindFunction;

    };


    /* Connects to Firebase and binds the Firebase data to $scope.db */
    $scope.connectDB = function() {
      $scope.dbConnecting = true; // indicate we are connecting to FB

      var ref = new Firebase(firebaseURL);

      // create an AngularFire reference to the data
      var sync = $firebase(ref);

      // download the data into a local object
      syncObject = sync.$asObject();

      // wait until object is loaded
      syncObject.$loaded().then(function() {

        // Synchronize the object with a three-way data binding
        // Now, $scope.db is bound to Firebase.
        // Calls doneConnecting(<unbind function>) once $scope.db is bound to the database!
        syncObject.$bindTo($scope, "db").then( doneConnecting );

      });
    };


    /* Unbinds from FireBase and sets dbConnected false */
    function disconnectDB(ref) {
        if (unbindDB) {
          unbindDB();
        }

        if (syncObject) {
          syncObject.$destroy();
        }

        $scope.dbConnected = false;
    };

    /* Ensure the game updated to not in progress then disconnect from the DB */
    $scope.endGame = function() {
      $scope.db.gameInProgress = false;
      $scope.db.players = null;
      syncObject.$save().then( disconnectDB );
    };





/*************************
*Tic Tac Toe Functions
**************************/
$scope.token= function(position) {

    if ($scope.db.playerTurn === 0 && $scope.playerNumber === 0 && $scope.db.cells[position] === "") {
      $scope.db.cells[position] = $scope.currentSymbol();
      $scope.db.playerTurn ++; 
      
    } else if ($scope.db.playerTurn === 1 && $scope.playerNumber === 1 && $scope.db.cells[position] ==="") {
      $scope.db.cells[position] = $scope.currentSymbol();
      $scope.db.playerTurn --;
       
    } else if ($scope.playerNumber === 0) { 
      //$scope.playerNumber += 1;
      $scope.db.cells[position] = $scope.db.cells[position];


    } else if ($scope.playerNumber === 1) {
      //$scope.playerNumber -= 1;
      $scope.db.cells[position] = $scope.db.cells[position];
    }
    
    console.log("token " + $scope.playerNumber)
    $scope.checkForTie();
    $scope.checkForWin();
    $scope.winCount();



console.log($scope.checkForTie());
console.log('win: ' + $scope.checkForWin());

    };

$scope.currentSymbol = function() {
    if ($scope.playerNumber === 0) {
     return 'X';
    } else {
      return 'O';
    }
  };

//tie if for every element in array, element != ''.

$scope.checkForTie = function() {
  if ($scope.dbConnected == true){
    if ($scope.db.cells.indexOf('') == -1) {
    return true;
  } else {
    return false;
  }
}
  };




$scope.checkForWin = function() { 
  if ($scope.dbConnected == true){
  $scope.row1 = $scope.db.cells.slice(0,3);
  $scope.row2 = $scope.db.cells.slice(3,6); 
  $scope.row3 = $scope.db.cells.slice(6,9); 
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
}
$scope.winCount = function() {
    if ($scope.checkForWin() === true) {
      if ($scope.playerNumber === 0) {
      $scope.db.player1Counter += 1;
    } else {
      $scope.db.player2Counter += 1;
    }
    }
  };


$scope.reset = function() {
  $scope.db.cells = ["", "", "", "", "", "", "", "", ""];
  $scope.db.playerTurn = $scope.playerNumber;
 }


$scope.addMessages = function(){
  $scope.db.messages = $scope.db.messages || (new Array());
   $scope.db.messages.push($scope.db.players[$scope.playerNumber].name + ": " + $scope.addMessage);
   console.log($scope.addMessage);

 
}

  
















}]);