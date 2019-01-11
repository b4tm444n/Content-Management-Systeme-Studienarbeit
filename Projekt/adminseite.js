$(document).ready(function(){

  //console.log("test1");
  $("body").hide();
  //console.log("test2");
  var tokenInfo;
  //console.log("test3");
  tokenInfo= AUTHENTICATION.checkToken("admin", "index.html");
  //console.log("test4");
  if(tokenInfo['status']) $("body").show();


  var userType = tokenInfo['type'];    //Variable muss mit Typ aus Token admin,admin2 initialisiert werden

  if (userType == "admin"){
    //$("#ChangePicture").hide();
    $("#ManageUsers").hide();
    $("#StandardLanguage").hide();
    $("#AddLanguage").hide();
  }

$( function() {
  $( "#ChangePicture").click( function(event) {
      event.preventDefault();
      ADMINPAGE.refreshPictureContent();
    });
});

  $( function(){
    $( "#logout" ).click( function(event) {
        $.post( "server/logout.php", {}, "json").done(function( data ) {CONNECT.toPage("index.html");;});
    });
  });

  $( function(){
    $( "#StandardLanguage" ).click( function(event) {
      event.preventDefault();
      ADMINPAGE.refreshStandartLanguageContent();
    });
  });

  $(function(){
    $("#AddLanguage").click(function(event){
      event.preventDefault();
      ADMINPAGE.refreshAddLanguageContent();
    });
  });

  $( function()
  {
    $( "#ManageUsers" ).click( function(event) {
      event.preventDefault();
      ADMINPAGE.refreshUserContent();
    } );
  });
  $( function()
  {
    $( "#ManageProjects" ).click( function(event) {
      event.preventDefault();
      ADMINPAGE.refreshProjectContent();
    } );
  });
  $( function()
  {
    $( "#ManageCategories" ).click( function(event) {
      event.preventDefault();
      ADMINPAGE.refreshCategorieContent();
    } );
  });

  $(function (){
    $('#ManageLayoutTheme').click(function (event){
      event.preventDefault();
      ADMINPAGE.refreshLayoutThemeContent();
    });
});

$(function (){
  $("#AddLayoutTheme").click(function(event){
    event.preventDefault();
    ADMINPAGE.refreshAddLayoutThemeContent();
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
          $("#"+currentID).append("<h3>"+result[i]['Username']+"</h3><br>");
          $("#"+currentID).append("<fieldset id='userTypeSet"+i+"'><legend>Nutzertyp: </legend>"+
              "<label for='userRadio"+i+"'>Benutzer</label>"+
              "<input type='radio' name='usertypeRadio"+i+"' id='userRadio"+i+"' value='0'><br>"+
              "<label 'adminRadio"+i+"'>Redakteur</label>"+
              "<input type='radio' name='usertypeRadio"+i+"' id='adminRadio"+i+"' value='1'><br>"+
              "<label for='admin2Radio"+i+"'>Administrator</label>"+
              "<input type='radio' name='usertypeRadio"+i+"' id='admin2Radio"+i+"' value='2'><br>"+
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
    refreshPictureContent: function()
    {
      $("#Content").empty();
      //Dropdown aus Datenbank initialisieren
      $.when(ADMIN.getIndexPicture()).then(function(data) {
        help = "<div class='col span_2_of_3'><div id='picSelection'><h3>Titelbild auswaehlen</h3><label id='picturesLabel' for='pictures'>Titelbild auswählen:<select id='pictures' name='pictures'>";
        //Object.keys(data).forEach(function  x (picture) {
        data['picData'].forEach(function  x (picture) {
          help += "<option value=" + picture['IndexTitelbildID'] + ">" + picture['Name']+"</option>";
        });
        help += "</select></label></div>";
        help += '<div id="picUpload"><h3>Titelbild hochladen</h3>'+
          '<label for="titlePicName">Titelbildname:</label><input id="titlePicName" name="titlePicUpload" type="text"><br><br>'+
           '<label for="titlePicUpload">Datei auswählen:</label><input id="titlePicUpload" name="titlePicUpload" type="file" accept="image/png, image/jpeg">'+
          '<a class="button" id ="SubmitPictureUpload">Upload</a>'+
          '<a class="button" id ="CancelPictureUpload">Cancel</a></div></div>';
        $("#Content").append(help);
        $("#titlePicName").on("input", function(){
          var regexp = /[^a-zA-Z0-9]/g;
          if($("#titlePicName").val().match(regexp)){
            $("#titlePicName").val( $("#titlePicName").val().replace(regexp,'') );
          }
        });
        $('#pictures').val(data['curID']);
        $('#pictures').change(function(){
          $.when(ADMIN.setTitlePic($('#pictures').val())).then(function(result){
            if(result)
            {
              console.log("Bild geändert");
            }
            else console.log("Fehlgeschlagen");
          });
            //wert in Datenbank schreiben
        });
        $('#SubmitPictureUpload').click(function(event) {
          $.when(ADMIN.uploadTitlePic($('#titlePicName').val(), $("#titlePicUpload").prop('files')[0])).then(function(result)
          {
            if(result == true)
            {
              alert("Upload success!");
            }
            else alert("Upload failed!");
          });
        });
      });
    },
    refreshStandartLanguageContent: function()
    {
      $("#Content").empty();
      var standardLanguage;
      $.when(LANGUAGE.getCurrentLanguage()).then(function(stdLanguage) {
        standardLanguage = stdLanguage;
      });
      var languages;
      $.when(LANGUAGE.getAllLanguages()).then(function(languageArray){
        languageArray.forEach(function (language){
          if(language["Name"] != standardLanguage){
            languages +=  " <option value=" + language["SpracheID"] +">"+ language["Name"] +"</option>";
          }
          else{
            languages +=  " <option selected value=" + language["SpracheID"] +">"+ language["Name"] +"</option>";
          }
        });
      });
      var help ='<div>' +
                  '<h3>Select Default Language</h3>' +
                  '<select id="defaultLanguageSelect">' +
                  languages +
                  '</select>' +
                  '<a class="button" id ="SubmitLanguage">Submit</a>' +
                  '<a class="button" id ="CancelLanguage">Cancel</a>' +
                '</div>';
      $("#Content").append(help);
      $("#SubmitLanguage").click(function(){
        langID = $("#defaultLanguageSelect :selected").val();
        $.when(LANGUAGE.activateLanguage(langID)).then(function(){
            alert("Standardsprache wurde übernommen");
            $("#Content").empty();
        });
      });
      $("#CancelLanguage").click(function(){
        $("#Content").empty();
      });
    },
    refreshAddLanguageContent: function()
    {
      $("#Content").empty();
      var help ='<div>' +
                 '<br>'+
                  '<label id="pictureLabel" for="pictureLabel">Sprachdatei:'+
                    ' <input id="newLanguage" name="picture" type="file" accept="txt">'+
                  '</label>'+
                 '<br>' +
                 '<a class="button" id ="cancelNewLanguage">Cancel</a>' +
                 '<a class="button" id ="submitNewLanguage">Submit</a>' +
                '</div>';
      $("#Content").append(help);
      $("#cancelNewLanguage").click(function (){
        $("#Content").empty();
      });
      $("#submitNewLanguage").click(function (){
        var fileReader = new FileReader();
            fileReader.onload = function () {
              var langData = fileReader.result;

              var languageName = langData.split('\n')[0];   //Name der Sprache [Zeile eins der Datei]
              var standard = 0;                             //Sprache wird auf Standard= false gesetzt [Zeile zwei der Datei]
              //Sprache in Datenbak schreiben
              //@bug: funktioniert nicht; keine Fehlermeldung
              $.when(LANGUAGE.insertLanguage(languageName, standard)).then(function(currentID){
                var allElements = [];
                if(currentID != null)
                {
                  var help = langData.split('\n')[2];
                  var objekte = help.split(',');              // beinhaltet Text für Elemente mit zugehöriger ElementID [Zeile drei der Datei]
                  objekte.forEach(function(objekt){
                    var elementID = objekt.split(':')[0];
                    var text = objekt.split(':')[1];
                    var currentElement = {lanID: currentID, eleID: elementID, eleText: text};
                    allElements.push(currentElement);
                  });
                  $.when(LANGUAGE.insertLanguageElements(allElements)).then(function(result){
                    if(result)
                    {
                      console.log("Sprache hochgeladen");
                    }
                    else console.log("Fehlgeschlagen");
                  });
                }
              });

            };
        fileReader.readAsText($('#newLanguage').prop('files')[0]);
        $("#Content").empty();
      });
    },
    refreshLayoutThemeContent: function()
    {
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
          alert("Theme loaded");
        });
        document.getElementById("previewLayoutTheme").contentDocument.location.reload(true);
      });
      $('#selectLayout').change(function(){
        var layout_ID = $("#selectLayout :selected").val();
        $.when(LAYOUT.activateLayout(layout_ID) ).then(function(){
          alert("Layout loaded");
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
    },
    refreshAddLayoutThemeContent: function()
    {
      $("#Content").empty();
      help = "<h3>Layout oder Theme hinzufügen</h3>"+
            '<label for="themeLayName">Theme- oder Layoutname:</label><input id="themeLayName" name="themeLayName" type="text"><br><br>'+
              '<label id="tLFileLabel" for="themeOrLayoutFile">Theme- oder Layoutdatei:'+
                ' <input id="themeOrLayoutFile" name="themeOrLayoutFile" type="file" accept="text/css">'+
              '</label>'+
              '<select id="themeOrLayout">'+
                '<option value="layout">Layout</option>'+
                '<option value="theme">Theme</option>'+
              '</select>' +
              '<a class="button" id ="SubmitNewThemeLayout">Submit</a>' +
              '<a class="button" id ="CancelNewThemeLayout">Cancel</a>' ;
      $("#Content").append(help);
      $("#themeLayName").on("input", function(){
        var regexp = /[^a-zA-Z0-9]/g;
        if($("#themeLayName").val().match(regexp)){
          $("#themeLayName").val( $("#themeLayName").val().replace(regexp,'') );
        }
      });
      $("#SubmitNewThemeLayout").click(function(){
        var themeOrLayout = $("#themeOrLayout :selected").val();
        if(themeOrLayout == "layout"){
          $.when(LAYOUT.uploadLayout($('#themeLayName').val(), $("#themeOrLayoutFile").prop('files')[0])).then(function(result){
            if(result == true)
            {
              alert("Upload success!");
            }
            else alert("Upload failed!");
          });
        }
        else if(themeOrLayout == "theme"){
          $.when(THEME.uploadTheme($('#themeLayName').val(), $("#themeOrLayoutFile").prop('files')[0])).then(function(result){
            if(result == true)
            {
              alert("Upload success!");
            }
            else alert("Upload failed!");
          });
        }
        else alert ("Es ist ein Fehler aufgetreten");
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
