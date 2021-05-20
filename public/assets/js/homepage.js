const cardList = document.querySelectorAll(".card");
const bigHeaders = $(".big-header");
const smallHeaders = $(".small-header");
const editButton1 = document.querySelector("#editButton1");
const editButton2 = document.querySelector("#editButton2");
const editButton3 = document.querySelector("#editButton3");
const saveButton1 = document.querySelector("#saveButton1");
const saveButton2 = document.querySelector("#saveButton2");
const saveButton3 = document.querySelector("#saveButton3");
const streamerNameInput1 = document.querySelector("#streamerNameInput1");
const streamerNameInput2 = document.querySelector("#streamerNameInput2");
const streamerNameInput3 = document.querySelector("#streamerNameInput3");
const streamerName1 = document.querySelector("#streamerName1");
const streamerName2 = document.querySelector("#streamerName2");
const streamerName3 = document.querySelector("#streamerName3");
const streamerIcon1 = document.querySelector("#streamerIcon1");
const streamerIcon2 = document.querySelector("#streamerIcon2");
const streamerIcon3 = document.querySelector("#streamerIcon3");
const streamerList = [];
const editButtonList = $(".edit");
const expandFeedButton = document.querySelector("#expandFeed");

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

class Streamer {
    constructor(url, name, isLive, _icon, _span, _edit, _save, _input)
    {
        this.url = url;
        this.name = name;
        this.isLive = isLive;
        this._icon = _icon;
        this._span = _span;
        this._edit = _edit;
        this._save = _save;
        this._input = _input;
    }
}

init();

// Adjust shading of cards dynamically as window is resized by user
window.addEventListener("resize", () => {
    dynamicShadows();
    dynamicInputs();
    dynamicHeaders();
    hideCardsOnSmallBreakpoint();
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
        if (window.innerWidth < 768) {
            $("input[name='UpdatedStreamer']").css("font-size", "25px");
        }
        else if (window.innerWidth < 992) {
            $("input[name='UpdatedStreamer']").css("font-size", "18px");
        }
        else {
            $("input[name='UpdatedStreamer']").css("font-size", "25px");   
        }
}

function hideCardsOnSmallBreakpoint() {
    if (window.innerWidth < 768) {
        cardList[cardList.length - 1].classList.add("d-none");
        cardList[cardList.length - 2].classList.add("d-none");
        cardList[cardList.length - 3].classList.add("d-none");
        cardList[cardList.length - 4].classList.add("d-none");
        expandFeedButton.classList.remove("d-none");
    }
    else {
        cardList[cardList.length - 1].classList.remove("d-none");
        cardList[cardList.length - 2].classList.remove("d-none");
        cardList[cardList.length - 3].classList.remove("d-none");
        cardList[cardList.length - 4].classList.remove("d-none");
        expandFeedButton.classList.add("d-none");
    }
}

function dynamicHeaders() {
    if (window.innerWidth < 768) {
        smallHeaders.removeClass("d-none");
        bigHeaders.addClass("d-none");
    }
    else {
        smallHeaders.addClass("d-none");
        bigHeaders.removeClass("d-none");
    }
}


$(".fa-chevron-down").on("click", function() {
    expandFeedButton.classList.add("d-none");
    cardList[cardList.length - 1].classList.remove("d-none");
    cardList[cardList.length - 2].classList.remove("d-none");
    cardList[cardList.length - 3].classList.remove("d-none");
    cardList[cardList.length - 4].classList.remove("d-none");
});

// Listen for user to click any of the edit buttons and accept user input
$(".edit").on("click", function() {
    let editbutton = $(this);
    streamerList.forEach(function(strmr) {
        if(strmr._edit.id == editbutton.attr('id')) {
            strmr._span.classList.add("d-none");
            strmr._input.classList.remove("d-none");
            strmr._save.classList.remove("d-none");
        }
    });
    editbutton.addClass("d-none");
});

// function that is called when adding a streamer
function addStreamer(url, name, isLive, _icon, _span, _edit, _save, _input) {
    let streamer = new Streamer(url, name, isLive, _icon, _span, _edit, _save, _input);
    streamerList.push(streamer);
}

// Add shadow to cards as component of hover animation
$(".card").hover(
    function() {
        $(this).addClass("shadow-lg");
    }, function() {
        $(this).removeClass("shadow-lg");
    }
);

function init() {
    addStreamer("https://www.twitch.tv/siritron", "siritron", false, streamerIcon1, streamerName1, editButton1, saveButton1, streamerNameInput1);
    addStreamer("https://www.twitch.tv/xcaliz0rz", "xcaliz0rz", false, streamerIcon2, streamerName2, editButton2, saveButton2, streamerNameInput2);
    addStreamer("https://www.twitch.tv/seriesofblurs", "seriesofblurs", false, streamerIcon3, streamerName3, editButton3, saveButton3, streamerNameInput3);
    dynamicInputs();
    dynamicHeaders();
    dynamicShadows();
}