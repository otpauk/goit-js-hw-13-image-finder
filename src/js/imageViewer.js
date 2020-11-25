import * as basicLightbox from 'basiclightbox';

export default function onImageClick(event) {
    event.preventDefault();
  
    const isGalleryImageRef = event.target.classList.contains("image");
  
    if (!isGalleryImageRef) {
      return;
    };
  
    const bigImageUrl = event.target.dataset.source;  
  
    const bigImage = basicLightbox.create(`<img src="${bigImageUrl}">`);
  
    bigImage.show();
  };