// Liste von AJAX-Befehlen zum Aufrufen von PHP-Methoden -> Abrufen
// und Manipulieren der gewünschten Daten aus der Datenbank. Hierbei
// werden hauptsächlich die jeweiligen Router-Elemente angesteuert.
// .promise() dient bei den Aufrufen dazu, dass versprochen wird ein
// Ergebnis zurückzuliefern und somit ein $.when(Funktion) Aufruf,
// der Funktion ermöglicht wird.
$(document).ready(function(){
// Theme Funktionsnamespace beinhaltet Methoden um Theme Daten aus
// der Datenbank abzurufen oder zu manipulieren.
THEME =
{
  // getCurrentThemePath: Gibt den aktuellen Dateipfad der entsprechenden
  // css-Datei für das aktuell gewählte Theme zurück.
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
  // getCurrentThemeID: Gibt die ID des aktuellen Themes zurück.
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
  // getAllThemeNamesIDs: Gibt alle Themeeinträge zurück. Jeweils Name,
  // Dateipfad und ID.
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
  // getThemePathByID: Gibt den Dateipfad anhand der Theme-ID zurück.
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
  // activateTheme: Deaktiviert das aktuelle Theme und aktiviert das gewünschte
  // Theme anhand dessen ID.
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
  },
  // uploadTheme: Lädt die übergebene Datei in einen Ordner(themeFiles) des Projekts hoch
  // und führt die entsprechenden Datenbankeinträge für das neue Theme durch.
  uploadTheme: function(themeName, themeFile)
    {
      var formdata = new FormData();
      formdata.append("route", "uploadTheme");
      formdata.append("themePath", "themeFiles/");
      formdata.append("themeName", themeName);
      formdata.append("themeFile", themeFile);
      return $.ajax({
            method: "POST",
            processData: false,
            contentType: false,
            url: "server/themeLayoutRouter.php",
            data: formdata,
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
// Layout Funktionsnamespace beinhaltet Methoden um Layout Daten aus
// der Datenbank abzurufen oder zu manipulieren.
LAYOUT =
{
  // getCurrentLayoutPath: Gibt den aktuellen Dateipfad der entsprechenden
  // css-Datei für das aktuell gewählte Layout zurück.
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
  // getCurrentLayoutID: Gibt die ID des aktuellen Layouts zurück.
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
  // getAllLayoutNamesIDs: Gibt alle Themeeinträge zurück. Jeweils Name,
  // Dateipfad und ID.
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
  // getLayoutPathByID: Gibt den Dateipfad anhand der Theme-ID zurück.
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
  // activateLayout: Deaktiviert das aktuelle Layout und aktiviert das gewünschte
  // Layout anhand dessen ID.
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
  // uploadLayout: Lädt die übergebene Datei in einen Ordner(layoutFiles) des Projekts hoch
  // und führt die entsprechenden Datenbankeinträge für das neue Layout durch.
  uploadLayout: function(layoutName, layoutFile)
    {
      var formdata = new FormData();
      formdata.append("route", "uploadLayout");
      formdata.append("layoutPath", "layoutFiles/");
      formdata.append("layoutName", layoutName);
      formdata.append("layoutFile", layoutFile);
      return $.ajax({
            method: "POST",
            processData: false,
            contentType: false,
            url: "server/themeLayoutRouter.php",
            data: formdata,
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
// Project Funktionsnamespace beinhaltet Methoden um Projekt Daten aus
// der Datenbank abzurufen oder zu manipulieren.
PROJECT = {
    // searchAllProjects: Gibt alle Projektdaten und die Beschreibungen für
    // alle Projekteinträge zurück.
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
    // searchMemberProjects: Liefert Namen, Zustand, ID und Beschreibung aller
    // Projekte an denen der Nutzer beteiligt ist.
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
    // searchUserProjects: Liefert Namen, Zustand, ID und Beschreibung aller
    // Projekte von denen der Nutzer Projektleiter ist.
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
    // getProjectDetails: Liefert alle Projektdaten eines Projekts anhand der
    // übergebenen ID.
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
    // setProjectState: Ändert den Zustandseintrag eines Projekts anhand der
    // übergebenen ID.
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
    // checkProjectMembership: Überprüft anhand der übergebenen ID, ob der
    // aktuelle Nutzer an einem Projekt teilnimmt oder dessen Projektleiter ist.
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
    // checkProjectLeadership: Überprüft anhand der übergebenen ID, ob der
    // aktuelle Nutzer der Projektleiter eines Projekts ist.
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
    // joinProject: Fügt den aktuellen Nutzer als Teilnehmer eines Projekts
    // anhand der übergebenen ID hinzu.
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
    // leaveProject: Entfernt den aktuellen Nutzer aus der Teilnehmerliste eines
    // Projekts anhand der übergebenen ID.
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
    // createProject: Erzeugt die benötigten Einträge für das Projekt in der
    // Datenbank und lädt das gewünschte Projektbild in einen Ordner im
    // Projekt(projectImages) hoch.
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
    },
    // deleteProject: Löscht alle zugehörigen Datenbankeinträge eines Projekts
    // aus der Datenbank anhand der übergebenen ID.
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
    // getCategories: Liefert alle Kategorien ausschließlich der übergebenen IDs
    // zurück.
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
// User Funktionsnamespace beinhaltet Methoden um Nutzer Daten aus
// der Datenbank abzurufen oder zu manipulieren.
USER =
{
  // getAllUsers: Gibt die Daten aller Nutzer(außer der eigenen Daten) zurück.
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
  // setUserType: Ändert den Typ eines Nutzers anhand der übergebenen Nutzer-
  // ID und der Typ-ID(Nutzer, Redakteur, Admin).
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
  // deleteUser: Löscht alle zugehörigen Datenbankeinträge eines Nutzers anhand
  // der übergebenen ID.
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
  // getUserName: Liefer den Vor- und Nachnamen eines Nutzers anhand der über-
  // gebenen ID zurück.
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
// Categorie Funktionsnamespace beinhaltet Methoden um Kategorie Daten aus
// der Datenbank abzurufen oder zu manipulieren.
CATEGORIE =
{
  // getAllCategories: Liefert alle Daten von allen Kategorien zurück.
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
  // deleteCategorie: Löscht alle zugehörigen Daten einer Kategorie anhand der
  // übergebenen ID aus der Datenbank.
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
  // createCategorie: Erstellt die Datenbankeinträge für eine neue Kategorie.
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
// Language Funktionsnamespace beinhaltet Methoden um Sprache Daten aus
// der Datenbank abzurufen oder zu manipulieren.
LANGUAGE =
{
  // getCurrentLanguage: Liefert den Namen der aktuellen Sprache zurück.
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
  // getCurrentLanguageLabels: Liefert die Textwerte für HTML-Elemente eines
  // bestimmten Webseitenbereichs zurück.
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
    // getLanguageLabels: Liefert die Textwerte für HTML-Elemente eines
    // bestimmten Webseitenbereichs anhand der übergebenen Sprache zurück.
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
    // getAllLanguages: Liefert den Namen und die ID aller Spracheinträge aus
    // der Datenbank.
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
    // activateLanguage: Deaktiviert die aktuelle Sprache und aktiviert die
    // gewünschte Sprache anhand der übergebenen ID.
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
    // insertLanguage: Fügt die gewünschte Sprache in die Datenbank ein.
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
    // insertLanguageElements: Fügt die Texte einer Sprache für die HTML-Elemente
    // in die Datenbank ein.
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
  // Admin Funktionsnamespace beinhaltet Methoden um Daten für den Admin aus
  // der Datenbank abzurufen oder zu manipulieren.
  ADMIN =
  {
    // getIndexPicture: Liefert die Daten aller Titelbilder für die Webseite und
    // zusätzlich die ID des aktuell ausgewählten Titelbilds zurück.
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
    // setTitlePic: Deaktiviert das aktuelle Titelbild und aktiviert das gewünschte
    // Titelbild anhand der übergebenen ID.
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
      },
    // getCurrentIndexPicture: Liefert den Dateipfad des aktuellen aktivierten
    // Titelbilds zurück.
    getCurrentIndexPicture: function()
      {
        return $.ajax({
              method: "POST",
              url: "server/adminRouter.php",
              data: { route: "getCurrentIndexPicture" },
              dataType: "json",
              success: function (response) {
                  return response;
              },
              fail: function (output){
                return null;
              }
          }).promise();
      },
    // uploadTitlePic: Erstellt die benötigten Tabelleneinträge für ein Titelbild
    // und lädt die übergebene Datei in einen Ordner(titleImages) im Projekt hoch.
    uploadTitlePic: function(pictureName, pictureFile)
      {
        var formdata = new FormData();
        formdata.append("route", "uploadTitlePic");
        formdata.append("picPath", "titleImages/");
        formdata.append("picName", pictureName);
        formdata.append("picFile", pictureFile);
        return $.ajax({
              method: "POST",
              processData: false,
              contentType: false,
              url: "server/adminRouter.php",
              data: formdata,
              dataType: "json",
              success: function (response) {
                  return response;
              },
              fail: function (output){
                return null;
              }
          }).promise();
      },
    };
});
