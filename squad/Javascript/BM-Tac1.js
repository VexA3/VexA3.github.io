window.onload = function () {
    document.getElementById('button').addEventListener('click', function () {
        var p = document.createElement('p');
        var spot = document.getElementById('data')
        $.ajax({
            type: 'GET',
            url: `https://api.battlemetrics.com/servers/3569099/relationships/sessions?at=2020-04-26T21:34:00Z&include=player`,
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA5NTgxYmE0MWFiODVkNjMiLCJpYXQiOjE2MTI3MDQwNTUsIm5iZiI6MTYxMjcwNDA1NSwiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjoxMjM3MDEifQ.KVxMN2q1fCHuNFboTI8pArn0TAldrxumCIAhhQSzBjs`
            },
            contentType: "application/json; charset-utf-8",
            dataType: "json",
            success: function (data) {
                var $cont = $('#contain');
                var p = document.createElement('p');
                data.included.forEach(user => {
                    if (user.attributes.name != null) {
                        console.log(user.attributes.name);
                        p.innerHTML += user.attributes.name + "<br>";
                    }
                });
                spot.appendChild(p);
            }
        })
    })
}
