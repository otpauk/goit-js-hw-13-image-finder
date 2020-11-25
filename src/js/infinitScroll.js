import markup from './pageMarkup';

/**
* Observer
*/
const observerCallback = entries => {  
  entries.forEach(entry => {
    if (entry.isIntersecting && markup.imagesApiService.query !== '') {      
        markup.fetchImages();                  
    };    
  });
};
  
const observerOptions = {
  rootMargin: '100px',
};
  
const observer = new IntersectionObserver(observerCallback, observerOptions);

export default {
  observer,
};