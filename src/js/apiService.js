// import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '19219123-602297e5ea13130f59eefd31c';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }; 

  async fetchImages() {
    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      q: this.searchQuery,
      page: this.page,
      per_page: 12,
      key: API_KEY,
    });

    const url = `${BASE_URL}?${searchParams}`;

    // const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const { hits } = await response.json();
      this.incrementPage();
      return hits;
      
      // const { data } = await axios.get(url);
      // this.incrementPage();    
      // return data.hits;      
    } 
    catch (error) {
      console.log('Something goes wrong:', error);      
    };
  };

  incrementPage() {
    this.page += 1;
  };

  resetPage() {
    this.page = 1;
  };

  get query() {
    return this.searchQuery;
  };

  set query(newQuery) {
    this.searchQuery = newQuery;
  };
};