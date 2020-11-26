import markup from './pageMarkup';

const observerCallback = entries => {  
  entries.forEach(entry => {
    if (entry.isIntersecting && markup.imagesApiService.query !== '') {      
        markup.loadImages();                  
    };    
  });
};
  
const observerOptions = {
  rootMargin: '200px',
};
  
const observer = new IntersectionObserver(observerCallback, observerOptions);

export default {
  observer,
};