$(document).ready(function() {

    // Home Screen Inputs
  $("form#createParty").submit(function(event) {
    event.preventDefault();

    var wagonLeader = $("#addLeader").val();
    var member1 = $("#addMember1").val();
    var member2 = $("#addMember2").val();
    var member3 = $("#addMember3").val();
    var member4 = $("#addMember4").val();

    console.log(wagonLeader);
    console.log(member1);
    console.log(member2);
    console.log(member3);
    console.log(member4);
  });

  // Trail Screen and Checkpoint Screen Inputs
  $(".continueOnTrail").click(function() {
    console.log("Continue on Trail click");

    $(".imgHeader").css("background-image", "url(img/trail.jpg)");

    var option = 1;
    console.log(option);
  });

  $(".rest").click(function() {
    console.log("Rest click");

    $(".imgHeader").css("background-image", "url(img/rest.png)");

    var option = 2;
    console.log(option);
  });

  $(".hunt").click(function() {
    console.log("Hunt click");

    $(".imgHeader").css("background-image", "url(img/hunt.png)");

    var option = 3;
    console.log(option);
  });

  $(".heal").click(function() {
    console.log("Heal click");

    $(".imgHeader").css("background-image", "url(img/dinosaurtrail.jpg)");

    var option = 4;
    console.log(option);
  });

  // This functions exactly like rest.click
  $(".mourn").click(function() {
    console.log("Mourn click");

    $(".imgHeader").css("background-image", "url(img/mourn.jpg)");

    var option = 5;
    console.log(option);
  });

  $(".restartGame").click(function() {
    console.log("Restart click");

    var option = 6;
    console.log(option);
  });

});
