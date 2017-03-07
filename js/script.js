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

var prompt = function(inputNumber) {
  switch (inputNumber) {
    case 1:
      travel();
      break;
    case 2:
      rest();
      break;
    case 3:
      hunt();
      break;
  }
}
function fates(roll) {
  var charIndex = rollNumber(0,5);
  if(roll<=7) {

    caravan.party[charIndex].diseased=true;
  }else if(roll<=15){
    caravan.party[charIndex].health=0;
  }

}

function rollNumber(min, max) {
  min = Math.ceil(min);  //inclusive
  max = Math.floor(max); //exclusive
  return Math.floor(Math.random() * (max - min)) + min;
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
  meatGained = rollNumber(1, 10);
  console.log(meatGained);
  caravan.food += meatGained * caravan.party.length;
  game.totalDays++;
}

var travel = function() {
  var roll = rollNumber(1,101);
  console.log(roll);
  fates(roll);
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
var char4 = new Character("Gloria");
var char5 = new Character("Megan");
caravan.party.push(char1, char2, char3, char4, char5);
