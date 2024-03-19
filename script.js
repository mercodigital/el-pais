                                                    /* MENÚ */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

window.addEventListener("scroll", () => {
    if (navMenu.classList.contains("active")) {
        closeMenu(); 
    }
});

                                                /* SLIDER (SECCIÓN 3) */

let carousel = document.querySelector(".carousel");
let btns = document.querySelectorAll(".wrapper i");
let carouselChildren = [...carousel.children];
let wrapper = document.querySelector(".wrapper");

let cardWidth = carousel.querySelector(".card").offsetWidth;
let isDragging = false,
  startX,
  startScrollLeft,
  isAutoPlay = true,
  timeoutId;

let cardsPerView = Math.round(carousel.offsetWidth / cardWidth);

carouselChildren
  .slice(-cardsPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildren.slice(0, cardsPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -cardWidth : cardWidth;
  });
});

let dragStart = (e) => {
  isDragging = true;

  carousel.classList.add("dragging");

  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

let dragging = (e) => {
  if (!isDragging) return;

  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

let dragStop = () => {
  isDragging = false;

  carousel.classList.remove("dragging");
};

let infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

let autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; 

  timeoutId = setTimeout(() => {
    carousel.scrollLeft += cardWidth;
  }, 2500);
};

autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

                                            /* BOTÓN DE SCROLL */

let btnVolverArriba = document.querySelector(".btnVolverArriba");

window.onscroll = function() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        btnVolverArriba.style.display = "block";
    } else {
        btnVolverArriba.style.display = "none";
    }
};

btnVolverArriba.onclick = function() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
};

                                            /* CALL TO ACTION */

var cta = document.querySelectorAll('.cta');

cta.forEach(function(boton) {
  boton.addEventListener('click', function() {
    var targetElement = document.getElementById('contacto');
                                                
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

                                           /* MODAL DE FORMULARIO */

document.addEventListener('DOMContentLoaded', function () {
var form = document.getElementById('myForm');
var modal = document.getElementById('modal-1');
var closeButton = document.getElementById('md-close');
                                        
                                            // Function to show the modal with effect
function showModal() {
    modal.classList.add('md-show');
}
                                        
                                            // Function to hide the modal with effect
function hideModal() {
    modal.classList.remove('md-show');
    form.reset();
}
                                        
                                           
                                            // form.addEventListener('submit', function (event) {
                                            //     event.preventDefault(); 
                                            //     showModal(); 
                                            // });

form.addEventListener('submit', function(event) {
  event.preventDefault(); 
                                                                                      
  let formData = new FormData(this);
    fetch('https://agronomiapais.com.ar/mailer/form.php', {
      method: 'POST',
      body: formData
  })
  .then(response => {
  if (response.ok) {
      showModal();
                                            
  } else {
      console.error('Error en la petición');
    }
  })
  .catch(error => {
      console.error('Error:', error);
  });});











                                        
                                            // Add event listener to close button
closeButton.addEventListener('click', function () {
    hideModal(); // Hide modal when close button is clicked
});
                                        
                                            // Close modal when clicking on overlay
modal.addEventListener('click', function (event) {
    if (event.target === modal) {
        hideModal();
    }
})});
                                        