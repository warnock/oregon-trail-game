var gameStartSong = new Audio('audio/music.wav');
var gameWinSong = new Audio('audio/win.wav');
gameStartSong.play();

var game = {
  totalDays: 0,
  daysLeft: 50,
  imgArray: ["url(img/trail.jpg)", "url(img/trail2.jpg)", "url(img/trail3.jpg)"],
  imgArrayIndex: 0
};

var caravan = {
  party: [],
  food: 200,
  medicine: 5
}

var checkpoints = ["Fort Laramie", "the Big Blue River", "Fort Bridger", "the Snake River"];

function Character(name) {
  this.name = name;
  this.health = 100;
  this.diseases = 0;
}

Character.prototype.healthGain = function() {
  var amount = rollNumber(5, 26);
  this.health += amount;
  if (this.health > 125) {
    this.health = 125;
  }
}

Character.prototype.healthLoss = function() { //daily health loss
  var starvingModifier = 1;
  var diseasedModifier = this.diseases * 2;
  if (caravan.food <= 0) {
    starvingModifier = 3;
  }

  this.health -= (3 + diseasedModifier) * starvingModifier;
}

Character.prototype.deathCheck = function(i) {
  if(this.health<=0) {
    return true;
  }
}

function foodLoss() {
  caravan.food -= 2 * caravan.party.length;
  if (caravan.food <= 0) {
    caravan.food = 0;
    console.log("Out of food!");
  }
}

function checkDeath() {

  var deathString = "";

  for(var i = 0; i < caravan.party.length; i++) {
    if(caravan.party[i].deathCheck(i)) {
      deathString += caravan.party[i].name + " has died. ";
      caravan.party.splice(i, 1);
      $(".rest").hide();
      $(".mourn").show();
      $(".mourn").css("display", "inline-block");
      if (caravan.party.length <= 0) {
        $("#randomEventMessage, #checkPoint").empty();
        $("#gameScreen").hide();
        gameWinSong.play();
        $("#event").html("Everyone in your party has died. The game is over.");
        $(".imgHeader").css("background-image", "url(img/endGameLoser.jpg)");
        $(".restartGame").show();

        return;
      }
      i--;
    }
  }

  if (deathString) {
    deathString += "Bummer.";
    $("#event").html(deathString);
    $(".imgHeader").css("background-image", "url(img/deathScreenHeader.jpg)");
  }
}

function fates(roll, rivOrTrail) {
  var charIndex = rollNumber(0,caravan.party.length);
  var more = "";
  $("#event").html("Though the journey may be rough, you have continued on your trail.");

  if (rivOrTrail === "trail") {
    if (roll <= 10) {
      if (caravan.party[charIndex].diseases > 0) {
        more = "nother";
      }
      var diseaseNames = ["dysentery", "cholera", "typhoid", "measles", "diphtheria", "scurvy"];
      var diseaseIndex = rollNumber(0, diseaseNames.length);
      $("#randomEventMessage").text(caravan.party[charIndex].name+" contracted " + diseaseNames[diseaseIndex] + "!");
      caravan.party[charIndex].diseases += 1;
    } else if (roll<=14) {
      $("#randomEventMessage").text(caravan.party[charIndex].name + " broke a foot while running from a buffalo.");
      caravan.party[charIndex].health -= 50;
    } else if (roll<=18 && caravan.food > 0){
      $("#randomEventMessage").text("Everyone shunned " + caravan.party[charIndex].name+" after dropping a bushel of food!");
      caravan.food -= 50;
    } else if (roll<=21){
      $("#randomEventMessage").text("There was a snake in " +  caravan.party[charIndex].name + "'s boot. " + caravan.party[charIndex].name + " contracted a disease.");
      caravan.party[charIndex].diseases += 1;
    } else if (roll >= 98) {
      caravan.food += 50;
      $("#randomEventMessage").text("Your caravan came across a field of ripe, delicous berries.");
    } else if (roll >= 95) {
      caravan.medicine += 1;
      $("#randomEventMessage").text("A generous, traveling apothecary has gifted you 1 medicine.");
    } else if (roll >= 92) {
      caravan.party.forEach(function (element) {
        element.healthGain();
      });
      $("#randomEventMessage").text("You found a not-too-hot hot spring! Your party feels more rested.");
    } else {
      $("#event").html("You have traveled a day and are one  step closer to Oregon.");
    }
  } else if (rivOrTrail === "river") {
    if (roll <= 10) {
      caravan.party[charIndex].health = 0;
      $("#randomEventMessage").text(caravan.party[charIndex].name + " has drowned.");
    } else if (roll <= 17) {
      var amount = rollNumber(10, 31);
      caravan.food -= amount;
      $("#randomEventMessage").text("The river was rough and " + caravan.party[charIndex].name + " dropped " + amount + " food in the river.");
    } else if (roll <= 25) {
      caravan.party[charIndex].diseases += 1;
      $("#randomEventMessage").text(caravan.party[charIndex].name + "  contracted a disease from the dirty river.");
    } else if (roll <= 36 && caravan.party.medicine > 0) {
      var amount = rollNumber(1, (caravan.party.medicine + 1));
      caravan.party.medicine -= amount;
      $("#randomEventMessage").text(caravan.party[charIndex].name + " dropped " + amount + " medicines. Everyone seems pretty upset.")
    } else if (roll <= 50) {
      var amount = rollNumber(5, 16);
      caravan.party.forEach(function(element) {
        element.health -= amount;
      });
      $("#randomEventMessage").text("The river was freezing cold! Everyone loses " + amount + " health.");
    } else {
      $("#event").text("Your party successfully crossed the river. Onward to Oregon.")
      return;
    }
  } else {
    console.log("ERRORRR");
    return;
  }
}

function rollNumber(min, max) {
  min = Math.ceil(min);  //inclusive
  max = Math.floor(max); //exclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

function talk() {
  var talkRoll = rollNumber(0, 4);
  if(talkRoll === 0) {
    $("#event").text("Howdy, Y'all! My name is Jeremy Yetternutter, I'm the town blacksmith. It's a pleasure making your aquaintance.");
  }else if(talkRoll === 1) {
    $("#event").text("Why, hello there! My name is Jebediah Yankles, I'm the Mayor in these here parts. It's a pleasure making your aquaintance.");
  }else if(talkRoll === 2) {
    $("#event").text("GIMME YA LOOTS YA DARN YANKIES. THIS HERE'S A STICK UP.");
  }else if(talkRoll === 3) {
    $("#event").text("Pardon me, do y'all have any spare change?");
  }else {
    console.log("talk function error");
  }
}

function gameChecker() {
  if (game.daysLeft === 0) {  // GAME OVER WIN
    $("#randomEventMessage, #checkPoint, #event").empty();
    var left = caravan.party.length;
    $("#checkPoint").html("WINNER! WINNER! CHICKEN DINNER! Only " + left + " of your party has survived.");
    $(".imgHeader").css("background-image", "url(img/endGameWin.jpg)");
    $(".restartGame").show();
    $(".continueOnTrail, .rest, .mourn, .hunt, .talk, .heal").hide();
    gameWinSong.play();
  } else if (game.daysLeft === 40) { // 40 days from end (and multiples of 20)...fort
    $("#randomEventMessage, #checkPoint").empty();
    $("#checkPoint").html("Welcome. You've reached " + checkpoints[0] + "!");
    $(".imgHeader").css("background-image", "url(img/fortlaramie.png)");
    checkpoints.shift();
    $(".hunt").hide();
    $(".talk").show();
    $(".talk").css("display", "inline-block");
  } else if (game.daysLeft === 30) { // 30 days from end (and multiples of 20)...river
    $("#randomEventMessage, #checkPoint").empty();
    $("#checkPoint").html("You've reached " + checkpoints[0] + "! Proceed with caution.");
    $(".imgHeader").css("background-image", "url(img/blueriver.png)");
    checkpoints.shift();
    $(".hunt").hide();
    $(".continueOnTrail").hide();
    $(".crossRiver").show();
    $(".crossRiver").css("display", "inline-block");
    $(".talk").show();
    $(".talk").css("display", "inline-block");
  } else if (game.daysLeft === 20) { // 20 days from end (and multiples of 20)...river
    $("#randomEventMessage, #checkPoint").empty();
    $("#checkPoint").html("Welcome. You've reached " + checkpoints[0] + "!");
    $(".imgHeader").css("background-image", "url(img/fortbridger.png)");
    checkpoints.shift();
    $(".hunt").hide();
    $(".talk").show();
    $(".talk").css("display", "inline-block");
  } else if (game.daysLeft === 10) { // 10 days from end (and multiples of 20)...river
    $("#randomEventMessage, #checkPoint").empty();
    $("#checkPoint").html("You've reached " + checkpoints[0] + "! Proceed with caution.");
    $(".imgHeader").css("background-image", "url(img/snakeriver.png)");
    checkpoints.shift();
    $(".hunt").hide();
    $(".continueOnTrail").hide();
    $(".crossRiver").show();
    $(".crossRiver").css("display", "inline-block");
    $(".talk").show();
    $(".talk").css("display", "inline-block");
  } else {
    console.log("go ahead and travel");
  }
}

function medicine() {
  $("#randomEventMessage, #checkPoint").empty();
  if (caravan.medicine <= 0) {
    $("#event").html("You don't have any medicine.");
  } else {
    var index;
    var lowestHealth = 1000;
    caravan.party.forEach(function(element, i) {
      if (element.diseases > 0) {
        if (element.health < lowestHealth) {
          lowestHealth = element.health;
          index = i;
        } else {
          return;
        }
      } else {
        return;
      }
    });
    if (lowestHealth === 1000) {
      $("#event").html("No one is siiiick.");
    } else {
      caravan.party[index].diseases -= 1;
      caravan.medicine -= 1;
      $("#event").html(caravan.party[index].name + " has been healed 1 disease.");
    }
  }
  return;
}

function restMourn() {
  $("#randomEventMessage, #checkPoint").empty();
  foodLoss();
  caravan.party.forEach(function (element) {
    element.healthGain();
  });
  $("#event").html("Your party mourns the loss of a fallen party member.");
  game.totalDays++;
  $(".mourn").hide();
  $(".rest").show();
}

function rest() {
  $("#randomEventMessage, #checkPoint").empty();
  foodLoss();
  caravan.party.forEach(function (element) {
    element.healthGain();
  });
  $("#event").html("Your party decides to rest for the day ahead.");
  game.totalDays++;
}

function hunt() {
  $("#randomEventMessage, #checkPoint").empty();
  var meatGained = rollNumber(4, 16);
  caravan.food += meatGained * caravan.party.length;
  $("#event").html("Everyone in your party gathered "+meatGained+" food!");
  foodLoss();
  caravan.party.forEach(function (element) {
    element.healthLoss();
  });
  checkDeath();
  game.totalDays++;

}

function travel(rivOrTrail) {
  var roll = rollNumber(1,101);
  console.log(roll);
  fates(roll, rivOrTrail);
  foodLoss();
  caravan.party.forEach(function (element) {
    element.healthLoss();
  });
  checkDeath();
  game.totalDays++;
  game.daysLeft--;
  $(".talk").hide();
  $(".hunt").show();
}

function updateStats() {
  $(".totalDays").text(game.totalDays);

  var nameString = "";
  caravan.party.forEach(function(member) {
    if (member.diseases < 1) {
      nameString += "<li>" + member.name + " | Health: " + member.health + "</li>";
    } else {
      var plural = "";
      if (member.diseases > 1) {
        plural = "s";
      }
      nameString += "<li><span id='memberSick'>" + member.name + " | Health: " + member.health + " | " + member.diseases + " Disease" + plural + "</span></li>";
    }
  });

  $(".wagonMembers").html(nameString);

  var foodString = "";
  if (caravan.food <= 0) {
    foodString = "<span id='foodZero'>Food: 0</span>";
  } else {
    foodString = "Food: " + caravan.food;
  }
  $(".food").html(foodString);

  var medString = "";
  if (caravan.medicine <= 0) {
    medString = "<span id='foodZero'>Medicine: 0</span>";
  } else {
    medString = "Medicine: " + caravan.medicine;
  }
  $(".medicine").html(medString);
}

$(function() {
  $("form#createParty").submit(function(event) {
    event.preventDefault();

    var wagonLeader = $("#addLeader").val();
    var member1 = $("#addMember1").val();
    var member2 = $("#addMember2").val();
    var member3 = $("#addMember3").val();
    var member4 = $("#addMember4").val();

    var char1 = new Character(wagonLeader);
    var char2 = new Character(member1);
    var char3 = new Character(member2);
    var char4 = new Character(member3);
    var char5 = new Character(member4);
    caravan.party.push(char1, char2, char3, char4, char5);

    var autoNames = ["Ryan", "Gloria", "Riley", "Megan", "Chris", "Colin", "Blake", "Grace", "Ben", "Mark", "Liam", "Shane", "Christian", "Chance", "Oliver", "Evan", "Perry", "Dallas", "Alex", "Xi Xia", "Jahan", "Kaya", "Josh", "Nathaniel", "Janek", "Clifford", "Cameron", "Keith", "Pizza", "Stormi"];
    caravan.party.forEach(function(member) {
      if (!member.name) {
        var index = rollNumber(0, autoNames.length);
        member.name = autoNames[index];
        autoNames.splice(index, 1);
      }
    });

    updateStats();
    $("#homeScreen").hide();
    $("#gameScreen").show();
  });

  $(".continueOnTrail").click(function() {
    $("#randomEventMessage, #checkPoint").empty();

    $(".imgHeader").css("background-image", game.imgArray[game.imgArrayIndex]);
    if(game.imgArrayIndex < 2) {
      game.imgArrayIndex++;
    } else {
      game.imgArrayIndex = 0;
    }

    travel("trail");
    gameChecker();
    console.log(game.daysLeft);
    updateStats();
  });

  $(".crossRiver").click(function() {
    $("#randomEventMessage, #checkPoint").empty();

    travel("river");
    gameChecker();
    console.log(game.daysLeft);
    updateStats();
    $(".crossRiver").hide();
    $(".continueOnTrail").show();
  });

  $(".rest").click(function() {
    $(".imgHeader").css("background-image", "url(img/rest.png)");
    rest();
    updateStats();
  });

  $(".hunt").click(function() {
    $(".imgHeader").css("background-image", "url(img/hunt.png)");
    hunt();
    updateStats();
  });

  $(".heal").click(function() {
    $(".imgHeader").css("background-image", "url(img/dinosaurtrail.jpg)");
    medicine();
    updateStats();
  });

  $(".mourn").click(function() {
    $(".imgHeader").css("background-image", "url(img/mourn.jpg)");
    console.log("part1");
    restMourn();
    updateStats();
  });

  $(".talk").click(function() {
    talk();
  })

})
