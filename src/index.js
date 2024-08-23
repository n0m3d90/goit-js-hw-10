import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function hideLoader() {
  loader.classList.add('hidden');
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideError() {
  error.classList.add('hidden');
}

function showError() {
  error.classList.remove('hidden');
}

function showCatInfo(catData) {
  const { url, breeds } = catData;
  const breed = breeds[0];
  catInfo.innerHTML = `
    <img src="${url}" alt="${breed.name}" />
    <p><strong>Breed:</strong> ${breed.name}</p>
    <p><strong>Description:</strong> ${breed.description}</p>
    <p><strong>Temperament:</strong> ${breed.temperament}</p>
  `;
  catInfo.classList.remove('hidden');
}

function hideCatInfo() {
  catInfo.classList.add('hidden');
}

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
  breedSelect.classList.remove('hidden');
  new SlimSelect({ select: '.breed-select' });
}

function onBreedChange(event) {
  const breedId = event.target.value;
  if (!breedId) return;

  hideCatInfo();
  showLoader();
  hideError();

  fetchCatByBreed(breedId)
    .then(catData => {
      hideLoader();
      showCatInfo(catData);
    })
    .catch(() => {
      hideLoader();
      showError();
    });
}

function init() {
  showLoader();
  hideError();
  hideCatInfo();

  fetchBreeds()
    .then(breeds => {
      hideLoader();
      populateBreedSelect(breeds);
    })
    .catch(() => {
      hideLoader();
      showError();
    });

  breedSelect.addEventListener('change', onBreedChange);
}

init();
