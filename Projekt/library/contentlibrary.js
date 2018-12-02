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
    createProject: function(picPath, picType, projName, projDescription, projDesLanguage, searchedKnowHow, projState, projRights, projWebLink, projGitLink, projCatIDs, pictureFile)
    {
      var formdata = new FormData();
      formdata.append("route", "create");
      formdata.append("picturePath", "projectImages/");
      formdata.append("pictureType", picType);
      formdata.append("projectName", projName);
      formdata.append("description", projDescription);
      formdata.append("descriptionLanguage", projDesLanguage);
      formdata.append("knowHow", searchedKnowHow);
      formdata.append("state", projState);
      formdata.append("rights", projRights);
      formdata.append("webLink", projWebLink);
      formdata.append("gitLink", projGitLink);
      formdata.append("categoryIDs", projCatIDs);
      formdata.append("picFile", pictureFile);
      console.log(pictureFile);
      return $.ajax({
            method: "POST",
            processData: false,
            contentType: false,
            url: "server/projectRouter.php",
            data: formdata,
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();
      /*return $.ajax({
            method: "POST",
            processData: false,
            contentType: false,
            url: "server/projectRouter.php",
            data: { route: "create", picturePath: "projectImages/", pictureType: picType, projectName: projName,
                    description: projDescription, descriptionLanguage: projDesLanguage, knowHow: searchedKnowHow,
                    state: projState, rights: projRights, webLink: projWebLink,
                    gitLink: projGitLink, categoryIDs: projCatIDs, picFile: pictureFile},
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();*/
    },
    deleteProject: function(projectID)
    {
      return $.ajax({
            method: "POST",
            url: "server/projectRouter.php",
            data: { route: "delete", id: projectID },
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();
    },
    getCategories: function(excludedCategories)
    {
      return $.ajax({
        method: "POST",
        url: "server/projectRouter.php",
        data: { route: "allCategories", exclCats: excludedCategories },
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
USER =
{
  getAllUsers: function()
  {
    return $.ajax({
          method: "POST",
          url: "server/userRouter.php",
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
  deleteUser: function(userID)
  {
    return $.ajax({
          method: "POST",
          url: "server/userRouter.php",
          data: { route: "delete", id: userID },
          dataType: "json",
          success: function (response) {
              return response;
          },
          fail: function (output){
            return null;
          }
      }).promise();
  },
  getUserName: function(userID)
  {
    return $.ajax({
          method: "POST",
          url: "server/userRouter.php",
          data: { route: "name", id: userID },
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
CATEGORIE =
{
  getAllCategories: function()
  {
    return $.ajax({
          method: "POST",
          url: "server/categorieRouter.php",
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
  deleteCategorie: function(categoryID)
  {
    return $.ajax({
          method: "POST",
          url: "server/categorieRouter.php",
          data: { route: "delete", id: categoryID },
          dataType: "json",
          success: function (response) {
              return response;
          },
          fail: function (output){
            return null;
          }
      }).promise();
  },
  createCategorie: function(catName)
  {
    return $.ajax({
          method: "POST",
          url: "server/categorieRouter.php",
          data: { route: "create", categorieName: catName },
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
