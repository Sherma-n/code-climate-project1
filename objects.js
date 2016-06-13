// ====================
// Payout Ratio Object - Payout for Each Bet
// ====================
var payoutRatio = {
  big:    2,
  even:   2,
  odd:    2,
  small:  2,
  pair1:  30,
  pair2:  30,
  pair3:  30,
  pair4:  30,
  pair5:  30,
  pair6:  30,
  bet2:   30,
  bet3:   15,
  bet4:   7,
  bet5:   3,
  bet6:   2,
  bet7:   3,
  bet8:   2,
  bet9:   3,
  bet10:  7,
  bet11:  15,
  bet12:  30,
};

// ====================
// Bet Object - Array to store Wagers for each Bet
// ====================
var Bet = function() {
  this.big   = 0;
  this.even  = 0;
  this.odd   = 0;
  this.small = 0;
  this.pair1 = 0;
  this.pair2 = 0;
  this.pair3 = 0;
  this.pair4 = 0;
  this.pair5 = 0;
  this.pair6 = 0;
  this.bet2  = 0;
  this.bet3  = 0;
  this.bet4  = 0;
  this.bet5  = 0;
  this.bet6  = 0;
  this.bet7  = 0;
  this.bet8  = 0;
  this.bet9  = 0;
  this.bet10 = 0;
  this.bet11 = 0;
  this.bet12 = 0;
};

// ====================
// Player Object - Player values
// ====================
var Player = function(name, credits){
  this.name    = name;
  this.credits = credits;
  this.bets    = new Bet();
};

// ====================
// Game Object - Game Objects and Functions
// ====================
var Game = function(defaultCredits) {
  this.turn                 = 0;                                             //Check Game Winner
  this.player1              = new Player("Denis", defaultCredits);           //Payout & Check Game Winner
  this.player2              = new Player("Jens", defaultCredits);            //Payout & Check Game Winner
  this.dice                 = {};                                            //rollDice
  this.winners              = [];                                            //Array of strings that matches the name of bets
  this.currentPlayer        = 'Denis';                                       //Player that just clicked on Chips
  this.currentPlayerBetSize = 0;                                             //Player bet that just selected CHips

  // ====================
  // Sounds
  // ====================
   this.coins = new buzz.sound( "./Money-sound-insert-coin.mp3", { preload: true, loop: false });

   this.rollSound = new buzz.sound( "./Knock-on-door.mp3", { preload: true, loop: false });

   this.winSound = new buzz.sound( "./Happy-music.mp3", { preload: true, loop: false });

// ====================
// Roll Dice
// ====================
   this.rollImage = function (diceRoll, diceID) {
      switch (diceRoll) {
        case 1:
          var picture = "url(http://www.clipartkid.com/images/170/dice-faces-clipart-1-9-reaching-teachers-labd0b-clipart.png)";
          break;
        case 2:
          var picture = "url(http://i363.photobucket.com/albums/oo79/fizzgig2k4/dice%20face%20images/lego2dice-1-2.jpg)";
          break;
        case 3:
          var picture = "url(http://liarsdice.co/static/face3.png)";
          break;
        case 4:
          var picture = "url(http://dobbelsteen.virtuworld.net/img/4c.gif)";
          break;
        case 5:
          var picture = "url(https://upload.wikimedia.org/wikipedia/commons/5/55/Alea_5.png)";
          break;
        case 6:
          var picture = "url(http://www.zonkthegame.com/img/6.png)";
          break;
      }
      $(diceID).css("background-image", picture);
   };

   this.diceImages = function (dice1, dice2, dice1Roll, dice2Roll) {                    //Sets background & choosing an image.
      $ (dice1).css("background-size", "contain");
      $ (dice1).css("background-repeat","no-repeat");
      $ (dice2).css("background-size", "contain");
      $ (dice2).css("background-repeat","no-repeat");
      this.rollImage (dice1Roll, dice1);
      this.rollImage (dice2Roll, dice2);
   };

  this.rollDice = function() {                                                         //Rolls Both Dices For Random Number Between 1 to 6
      this.dice.dice1         = Math.ceil( Math.random() * 6 );                        //Rolls Dice 1
      this.dice.dice2         = Math.ceil( Math.random() * 6 );                        //Rolls Dice 2
      this.dice.total         = this.dice.dice1 + this.dice.dice2;                     //Sum of Dice 1 & 2
      this.turn               ++;                                                      //Turn Count +1
      this.diceImages('#dieOne', '#dieTwo', this.dice.dice1, this.dice.dice2);
  };

// ====================
// Check Round Winners
// ====================
  this.pairWins = function (dice1, dice2) {                                    //Push pairs into win arrays
    if (dice1 === dice2)                        { this.winners.push("pair" + dice1);}
    else                                        {console.log("No Pairs")}
  }

  this.diceWins = function (diceTotal)    {                                      //Push dices into win arrays
    if (diceTotal > 1)                          { this.winners.push("bets" + diceTotal)}
    else                                        {console.log("Error no dice rolls")}
  }

  this.evenWins = function (diceTotal)    {                                      //Push even and odds into win arrays
    if ((diceTotal%2) === 0)                    { this.winners.push("even");}
    else                                        { this.winners.push("odd");}
  };

  this.bigWins = function (diceTotal)     {                                      //Push big and small into win arrays
    if (diceTotal >= 7)                         { this.winners.push("big");}
    else                                        { this.winners.push("small");}
  };


  this.checkWinners = function() {                                                              //Check For Winning bets of each round(not game winner)
    this.pairWins (this.dice.dice1, this.dice.dice2);
    this.diceWins (this.dice.total);
    this.evenWins (this.dice.total);
    this.bigWins  (this.dice.total);
    console.log(this.dice.dice1 + " " + this.dice.dice2 + " " + this.dice.total);               //Logging dice roll returns
    console.log(this.winners)                                                                   //check winning array
  };

  this.highLightWins = function () {                                         //Hightling "BetBoxes that are in the winng array"
    var high         = this.winners;                                         //Pushing to winning array
    for (i = 0 ; i < high.length ; i++) {                                    //Looping through the array
      var light      = high[i]
      $('#'+ light).css("background-color", "white");                        //css effect
      $('#'+ light).css("border", "3px solid white");                        //css effect
      $('#'+ light).css("background-image", "url(http://awardswriters.com/wp-content/uploads/Winner-stamp1-e1428843025115.jpg)");
      $('#'+ light).css("background-size", "contain");                       //css effect
      $('#'+ light).css("background-repeat", "no-repeat");                   //css effect
    }
  };

// ====================
// Payouts
// ====================
  this.payout = function () {                                                //Depositing Payout for wins to each player
    this.calculatePayout("player1", payoutRatio);                            //Depositing Player1
    this.calculatePayout("player2", payoutRatio);                            //Depositing Player2
    this.player1.bets = [];                                                  //Round bets for p1
    this.player2.bets = [];                                                  //Round bets for p2
  };

  this.calculatePayout = function (player, payoutRatio) {                    //Calculating amount for payout
    var player                  = this[player];                                 //Determine Player
    for (var betName in player.bets) {                                       //For loop to get each bet
      var amount                = player.bets[betName];                         //Amount Player Bet in
      var winnerIndex           = this.winners.indexOf(betName);                //Winning bets this round
      if (amount && winnerIndex >= 0) {                                      //if bet made + bet won
        ratio                   = payoutRatio[betName];                         //Calculate payout
        player.credits          += amount * ratio;                              //add payout to player
        player.bets[betName]    = 0;                                            //Reset payer bets
      }
    }
  };

  this.clearTable = function() {                                             //clearing the table at the end of each round
    this.dice                 = {};                                          //reset dices
    this.winners              = [];                                          //reset winners
    this.currentPlayer        = ' ';                                         //reset playing player
    this.currentPlayerBetSize = 0;                                           //reset bets
    $ (".bets").css("background", "green");                                  //reset gameboard css
  };

// ====================
// Noty
// ====================                                                    //Noty - message for winners
this.messageOnWin = function (Player1, Player2, Player1Credits, Player2Credits) { noty ( {
  text:       Player1 + " WINS!"  + Player1 + "Credits:" + Player1Credits + " ." + Player2 + "Credits:" + Player2Credits,
  animation: {
    open:     'animated bounceInLeft',       // Animate.css class names
    open:     {height: 'toggle'},            //effect for fade in
    close:    'animated bounceOutLeft',      // Animate.css class names
    easing:   'swing',                       // unavailable - no need
    speed:    300                            // unavailable - no need
    }
  });
  this.winSound.play();
};
// ====================
// Check Game Winners
// ====================
  this.playerMoreChips = function (Player1Credits, Player2Credits) {
    if          (Player1Credits > Player2Credits) { this.messageOnWin("Player1", "Player2", Player1Credits,Player2Credits); }
    else if     (Player1Credits < Player2Credits) { this.messageOnWin("Player2", "Player1", Player2Credits,Player1Credits); }
    else                                          { this.messageOnWin( "Player1&2", "Player2" , Player2Credits,Player1Credits);}
  };

  this.checkRoundNumber = function (Player1Credits, Player2Credits) {
    if          (this.turn >=3)                   { this.playerMoreChips(Player1Credits, Player2Credits);}
    else                                          { console.log("No Winner Yet!") };
  }

  this.checkLoser = function (Player1Credits, Player2Credits) {
    if          (Player2Credits <= 0)             { this.messageOnWin("Player1", "Player2", Player1Credits,Player2Credits);}
    else if     (Player1Credits <= 0)             { this.messageOnWin("Player2", "Player1", Player2Credits,Player1Credits);}
    else                                          { console.log("No Loser Yet!");}
  };

  this.checkGameWinner = function () {                                      //checking for a game winner
    this.checkRoundNumber(this.player1.credits,this.player2.credits);
    this.checkLoser(this.player1.credits,this.player2.credits);
    };

  this.updateChips = function () {                                          //Updating player values (with Payout - bet)
    $('#playerOneValue').text(this.player1.credits);                        //P1
    $('#playerTwoValue').text(this.player2.credits);                        //P2
  };
};//Game Objects & Functions END