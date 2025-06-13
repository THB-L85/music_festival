document.addEventListener('DOMContentLoaded', function () {
    createGallery();
});

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

    // add to body
    let body = document.querySelector('body');
    body.appendChild(modal);
}

function closeModal(){
    // close modal
    let modal = document.querySelector('.modal');
    modal?.remove();
}
