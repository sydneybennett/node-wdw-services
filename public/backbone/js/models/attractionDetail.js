var app = app || {};

(function ()
{
    app.AttractionDetail = Backbone.Model.extend({
        urlRoot: 'http://localhost:3000/locations/parks'
    });
})();