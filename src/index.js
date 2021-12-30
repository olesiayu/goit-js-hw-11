import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApiService from './news-service';
import renderMarkup from './markup'

const lightbox = new SimpleLightbox('.gallery a');
const gallery = document.querySelector('.gallery');
const formEl = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.classList.add('is-hidden');

const newsApiService = new NewsApiService();

formEl.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);


async function onSearch(e) {
  e.preventDefault();
  
  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (newsApiService.query === '') {
    return;
  }
  
  newsApiService.resetPage();
  clearGallery();
  loadMoreBtn.classList.add('is-hidden');

  try {
    const images = await newsApiService.fetchImages();
    if (images.hits.length === 0) { return Notify.failure("Sorry, there are no images matching your search query. Please try again."); }
    loadMoreBtn.classList.remove('is-hidden');
    appendGalleryMarkup(images.hits);
    Notify.success(`Hooray! We found ${images.totalHits} images.`);    
  } 
  catch (error) {
    console.log(error.message);
  }
}

async function onLoadMore() {
  try {
    const images = await newsApiService.fetchImages();
    appendGalleryMarkup(images.hits);
    if (images.totalHits <= document.querySelectorAll('.info').length) {
      loadMoreBtn.classList.add('is-hidden');
      return Notify.failure("We're sorry, but you've reached the end of search results.");
    }    
  } 
  catch (error) {
    console.log(error.message);
  }  
}

function clearGallery() {
  gallery.innerHTML = '';
}

function appendGalleryMarkup(array) {
  gallery.insertAdjacentHTML('beforeend', renderMarkup(array));
  lightbox.refresh();
}

