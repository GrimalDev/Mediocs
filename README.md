# Mediocs
## Frelance projet, abandoned since
---

This project was originally meant to be a tool for medical researchers to store informations about samples and patients.

The project was since left aside, and the client has authorized the code to go to my GitHub as part of my portfolio. It is now under an *APACHE LICENSING 2.0*.

**ALL SENSITIVE DATA HAS BEEN REMOVED**
---

Organization of files:

DATA
public
cert.pem & key.pem
.env
.dockerignore
server.js


DATA:
All application data
    admin_data:
        main_admin_data.db:
            A ".database" file made available in order to reorganize the admin database a part. (Not implemented)
    medical:
        example.json:
            Example of organizing patient data in ".json".
        med_data_1.db:
            A test file for incorporating the "NeDB" database to replace the object.json file
        object.json
            The file that is currently read by the server during a "GET" request on the "route" "/data".
u ser_data:
        main_user_data.db
            The main user database.

public:
    This folder contains the public root of the project, everything that will be sent to the client and accessed by it.
    script:
        script_index.js:
            This script defines the table where the data is displayed in the main html page "index.html".
            It also allows rendering the dropdown menu with some purely aesthetic properties.
        script_login.js:
            Empty script but present for possible future improvements.
        script_register.js:
            Empty script but commented out with a future user and edit table for admins.
    style:
        The graphical decoration of the client
        media:
            All image decoration
        style_index.css:
            The file is commented to group the different application areas.
        style_login.css:
            Page style of the login page. Always the same organization by block.
        style_register:
            Page organized by block. Page still in progress.
    Views:
        Index.html
            Defines the html page of the data. There is not much as everything is generated by the script_index.js
        login.html
            Definition of the authentication html page
        register.html
            Definition of the user registration html page.
            At the bottom of the page is marked "user list" because a list is coming. (Future property)

cert.pem and key.pem
    ssl certificate file for HTTPS protocol

.env
    admin and session_secret strings that allow to secure the code

.dockerignore:
    Files to ignore for GitHub

server.js:
    The very definition of the application server. Everything is described by blocks of uses.
    Each package is commented with its utility.
