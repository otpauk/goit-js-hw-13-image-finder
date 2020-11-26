import imageCard from '../templates/image-card.hbs';
import '../css/styles.css';
import '../css/basicLightbox.min.css';
import '@pnotify/core/dist/BrightTheme.css';
import ImagesApiService from './apiService';
import refs from './refs';
import { error } from '@pnotify/core';

const imagesApiService = new ImagesApiService();

function onSearch(event) {
    event.preventDefault();
    
    imagesApiService.query = event.currentTarget.elements.query.value;
    
    if (imagesApiService.query === '') {
      imagesApiService.resetPage();
      clearImageListContainer();
      refs.homeBtn.classList.add('visually-hidden');
  
      error({
        text: "Empty string! Please re-enter query!",        
        width: '400px',      
        hide: true,
        delay: 1000,
        maxTextHeight: null,
        sticker: false,
        closer: false,
        remove: true,
        destroy: true,      
      });

      return;
    };  
    
    imagesApiService.resetPage();
    clearImageListContainer();
    fetchImages();
    refs.homeBtn.classList.remove('visually-hidden');    
  };
  
  function fetchImages() {    
    imagesApiService.fetchImages().then(hits => {
      if (hits.length === 0) {
        imagesApiService.resetPage();
        clearImageListContainer();

        error({
          text: "No such images! Please re-enter query!",        
          width: '400px',      
          hide: true,
          delay: 1000,
          maxTextHeight: null,
          sticker: false,
          closer: false,
          remove: true,
          destroy: true,      
        });

        return;
      };
     
      appendImageListMarkup(hits);
      imagesApiService.incrementPage();          
    });   
  };
  
  function appendImageListMarkup(hits) {
    refs.imageGallery.insertAdjacentHTML('beforeend', imageCard(hits));
  };  
    
  function clearImageListContainer() {
    refs.imageGallery.innerHTML = '';    
  };

  export default {
    onSearch,
    fetchImages,
    imagesApiService,
  };