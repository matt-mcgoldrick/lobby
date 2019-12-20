// get a list of all cards
var cardList = document.querySelectorAll(".card");

// Adjust shading of card dynamically as window is resized by user
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