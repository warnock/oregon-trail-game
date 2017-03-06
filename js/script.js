var game = {
  totalDays: 0,
  daysLeft: 10
};

var caravan = {
  party: [],
  food: 200,
  medicine: 5
  // this.wagonParts = 5;
}

function Character(name) {
  this.name = name;
  this.health = 100;
  this.diseased = false;
}

Character.prototype.healthGain = function() {
  this.health += 20;
}

Character.prototype.healthLoss = function() {
  this.health -= 1;
}

var rest = function() {
  caravan.food -= 2 * caravan.party.length;
  caravan.party.forEach(function (element) {
    element.healthGain();
  });
  game.totalDays++;
}

var hunt = function() {
  caravan.food -= 2 * caravan.party.length;
  caravan.food += 4 * caravan.party.length;
  game.totalDays++;
}

var travel = function() {
  caravan.food -= 2 * caravan.party.length;
  caravan.party.forEach(function (element) {
    element.healthLoss();
  });
  game.totalDays++;
  game.daysLeft--;
}


var char1 = new Character("Ryan");
var char2 = new Character("Riley");
var char3 = new Character("Chris");
caravan.party.push(char1, char2, char3);
