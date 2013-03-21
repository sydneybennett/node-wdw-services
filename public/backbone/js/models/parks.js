var app = app || {};

(function ()
{
    app.Parks = Backbone.Model.extend({
        urlRoot: 'http://localhost:3000/locations/parks'
    });
})();