var activeLanguageElements;

function load_css(url){
	$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', url) );
}

function load_img(url){
	$('header').append('<img src="'+url+'" alt="img">')
}

function load_buttons(){
	$('#topbox').append('<a class="button" id ="LoginButton" onclick="create_login_popup()">'+activeLanguageElements[3]+'</a>')
	$('#topbox').append('<a class="button" id ="CreateAccount" onclick="create_creation_popup()">'+activeLanguageElements[6]+'</a>')
}

function load_adminButtons(){
	$('#topbox').append('<a class="button" id ="manage" onclick="load_manage()">'+activeLanguageElements[10]+'</a>')
	load_userButtons();
}
function load_manage(){
	CONNECT.toPage("Adminsite.html");
}

function addProject()
{
	//CONNECT.toPage("createProject.html");

	//projekt hinzufügen Maske
	var help = '<div id="popup3" class="overlay">' +
	'<div id="createProject">' +
	          '	<div class="createProject-post popup">' +
		          '	<form enctype="multipart/form-data">' +
						'<label id="categorieLabel" for="categories">Projektkategorien:'+
						 ' <div id="categories" name="categories">' +
						 '  <select id="categorie0">' +
						    ' <option>-</option>' +
						  ' </select>' +
						  ' <button class="ui-button ui-widget ui-corner-all" id="addCategorieBtn">Kategorie hinzufügen</button>'+
						  '</div>' +
						 '</label>'+
						' <br>'+
						' <div class="group" for="name"><input class="createProjectInput" id="name" name="name" type="text" required>'+
						      ' <span class="highlight"></span>'+
	      					'	<span class="bar"></span>'+
	      					'	<label class="createProjectLabel">Name</label>'+
	      					'</div>'+
						' <br>'+
						' <div class="group" id="largeTextField" for="description"><textarea class="createProjectInput" id="description" name="description" type="text" required></textarea>'+
						' <span class="highlight"></span>'+
	      					'	<span class="bar"></span>'+
	      						'<label class="createProjectLabel">Beschreibung</label>'+
	      					'</div>'+
						 '<br>'+
						 ' <div class="group" for="knowHow"><input class="createProjectInput" id="knowHow" name="knowHow" required>'+
						 ' <span class="highlight"></span>'+
	      					'	<span class="bar"></span>'+
	      						'<label class="createProjectLabel">Gesuchtes KnowHow</label>'+
	      					'</div>'+
						 '<br>'+
						' <div class="group" for="git"><input class="createProjectInput" id="git" name="git" required>'+
						' <span class="highlight"></span>'+
	      					'	<span class="bar"></span>'+
	      						'<label class="createProjectLabel">Github Link</label>'+
	      					'</div>'+
						'<br>'+
						' <div class="group" for="web"><input class="createProjectInput" id="web" name="web" required>'+
						' <span class="highlight"></span>'+
	      					'	<span class="bar"></span>'+
	      						'<label class="createProjectLabel">Web Link</label>'+
	      					'</div>'+
						'<br>'+
						'<label id="languageLabel" for="language">Sprache:'+
						   '<select name="language" id="language">'+
						    ' <option value="de">Deutsch</option>'+
						    ' <option value="en">English</option>'+
						    ' <option value="lt">Latin</option>'+
						   '</select>'+
						'</label>'+
						'<br>'+
						'<label id="pictureLabel" for="pictureLabel">Projektbild:'+
						   ' <input id="picture" name="picture" type="file" accept="image/png, image/jpeg">'+
						  '</label>'+
						'<br>'+
						'<input class="ui-button ui-widget ui-corner-all" id="SubmitBtn" type="submit" value="Projekt erstellen">'+
						'<input class="ui-button ui-widget ui-corner-all" id="CancelBtn" type="cancel" value="Cancel">'+

					'	</form>'+
					'</div>'+
	          '</div>'+
	  '</div>';
	//$('body').append('<a class="button" id ="loadProject" onclick="loadProjects()">Projekte laden</a>');
	$('body').append(help);
	$('#popup3').css('visibility','visible')
	$('#popup3').css('opacity',1)
	//$('createProject').css("position", "fixed");
	//$('createProject').css("top","0");

	var categoryNumber = 1;
	var categoryArr = [0];
	var lastSelectValue;
	var lastSelectText;

	//Formular Projekterstellen initialisieren
	$.when(PROJECT.getCategories()).then(function(result)
	{
		if(result.length != 0)
		{
			for(i = 0; i<result.length; i++)
			{
				$("#categorie0").append('<option value="'+result[i]['CatID']+'" id="0'+result[i]['CatID']+'">'+result[i]['CatName']+'</option>');
			}
			$("#categorie0").data('lastSelectVal', $("#categorie0").val());
			$("#categorie0").data('lastText', $("#categorie0").find('option:selected').text());
			$("#categorie0").on('change', function() {
				var curSelectValue = $("#categorie0").val();
				$.each( categoryArr, function( key, value ) {
					if(value != 0)
					{
						if(curSelectValue != "nothing" && curSelectValue != "remove") $("#"+value+curSelectValue).remove();
						if($("#categorie0").data('lastSelectVal') != "nothing")
						{
							$('#categorie'+value).append('<option value="'+$('#categorie0').data('lastSelectVal')+'" id="'+value+$('#categorie0').data('lastSelectVal')+'">'+$('#categorie0').data('lastText')+'</option>');
						}
					}
				});
				$("#categorie0").data('lastSelectVal', $("#categorie0").val());
				$("#categorie0").data('lastText', $("#categorie0").find('option:selected').text());
			});
		}
		else alert("Keine Projektkategorien verfügbar.");
	});
	$( "#SubmitBtn" ).click( function( event )
	{
			event.preventDefault();
			var catValuesArr = [];
			$.each( categoryArr, function( key, value ) {
				if($("#categorie"+value).val() != "nothing")
				{
					catValuesArr.push($("#categorie"+value).val());

				}
			});
			$.when(PROJECT.createProject("testpic/path", "undefined", $("#name").val(), $("#description").val(),
				$("#language").val(), $("#knowHow").val(), "Warte auf Teilnehmer", "0",
				$("#web").val(), $("#git").val(), catValuesArr, $("#picture").prop('files')[0])).then(function(result)
				{
					if(result == true) CONNECT.redirectPost("index.html", {});
					else alert("Projekt erstellen fehlgeschlagen");
				});
			remove_create_project_popup()
	});
	$( "#CancelBtn" ).click( function( event ){
		$("#popup3").remove();
	});
	$( "#addCategorieBtn" ).click( function( event )
	{
			event.preventDefault();
			var allValued = true;
			var selectedCatArr = [];
			$.each( categoryArr, function( key, value ) {
				if($("#categorie"+value).val() == "nothing")
				{
					allValued = false;
				}
				else selectedCatArr.push($("#categorie"+value).val());
			});
			if(allValued)
			{
				var buttonObject;
				buttonObject = $(this).detach();
				$.when(PROJECT.getCategories(selectedCatArr)).then(function(result)
				{
					if(result.length != 0)
					{
						categoryArr.push(categoryNumber);
						$("#categories").append('<select id="categorie'+categoryNumber+'"></select>');
						$("#categorie"+categoryNumber).append('<option value="remove" id="remove'+categoryNumber+'">Entfernen</option>');
						$("#categorie"+categoryNumber).append('<option value="nothing" selected="selected">-</option>');
						for(i = 0; i<result.length; i++)
						{
							$("#categorie"+categoryNumber).append('<option value="'+result[i]['CatID']+'" id="'+categoryNumber+result[i]['CatID']+'">'+result[i]['CatName']+'</option>');
						}
						var currentNumber = categoryNumber;
						$('#categorie'+categoryNumber).data('lastSelectVal', $('#categorie'+categoryNumber).val());
						$('#categorie'+categoryNumber).data('lastText', $('#categorie'+categoryNumber).find('option:selected').text());
						$('#categorie'+categoryNumber).on('change', function() {
							var curSelectValue = $('#categorie'+currentNumber).val();
							$.each( categoryArr, function( key, value ) {
								if(value != currentNumber)
								{
									if(curSelectValue != "nothing" && curSelectValue != "remove") $("#"+value+curSelectValue).remove();
									if($('#categorie'+currentNumber).data('lastSelectVal') != "nothing")
									{
										$('#categorie'+value).append('<option value="'+$('#categorie'+currentNumber).data('lastSelectVal')+'" id="'+value+$('#categorie'+currentNumber).data('lastSelectVal')+'">'+$('#categorie'+currentNumber).data('lastText')+'</option>');
									}
								}
							});
							$('#categorie'+currentNumber).data('lastSelectVal', $('#categorie'+currentNumber).val());
							$('#categorie'+currentNumber).data('lastText', $('#categorie'+currentNumber).find('option:selected').text());
							if(this.value == "remove")
							{
								$(this).remove();
								categoryArr = $.grep(categoryArr, function(value) {
									return value != currentNumber;
								});
							}
						});
						categoryNumber++;
					}
					else alert("Keine anderen Projektkategorien verfügbar.");
					buttonObject.appendTo("#categories");
				});
			}
			else alert("Bitte zuerst alle Projektkategorien ausfüllen.");
	});


}

function remove_create_project_popup(){
	$('#popup3').remove()
}

function loadProjects() {
	$.when(PROJECT.searchMemberProjects() ).then(function(projects){
		$('.col.span_2_of_3').empty();
		projects.forEach(function x (project) {
			add_projekt(project['Benennung'], project['beschreibung'], project['state'], project['id']);
		});
	});
}

function myProjects() {
	$.when(PROJECT.searchUserProjects() ).then(function(projects){
		$('.col.span_2_of_3').empty();
		projects.forEach(function x (project) {
			add_projekt(project['Benennung'], project['beschreibung'], project['state'], project['id']);
		});
	});
}

function load_userButtons(){
	$('#topbox').append('<a class="button" id ="loadProject" onclick="loadProjects()">'+activeLanguageElements[11]+'</a>')
	$('#topbox').append('<a class="button" id ="myProjects" onclick="myProjects()">'+activeLanguageElements[12]+'</a>')
	$('#topbox').append('<a class="button" id ="addProject" onclick="addProject()">'+activeLanguageElements[13]+'</a>')
	$('#topbox').append('<a class="button" id ="logout" onclick="logout()">Logout</a>')
}
function logout(){
	$('#topbox').empty();
	$.post( "server/logout.php", {}, "json").done(function( data ) {location.reload();});
	load_buttons();
}
function manage_Categories(){
	$('.col.span_2_of_3').empty();
	ADMINPAGE.refreshCategorieContent();


}

function create_login_popup(){
	$('body').append('<div id="popup1" class="overlay">'
  +'<div class="popup">'
  +  '<h2 id="loginWindow">'+activeLanguageElements[3]+'</h2>'
  +  '<a class="close" onclick="remove_login_popup()">&times;</a>'
  +  '<div class="content">'
  +		'<form name="loginBox" method="post">'
  +  '  <p><label id="LoginUsername" for="username">'+activeLanguageElements[4]+': <input id="username" name="username"> </label></p>'
  +  '  <p><label id="LoginPassword" for="password">'+activeLanguageElements[5]+': <input type="password" id="password" name="password"> </label></p>'
  +  '  <p>  <input id = "btnSubmit" type="submit" value="Login"/> </p>'
  +  '</form>'
  +  '</div>'
  +'</div>'
+'</div>')

	$('#popup1').css('visibility','visible')
	$('#popup1').css('opacity',1)
	$('#LoginUsername').focus()

	$('body').append('<script src="library/connectionlibrary.js"></script>')
    $( "#btnSubmit" ).click( function( event ) {
      event.preventDefault();
			var password;
			nacl_factory.instantiate(function (nacl) {
						//hash passwort
					password = nacl.to_hex(nacl.crypto_hash_string($("#password").val()));
						//überprüfen ob Nutzer vorhanden + Behandlung
        $.post( "server/token.php", { name: $("#username").val(), pw: password}, "json").done(function( data ) {
          data = JSON.parse(data);
          if(data['status'] == true)
          {
            if(data['type'] == "admin")
            {
							//Div leeren + Buttons für User hinzufügen + Fenster Schließen
							$('#topbox').empty();
							location.reload();
							remove_login_popup();
            }
            else if(data['type'] == "user")
            {
  						//Div leeren + Buttons für User hinzufügen + Fenster Schließen
							$('#topbox').empty();
							location.reload();
							remove_login_popup();
            }
						else if(data['type'] == "admin2"){
							CONNECT.redirectPost("Adminsite.html", {});
						}
          }
          else   alert('Falscher Nutzername oder Kennwort');
        });
				});
      });
}

function remove_login_popup(){
	$('#popup1').remove()
}

function create_creation_popup(){
	$('body').append('<div id="popup2" class="overlay">'
  +'<div class="popup">'
  +'  <h2 id="CreateAcWindow">'+activeLanguageElements[6]+'</h2>'
  +'  <a class="close" onclick="remove_creation_popup()">&times;</a>'
  +'  <div class="content">'
  +'    <p><label id="CreateAcFamilyname" for="familyname">'+activeLanguageElements[7]+': <input id="familynameNew" name="familyname"> </label></p>'
  +'    <p><label id="CreateAcName" for="name">'+activeLanguageElements[8]+': <input id="nameNew" name="name"> </label></p>'
  +'    <p><label id="CreateAcUsername" for="username">'+activeLanguageElements[4]+': <input id="usernameNew" name="username"> </label></p>'
  +'    <p><label id="CreateAcPassword" for="password">'+activeLanguageElements[5]+': <input type="password" id="passwordNew" name="password"> </label></p>'
  +'    <p>  <input id = "btnCreateAC" type="submit" value="'+activeLanguageElements[6]+'"/> </p>'
  +'  </div>'
  +'</div>'
+'</div>')

	$( "#btnCreateAC" ).click( function( event ) {
		var password;
			//hash password and create account
		nacl_factory.instantiate(function (nacl) {
				password = nacl.to_hex(nacl.crypto_hash_string($("#passwordNew").val()));

		//alert (password +"; "+ $("#nameNew").val() +"; "+ $("#familynameNew").val() +"; "+ $("#usernameNew").val());
		$.post( "server/userRouter.php", { route: 'create' ,Passwort: password, Vorname: $("#nameNew").val(), Nachname: $("#familynameNew").val(), Username: $("#usernameNew").val()}).done(function(data){
			alert(data);
		});
			});
	});
	$('#popup2').css('visibility','visible')
	$('#popup2').css('opacity',1)
	$('#CreateAcFamilyname').focus()


}

function remove_creation_popup(){
	$('#popup2').remove()
}

//fügt einen Button pro Sprache aus Datenbank hinzu
function loadLanguageButtons(){
	$("#language").append('<h3 class="side-content">'+activeLanguageElements[28]+'</h3>');
	$.when(LANGUAGE.getAllLanguages()).then(function(languages){
		languages.forEach(function(language){
			var lanID = language["SpracheID"];
			languageButton = '<a id="button'+lanID+'" class="button">'+language["Name"]+'</a>';
			$("#language").append(languageButton);
			$("#button"+lanID).attr('lanID', lanID).click(function(event) {
				$.when(LANGUAGE.setSessionLanguage($(this).attr('lanID'))).then(function(result) {
					if(result) {location.reload();}
					else alert("Error");
				});
			});
		});
	});
}

function add_projekt(title, content, state, id){
	$('.col.span_2_of_3').append('<div class="projekt-post" id="'+id+'">'+
        '<h1 class="projekt-title">'+title+'</h1>'+
        '<p class="projekt-content">'+content+'</p>'+
				'<p class="projekt-state">'+activeLanguageElements[15]+": " +state+'</p>' +
        '<a class="post-link" id="post-link'+id+'" >'+activeLanguageElements[9]+'</a>'+
        '      </div>');



	//Projektdetails anzeigen
	$('#post-link'+id).click(function(){
					projectname = id;
					$('.col.span_2_of_3').empty();
					$.when(PROJECT.getProjectDetails(id) ).then(function(project){
						add_projektDetails(project['projectName'], project['projectDescription'], project['state'], project['projectLeader'], project['projectMembers'], project['picturePath'] ,project['projectID']);
					});
	});
}

//add_project für Projektdetails
function add_projektDetails(title, content, state, leader, members, image, id){
	var newElements = '<div class="projekt-post" id="'+id+'">'+
				'<h1 class="projekt-title">'+title+'</h1>'+
				'<p class="projekt-content">'+content+'</p>';
	var joinButtonCreated = false;
	var leaveButtonCreated = false;
	var stateInputCreated = false;
	var projectLeader = false;
	$.when(PROJECT.checkProjectLeadership(id)).then(function(result){
		projectLeader = result;
		if(result)
		{
			newElements += "<input class='projekt-state' type='text' id='projStateInput' value='"+state+"'><label for='projStateInput'>Status:</label>";
			newElements += "<button class='ui-button ui-widget ui-corner-all' id='projStateSetBtn' style='float: right;'><span class='ui-icon ui-icon-check'></span></button>";
			stateInputCreated = true;
		}
		else
		{
			newElements += '<p class="projekt-state">'+activeLanguageElements[15]+": " +state+'</p>';
		}
		newElements += '<p class="projekt-leader">'+activeLanguageElements[16]+": "+leader+'</p>'+
									 '<p class="projekt-members">'+activeLanguageElements[17]+": "+members+'</p>'+
									 '<img src='+ image +' alt='+ image +'>';
	}).always(function(){
		$.when(PROJECT.checkProjectMembership(id) ).then(function(result){
			if(result == false)
			{
				newElements += '<a class="button" id="joinProjectBtn"">'+activeLanguageElements[18]+'</a>';
				joinButtonCreated = true;
			}
			else if(result == true && projectLeader == false)
			{
				newElements += '<a class="button" id="leaveProjectBtn"">'+activeLanguageElements[19]+'</a>';
				leaveButtonCreated = true;
			}
		}).always(function(){
			newElements += '</div>';
			$('.col.span_2_of_3').append(newElements);
			if(joinButtonCreated)
			{
				$( "#joinProjectBtn" ).click( function(event)
				{
					$('.col.span_2_of_3').empty();
					$.when(PROJECT.joinProject(id)).then(function(result){
						$.when(PROJECT.getProjectDetails(id) ).then(function(project){
							add_projektDetails(project['projectName'], project['projectDescription'], project['state'], project['projectLeader'], project['projectMembers'], project['picturePath'] ,project['projectID']);
						});
					});
				});
			}
			if(leaveButtonCreated)
			{
				$('#leaveProjectBtn').click(function(event){
					//ProjektDetails nach verlassen wieder anzeigen
					$.when(PROJECT.leaveProject(id)).then(function(result){
						$('.col.span_2_of_3').empty();
						$.when(PROJECT.getProjectDetails(id) ).then(function(project){
							add_projektDetails(project['projectName'], project['projectDescription'], project['state'], project['projectLeader'], project['projectMembers'], project['picturePath'] ,project['projectID']);
						});
					});
				});
			}
			if(stateInputCreated)
			{
				$("#projStateSetBtn").click(function(event)
				{
					$.when(PROJECT.setProjectState(id, $("#projStateInput").val())).then(function(result){
						$('.col.span_2_of_3').empty();
						$.when(PROJECT.getProjectDetails(id) ).then(function(project){
							add_projektDetails(project['projectName'], project['projectDescription'], project['state'], project['projectLeader'], project['projectMembers'], project['picturePath'] ,project['projectID']);
						});
					});
				});
			}
		});
	});
}

function initiateSite(){
	//$.post( "server/Theme.php", { route: "allNamesDes" }).done(function( data ) {
	$.when(LAYOUT.getCurrentLayoutPath()).then(function(layout){
		load_css(layout);

		$.when(THEME.getCurrentThemePath()).then(function(theme){
			load_css(theme);
		});

	});
	$.when(ADMIN.getCurrentIndexPicture()).then(function(path){
		load_img(path);
	});
	//algorithmus um für jedes projekt add projet aufzurufen
	if(AUTHENTICATION.checkTokenWithoutRedirection("admin2")['status'] || AUTHENTICATION.checkTokenWithoutRedirection("admin")['status'])
	{
		load_adminButtons();
	}
	else if(AUTHENTICATION.checkTokenWithoutRedirection("user")['status'])
	{
		load_userButtons();
	}
	else
	{
		load_buttons();
	}
	$("body").show();
	$.when(PROJECT.searchAllProjects() ).then(function(projects){
		projects.forEach(function x (project) {
			add_projekt(project['Benennung'], project['text'], project['Zustand'], project['ProjektID']);
		});
  });

	//Sprache Buttons hinzufügen
	loadLanguageButtons();
}

function db(){
	//db verbindung
}

function categorie(){
		//hinzufügen der Kategorie "Alle"
	var helpString = '<a onclick="" class="button category-button">'+activeLanguageElements[2]+'</a>';
	$( '.menu' ).append( helpString );

	$( ".category-button:nth-of-type(1)" ).click(function(event){
		//Projekt liste leeren
		$('.col.span_2_of_3').empty();
		//Projekte hinzufügen
		$.post( "server/projectRouter.php", { route: "allNamesDes" }).done(function( data ) {
			data = JSON.parse(data);
			data.forEach(function x (item) {
					add_projekt(item['name'], item['description'], item['state'], item['id']);
				});
		});
	});


		//hinzufügen der Kategorien aus Datenbank
	$.post( "server/DisplayCategories.php").done(function( data ) {
		data = JSON.parse(data);
		var i = 2;	//Varible für n-te Position von <ProjectCategories>
		data.forEach(function x (item) {
				var helpString = '<a onclick="" class="button category-button">' + item + '</a>';
				$( '.menu' ).append( helpString );
				//click Event
				$( ".category-button:nth-of-type("+ i +")" ).on("click", function(){
					//Code  um Projekte neu zu laden
					//...
					$('.col.span_2_of_3').empty();
					var categorieName = $(this).text();
					$.post( "server/projectRouter.php", { route: "KategorieNames",categorie: categorieName }).done(function( data ) {
						data = JSON.parse(data);
						data.forEach(function x (item) {
								add_projekt(item['Benennung'], item['beschreibung'], item['state'], item['id']);
							});
					});
				});
				i++;
			});
	});

};



$(document).ready(function(){
	$("body").hide();
  var tokenInfo;
  tokenInfo= AUTHENTICATION.checkToken("notAdmin2", "Adminsite.html");

	//$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'your stylesheet url') );

	$.when(LANGUAGE.getSessionLanguage()).then(function(langID){
		$.when(LANGUAGE.getLanguageItems(langID)).then(function(data) {
			if(data != null)
			{
				activeLanguageElements = data;
			}
		}).always(function(res) {
			categorie();
			initiateSite();
		});
	});
	//if(tokenInfo['status']) $("body").show();
});
