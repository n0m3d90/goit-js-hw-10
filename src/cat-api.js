import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_FKCN2NP70VOAAw9Pt2f7ALJGxQwl58IyCejr9YyKZocmGmWDpVNARKDVwAclPUII'; 


export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw new Error('Failed to fetch breeds');
    });
}


export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      throw new Error('Failed to fetch cat data');
    });
}
