export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
    }
    
    fetchArticles() {
        // const API_KEY = '24956067-6fe14b7c875c9c2cf58e9b0bb';

    // const url = 'https://pixabay.com/api/?key=24956067-6fe14b7c875c9c2cf58e9b0bb&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1';
        
    fetch("https://pixabay.com/api/?key=24956067-6fe14b7c875c9c2cf58e9b0bb&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1").then(response => response.json()).then(console.log);
    }
    
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}