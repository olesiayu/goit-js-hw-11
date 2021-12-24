import './css/styles.css';
// import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApiService from './news-service';

const gallery = document.querySelector('.gallery');
const formEl = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
// const input = document.querySelector('input');

const newsApiService = new NewsApiService();

formEl.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();

    // const searchQuery = e.currentTarget.elements.query.value;
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    newsApiService.fetchArticles();
        
}

function onLoadMore() {
    newsApiService.fetchArticles();
    
}




function renderMarkup(array) {
    
    const galleryItems =
        array.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `<div class="photo-card"><a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</a></div>`;
        }).join("");
    
    gallery.innerHTML = galleryItems;

    const lightbox = new SimpleLightbox('.gallery a');

}







