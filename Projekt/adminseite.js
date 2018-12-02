$(document).ready(function(){
  $("body").hide();
  var tokenInfo = AUTHENTICATION.checkToken("admin", "index.html");
  if(tokenInfo['status']) $("body").show();


$( function() {
  $( "#ChangePicture").click( function( event ) {
      event.preventDefault();
      $.post( "server/token.php", { pfad: "test", dateityp: "eintest"}).done(function(data){
				alert(data);
			});
      //$("#password").val()
      //alert();
    } );


});

  $( function()
  {
    $( "#ManageUsers" ).click( function( event ) {
      event.preventDefault();
      ADMINPAGE.refreshUserContent();
    } );
  });

  ADMINPAGE =
  {
    refreshUserContent: function()
    {
      $("#Content").empty();
      $.when(USER.getAllUsers()).then(function(result){
        console.log(result);
        for(i = 0; i<result.length; i++)
        {
          var currentID = result[i]['NutzerID'];
          $("#Content").append("<p>"+currentID+" "+result[i]['Username']+"</p>");
          $("#Content").append("<button id='user"+i+"'><span class='ui-icon ui-icon-trash'></span></button><br>");
          $("#user"+i).click(function(event)
          {
            $.when(USER.deleteUser(currentID)).then(function(result){
              if(result == true) ADMINPAGE.refreshUserContent();
              else alert("Failed to delete user.");
            });
          });
        }
      });
    }
  };
});
