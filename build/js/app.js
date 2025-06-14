document.addEventListener('DOMContentLoaded', function () {
    focusLink();
    scrollToSection();
    stickyHeader();
    createGallery();
});

function stickyHeader(){
    let header = document.querySelector('.header');
    let about = document.querySelector('.about-fest');

    document.addEventListener('scroll', function () {
        if(about.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed');
        }else{
            header.classList.remove('fixed');
        }
    });
}

function createGallery (){
    // number of images
    number_images = 16;
    gallery_content = document.querySelector('.images-gallery');

    // interation for generate each image in html
    for (let i = 1; i <= number_images; i++) {
        const image = document.createElement('IMG');
        image.src = `/src/img/gallery/full/${i}.jpg`
        image.alt = 'image-gallery'

        // add funcion on click to open modal
        image.onclick = function(){
            openModal(i)
        }

        // image injection
        gallery_content.appendChild(image);
    }
}

function openModal(i){
    // generate modal
    let modal = document.createElement('DIV');
    // add class to modal
    modal.classList.add('modal');
    // add on click function to close modal
    modal.onclick = closeModal;

    // generate img
    const image = document.createElement('IMG');
    image.src = `/src/img/gallery/full/${i}.jpg`
    image.alt = 'image-gallery'
    
    // add image to modal
    modal.appendChild(image);
    // add close button
    let btn = document.createElement('BUTTON');
    btn.classList.add('btn-close')
    btn.textContent = 'X';
    modal.appendChild(btn);

    // add to body
    let body = document.querySelector('body');
    // add class for fixed modal
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
}

function closeModal(){
    // close modal
    let modal = document.querySelector('.modal');
    // add class for out animation
    modal.classList.add('fade-out');

    setTimeout(function() {
        let body = document.querySelector('body');
        // remove class for unfixed modal
        body.classList.remove('overflow-hidden');
        // remove modal
        modal?.remove();
    }, 450);
}

function focusLink() {
    // add event listener to scroll
    document.addEventListener('scroll', function () {
        
        let sections = document.querySelectorAll('section');
        let links = document.querySelectorAll('.header-nav a');
    
        let actual = '';

        sections.forEach( section => {
    
            let sectionTop = section.offsetTop;
            let sectionHeight = section.offsetHeight;
    
    
           if(window.scrollY >= (sectionTop - sectionHeight / 3)){
                actual = section.id;
           }
        });

        links.forEach( link => {
            if(link.getAttribute('href') === `#${actual}`){
                link.classList.add('active');
            }else{
                link.classList.remove('active');
            }
        });
    });

}

function scrollToSection() {
    let sectionsNav = document.querySelectorAll('.header-nav a');

    sectionsNav.forEach( section => {
        section.addEventListener('click', function (e) { 
            e.preventDefault();
            let href = this.getAttribute('href');
            let sectionToScroll = document.querySelector(href);
            sectionToScroll.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
