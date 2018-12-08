$(document).ready(function(){

  //console.log("test1");
  $("body").hide();
  //console.log("test2");
  var tokenInfo;
  //console.log("test3");
  //tokenInfo= AUTHENTICATION.checkToken("admin", "index.html");
  tokenInfo  = AUTHENTICATION.checkToken("admin2", "index.html");
  //console.log("test4");
  if(tokenInfo['status']) $("body").show();


$( function() {
  $( "#ChangePicture").click( function( event ) {
      event.preventDefault();
      $("#Content").empty();
      /*
      $.post( "server/token.php", { pfad: "test", dateityp: "eintest"}).done(function(data){
				alert(data);
			});
      */
    //  help = "<select id='pictures'>bla</select> " +
      //        "<button class='ui-button ui-widget ui-corner-all' id='pictureSubmit'>Ändern</button>";
      //$("#Content").append(help);


      //Dropdown aus Datenbank initialisieren
      $.post( "server/adminFunctions.php", { }).done(function( data ) {
        help = "<select id='pictures'>";


        //Object.keys(data).forEach(function  x (picture) {
        data1 = JSON.parse(data);
        console.log(data1);
        console.log(data1['BildDateiPfad']);
        data1.forEach(function  x (picture) {
          help += "<option value=" + data1['IndexTitelbildID'] + ">" + data1['Name']+"</option>";
        });
        help += "</select> ";
        $("#Content").append(help);
      });

      $('#pictureSubmit').click(function(){
          //wert in Datenbank schreiben
      });
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
  $( function()
  {
    $( "#ManageCategories" ).click( function( event ) {
      event.preventDefault();
      ADMINPAGE.refreshCategorieContent();
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
          $("#Content").append("<p style='float: left;'>"+i+" "+result[i]['Username']+"</p>");
          $("#Content").append("<fieldset id='userTypeSet"+i+"'><legend>Nutzertyp: </legend>"+
              "<label for='userRadio"+i+"'>Benutzer</label>"+
              "<input type='radio' name='usertypeRadio"+i+"' id='userRadio"+i+"' value='0'>"+
              "<label 'adminRadio"+i+"'>Redakteur</label>"+
              "<input type='radio' name='usertypeRadio"+i+"' id='adminRadio"+i+"' value='1'>"+
              "<label for='admin2Radio"+i+"'>Administrator</label>"+
              "<input type='radio' name='usertypeRadio"+i+"' id='admin2Radio"+i+"' value='2'>"+
          "</fieldset>");
          $("#Content").append("<button class='ui-button ui-widget ui-corner-all' id='userbtn"+i+"'><span class='ui-icon ui-icon-trash'></span></button><br>");
          console.log(result[i]['admin']);
          switch(result[i]['admin'])
          {
            case('0'):
              $('#userRadio'+i).prop('checked', true);
              break;
            case('1'):
              $('#adminRadio'+i).prop('checked', true);
              break;
            case('2'):
              $('#admin2Radio'+i).prop('checked', true);
              break;
          }
          $('input[type=radio][name=usertypeRadio'+i+']').attr('userID', currentID).change(function() {
            if ($(this).val() == '0') {
              $.when(USER.setUserType($(this).attr('userID'), 0)).then(function(result){
                if(result == true) ADMINPAGE.refreshUserContent();
                else alert("Failed to set type of user.");
              });
            }
            else if ($(this).val() == '1') {
              $.when(USER.setUserType($(this).attr('userID'), 1)).then(function(result){
                if(result == true) ADMINPAGE.refreshUserContent();
                else alert("Failed to set type of user.");
              });
            }
            else if ($(this).val() == '2') {
              $.when(USER.setUserType($(this).attr('userID'), 2)).then(function(result){
                if(result == true) ADMINPAGE.refreshUserContent();
                else alert("Failed to set type of user.");
              });
            }
          });
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
    },
    refreshCategorieContent: function()
    {
      $("#Content").empty();
      var allCategories = new Array();
      $.when(CATEGORIE.getAllCategories()).then(function(result){
        for(i = 0; i<result.length; i++)
        {
          var currentID = result[i]['KategorieID'];
          allCategories.push(result[i]['KategorieName']);
          $("#Content").append("<p>Kategorie: "+result[i]['KategorieName']+"</p>");
          $("#Content").append("<button class='ui-button ui-widget ui-corner-all' id='categoriebtn"+i+"'><span class='ui-icon ui-icon-trash'></span></button><br>");
          $("#categoriebtn"+i).attr('catID', currentID).click(function(event)
          {
            $.when(CATEGORIE.deleteCategorie($(this).attr('catID'))).then(function(result){
              if(result == true) ADMINPAGE.refreshCategorieContent();
              else alert("Failed to delete project.");
            });
          });
        }
      });
      $("#Content").prepend("<button class='ui-button ui-widget ui-corner-all' id='categorieAddBtn'><span class='ui-icon ui-icon-plus'></span></button> </label></fieldset></form>");
      $("#Content").prepend('<form><fieldset style="float: left;"><label id="AddCategorie" for="addCategorieInput">Neue Kategorie: <input id="addCategorieInput" name="addCategorieInput">');
      $("#categorieAddBtn").click(function(event)
      {
        if(!ADMINPAGE.checkCategorieExists(allCategories, $("#addCategorieInput").val()))
        {
          $.when(CATEGORIE.createCategorie($("#addCategorieInput").val())).then(function(result){
            if(result == true) ADMINPAGE.refreshCategorieContent();
            else alert("Failed to create categorie.");
          });
        }
        else alert("Categorie already exists.");
      });
    },
    checkCategorieExists: function(allCatArray, curCat)
    {
      curCat = curCat.replace(' ', '');
      curCat = curCat.toLowerCase();
      for(i = 0; i<allCatArray.length; i++)
      {
        allCatArray[i] = allCatArray[i].replace(' ', '');
        allCatArray[i] = allCatArray[i].toLowerCase();
        if(allCatArray[i] == curCat) return true;
      }
      return false;
    }
  };
});
