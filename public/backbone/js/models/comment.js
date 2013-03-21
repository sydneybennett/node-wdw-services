var app = app || {};

(function ()
{
    app.Comment = Backbone.Model.extend({
        urlRoot: 'http://localhost:3000/locations/parks'
    });

})();