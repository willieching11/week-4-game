$(document).ready(function() {
  var characterChosen = false;
  var enemyChosen = false;
  var hero_chosen;
  var characters = [
    luke = {
      name: "Luke Skywalker",
      image: "<img src = 'assets/images/luke.jpg' id = 'luke' height=120 width=140>",
      attackPow: 8,
      counterPow: 10,
      health: 170,
    },

    obiWan = {
      name: "Obi-Wan Kenobi",
      image: "<img src = 'assets/images/obiwan.jpg' id = 'obiWan' height=120 width=140>",
      attackPow: 6,
      counterPow: 15,
      health: 120,
    },

    maul = {
      name: "Darth Maul",
      image: "<img src = 'assets/images/maul.jpg' id = 'maul' height=120 width=140>",
      attackPow: 8,
      counterPow: 25,
      health: 150,
    },

    palpatine = {
      name: "Emperor Palpatine",
      image: "<img src = 'assets/images/palpatine.jpg' id = 'palpatine' height=120 width=140>",
      attackPow: 10, 
      counterPow: 20,
      health: 180,
    }
  ];
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
      characters.splice(i, 1); //remove choen hero from fighters array
      $('#fighters').empty();
      fighters('#enemies'); //reprint fighters array
    }
  });

  $("#enemies").on("click", ".character-button", function() {//create enemy character
    if (enemyChosen === false) {
      //enemyChosen = true;
      var enemy = $('<div>'); 
      enemy.addClass('letter villain');
      enemy.text($(this).attr('data-name'));
      enemy.append($(this).attr('image'));
      enemy.append("Health: " + $(this).attr('health')); 
      $('#villain').append(enemy);
      var i = ($(this).attr('value'));
      villain_chosen = characters[i];
      characters.splice(i, 1); //remove choen villain from enemies array
      $('#enemies').empty();
      fighters('#enemies'); //reprint enemies array
    }
  });
});