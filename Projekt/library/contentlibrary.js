$(document).ready(function(){
PROJECT = {
    searchAllProjects: function()
    {
      return $.ajax({
            method: "POST",
            url: "server/projectRouter.php",
            data: { route: "all" },
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();
    },
    searchUserProjects: function()
    {
      return $.ajax({
            method: "POST",
            url: "server/projectRouter.php",
            data: { route: "user" },
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();
    },
    createProject: function(picPath, picType, projName, projDescription, projDesLanguage, searchedKnowHow, projState, projRights, projWebLink, projGitLink, projCatID)
    {
      return $.ajax({
            method: "POST",
            url: "server/projectRouter.php",
            data: { route: "create", picturePath: picPath, pictureType: picType, projectName: projName,
                    description: projDescription, descriptionLanguage: projDesLanguage, knowHow: searchedKnowHow,
                    state: projState, rights: projRights, webLink: projWebLink,
                    gitLink: projGitLink, categoryID: projCatID},
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();
    }
};
});
