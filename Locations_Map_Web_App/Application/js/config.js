//This is where you will configure your web app


//SETTINGS


//Enter the URI where the web app is located on your server
var HTTP_ROOT = 'http://your.domain/root_folder';

//If you want to use a different source for the JSON data you can change it here
var JSON_SOURCE = 'json.php';

//This is the URI to your images with the sencha touch resizing prefix, if you are using the Locations wordress plugin comment this line
var IMG_ROOT = 'http://src.sencha.io/' + HTTP_ROOT + '/images/';

//HOMEPAGE

//Homepage title
var homeTitle = 'Locations Web App';

//Homepage content
var homeHtml = '<div style="text-align:center"><img src="location-app.png"/><p>The <b>Locations Web App</b> is the perfect way to display mappable content on mobile devices</p></div>';

//Homepage icon text
var homeTabTxt = 'Home';

//LISTING PAGE

//Listings title
var listingTitle = 'Locations Listing';

//Listing icon text
var listingTabTxt = 'Locations';


//MAP SETTING

//Starting coordinates for Map
var startLat = 34.05;
var startLng = -118.246;

//Set the zoom level of the Main map
var mapZoom = 10;

//Set the zoom level of the Detail map
var detailZoom = 12;

//Set the zoom level of the Search result
var searchZoom = 15;

//Text for the link in the info window to the location detail card
var moreInfo = 'View Location';

//These fields are stored from the JSON call, if you would like to add field to the XML 
//file make sure to add them to this list with the appropriate type
var locationFields = [
        {name: 'title', type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'details', type: 'string'},
        {name: 'images', type: 'object'},
        {name: 'thumb', type: 'string'},
        {name: 'marker', type: 'string'},
        {name: 'lat',       type: 'float'},
        {name: 'lng',   type: 'float'}
    ]
    
//This dictates the layout of the details card of the location, you can change it if necessary or add fields if you have already added them above
//Make sure and encapsulate field variables in curly braces
var detailsTemplate = 	'<div><tpl if="address"><address>{address}</address></tpl><tpl if="details"><p>{details}</p></tpl></div>';