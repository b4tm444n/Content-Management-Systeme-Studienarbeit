$(document).ready(function(){

  //console.log("test1");
  $("body").hide();
  //console.log("test2");
  var tokenInfo;
  //console.log("test3");
  tokenInfo= AUTHENTICATION.checkToken("admin", "index.html");
  //console.log("test4");
  if(tokenInfo['status']) $("body").show();


  var userType = "admin2";    //Variable muss mit Typ aus Token admin,admin2 initialisiert werden

  if (userType == "admin"){
    //$("#ChangePicture").hide();
    $("#ManageUsers").hide();
    $("#StandardLanguage").hide();
  }

$( function() {
  $( "#ChangePicture").click( function( event ) {
      event.preventDefault();
      $("#Content").empty();

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

  $( function(){
    $( "#logout" ).click( function( event ) {
        //@implement: Logout
    });
  });

  $( function(){
    $( "#StandardLanguage" ).click( function( event ) {
        //@implement:
      //event.preventDefault();
      alert("language klick");
      $("#Content").empty();

      $.when(LANGUAGE.getCurrentLanguageLabels() ).then(function(themes){
          alert(themes);
          alert("sdfsdf");
      });

    });
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

  $(function (){
    $('#ManageLayoutTheme').click(function (){
      $("#Content").empty();

      var currentThemeID;
      $.when(THEME.getCurrentThemeID()).then(function(result){
          currentThemeID = result;
          //alert (currentThemeID);
    	});
      var currentLayoutID;
      $.when(LAYOUT.getCurrentLayoutID()).then(function(result){
          currentLayoutID = result;
          //alert (currentLayoutID);
      });
      //aktuelle Werte holen
      var currentTheme;
      $.when(THEME.getCurrentThemePath()).then(function(result){
          currentTheme = result;
    	});
      var currentLayout;
      $.when(LAYOUT.getCurrentLayoutPath()).then(function(result){
          currentLayout = result;
      });

      var optionsThemes;
      var optionsLayouts;
      $.when(THEME.getAllThemeNamesIDs() ).then(function(themes){
        themes.forEach(function (theme){
          if (theme["ThemeDateiPfad"] != currentTheme){
            optionsThemes += " <option value=" + theme["ThemeID"] +">"+ theme["Name"] +"</option>";
          }
          //Setzen von Selected Option für Eintrag in Datenbank mit "Verwendet = 1"
          else {
            optionsThemes +=  " <option selected value=" + theme["ThemeID"] +">"+ theme["Name"] +"</option>";
          }
        });
      });

      $.when(LAYOUT.getAllLayoutNamesIDs() ).then(function(layouts){
        alert("bla");
        layouts.forEach( function(layout){
          //alert(layout["LayoutID"]);
          if(layout["LayoutDateiPfad"] != currentLayout){
            optionsLayouts += " <option value=" + layout["LayoutID"] +">"+ layout["Name"] +"</option>";
          }
          else{
            optionsLayouts +=  " <option selected value=" + layout["LayoutID"] +">"+ layout["Name"] +"</option>";
          }
        });
      });

      //Theme und Layout Menü zusammensetzen
      menuLayoutTheme = '<div id="menuLayoutTheme">' +
              '<h2>Theme und Layout</h2>'+
              '<h3>Theme</h3>'+
              '<select id="selectTheme">' +
              optionsThemes +
              '</select>'+
              '<h3>Layout</h3>'+
              '<select id="selectLayout">' +
              optionsLayouts
              '</select>'+
              '</div>';
      $('#Content').append(menuLayoutTheme);
      buttonsLayoutTheme = '<div>' +
                  '<a class="button" id ="SubmitThemeLayout">Submit</a>' +
                  '<a class="button" id ="CancelThemeLayout">Cancel</a>' +
                '</div>';
      $('#menuLayoutTheme').append(buttonsLayoutTheme);

      $('#selectTheme').change(function(){
        var themeID = $("#selectTheme :selected").val();
        $.when(THEME.activateTheme(themeID) ).then(function(){
          alert("true");
        });
        document.getElementById("previewLayoutTheme").contentDocument.location.reload(true);
      });
      $('#selectLayout').change(function(){
        var layout_ID = $("#selectLayout :selected").val();
        alert(layout_ID);
        $.when(LAYOUT.activateLayout(layout_ID) ).then(function(){
          alert("true");
        });
        document.getElementById("previewLayoutTheme").contentDocument.location.reload(true);
      });


      help = '<iframe id="previewLayoutTheme" width="900" height="500" src="http://localhost/Projekt/indexPreview.html"></iframe>';
      $('#Content').append(help);

      $("#SubmitThemeLayout").click( function(){
        //Daten bereits in der Datenbank
        //Nutzer Informieren, das Änderungen übernommen wurden
        alert("Theme/Layout has been Changed");
        //Layout und Theme verwalten schließen
        $("#Content").empty();
      });
      $("#CancelThemeLayout").click(function(){
        //Zustand vor Änderungen wiederherstellen
        $.when(THEME.activateTheme(currentThemeID) ).then(function(){
          $.when(LAYOUT.activateLayout(currentLayoutID) ).then(function(){
            //Live-Ansicht aktualisieren
            document.getElementById("previewLayoutTheme").contentDocument.location.reload(true);
            //Dropdowns zurücksetzen
            $('#selectTheme').val(currentThemeID);
            $('#selectLayout').val(currentLayoutID);
            alert("Werte wiederhergestellt");
          });
        });
      });

    });
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
          $("#Content").append('<div class="admin-content" id="'+currentID+'"></div')
          $("#"+currentID).append("<h3 style='float: left;'>"+i+" "+result[i]['Username']+"</h3>");
          $("#"+currentID).append("<fieldset id='userTypeSet"+i+"'><legend>Nutzertyp: </legend>"+
              "<label for='userRadio"+i+"'>Benutzer</label>"+
              "<input type='radio' name='usertypeRadio"+i+"' id='userRadio"+i+"' value='0'>"+
              "<label 'adminRadio"+i+"'>Redakteur</label>"+
              "<input type='radio' name='usertypeRadio"+i+"' id='adminRadio"+i+"' value='1'>"+
              "<label for='admin2Radio"+i+"'>Administrator</label>"+
              "<input type='radio' name='usertypeRadio"+i+"' id='admin2Radio"+i+"' value='2'>"+
          "</fieldset>");
          $("#"+currentID).append("<button class='ui-button ui-widget ui-corner-all' id='userbtn"+i+"'><span class='ui-icon ui-icon-trash'></span></button><br>");
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
          $("#Content").append('<div class="admin-content" id="'+currentID+'"></div')
          $("#"+currentID).append("<h3>"+result[i]['Benennung']+"</h3>");
          $.when(USER.getUserName(result[i]['Projektleiter'])).then(function(userData){
            $("#"+currentID).append("<p class=project-content>Projektleiter: "+userData[0]['Vorname']+" "+userData[0]['Nachname']+"</p>");
          });
          $("#"+currentID).append("<button class='ui-button ui-widget result[i]['Benennung']ui-corner-all' id='projectbtn"+i+"'><span class='ui-icon ui-icon-trash'></span></button><br>");
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
          $("#Content").append('<div class="admin-content" id="'+currentID+'"></div')
          $("#"+currentID).append("<h3>Kategorie: "+result[i]['KategorieName']+"</h3>");
          $("#"+currentID).append("<button class='ui-button ui-widget ui-corner-all' id='categoriebtn"+i+"'><span class='ui-icon ui-icon-trash'></span></button><br>");
          $("#categoriebtn"+i).attr('catID', currentID).click(function(event)
          {
            $.when(CATEGORIE.deleteCategorie($(this).attr('catID'))).then(function(result){
              if(result == true) ADMINPAGE.refreshCategorieContent();
              else alert("Failed to delete project.");
            });
          });
        }
      });
      $("#Content").prepend('<div class="admin-content" id="categorieAdd"></div')

      $("#categorieAdd").append('<h3 id="AddCategorie" for="addCategorieInput">Neue Kategorie: ');
      $("#categorieAdd").append('<input id="addCategorieInput" name="addCategorieInput">')
      $("#categorieAdd").append("<button class='ui-button ui-widget ui-corner-all' id='categorieAddBtn'><span class='ui-icon ui-icon-plus'></span></button> </label></fieldset></form>");
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
