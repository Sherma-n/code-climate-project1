$(document).ready(function(){               //wait page load
  // HTML Elements
  var $rollGameBtn = $('#rollGame');        //roll btn
  var $chips       = $('.chips');           //chips
  var $bets       = $('.bets');             //bets

  // Game Settings
  var defaultCredits = 100;                 //default credits

  // Game Container Object
  var game = new Game(defaultCredits);      //set credits to default

  // Event Listeners
  $rollGameBtn.on('click', function(){      // clicking roll btn
    game.clearTable();                          //clearing the table for each round
    game.rollSound.play();                      //roll sound
    var winners = game.winners;                 //update bet winners
    game.rollDice();                            //roll the dices
    game.checkWinners();                        // creates array of key names as strings
    game.highLightWins ();                      //hightlight winning bets
    game.payout();                              //calculating payouts
    game.updateChips();                         //paying players with payout
    game.checkGameWinner();                     //check if there is a game winner
  });

  $chips.on('click', function(){            //clicking on chips
    game.coins.play();                        //coin sounds
    var $chip   = $(this);                    //this specific chip
    var player  = $chip.data("player");       //update player value
    var betSize = $chip.data("value")         //get chip value
    game.currentPlayer        = game[player]; //get current player value
    game.currentPlayerBetSize = betSize;      //get current bets & be sizes
  });

  $bets.on('click', function(){             //clicking on bets
    var $OE           = $(this);
    game.coins.play();                            //Play coin sound
    var betType       = $OE.data("bet-type");     //determine bet type
    var currentPlayer = game.currentPlayer;       //deter which player does this belong to
    var betSize       = game.currentPlayerBetSize;//determine current bet size
    if (currentPlayer.credits < betSize) {        //check if player is able to bet
      Alert("Insufficient to make bet");          //can't bet man, no value
    } else {                                      //minus player bet
      currentPlayer.credits       -= betSize;     //update credits
      currentPlayer.bets[betType] += betSize;     //updating credits
      $ (this).css("background-image", "url(http://customcandyexpress.com/graphics/denom.png)");      //css on betboxes
      $ (this).css("border", "3px solid white");                                                      //css on betboxes
      $ (this).css("background-size", "contain");                                                     //css on betboxes
      $ (this).css("background-repeat", "no-repeat");                                                 //css on betboxes
    }
  });

  $('#resetGame').on('click', function(){   //resetting the game
    location.reload();
    console.log("game has been reset");
  });

  window.debug = game;                           //for debugging
});

// Psuedo Code
//  1. Determine Player Values
//    1.1 Set Player Default = 100
//  2. Count Turns
//    2.1 Default Count Turn = 0
//  3. Place Wagers
//    3.1 Get Chip Values
//      3.1.1 For Player 1
//      3.1.2 For Player 2
//      3.1.3 If Chip Value > Chip
//        3.1.3.1 If true will turn chip opaque and cannot be clicked
//        3.1.3.2 If False, Nothing Happens
//    3.2 Chips Drag and Drop
//      3.2.1 On click will bring the wager to the mouse.
//      3.2.2 On Drop will assign wager to BetBox.
//    3.3 Deduct Chip Value From Player Value
//      3.3.1 Deduct for Player 1
//      3.3.2 Deduct for Player 2
//    3.4 Sum Total Wager On Bet
//      3.4.1 For Player 1
//      3.4.2 For Player 2
//    3.5 Get Sum of Wagers On Bets
//      3.5.1 Sum For Player 1
//      3.5.2 Sum For Player 2
//  4. Roll Dice
//    4.1 Random Die Values 1-6
//    4.2 Sum both Dices
//  5. Get Bet Wins
//    5.1 Check for Pair Values
//      5.1.1 If True Check if any Pair hits
//      5.1.2 If False Skip
//    5.2 Check if Sum of Dices Satisfies Condition for Win
//      5.2.1 If True Highlight the BetBox
//      5.2.1 If False Skip it
//  6. Calculate Payout
//    6.1 Check if Bet Wins for Bet Box
//      6.1.1 If True, Check if wager is present
//        6.1.1.1 If True, Proceed to Calculate Payout
//      6.1.2 If False, Skip
//    6.2 Calculate Payout
//      6.2.1 Determine Wager Value & * by Payout.
//      6.2.2 Determine if Wager is from Player 1 or 2.
//        6.2.2.1 If Player One add payout to value of Player One.
//        6.2.2.2 If Payer Two add Payout to value of Player 2.
//  7. Add Payout to Player Value
//    7.1 Add Payout to Player 1 & calculate total value
//    7.2 Add Payout to Player 2 & Calculate total Value
//    7.3 Alert to show round Summary
//      7.3.1 Get sum of Payouts
//      7.3.2 Get sum of Wagers
//      7.3.3 Get Total Sum
//    7.4 Reset Wager for board to be 0
//  8. Determine Winner
//    8.1 Check if Player Value > 0.
//      8.1.1 If true, nothing Happens
//      8.1.2 If False, will check if player 1 or 2 = 0.
//        8.1.2.1 If player 1 = 0, Player 2 Wins
//        8.1.2.2 if Player 2 = 0 , Player 1 Wins
//        8.1.2.3 Else, Nothing Happens
//    8.2 Check if Round Number >= 5.
//      8.2.1 If False, Nothing Happens
//      8.2.2 If True, Check if player value 1 > player value 2.
//        8.2.2.1 If True, Player 1 Wins, Display player value for both. highlight player 1
//        8.2.2.2 If False, Player 2 Wins, Display player value for both, highlight player 2
//        8.2.2.3 Else, Game Draw, Will Display Value for both players.
//  9. Reset the Game
//    9.1 Reload the page.
// Event Listners
//  On Click Wagers
//  Drag Wagers to BetBoxes
//  Unclick Wagers
//  Roll button
//  Closing Round Summary Alert
//  Reset Button for Page
