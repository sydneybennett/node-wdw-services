# node-wdw-services

A Node.js + express web application that provides data about Walt Disney World attractions via RESTful JSON endpoints.

Data is pulled dynamically from the [TouringPlans.com](http://www.touringplans.com) API, which does not support JSONP, and caches it in a simple SQLite table.

This service makes a great (and fun) base for trying out JavaScript MVC frameworks including AngularJS and Backbone.js.

This app is configured to use EJS, which I find easier to use when bootstrapping a single page app that is already written in pure HTML. Uncomment line 36 in app.js to enable the index route.

If you don't plan on bootstrapping with server-side data, you can place static HTML in the public folder, using index.html as an entry point.

# Prerequisites

[Node.js](http://nodejs.org)

[npm](https://npmjs.org)

[SQLite3](http://www.sqlite.org)

[jasmine-node](https://github.com/mhevery/jasmine-node)

[Grunt](http://gruntjs.com)

# Running the web server

Before running, ensure that you have `grunt` and `jasmine-node` installed:

    npm install -g grunt-cli jasmine-node

For the first run, clone this project, then:

	$ cd node-wdw-services
	$ npm install
	$ grunt server
	
Use `grunt server` to run the app any time after. `grunt server` will restart the web server each time it detects a file change; use Ctrl-C to stop.

**NOTE:** If you have previously cloned this repository, be sure to remove app.db before running `grunt server`.

# Endpoints

**GET: /locations** - lists the type of locations in Walt Disney World.

	[
	  {
	    "permalink": "parks",
	    "name": "Theme Parks"
	  },
	  {
	    "permalink": "hotels",
	    "name": "Hotels"
	  },
	  {
	    "permalink": "dining",
	    "name": "Dining"
	  }
	]
	
**GET: /locations/parks** - lists the Theme Parks available.

	{
	  "location": {
	    "permalink": "parks",
	    "name": "Theme Parks"
	  },
	  "parks": [
	    {
	      "permalink": "magic-kingdom",
	      "name": "Magic Kingdom"
	    },
	    {
	      "permalink": "epcot",
	      "name": "Epcot"
	    },
	    {
	      "permalink": "hollywood-studios",
	      "name": "Disney's Hollywood Studios"
	    },
	    {
	      "permalink": "animal-kingdom",
	      "name": "Disney's Animal Kingdom"
	    }
	  ]
	}
	
Note: Hotels and Dining are not yet implemented.
	
**GET: /locations/parks/:parkPermaLink** - lists the attractions in a Theme Park.

	{
	  "park": {
	    "permalink": "magic-kingdom",
	    "name": "Magic Kingdom"
	  },
	  "attractions": [
	    {
	      "permalink": "ariels-grotto",
	      "name": "Ariel's Grotto",
	      "short_name": "Ariel's Grotto"
	    },
	    {
	      "permalink": "astro-orbiter",
	      "name": "Astro Orbiter",
	      "short_name": "Astro Orbiter"
	    }
	  ]
	}
	
**GET: /locations/parks/:parkPermaLink/:attractionPermaLink** - lists an attraction's details.

	{
	  "park": {
	    "permalink": "magic-kingdom",
	    "name": "Magic Kingdom"
	  },
	  "attraction": {
		...
	    "name": "Ariel's Grotto",
	    "scope_and_scale_code": "minor_attraction",
	    "intense": false
		...
        "comments": [
          {
            "email": "example@example.com",
            "score": 5,
            "details": "this is a comment"
          }
        ]
	  }
	}

**POST: /locations/parks/:parkPermaLink/:attractionPermaLink/comment** - add a new comment on a specific attraction posting JSON data.
Be sure to specify `Content-Type: application/json` in the HTTP header of your POST request.

	{
        "email": "example@example.com",
        "score": 5,
        "details": "this is a comment"
	}

# Running the tests

Jasmine spec tests are located in the spec folder. Tests require installing [jasmine-node](https://github.com/mhevery/jasmine-node) globally via NPM.

To run tests once jasmine-node is installed:

    $ grunt

Note that there is no need to start the app before running the tests.

# Running the Backbone UI App

Located under /backbone is a sample Backbone.js UI.  It showcases how you might possibly organize an app using the framework.
The UI allows the user to select a park, select an attraction, and view details about an attraction.  It also allows the user
to post a comment about the attraction.  This UI pulls images of the attraction using the [Flickr API](http://www.flickr.com/services/api/).

Frameworks used:

[Backbone.js](http://backbonejs.org/)

[Underscore.js](http://underscorejs.org/)

[Twitter Bootstrap](http://twitter.github.com/bootstrap/index.html)

[jQuery](http://jquery.com/)