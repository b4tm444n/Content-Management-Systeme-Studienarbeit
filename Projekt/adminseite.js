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
  $( function()
  {
    $( "#ManageProjects" ).click( function( event ) {
      event.preventDefault();
      ADMINPAGE.refreshProjectContent();
    } );
  });

  ADMINPAGE =
  {
    refreshUserContent: function()
    {
      $("#Content").empty();
      $.when(USER.getAllUsers()).then(function(result){
        for(i = 0; i<result.length; i++)
        {
          var currentID = result[i]['NutzerID'];
          $("#Content").append("<p>"+currentID+" "+result[i]['Username']+"</p>");
          $("#Content").append("<button class='ui-button ui-widget ui-corner-all' id='userbtn"+i+"'><span class='ui-icon ui-icon-trash'></span></button><br>");
          $("#userbtn"+i).attr('userID', currentID).click(function(event)
          {
            $.when(USER.deleteUser($(this).attr('userID'))).then(function(result){
              if(result == true) ADMINPAGE.refreshUserContent();
              else alert("Failed to delete user.");
            });
          });
        }
      });
    },
    refreshProjectContent: function()
    {
      $("#Content").empty();
      $.when(PROJECT.searchAllProjects()).then(function(result){
        console.log(result);
        for(i = 0; i<result.length; i++)
        {
          var currentID = result[i]['ProjektID'];
          $("#Content").append("<p>Name: "+result[i]['Benennung']+"</p>");
          $.when(USER.getUserName(result[i]['Projektleiter'])).then(function(userData){
            $("#Content").append("<p>Projektleiter: "+userData[0]['Vorname']+" "+userData[0]['Nachname']+"</p>");
          });
          $("#Content").append("<button class='ui-button ui-widget ui-corner-all' id='projectbtn"+i+"'><span class='ui-icon ui-icon-trash'></span></button><br>");
          $("#projectbtn"+i).attr('projID', currentID).click(function(event)
          {
            $.when(PROJECT.deleteProject($(this).attr('projID'))).then(function(result){
              if(result == true) ADMINPAGE.refreshProjectContent();
              else alert("Failed to delete project.");
            });
          });
        }
      });
    }
  };
});
