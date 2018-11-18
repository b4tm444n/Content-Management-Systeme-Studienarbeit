function load_css(url){
	$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', url) );
}

function load_img(url){
	$('header').append('<img src="'+url+'" alt="img">')
}

function load_buttons(){
	$('#topbox').append('<a class="button" href="#popup1">login</a>')
	$('#topbox').append('<a class="button" href="#popup2">Account erstellen</a>')
}

function load_language(language){
	$.each($('.projekt-title'),function(key,value){
		value.textContent='test'
	});
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

	//add_projekt('Title',content,'1')
	//add_projekt('Title',content,'2')
	//add_projekt('Title',content,'3')


	//algorithmus um für jedes projekt add projet aufzurufen
	$.post( "server/projectRouter.php", { route: "allNames" }).done(function( data ) {
		data = JSON.parse(data);
		data.forEach(function x (item) {
				add_projekt(item, content,'1');
			});
	});
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
		//Code um Projekte neu zu laden
		//...
		//$("#Categories").empty();
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
					$('#Categories').remove();
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
