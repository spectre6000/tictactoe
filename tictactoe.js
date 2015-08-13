//DOM
  var $scoreboard = [$('#player1Scoreboard'), $('#player2Scoreboard')];
  var $board = $('#board');
  var $spaces = $board.find('.space');

//house variables
  var users = ['', ''];
  var userMarks = ['X', 'O'];
  var userScores = [0, 0];
  var turnCounter = 1
  var marks = ['','','','','','','','',''];
  var combos = [[0,1,2],[3,4,5],[6,7,8],  [0,3,6],[1,4,7],[2,5,8], [0,4,8],[2,4,6]]

//movement

  function play(){
    userNames();
    playRound();
  }

    function userNames(){
      users[0] = prompt("Player X:");
      users[1] = prompt("Player O:");
    }

    function playRound(){
      updateScoreBoard();
      renderBoard();
    }

      function updateScoreBoard() {
        $scoreboard[0].html("");
        $scoreboard[1].html("");
        $scoreboard[0].append('<h2>' + users[0] + ": " + userScores[0] + '</h2>');
        $scoreboard[1].append('<h2>' + users[1] + ": " + userScores[1] + '</h2>');
      }

      function renderBoard() {
        removePointer();
        updateMarks();
      }

        function removePointer () {
          $.each($spaces, function(space) {
            $(this).hasClass("played") ? $(this).css({'cursor': 'auto'}) : false;
          });
        }

        function updateMarks(){
          for (var i = 1; i < marks.length+1; i++ ) {
            $('#space'+i).html('<h3>' + marks[i-1] + '</h3>');
          }
        }

        function changeTurn() {
          turnCounter = turnCounter + 1;
          if (turnCounter % 2 === 1) {
            $scoreboard[0].css({"background-color": "#4c5e7f"});
            $scoreboard[1].css({"background-color": "#2a3c5e"});
          } else {
            $scoreboard[0].css({"background-color": "#2a3c5e"});
            $scoreboard[1].css({"background-color": "#4c5e7f"});
          };
        }

    $spaces.click(function() {
      var gridNum = $(this).attr('id').split('')[5];
      if (turnCounter % 2 === 1) {
        marks[gridNum-1] = 'X'
      } else {
        marks[gridNum-1] = 'O'
      };
      checkWinner();
      changeTurn();
      renderBoard();
    });

    function checkWinner(){
      for (var i = 0; i < combos.length; i++) {
        if (marks[combos[i][0]] === marks[combos[i][1]] && marks[combos[i][1]] === marks[combos[i][2]] && marks[combos[i][0]] != '') {
          advanceScoreCounter(marks[combos[i][0]]);
        }
      }
    }

    function advanceScoreCounter(mark) {
      if (mark === 'X') {
        alert(users[0]+ " wins!");
        userScores[0]++;
      } else {
        alert(users[1]+ " wins!");
        userScores[1]++;
      }
      turnCounter = 1;
      marks = ['','','','','','','','',''];
      playRound();
    }


$(function() {
  play();
});