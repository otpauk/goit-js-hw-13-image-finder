import refs from './js/refs';
import onImageClick from './js/imageViewer';
import markup from './js/pageMarkup';
import infinitScroll from './js/infinitScroll';

refs.searchInput.addEventListener('submit', markup.onSearch);
refs.imageGallery.addEventListener("click", onImageClick);

// tell Observer what to observe
infinitScroll.observer.observe(refs.pageEnd);