var cardList = document.querySelectorAll(".card");
var editButton1 = document.querySelector("#editButton1");
var editButton2 = document.querySelector("#editButton2");
var editButton3 = document.querySelector("#editButton3");
var streamerNameInput1 = document.querySelector("#streamerNameInput1");
var streamerNameInput2 = document.querySelector("#streamerNameInput2");
var streamerNameInput3 = document.querySelector("#streamerNameInput3");
var streamerName1 = document.querySelector("#streamerName1");
var streamerName2 = document.querySelector("#streamerName2");
var streamerName3 = document.querySelector("#streamerName3");
var streamerIcon1 = document.querySelector("#streamerIcon1");
var streamerIcon2 = document.querySelector("#streamerIcon2");
var streamerIcon3 = document.querySelector("#streamerIcon3");
var streamerList = [];
var editButtonList = $(".edit");

class Streamer {
    constructor(url, isLive, name, _icon, _span, _edit, _input)
    {
        this.url = url;
        this.isLive = isLive;
        this.name = name;
        this._icon = _icon;
        this._span = _span;
        this._edit = _edit;
        this._input = _input;
    }
}

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

// Adjust shading of cards dynamically as window is resized by user
window.addEventListener("resize", () => {
    dynamicShadows();
    dynamicInputs();
});

function dynamicShadows() {
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
}

function dynamicInputs() {
    if(window.innerWidth < 768) {
        $("input").css("font-size", "25px");
    }
    else if (window.innerWidth < 992) {
        $("input").css("font-size", "18px");
    }
    else {
        $("input").css("font-size", "25px");   
    }
}

streamerNameInput1.addEventListener("input", function(input) {
    userInputUrl = input.value;
});

// Listen for user to click any of the edit buttons and accept user input
$(".edit").on( "click", function() {
    var editbuttons = $(this);
    streamerList.forEach(function(strmr) {
        if(strmr._edit.id == editbuttons.attr('id')) {
            strmr._span.classList.add("d-none");
            strmr._input.classList.remove("d-none");
            strmr.editStreamer(_input.value);
        }
    });
});

// function that is called when adding a streamer
function addStreamer(url, icon, name, _icon, _span, _edit, _input) {
    var streamer = new Streamer(url, icon, name, _icon, _span, _edit, _input);
    streamerList.push(streamer);
}

// function that is called when editing a streamer
function editStreamer(url) {
    this.url = url;
}

// Add shadow to cards as component of hover animation
$(".card").hover(
    function() {
        $(this).addClass("shadow-lg");
    }, function() {
        $(this).removeClass("shadow-lg");
    }
);

function getStreamerInfo() {  
    $.get("https://www.twitch.tv/siritron", function(){
    });
}

function init() {
    addStreamer("https://www.twitch.tv/siritron", false, "siritron", streamerIcon1, streamerName1, editButton1, streamerNameInput1);
    addStreamer("https://www.twitch.tv/xcaliz0rz", true, "xcaliz0rz", streamerIcon2, streamerName2, editButton2, streamerNameInput2);
    addStreamer("https://www.twitch.tv/pestily", false, "pestily", streamerIcon3, streamerName3, editButton3, streamerNameInput3);
}
