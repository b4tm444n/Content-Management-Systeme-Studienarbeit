$(document).ready(function(){
// Connect Funktionsnamespace beinhaltet Methoden um andere Seiten
// anzusteuern.
CONNECT = {
    // redirectPost: Wird verwendet, um eine andere Seite mit zusätzlichen
    // Parametern anzusteuern.
    redirectPost: function(location, args)
    {
        var form = $('<form></form>');
        form.attr("method", "post");
        form.attr("action", location);

        $.each( args, function( key, value ) {
            var field = $('<input></input>');

            field.attr("type", "hidden");
            field.attr("name", key);
            field.attr("value", value);

            form.append(field);
        });
        $(form).appendTo('body').submit();
    },
    // toPage: Wird verwendet um eine andere Seite anzusteuern.
    toPage: function(location)
    {
      var form = $('<form></form>');
    	form.attr("action", location);
    	var field = $('<input></input>');
    	form.append(field);
    	$(form).appendTo('body').submit();
    }
};
// Authentication Funktionsnamespace beinhaltet Methoden um das Token
// zu überprüfen.
AUTHENTICATION = {
    // checkToken: Überprüft ob ein gültiges Token für den gewünschten
    // Webseitenbereich verfügbar ist und gibt dessen Daten zurück.
    // Wenn dies nicht der Fall ist, wird der Nutzer auf einen anderen
    // Seitenbereich zurückgeleitet.
    checkToken: function(authmode, redirectionSite)
    {
      var success = false;
      // Async ausschalten damit bis zur Rückgabe der Daten gewartet wird.
      $.ajaxSetup({async: false});
      $.post( "server/middleware.php", { mode: authmode}, "json").done(function( data ) {
        data = JSON.parse(data);
        if(!(data['status'] == true))
        {
          CONNECT.redirectPost(redirectionSite, {});
        }
        else success = data;
      }).fail(function() {
        CONNECT.redirectPost(redirectionSite, {});
      });
      return success;
    },
    // checkTokenWithoutRedirection: Prüft ob ein Token gültig ist und gibt dessen Daten
    // zurück.
    checkTokenWithoutRedirection: function(authmode)
    {
      var success = false;
      // Async ausschalten damit bis zur Rückgabe der Daten gewartet wird.
      $.ajaxSetup({async: false});
      $.post( "server/middleware.php", { mode: authmode}, "json").done(function( data ) {
        data = JSON.parse(data);
        success = data;
      });
      return success;
    }
};
});
