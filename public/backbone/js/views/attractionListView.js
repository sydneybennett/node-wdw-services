var app = app || {};

$(document).ready(function ()
{
    app.AttractionListView = Backbone.View.extend({
        el: '.page',
        render: function (options)
        {
            var that = this;
            var park = new app.Attraction({id: options.park});
            park.fetch({
                success: function (park)
                {
                    var template = _.template($('#attraction-list-template').html(), {park: park.get('park'), attractions: park.get('attractions')});
                    that.$el.html(template);
                }
            })
        }
    })

});
