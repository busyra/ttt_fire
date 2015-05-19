angular
	.module("ticTacApp")
	.controller("ticTacController", ticTacController);

	console.log('controller connected');

	ticTacController.$inject = ['$firebaseObject'];

	// to create random new board to send to friends
	// var uniqueBoard = Math.floor((Math.random() * 100) + 1);
	// console.log (uniqueBoard)
	// var boardID = "https://bushttt.firebaseio.com/"+uniqueBoard;
	// var msgboardID = "https://bushtt.firebaseapp.com/"+uniqueBoard;
	
	function ticTacController ($firebaseObject){
		var self = this;
		self.board=board();
		//for score board
		self.board.player1wins = 0;
		self.board.player2wins = 0;
		//to keep track of turn and winner
		self.board.turn="Player 1";
		self.board.winner="Player 2";
		//message for turn and winner
		self.board.message=self.board.turn+ "\'s turn";
		self.board.squares=[];
		self.board.creditleft = 5;
		//creating squares for board
		for (var i = 0; i< 9; i++){
			self.board.squares.push({x: false, o: false});
		}

		self.board.counter=0;
		self.board.$save();


		// links up page to firebase
	 	function board(){
	 		var ref= new Firebase("https://bushttt.firebaseio.com/")
			var getBoard = $firebaseObject(ref);
			return getBoard;
 		}
 		/*function to run once player chooses space
 		will check if space is already taken or not and check if anyone has won*/
 		self.tic = function(i){

 			// console.log test
	 		// console.log(i);
		 	// console.log(self.board.squares[i].x);
		 	// console.log(self.board.squares[i].o);

		 	// checks if square is already taken
		 	if (self.board.creditleft <= 0){
		 		self.board.message="You need to add more credit. Please give Bush 0.25 USD";
		 		alert("You need to add more credit. Please give Bush 0.25 USD");
		 		return;
		 	}
		 	else if (self.board.squares[i].x === true || self.board.squares[i].o === true){
		 		alert("Please choose another box") ;
		 	}
		 	// determines if player 1 
			else if (self.board.turn === "Player 1") {
				self.board.squares[i].x = true;		
				self.board.winner = "Player 1";
				self.board.turn = "Player 2";	
				self.board.$save();
				getWinner();
				// console.log test
				// console.log(self.board.turn);
			}
			// determines if player 2
			else if (self.board.turn === "Player 2"){
				self.board.squares[i].o = true;
				self.board.winner = "Player 2";	
				self.board.turn = "Player 1";
				self.board.$save();
				getWinner();
				// console.log test
				// console.log(self.board.turn);
			}
			self.board.message = self.board.turn + "\'s turn";
			self.board.$save();
 		} 		
 		
 		/*function will check with firebase if X or O has been picked/true for 
 		any winning conditions. If board is full function will also check for tie.
 		It will also update message, scores, and reset game accordingly*/
 		function getWinner(){

 			self.board.counter=self.board.counter+1;
 			// console.log("winner");
 			if(
		       ((self.board.squares[0].x === true) && (self.board.squares[1].x === true) && (self.board.squares[2].x === true)) 
		       || ((self.board.squares[3].x === true) && (self.board.squares[4].x=== true) && (self.board.squares[5].x === true)) 
		       || ((self.board.squares[6].x === true) && (self.board.squares[7].x === true) && (self.board.squares[8].x === true)) 
		       || ((self.board.squares[0].x === true) && (self.board.squares[3].x === true) && (self.board.squares[6].x === true)) 
		       || ((self.board.squares[1].x=== true) && (self.board.squares[4].x === true) && (self.board.squares[7].x=== true)) 
		       || ((self.board.squares[2].x=== true) && (self.board.squares[5].x === true) && (self.board.squares[8].x === true)) 
		       || ((self.board.squares[0].x=== true) && (self.board.squares[4].x === true) && (self.board.squares[8].x === true)) 
		       || ((self.board.squares[2].x=== true) && (self.board.squares[4].x === true) && (self.board.squares[6].x=== true))
		       ){
					//updates message, score board, and resets board if player 1/X wins
					setTimeout(function(){
						alert(self.board.winner+ " has invaded "+self.board.turn+"!");
						self.board.message = self.board.winner+ " has invaded "+self.board.turn+"! It's the loser's turn now";
						self.board.player1wins = self.board.player1wins+1;
						self.board.creditleft = self.board.creditleft -1;
						self.board.$save();
						for (var c = 0 ; c < 9 ; c++){
				        	self.board.squares[c].x = false;
				        	self.board.squares[c].o = false;
				        	
				        	self.board.$save();
				        }
				     },50)
					
					self.board.counter=0;
					self.board.$save();
					return;
				}
				//updates message, score board, and resets board if player 2/O wins

 			else if(
		       ((self.board.squares[0].o === true) && (self.board.squares[1].o === true) && (self.board.squares[2].o === true)) 
		       || ((self.board.squares[3].o === true) && (self.board.squares[4].o=== true) && (self.board.squares[5].o === true)) 
		       || ((self.board.squares[6].o === true) && (self.board.squares[7].o === true) && (self.board.squares[8].o === true)) 
		       || ((self.board.squares[0].o === true) && (self.board.squares[3].o === true) && (self.board.squares[6].o === true)) 
		       || ((self.board.squares[1].o=== true) && (self.board.squares[4].o === true) && (self.board.squares[7].o=== true)) 
		       || ((self.board.squares[2].o=== true) && (self.board.squares[5].o === true) && (self.board.squares[8].o === true)) 
		       || ((self.board.squares[0].o=== true) && (self.board.squares[4].o === true) && (self.board.squares[8].o === true)) 
		       || ((self.board.squares[2].o=== true) && (self.board.squares[4].o === true) && (self.board.squares[6].o=== true))
		       ){
					setTimeout(function(){
						alert(self.board.winner+ " has invaded "+self.board.turn+"!");
						self.board.message = self.board.winner+ " has invaded "+self.board.turn+"! It's the loser's turn now";
						self.board.player2wins = self.board.player2wins+1;
						self.board.creditleft = self.board.creditleft - 1;
						self.board.$save();
						for (var c = 0 ; c < 9 ; c++){
				        	self.board.squares[c].x = false;
				        	self.board.squares[c].o = false;
				        	self.board.$save();
				        }
				     },50)
					
					self.board.counter=0;
					self.board.$save();
					return;
				}
				//updates message and resets board if tie
				else if (self.board.counter === 9){
					setTimeout(function(){
						alert("NOBODY WINS");
						self.board.message = "It was a tie and it is " + self.board.turn +"\'s turn"
						self.board.creditleft = self.board.creditleft - 1;
						self.board.$save();
						for (var c = 0 ; c < 9 ; c++){
				        	self.board.squares[c].x = false;
				        	self.board.squares[c].o = false;
				        	self.board.$save();
				        }
				     },50)
					
					self.board.counter=0;
					self.board.$save();
					return;

				}
		}
	}