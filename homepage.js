// get a list of all cards
var cardList = document.querySelectorAll(".card");
var twitchIcons = document.querySelectorAll("streamer");
var streamer1 = document.querySelector("#streamerName1");
var streamer2 = document.querySelector("#streamerName2");
var streamer3 = document.querySelector("#streamerName3");

init();

// Adjust shading of cards dynamically as window is resized by user
window.addEventListener("resize", function () {
    if (window.innerWidth < 768) {
        //remove shading on 2nd to last card when window is xs-sm
        cardList[cardList.length - 2].classList.remove("shadow");
        cardList[cardList.length - 2].classList.add("shadow-sm");
    }
    else if (window.innerWidth < 992) {
        //remove shading on 3rd to last card when window is md 
        cardList[cardList.length - 3].classList.remove("shadow");
        cardList[cardList.length - 3].classList.add("shadow-sm");

        //add shading back to 2nd to last card
        cardList[cardList.length - 2].classList.add("shadow");
        cardList[cardList.length - 2].classList.remove("shadow-sm");
    }
    else {
        //add shading back to 3rd to last card
        cardList[cardList.length - 3].classList.add("shadow");
        cardList[cardList.length - 3].classList.remove("shadow-sm");
    }
});

// Add shadow to cards as component of hover animation
$(".card").hover(
    function() {
        $(this).addClass("shadow-lg");
    }, function() {
        $(this).removeClass("shadow-lg");
    }
);

function getStreamerInfo() {  
    $.get("https://www.twitch.tv/siritron", function() {

    })
}
 

function init() {
    addStreamer("https://www.twitch.tv/siritron", twitchIcons[0], "siritron");
    addStreamer("https://www.twitch.tv/xcaliz0rz", twitchIcons[1], "xcaliz0rz");
    addStreamer("https://www.twitch.tv/pestily", twitchIcons[2], "pestily");
}

// function that is called when adding a streamer
function addStreamer(url, icon, name) {
    var streamer = new Streamer(url);
    streamerList.add(streamer);
    
}

function editStreamer(url, icon, name) {

}

class Streamer {
    constructor(url, icon, name)
    {
        this.url = url;
        this.icon = icon;
        this.name = name;
    }
}
