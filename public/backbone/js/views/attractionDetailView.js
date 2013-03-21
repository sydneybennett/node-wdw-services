var app = app || {};

$(document).ready(function ()
{
    app.AttractionDetailView = Backbone.View.extend({
        el: '.page',
        events:{
            'submit .add-comment-form' : 'saveComment'
        },
        saveComment: function (ev) {
            var commentDetails = $(ev.currentTarget).serializeObject();
            var comment = new app.Comment();
            comment.urlRoot = comment.urlRoot + "/" + app.park + "/" + app.attraction + "/comment";
            comment.save(commentDetails, {
                success: function (comment){
                    //re-render
                    app.attractionDetailView.render({park: app.park, attraction: app.attraction})
                }
            })
            $('#commentsModal').modal('hide');
            return false;
        },
        render: function (options)
        {
            app.park = options.park;
            app.attraction = options.attraction;

            var attraction = new app.AttractionDetail({id: options.attraction});
            attraction.urlRoot = attraction.urlRoot + "/" + options.park;
            attraction.fetch({
                success: function (attraction)
                {
                    app.attractionDetailsObj = attraction;
                    var attractionObj = app.attractionDetailsObj.get('attraction');

                    app.imageController.fetch(options.park, attractionObj.name);
                }
            })
        }
    })
});