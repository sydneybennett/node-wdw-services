var app = app || {};

(function ()
{
    app.Attraction = Backbone.Model.extend({
        urlRoot: 'http://localhost:3000/locations/parks'
    });

})();