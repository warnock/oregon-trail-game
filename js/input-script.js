$(document).ready(function() {

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

});
