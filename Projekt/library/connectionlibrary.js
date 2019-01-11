$(document).ready(function(){
CONNECT = {
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
    toPage: function(location)
    {
      var form = $('<form></form>');
    	form.attr("action", location);
    	var field = $('<input></input>');
    	form.append(field);
    	$(form).appendTo('body').submit();
    }
};
AUTHENTICATION = {
    checkToken: function(authmode, redirectionSite)
    {
      var success = false;
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
    checkTokenWithoutRedirection: function(authmode)
    {
      var success = false;
      $.ajaxSetup({async: false});
      $.post( "server/middleware.php", { mode: authmode}, "json").done(function( data ) {
        data = JSON.parse(data);
        success = data;
      });
      return success;
    }
};
});
