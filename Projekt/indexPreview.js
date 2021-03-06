function load_css(url){
	$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', url) );
}

function load_img(url){
	$('header').append('<img src="'+url+'" alt="img">')
}

function load_buttons(){
	$('#topbox').append('<a class="button" id ="LoginButton" onclick="create_login_popup()">login</a>')
	$('#topbox').append('<a class="button" id ="CreateAccount" onclick="create_creation_popup()">Account erstellen</a>')
}

function load_adminButtons(){
	$('#topbox').append('<a class="button" id ="manage" onclick="load_manage()">Verwaltung</a>')
	load_userButtons();
	/*
	$('#topbox').append('<a class="button" id ="ManageCategories" onclick="manage_Categories()">Kategorien verwalten</a>')
	$('#topbox').append('<a class="button" id ="ChangePicture" onclick="myProjects()">Titelbild ändern</a>')
	$('#topbox').append('<a class="button" id ="ManageUsers" onclick="addProject()">User verwalten</a>')
	$('#topbox').append('<a class="button" id ="ManageProjects" onclick="loadProjects()">Projekte verwalten</a>')
	$('#topbox').append('<a class="button" id ="StandardLanguage" onclick="myProjects()">Standard Sprache</a>')
	$('#topbox').append('<a class="button" id ="ManageLayoutTheme" onclick="addProject()">Layout und Theme verwalten</a>')
	$('#topbox').append('<a class="button" id ="logout" onclick="logout()">Logout</a>')
	*/
}
function load_manage(){
	//CONNECT.toPage("Adminsite.html");
}

function addProject()
{
	//CONNECT.toPage("createProject.html");
}

function load_userButtons(){
	$('#topbox').append('<a class="button" id ="loadProject" onclick="loadProjects()">Projekte laden</a>')
	$('#topbox').append('<a class="button" id ="myProjects" onclick="myProjects()">Meine Projekte</a>')
	$('#topbox').append('<a class="button" id ="addProject" onclick="addProject()">Projekt hinzufügen</a>')
	$('#topbox').append('<a class="button" id ="logout" onclick="logout()">Logout</a>')
}
function logout(){
	$('#topbox').empty();
	$.post( "server/logout.php", {}, "json").done(function( data ) {location.reload();});
	load_buttons();
}


function manage_Categories(){
	//$('.col.span_2_of_3').empty();
	//ADMINPAGE.refreshCategorieContent();


}

function create_login_popup(){
	$('body').append('<div id="popup1" class="overlay">'
  +'<div class="popup">'
  +  '<h2 id="loginWindow">Login</h2>'
  +  '<a class="close" onclick="remove_login_popup()">&times;</a>'
  +  '<div class="content">'
  +		'<form name="loginBox" method="post">'
  +  '  <p><label id="LoginUsername" for="username">Benutzername: <input id="username" name="username"> </label></p>'
  +  '  <p><label id="LoginPassword" for="password">Passwort: <input type="password" id="password" name="password"> </label></p>'
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
              //CONNECT.redirectPost("Adminsite.html", {});
							//Div leeren + Buttons für User hinzufügen + Fenster Schließen
							$('#topbox').empty();
							$('#topbox').append("<h1>Redakteur</h1>");
							location.reload();
							remove_login_popup();

            }
            else if(data['type'] == "user")
            {
              //CONNECT.redirectPost("Usersite.html", {});

							//Div leeren + Buttons für User hinzufügen + Fenster Schließen
							$('#topbox').empty();
							$('#topbox').append("<h1>Nutzer</h1>");
							location.reload();
							remove_login_popup();
            }
						else if(data['type'] == "admin2"){
							//CONNECT.redirectPost("Adminsite.html", {});
						}
          }
          else   alert('Falscher Nutzername oder Kennwort');
					//$("#userMessage").text("Falscher Nutzername oder Passwort");
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
  +'  <h2 id="CreateAcWindow">Account erstellen</h2>'
  +'  <a class="close" onclick="remove_creation_popup()">&times;</a>'
  +'  <div class="content">'
  +'    <p><label id="CreateAcFamilyname" for="familyname">Nachname: <input id="familynameNew" name="familyname"> </label></p>'
  +'    <p><label id="CreateAcName" for="name">Vorname: <input id="nameNew" name="name"> </label></p>'
  +'    <p><label id="CreateAcUsername" for="username">Benutzername: <input id="usernameNew" name="username"> </label></p>'
  +'    <p><label id="CreateAcPassword" for="password">Passwort: <input type="password" id="passwordNew" name="password"> </label></p>'
  +'    <p>  <input id = "btnCreateAC" type="submit" value="Create Account"/> </p>'
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

function load_language(language){
	$.each($('.projekt-title'),function(key,value){
		value.textContent='test'
	});

}

function loadLanguage(language = deutsch){
	var text = JSON.parse(language);
	for(var i in text){
	/*Text ersetzen ohne subelemente zu löschen (Quellcode von Ursprung angepasst)
	*Quelle: https://stackoverflow.com/questions/4106809/how-can-i-change-an-elements-text-without-changing-its-child-elements
	*abgerufen am 19.11.2018
	*/
	if (i== "btnSubmit" || i=="btnCreateAC"){$("#" + i).val(text[i])}

	else{
	$("#" + i).contents().filter(function(){
			return this.nodeType == 3;
		})[0].nodeValue = text[i]; ;
	}
	/*
	* Quellcode aus Quelle zu ende
	*/
	}
}

function add_projekt(title, content, state, id){
	$('.col.span_2_of_3').append('<div class="projekt-post" id="'+id+'">'+
        '<h1 class="projekt-title">'+title+'</h1>'+
        '<p class="projekt-content">'+content+'</p>'+
				'<p class="projekt-state">'+"Status: " +state+'</p>' +
        '<a class="post-link" id="post-link'+id+'" >Read More...</a>'+
        '      </div>');



	//Projektdetails anzeigen
	$('#post-link'+id).click(function(){
					projectname = id;
					alert("Id der Auswahl: " + id);

					/*
					help = encodeURI("projektDetails.html?projektname="+ projectname);
					alert(help);
					window.open(help,"_self");
					*/
					$('.col.span_2_of_3').empty();
					$.when(PROJECT.getProjectDetails(id) ).then(function(project){
						add_projektDetails(project['projectName'], project['projectDescription'], project['state'], project['projectLeader'], project['projectMembers'], project['picturePath'] ,project['projectID']);
					});
	});
}

//add_project für Projektdetails
function add_projektDetails(title, content, state, leader, members, image, id){
	$('.col.span_2_of_3').append('<div class="projekt-post" id="'+id+'">'+
        '<h1 class="projekt-title">'+title+'</h1>'+
        '<p class="projekt-content">'+content+'</p>'+
        '<p class="projekt-state">'+"Status: " +state+'</p>'+
        '<p class="projekt-leader">'+"Projektleiter: "+leader+'</p>'+
        '<p class="projekt-members">'+"Teilnehmer: "+members+'</p>'+
        '<img src='+ image +' alt='+ image +'>' +
        '      </div>');
}

//test

/*function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
	});
	return vars;
}*/
//testende

function test(){
	var content= 'Ut noster tractavissent, summis hic eiusmod te quem. Doctrina velit litteris eu eu fore ingeniis philosophari ne quid o ingeniis ne anim, illum ea iudicem. Pariatur duis dolor hic dolor ad vidisse amet elit ita summis, quo duis te  malis, velit nostrud ingeniis. Appellat elit tamen iudicem multos, mentitum quae sed appellat illustriora. Velit commodo cernantur se si anim do labore, probant ab aliqua aut non laborum fidelissimae. Ex quae se fugiat, et malis officia in et enim cillum ita incididunt, a irure amet an ingeniis.'
	//$.post( "server/Theme.php", { route: "allNamesDes" }).done(function( data ) {
	$.when(LAYOUT.getCurrentLayoutPath()).then(function(layout){
		load_css(layout);

		$.when(THEME.getCurrentThemePath()).then(function(theme){
			load_css(theme);
		});

	});

	load_img('1400x200&text=img.png')
	//algorithmus um für jedes projekt add projet aufzurufen
	/*if(AUTHENTICATION.checkTokenWithoutRedirection("admin2")['status'] || AUTHENTICATION.checkTokenWithoutRedirection("admin")['status'])
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
	}*/
	$("body").show();
	$.when(PROJECT.searchAllProjects() ).then(function(projects){
		//data = JSON.parse(projects);
		//data.forEach(function x (project) {
		projects.forEach(function x (project) {
				console.log(project);
    	//add_projekt(project['Benennung'], "bla", project['ProjektID']); //@zuBearbeiten  Austauschen von bla gegen Projektbeschreibung
			//add_projekt(project['projectName'], project['projectDescription'], project['state'], project['projectID']);
			add_projekt(project['Benennung'], project['text'], project['Zustand'], project['ProjektID']);
		});
  });

/*
	$.post( "server/projectRouter.php", { route: "allNames" }).done(function( data ) {
		data = JSON.parse(data);
		data.forEach(function x (item) {
				alert(data['projectID']);

				add_projekt(item, content,'1'); //@zuBearbeiten 1 muss auf ProjectId geändert werden
			});
	});
	*/

	//Default Sprache initialisieren
	loadLanguage();
}

function db(){
	//db verbindung
}

$( function categorie(){
		//hinzufügen der Kategorie "Alle"
	var helpString = '<a onclick="" class="button category-button">Alle</a>';
	$( '.menu' ).append( helpString );

	$( ".category-button:nth-of-type(1)" ).click(function(event){
		alert('');
		//Projekt liste leeren
		$('.col.span_2_of_3').empty();
		//Projekte hinzufügen
		$.post( "server/projectRouter.php", { route: "allNamesDes" }).done(function( data ) {
			data = JSON.parse(data);
			data.forEach(function x (item) {
					add_projekt(item['name'], item['description'], item['id']);
				});
		});
	});


		//hinzufügen der Kategorien aus Datenbank
	$.post( "server/DisplayCategories.php").done(function( data ) {
		data = JSON.parse(data);
		//console.log('test')
		var i = 2;	//Varible für n-te Position von <ProjectCategories>
		data.forEach(function x (item) {
				var helpString = '<a onclick="" class="button category-button">' + item + '</a>';
				$( '.menu' ).append( helpString );
				//click Event
				$( ".category-button:nth-of-type("+ i +")" ).on("click", function(){
					alert($(this).text());
					//Code  um Projekte neu zu laden
					//...
					$('.col.span_2_of_3').empty();
					var categorieName = $(this).text();
					//Timout zum besseren Debuggen
					setTimeout(function(){
					//$.post( "server/projectRouter.php", { route: "KategorieNames",categorie: $(this).text() }).done(function( data ) {
					$.post( "server/projectRouter.php", { route: "KategorieNames",categorie: categorieName }).done(function( data ) {
						alert(data);
						data = JSON.parse(data);
						data.forEach(function x (item) {
								add_projekt(item['Benennung'], item['beschreibung'], item['id']);
							});
					});
				}, 1000);

				});
				i++;
			});
	});

});



$(document).ready(function(){
	$("body").hide();
  var tokenInfo;
  //tokenInfo= AUTHENTICATION.checkToken("notAdmin2", "Adminsite.html");

	//$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'your stylesheet url') );


	test();
	//if(tokenInfo['status']) $("body").show();
});
