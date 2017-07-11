$(document).ready(function() {
  var characterChosen = false;
  var enemyChosen = false;
  var hero_chosen;
  var initialPower;
  var wins = 0;
  var characters = [
    luke = {
      name: "Luke Skywalker",
      image: "<img src = 'assets/images/luke.jpg' id = 'luke' height=120 width=140>",
      attackPow: 8,
      counterPow: 12,
      health: 90,
    },

    obiWan = {
      name: "Obi-Wan Kenobi",
      image: "<img src = 'assets/images/obiwan.jpg' id = 'obiWan' height=120 width=140>",
      attackPow: 6,
      counterPow: 10,
      health: 110,
    },

    maul = {
      name: "Darth Maul",
      image: "<img src = 'assets/images/maul.jpg' id = 'maul' height=120 width=140>",
      attackPow: 9,
      counterPow: 19,
      health: 85,
    },

    palpatine = {
      name: "Emperor Palpatine",
      image: "<img src = 'assets/images/palpatine.jpg' id = 'palpatine' height=120 width=140>",
      attackPow: 4, 
      counterPow: 13,
      health: 130,
    }
  ];
  $('#start').append("<button class = 'btn-xl btn-primary startButton'>Start Game!</button>");

  $('#start').on("click", ".startButton", function() {
    $('#start').empty();
    $(document.body).css('background-image', 'url(assets/images/wallpaper.jpg)')
    $('#enemies').append("<h1>Enemies Available to Attack</h1>");
    $('#hero').append("<h1>Hero</h1>");
    $('#attackButton').append("<h1>Fight!</h1>");
    $('#villain').append("<h1>Defender</h1>");
    startGame();
  });
  
  function startGame() {
    fighters('#fighters');
    function fighters(location) {
      for (var i = 0; i < characters.length; i++) {
        var fighterBlock = $('<button>'); //2
        fighterBlock.addClass('character-button letter letter-button-color'); //3
        fighterBlock.attr('data-name', characters[i].name);
        fighterBlock.attr('image', characters[i].image); 
        fighterBlock.attr('health', characters[i].health);//4
        fighterBlock.text(characters[i].name);
        fighterBlock.append(characters[i].image);
        fighterBlock.append("Health: " + characters[i].health);
        fighterBlock.attr('value', i);
        $(location).append(fighterBlock); //6
      }
    }

    $("#fighters").on("click", ".character-button", function() {//create user's character
      if (characterChosen === false) {
        characterChosen = true;
        var hero = $('<div>'); 
        hero.addClass('letter hero');
        hero.text($(this).attr('data-name'));
        hero.append($(this).attr('image'));
        hero.append("Health: " + $(this).attr('health')); 
        $('#hero').append(hero);
        var i = ($(this).attr('value'));
        hero_chosen = characters[i];
        $('#action').prepend("<p>You have chosen " + hero_chosen.name + "</p>");
        initialPower = hero_chosen.attackPow;
        characters.splice(i, 1); //remove choen hero from fighters array
        $('#fighters').empty();
        fighters('#enemies'); //reprint fighters array
      }
    });

    $("#enemies").on("click", ".character-button", function() {//create enemy character
      if (enemyChosen === false) {
        $('#action').empty(); 
        enemyChosen = true;
        var enemy = $('<div>'); 
        enemy.addClass('letter villain');
        enemy.text($(this).attr('data-name'));
        enemy.append($(this).attr('image'));
        enemy.append("Health: " + $(this).attr('health')); 
        $('#villain').append(enemy);
        var i = ($(this).attr('value'));
        villain_chosen = characters[i];
        $('#action').prepend("<p>You will fight " + villain_chosen.name + "</p>");
        characters.splice(i, 1); //remove choen villain from enemies array
        $('#enemies').empty();
        $('#enemies').append("<h1>Enemies Available to Attack</h1>");
        fighters('#enemies'); //reprint enemies array
        $('#attackButton').append("<button class = 'btn btn-danger attackButton'>Attack!</button>");
      }
    });

    $('#attackButton').on("click", ".attackButton", function(){
      $('#action').empty();
      $('#action').append("<p>" + hero_chosen.name + " attacks and deals " + hero_chosen.attackPow + " damage!</p>");
      villain_chosen.health = villain_chosen.health - hero_chosen.attackPow;
      if (villain_chosen.health <= 0) {
        enemyChosen = false;
        $('#action').append("<p>" + hero_chosen.name + " has defeated " + villain_chosen.name + "</p>");
        $('#villain').empty();
        $('#villain').append("<h1>Defender</h1>");
        $('#attackButton').empty();
        $('#attackButton').append("<h1>Fight!</h1>");
        wins++;
        if (wins === 3) {
          $('#attackButton').append("<button class = 'btn btn-success restartButton'>Play Again</button>");
        }
        return;
      }
      updateVillain();
      hero_chosen.attackPow = hero_chosen.attackPow + initialPower;
      $('#action').append("<p>" + hero_chosen.name + "'s attack Power increases to " + hero_chosen.attackPow + "</p>");
      hero_chosen.health = hero_chosen.health - villain_chosen.counterPow;
      $('#action').append("<p>" + villain_chosen.name + " counters and deals " + villain_chosen.counterPow + " damage!</p>");
      updateHero();
      if (hero_chosen.health <= 0) {
        $('#hero').empty();
        $('#hero').append("<h1>Hero</h1>");
        $('#attackButton').empty();
        $('#attackButton').append("<h1>Fight!</h1>");
        $('#action').append("<p>" + hero_chosen.name + " has been killed!</p>");
        $('#attackButton').append("<button class = 'btn btn-success restartButton'>Play Again</button>");
      }
    }); 

    function updateVillain() {
      $('#villain').empty();
      $('#villain').append("<h1>Defender</h1>");
      var enemy = $('<div>'); 
      enemy.addClass('letter villain');
      enemy.text(villain_chosen.name);
      enemy.append(villain_chosen.image);
      enemy.append("Health: " + villain_chosen.health); 
      $('#villain').append(enemy);
    }

    function updateHero() {
      $('#hero').empty();
      $('#hero').append("<h1>Hero</h1>");
      var hero = $('<div>'); 
      hero.addClass('letter hero');
      hero.text(hero_chosen.name);
      hero.append(hero_chosen.image);
      hero.append("Health: " + hero_chosen.health); 
      $('#hero').append(hero);
    }

    $('#attackButton').on("click", ".restartButton", function(){ //restarts the game
      $('#hero').empty();
      $('#action').empty();
      $('#villain').empty();
      $('#enemies').empty();
      $('#attackButton').empty();
      $('#enemies').append("<h1>Enemies Available to Attack</h1>");
      $('#hero').append("<h1>Hero</h1>");
      $('#attackButton').append("<h1>Fight!</h1>");
      $('#villain').append("<h1>Defender</h1>");
      characterChosen = false;
      enemyChosen = false;
      wins = 0;
      characters = [
        luke = {
          name: "Luke Skywalker",
          image: "<img src = 'assets/images/luke.jpg' id = 'luke' height=120 width=140>",
          attackPow: 8,
          counterPow: 12,
          health: 95,
        },

        obiWan = {
          name: "Obi-Wan Kenobi",
          image: "<img src = 'assets/images/obiwan.jpg' id = 'obiWan' height=120 width=140>",
          attackPow: 6,
          counterPow: 10,
          health: 110,
        },

        maul = {
          name: "Darth Maul",
          image: "<img src = 'assets/images/maul.jpg' id = 'maul' height=120 width=140>",
          attackPow: 9,
          counterPow: 19,
          health: 85,
        },

        palpatine = {
          name: "Emperor Palpatine",
          image: "<img src = 'assets/images/palpatine.jpg' id = 'palpatine' height=120 width=140>",
          attackPow: 4, 
          counterPow: 13,
          health: 130,
        }
      ];
      fighters('#fighters');
    }); 
  }
});