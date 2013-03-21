var app = app || {};

$(document).ready(function ()
{
    app.ParkListView = Backbone.View.extend({
        el: '.page',
        render: function ()
        {
            var that = this;
            var parksObject = new app.Parks();
            parksObject.fetch({
                success: function (parksObject)
                {
                    var template = _.template($('#park-list-template').html(), {parks: parksObject.get('parks')});
                    that.$el.html(template);
                }
            });
        }
    });
});