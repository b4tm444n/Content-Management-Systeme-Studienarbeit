function load_css(url){
	$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', url) );
}

function load_img(url){
	$('header').append('<img src="'+url+'" alt="img">')
}

function load_buttons(){
	$('#topbox').append('<a class="button" id ="LoginButton" href="#popup1">login</a>')
	$('#topbox').append('<a class="button" id ="CreateAccount" href="#popup2">Account erstellen</a>')
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
	$("#" + i).contents().filter(function(){
			return this.nodeType == 3;
		})[0].nodeValue = text[i]; ;
	}
	/*
	* Quellcode aus Quelle zu ende
	*/
}

function add_projekt(title, content, id){
	$('.col.span_2_of_3').append('<div class="projekt-post" id="'+id+'">'+
        '<h1 class="projekt-title">'+title+'</h1>'+
        '<p class="projekt-content">'+content+'</p>'+
        '<a href="#" class="post-link">Read More...</a>'+
        '      </div>');
}


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
	loadLanguage(englisch);

}

function db(){
	//db verbindung
}

$( function categorie(){
		//hinzufügen der Kategorie "Alle"
	var helpString = "<CategoriesEntries>Alle</CategoriesEntries>";
	$( 'Categories' ).append( helpString );

	$( "CategoriesEntries:nth-of-type(1)" ).click(function(event){
		alert('');
		//Projekt liste leeren
		$('.col.span_2_of_3').empty();
		//Projekte hinzufügen
		$.post( "server/projectRouter.php", { route: "allNames" }).done(function( data ) {
			data = JSON.parse(data);
			data.forEach(function x (item) {
					add_projekt(item, content,'1');
				});
		});
	});


		//hinzufügen der Kategorien aus Datenbank
	$.post( "server/DisplayCategories.php").done(function( data ) {
		data = JSON.parse(data);
		var i = 2;	//Varible für n-te Position von <ProjectCategories>
		data.forEach(function x (item) {
				var helpString = "<CategoriesEntries>" + item + "</CategoriesEntries>";
				$( 'Categories' ).append( helpString );
				//click Event
				$( "CategoriesEntries:nth-of-type("+ i +")" ).on("click", function(){
					alert($(this).text());
					//Code  um Projekte neu zu laden
					//...
					$('.col.span_2_of_3').empty();

					//Timout zum besseren Debuggen
					setTimeout(function(){
					//$.post( "server/projectRouter.php", { route: "KategorieNames",categorie: $(this).text() }).done(function( data ) {
					$.post( "server/projectRouter.php", { route: "KategorieNames",categorie: "C Programmierung" }).done(function( data ) {
						alert(data);
						data = JSON.parse(data);
						data.forEach(function x (item) {
								add_projekt(item, content,'1');
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
