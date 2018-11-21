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


});/*
  $( function() {
    $( "#Btn1" ).click( function( event ) {
      event.preventDefault();
      var projectData = PROJECT.searchProjects();
      $("#projectContent").append("<p>"+projectData["name"]+"</p>");
      $("#projectContent").append("<p>"+projectData["author"]+"</p>");
      $("#projectContent").append("<p>"+projectData["picture"]+"</p>");
      $("#projectContent").append("<p>"+projectData["state"]+"</p>");
    } );


});*/

});
