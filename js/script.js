

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
const lightBoxH4 = lightBox.querySelector("h4");
const lightBoxP = lightBox.querySelector("p");
const lightBoxH5 = lightBox.querySelector(".info-card-text").querySelector("h5");
const lightBoxA = lightBox.querySelector("a");

// test
const lightBoxInfo = lightBox.querySelector(".info-card");
const lightBoxInfoUl = lightBoxInfo.querySelector("ul");
const lightBoxInfoUlli = lightBoxInfoUl.querySelectorAll("li");

    lightBox.addEventListener("click", function() {
        // console.log(event.target)
        // console.log(this)
        if (event.target === this) {
            // console.log("close")
            lightBox.classList.remove("show");
            lightBox.classList.add("hide");
            portfolio.querySelector(".item").querySelector("img[alt='test2']").classList.add("hide");

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
        portfolio.querySelector(".item").querySelector("img[alt='test2']").classList.add("hide");

    })


// LAUNCH LIGHTBOX

const portfolio = document.querySelector(".portfolio-gallery");
const portfolioItem = portfolio.querySelectorAll(".item");
const portfolioItemUl = portfolio.querySelector(".item").querySelector("ul.tech-list");
const portfolioItemUlli = portfolioItemUl.querySelectorAll("li");
// console.log(portfolioItemUlli);

portfolioItem.forEach(function (item) {
    item.querySelector(".fa-plus").addEventListener("click", function() {
        // console.log(this)
        lightBox.classList.remove("hide");
        lightBox.classList.add("show");
        // item.querySelector("img[alt='test2']").classList.remove("hide");
        // lightBoxImage.src = item.querySelector("img").getAttribute("src");  
        lightBoxImage.src = item.querySelector("img[alt='test2']").getAttribute("src");
        lightBoxH4.innerHTML = item.querySelector("h4").innerHTML;
        lightBoxP.innerHTML = item.querySelector("p").innerHTML;
        lightBoxH5.innerHTML = item.querySelector(".lightbox-info").querySelector("h5").innerHTML;
        lightBoxA.href = item.querySelector("a").getAttribute("href");

        for (let i = 0; i < portfolioItemUlli.length; i++) {
            lightBoxInfoUlli[i].innerHTML = item.querySelector("ul").querySelectorAll("li")[i].innerHTML;
            lightBoxInfoUlli[i].classList.add("show");
        }
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
let timer = setInterval(autoPlay, 10000);

window.onload = load();

// HEADER

window.onscroll = function() {
    const docScrollTop = document.documentElement.scrollTop;
    if (window.innerWidth > 991) {
        if (docScrollTop > 100) {
            document.querySelector("header").classList.add("fixed")
        }
        else {
            document.querySelector("header").classList.remove("fixed")
        }
    }
}

// NAVBAR LINKS

const navbar = document.querySelector(".navbar");
const a = navbar.querySelectorAll("a");

a.forEach(function(element){
    element.addEventListener("click", function(){
        for(let i=0; i<a.length; i++) {
            a[i].classList.remove("active")
        }
        this.classList.add("active")
        document.querySelector("header").querySelector(".navbar").classList.toggle("show")
    })
})

// HAMBURGER MENU

const hbMenu = document.querySelector(".hb-menu");

hbMenu.addEventListener("click", function(){
    const navHeader = document.querySelector("header");
    navHeader.querySelector(".navbar").classList.toggle("show")
})

// CONTACT FORM PROMPT
const contactSection = document.querySelector(".contact");
const contactForm = contactSection.querySelector(".contact-form");
const sendButton = contactForm.querySelector(".sendButton");

sendButton.addEventListener("click", function(){
    window.alert("Oops! Sorry, the contact form back-end is still being built.\nPlease reach out to me through my social media links.\nThank you so much!");
})