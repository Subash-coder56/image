const UNSPLASH_ACCESS_KEY = 'EksLczghCF6rW6Y-0UDAh1EDIgWIxi4pl5eqBUR5-vE';  // Replace with your Unsplash API key
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const imagesContainer = document.getElementById('images-container');
    
async function fetchImages(query) {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=10&client_id=${UNSPLASH_ACCESS_KEY}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function displayImages(images) {
    imagesContainer.innerHTML = '';
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description;
        imagesContainer.appendChild(imgElement);
    });
}

searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
        const images = await fetchImages(query);
        displayImages(images);
    }
});

// Optionally trigger search on pressing "Enter"
searchInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Shift') {
        const query = searchInput.value.trim();
        if (query) {
            const images = await fetchImages(query);
            displayImages(images);
        }
    }
});
