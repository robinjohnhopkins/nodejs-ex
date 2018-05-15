## RH_README.md


### node

^4.12.3 means latest major version e.g. 4.13.1 might install
~4.12.3 mean latest minor version e.g. 4.12.55 might install
npm install bower -g

in my.jade
	//- bower:css
	//- endbower
	//- bower:js
	//- endbower
	//- inject:css
	//- endinject
	//- inject:js
	//- endinject	

my.hbs is express-handlebars file type - html plus js  inside {{ }}

nom install —save pjs
app.set(‘view engine’,’ejs’);
app.get(‘/‘, function (requires){
	res.render(‘index’, {title: ‘Hey’,list:[‘a’,’b’]});
}
effective javascript 

http://localhost:8080/Admin/addBooks
to add some books to db

https://www.npmjs.com
npm search packages
mssql for use with SqlServer as provided on azure

to access mongoldb from terminal in open shift
mongo -u admin -p $MONGODB_ADMIN_PASSWORD admin

shift alt f beautify vs code

Info - good js demo maps and charts found in http://creativeit.github.io/material-dashboard-lite

#I ran following to make angularjs a dependency
npm i @angular/cli
#after which the angular cli is here
./node_modules/.bin/ng -v

#added a script to package.json to run the ng build command which compiles angular into dist folder
# after which we put in a link to the built single page app in the node server
npm run ngbuild

