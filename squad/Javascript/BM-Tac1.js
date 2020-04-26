window.onload = function() {
    var api = $.get("https://api.battlemetrics.com/servers/442917?include=player", function(data, status) {
        console.log(data.included);

        data.included.forEach(user => {
            if(user.attributes.name != null) {
                console.log(user.attributes.name);
            }
        });
    });
}