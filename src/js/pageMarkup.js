import imageCard from '../templates/image-card.hbs';
import '../css/styles.css';
import '../css/basicLightbox.min.css';
import '@pnotify/core/dist/BrightTheme.css';
import ImagesApiService from './apiService';
import refs from './refs';
import { error } from '@pnotify/core';
import infinitScroll from './infinitScroll';

const imagesApiService = new ImagesApiService();

function onSearch(event) {
    event.preventDefault();   
    
    imagesApiService.query = event.currentTarget.elements.query.value;
    
    imagesApiService.resetPage();
    clearImageListContainer(); 
    
    infinitScroll.observer.observe(refs.pageEnd);
    
    if (imagesApiService.query === '') {      
      infinitScroll.observer.unobserve(refs.pageEnd);      

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
  };
  
  function loadImages() {
    imagesApiService.fetchImages().then(hits => { 
      if (imagesApiService.query !== '' && hits.length === 0) { 
        infinitScroll.observer.unobserve(refs.pageEnd);       
        
        refs.homeBtn.classList.add('visually-hidden');

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
      
      if (hits.length > 0 && hits.length < 12) {
        infinitScroll.observer.unobserve(refs.pageEnd);
      };
     
      appendImageListMarkup(hits);
      
      refs.homeBtn.classList.remove('visually-hidden'); 
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
    loadImages,
    imagesApiService,
  };