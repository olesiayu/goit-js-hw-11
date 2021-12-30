import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '24956067-6fe14b7c875c9c2cf58e9b0bb';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchImages() {            
        return axios.get(`?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)            
            .then(images => {
                this.incrementPage();
                return images.data;
            });
    }
    
    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}