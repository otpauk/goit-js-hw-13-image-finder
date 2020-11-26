import refs from './js/refs';
import onImageClick from './js/imageViewer';
import markup from './js/pageMarkup';

refs.searchInput.addEventListener('submit', markup.onSearch);
refs.imageGallery.addEventListener("click", onImageClick);
