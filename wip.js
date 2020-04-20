var val = Math.floor(Math.random() * 6) + 1;

console.log('val = ' + val);

var main = $('body main');
var img = document.createElement('img');
var link1 = "./images/FeelsRainMan.gif";
var link2 = "./images/Widepeeposad.png";

window.onload = function() {
    if(val <= 3) {
        img.src = link1;
        img.alt = "FeelsRainMan";
        main.append(img);
    } else if(val > 3) {
        img.src = link2;
        img.alt = "Widepeeposad";
        main.append(img);
    }
}