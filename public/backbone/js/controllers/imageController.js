var app = app || {};

(function ()
{
    app.imageController = {

        fetch: function (parkName, attractionName)
        {
            var params = {};
            // add base params
            params.api_key = '05a15af50fd9280bb121ee3be267a388';
            params.format = 'json';
            params.per_page = 5;
            params.method = 'flickr.photos.search';
            params.text = parkName + " " + attractionName;
            // ajax request, can handle disconnects
            $.ajax({
                url: 'http://api.flickr.com/services/rest/',
                type: 'GET',
                dataType: 'jsonp',
                data: params,
                jsonp: 'jsoncallback',
                success: function (data)
                {
                    var photos = data.photos.photo;
                    var images=[];
                    for (var i=0; i < photos.length; i++){
                        var image = {};
                        image.url = 'http://farm' + photos[i].farm + '.staticflickr.com/' + photos[i].server + "/" + photos[i].id + '_' + photos[i].secret + '_q.jpg';
                        images.push(image);
                    }
                    var template = _.template($('#attraction-detail-template').html(), {park: app.attractionDetailsObj.get('park'), attraction: app.attractionDetailsObj.get('attraction'), images: images });
                    app.attractionDetailView.$el.html(template);
                    $('.carousel').carousel();

                }
            });
        }
    };
}());