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

function add_projekt(title, content, id){
	$('.col.span_2_of_3').append('<div class="projekt-post" id="'+id+'">'+
        '<h1 class="projekt-title">'+title+'</h1>'+
        '<p class="projekt-content">'+content+'</p>'+
        '<a  class="post-link" >Read More...</a>'+
        '      </div>');

	//Weiterleitung auf Projekt Details mit Parameter Projektname
	$('.post-link').click(function(){
					projectname = "eins"; //testwert
					/*hier muss der entsprechende Titel in die variable geschrieben werden

					*/
					help = encodeURI("projektDetails.html?projektname="+ projectname);
					window.open(help,"_self");
	});
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
	load_css('start.css')
	load_img('1400x200&text=img.png')
	load_buttons()

	//algorithmus um für jedes projekt add projet aufzurufen
	$.post( "server/projectRouter.php", { route: "allNames" }).done(function( data ) {
		data = JSON.parse(data);
		data.forEach(function x (item) {
				add_projekt(item, content,'1');
			});
	});

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
					add_projekt(item['name'], item['description'],'1');
				});
		});
	});


		//hinzufügen der Kategorien aus Datenbank
	$.post( "server/DisplayCategories.php").done(function( data ) {
		data = JSON.parse(data);
		console.log('test')
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
								add_projekt(item['Benennung'], item['beschreibung'],'1');
							});
					});
				}, 1000);

				});
				i++;
			});
	});

});





$(document).ready(function(){
	test()





	$( function login() {
    $( "#btnSubmit" ).click( function( event ) {
      event.preventDefault();
        $.post( "server/token.php", { name: $("#username").val(), pw: $("#password").val()}, "json").done(function( data ) {
          data = JSON.parse(data);
          if(data['status'] == true)
          {
            if(data['type'] == "admin")
            {
              CONNECT.redirectPost("Adminsite.html", {});
            }
            if(data['type'] == "user")
            {
              CONNECT.redirectPost("Usersite.html", {});
            }
          }
          else   alert('Falscher Nutzername oder Kennwort');
					//$("#userMessage").text("Falscher Nutzername oder Passwort");
        });
      });
  } );


	$( function createAC(){
		$( "#btnCreateAC" ).click( function( event ) {
			$.post( "server/userRouter.php", { route: 'create' ,Passwort: $("#passwordNew").val(), Vorname: $("#nameNew").val(), Nachname: $("#familynameNew").val(), Username: $("#usernameNew").val()}).done(function(data){
				alert(data);
			});
		});
	});




});
