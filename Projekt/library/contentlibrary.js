$(document).ready(function(){
PROJECT = {
    searchProjects: function()
    {
      var data;
      $.ajax({
            async: false,
            type: "GET",
            url: "server/projectdata.php",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                data = response;
            }
        });
      return data;
    }
};
});
