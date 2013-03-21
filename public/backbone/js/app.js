var app = app || {};

//Helper functions
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//Kick things off
$(document).ready(function(){
    app.parkListView = new app.ParkListView();
    app.attractionListView = new app.AttractionListView();
    app.attractionDetailView = new app.AttractionDetailView();
    app.router = new app.Router();
    Backbone.history.start();
});