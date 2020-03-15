

// PORTFOLIO FILTER

const filterButtons = document.querySelector("#filter-btns").children;
const filterItems = document.querySelector(".portfolio-gallery").children;

// console.log(filterItems);

// loop through the filter buttons
for (let i = 0; i < filterButtons.length; i++) {
    // console.log(filterButtons[i])
    // add a click event to each button
    filterButtons[i].addEventListener("click", function () {
        // for every click remove the active class
        for (let j = 0; j < filterButtons.length; j++) {
            filterButtons[j].classList.remove("active");
        }
        // add active to the clicked button
        this.classList.add("active");

        // declare the target 
        const target = this.getAttribute("data-target");

        for (let k=0; k < filterItems.length; k++) {
            filterItems[k].style.display = "none";
            if (target === filterItems[k].getAttribute("data-id"))
            {
                filterItems[k].style.display = "block";
            } else if (target === "all"){
                filterItems[k].style.display = "block";
            }
        }
    })
};


// CLOSE LIGHTBOX

// grab the lightbox class
const closeLightbox = document.querySelector(".close-lightbox");
const lightBox = document.querySelector(".lightbox");
const lightBoxImage = lightBox.querySelector("img");

    lightBox.addEventListener("click", function() {
        // console.log(event.target)
        // console.log(this)
        if (event.target === this) {
            // console.log("close")
            lightBox.classList.remove("show");
            lightBox.classList.add("hide");
        } 
        else {
            // console.log("do not close")
            // do nothing
        }
    })

    closeLightbox.addEventListener("click", function() {
        // console.log("closeLightbox")
        lightBox.classList.remove("show");
        lightBox.classList.add("hide");
    })


// LAUNCH LIGHTBOX

const portfolio = document.querySelector(".portfolio-gallery");
const portfolioItem = portfolio.querySelectorAll(".item");

portfolioItem.forEach(function (item) {
    item.querySelector(".fa-plus").addEventListener("click", function() {
        // console.log(this)
        lightBox.classList.remove("hide");
        lightBox.classList.add("show");
        lightBoxImage.src = item.querySelector("img").getAttribute("src");
    })
})

// RECOMMENDATIONS SLIDER

const sliderContainer = document.querySelector(".rec-slider");
const slides = sliderContainer.children;
const containerWidth = sliderContainer.offsetWidth;
const margin = 30;
// console.log(containerWidth);

let slideItem = 0;
let slideDots;

// RESPONSIVE SLIDER

const responsive = [
    {breakpoint: {
        width: 0, 
        item: 1
    }},
    {breakpoint: {
        width: 999,
        item: 2
    }}
]

function load(){
    for (let i=0; i < responsive.length; i++) {
        if (window.innerWidth > responsive[i].breakpoint.width) {
            slideItem = responsive[i].breakpoint.item;
        }
    }
    start();
}

function start() {
    totalWidth = 0;
    for (let i=0; i < slides.length; i++) {
        slides[i].style.width = (containerWidth / slideItem) - margin + "px";
        slides[i].style.margin = margin / 2 + "px";
        totalWidth += containerWidth/slideItem;
    }

    sliderContainer.style.width = totalWidth + "px";

    slideDots = Math.ceil(slides.length / slideItem);
    // console.log(slideDots);

    for(let i=0; i < slideDots; i++) {
        const div = document.createElement("div");
        div.id = i;
        div.setAttribute("onclick", "controlSlide(this)");
        if(i===0) {
            div.classList.add("active");
        }
        document.querySelector(".slide-control").appendChild(div);
    }
}

let currentSlide = 0;
let autoSlide = 0;

function controlSlide(element) {
    clearInterval(timer);
    timer = setInterval(autoPlay, 5000);
    autoSlide = element.id;
    currentSlide = element.id;
    changeSlide(currentSlide);
}

function changeSlide(currentSlide) {
    controlButtons = document.querySelector(".slide-control").children;

    for (let i=0; i < controlButtons.length; i++) {
        // if (controlButtons[i].id === currentSlide) {
        //     controlButtons[i].classList.add("active")
        // }
        // else {
        //     controlButtons[i].classList.remove("active")
        // }
        controlButtons[i].classList.remove("active");
    }
    controlButtons[currentSlide].classList.add("active");

    sliderContainer.style.marginLeft =- (containerWidth * currentSlide) + "px";
}

function autoPlay() {
    if(autoSlide === slideDots - 1) {
        autoSlide = 0;
    }
    else {
        autoSlide++;
    }
    changeSlide(autoSlide);
}
let timer = setInterval(autoPlay, 5000);

window.onload = load();