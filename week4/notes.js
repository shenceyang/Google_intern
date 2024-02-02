
/*                          NPM
-usage:
    1. Adapt packages of code for your apps, or incorporate packages as they are.
    2. Download standalone tools you can use right away.
  ...

-how to start a project:
1. create a folder and npm init

2. npm install <package_name>        // dependencies will be added to package.json

3. write main.js

4. go to package.json and add "start": "node main.js" to scripts in order to run the app with npm start

5. run the app with: 'npm i' and then 'npm start'
          //npm i: installs all the dependencies listed in your project's package.json file.



- diff between nodemon and npm start:

    When you run nodemon file_name, it starts the specified file (usually a server file).If the file changes, 
    it automatically restarts the server, allowing you to see the effects of code changes immediately.  

    On the other hand, with npm run serve, npm looks for a script named "server" in the scripts section of
    the package. json file and executes the command specified for that script.

    so they are just 2 different ways to run the application. People use 'npm run start' more often when
    it comes to large projects is just bc when clone others repo, we may not familiar with the file structure 
    and takes time to find the server file if we are using 'nodemon', so instead we do 'npm run start'.
*/
