var app = app || {};

(function ()
{
    app.Router = Backbone.Router.extend({
        routes: {
            "": "parks",
            ":parkPermalink": "attractions",
            ":parkPermalink/:attractionPermalink": "attraction",
            ":parkPermalink/:attractionPermalink/comment": "comment"
        },

        parks: function() {
            app.parkListView.render();
        },

        attractions: function (parkPermalink) {
            app.attractionListView.render({park: parkPermalink});
        },

        attraction: function (parkPermalink, attractionPermalink)
        {
            app.attractionDetailView.render({park: parkPermalink, attraction: attractionPermalink});
        }
    });
})();
