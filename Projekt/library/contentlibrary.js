$(document).ready(function(){
THEME =
{
  getCurrentThemePath: function()
  {
    return $.ajax({
          method: "POST",
          url: "server/themeLayoutRouter.php",
          data: { route: "currentThemePath" },
          dataType: "json",
          success: function (response) {
              return response;
          },
          fail: function (output){
            return null;
          }
      }).promise();
  },
  getCurrentThemeID: function()
    {
      return $.ajax({
            method: "POST",
            url: "server/themeLayoutRouter.php",
            data: { route: "currentThemeID" },
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();
    },
  getAllThemeNamesIDs: function()
  {
    return $.ajax({
          method: "POST",
          url: "server/themeLayoutRouter.php",
          data: { route: "allThemeNamesIDs" },
          dataType: "json",
          success: function (response) {
              return response;
          },
          fail: function (output){
            return null;
          }
      }).promise();
  },
  getThemePathByID: function(themID)
  {
    return $.ajax({
          method: "POST",
          url: "server/themeLayoutRouter.php",
          data: { route: "themePath", themeID: themID },
          dataType: "json",
          success: function (response) {
              return response;
          },
          fail: function (output){
            return null;
          }
      }).promise();
  },
  activateTheme: function(themID)
  {
    return $.ajax({
          method: "POST",
          url: "server/themeLayoutRouter.php",
          data: { route: "activateTheme", themeID: themID },
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

LAYOUT =
{
  getCurrentLayoutPath: function()
  {
    return $.ajax({
          method: "POST",
          url: "server/themeLayoutRouter.php",
          data: { route: "currentLayoutPath" },
          dataType: "json",
          success: function (response) {
              return response;
          },
          fail: function (output){
            return null;
          }
      }).promise();
  },
  getCurrentLayoutID: function()
  {
    return $.ajax({
          method: "POST",
          url: "server/themeLayoutRouter.php",
          data: { route: "currentLayoutID" },
          dataType: "json",
          success: function (response) {
              return response;
          },
          fail: function (output){
            return null;
          }
      }).promise();
  },
  getAllLayoutNamesIDs: function()
  {
    return $.ajax({
          method: "POST",
          url: "server/themeLayoutRouter.php",
          data: { route: "allLayoutNamesIDs" },
          dataType: "json",
          success: function (response) {
              return response;
          },
          fail: function (output){
            return null;
          }
      }).promise();
  },
  getLayoutPathByID: function(layout_ID)
  {
    return $.ajax({
          method: "POST",
          url: "server/themeLayoutRouter.php",
          data: { route: "LayoutPath", layoutID: layout_ID },
          dataType: "json",
          success: function (response) {
              return response;
          },
          fail: function (output){
            return null;
          }
      }).promise();
  },
  activateLayout: function(layout_ID)
  {
    return $.ajax({
          method: "POST",
          url: "server/themeLayoutRouter.php",
          data: { route: "activateLayout", layoutID: layout_ID },
          dataType: "json",
          success: function (response) {
              return response;
          },
          fail: function (output){
            return null;
          }
      }).promise();
  },
  addLayout: function(layoutname, layoutfile)
  {
    return $.ajax({
          method: "POST",
          url: "server/themeLayoutRouter.php",
          data: { route: "createLayout", layoutName: layoutname, layoutFile: layoutfile },
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
    searchMemberProjects: function()
    {
      return $.ajax({
            method: "POST",
            url: "server/projectRouter.php",
            data: { route: "member"},
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
    getProjectDetails: function(projID)
    {
      return $.ajax({
            method: "POST",
            url: "server/projectRouter.php",
            data: { route: "details", projectID: projID },
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();
    },
    setProjectState: function(projID, projState)
    {
      return $.ajax({
            method: "POST",
            url: "server/projectRouter.php",
            data: { route: "setState", projectID: projID, state: projState },
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();
    },
    checkProjectMembership: function(projID)
    {
      return $.ajax({
            method: "POST",
            url: "server/projectRouter.php",
            data: { route: "checkMembership", projectID: projID },
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();
    },
    checkProjectLeadership: function(projID)
    {
      return $.ajax({
            method: "POST",
            url: "server/projectRouter.php",
            data: { route: "checkLeadership", projectID: projID },
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();
    },
    joinProject: function(projID)
    {
      return $.ajax({
            method: "POST",
            url: "server/projectRouter.php",
            data: { route: "join", projectID: projID },
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();
    },
    leaveProject: function(projID)
    {
      return $.ajax({
            method: "POST",
            url: "server/projectRouter.php",
            data: { route: "leave", projectID: projID },
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
  setUserType: function(userID, userTypeID)
  {
    return $.ajax({
          method: "POST",
          url: "server/userRouter.php",
          data: { route: "setType", id: userID, typeID: userTypeID },
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

LANGUAGE =
{
  getCurrentLanguage: function()
    {
      return $.ajax({
            method: "POST",
            url: "server/languageRouter.php",
            data: { route: "currentLaguage"},
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();
    },
  getCurrentLanguageLabels: function(site)
    {
      return $.ajax({
            method: "POST",
            url: "server/languageRouter.php",
            data: { route: "currentLaguageLabels", website: site },
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();
    },
    getLanguageLabels: function(lang, site)
      {
        return $.ajax({
              method: "POST",
              url: "server/languageRouter.php",
              data: { route: "languageLabels", language: lang, website: site },
              dataType: "json",
              success: function (response) {
                  return response;
              },
              fail: function (output){
                return null;
              }
          }).promise();
      },
    getAllLanguages: function()
    {
        return $.ajax({
              method: "POST",
              url: "server/languageRouter.php",
              data: { route: "getAllLanguages"},
              dataType: "json",
              success: function (response) {
                  return response;
              },
              fail: function (output){
                return null;
              }
          }).promise();
    },
    activateLanguage: function(langID)
    {
      return $.ajax({
            method: "POST",
            url: "server/languageRouter.php",
            data: { route: "activateLanguage", languageID: langID },
            dataType: "json",
            success: function (response) {
                return response;
            },
            fail: function (output){
              return null;
            }
        }).promise();
    },
    insertLanguage: function(langData, standard)
    {
        return $.ajax({
              method: "POST",
              url: "server/languageRouter.php",
              data: { route: "insertLanguage", languageData: langData, standardLanguage: standard},
              dataType: "json",
              success: function (response) {
                  return response;
              },
              fail: function (output){
                return null;
              }
          }).promise();
    },
    insertLanguageElements: function(allElements)
    {
        return $.ajax({
              method: "POST",
              url: "server/languageRouter.php",
              data: { route: "insertLanguageElements", allElementsArray: allElements },
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
  ADMIN =
  {
    getIndexPicture: function()
      {
        return $.ajax({
              method: "POST",
              url: "server/adminRouter.php",
              data: { route: "getIndexPicture"},
              dataType: "json",
              success: function (response) {
                  return response;
              },
              fail: function (output){
                return null;
              }
          }).promise();
      },
    setTitlePic: function(index)
      {
        return $.ajax({
              method: "POST",
              url: "server/adminRouter.php",
              data: { route: "setTitlePic", picID: index },
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
