const gallery = document.getElementById('gallery');
const uploadInput = document.getElementById('modalUploadInput');
const uploadButton = document.getElementById('modalUploadButton');
const imageModal = document.getElementById('imageModal');
const centeredImage = document.getElementById('centeredImage');
const closeImageModal = document.getElementById('closeImageModal');
const editModal = document.getElementById('editModal');
const closeEditModal = document.getElementById('closeEditModal');
const previewImage = document.getElementById('previewImage');
const editTitle = document.getElementById('editTitle');
const saveChanges = document.getElementById('saveChanges');
const openUploadModal = document.getElementById('openUploadModal');
const closeUploadModal = document.getElementById('closeUploadModal');
const uploadModal = document.getElementById('uploadModal');

let images = [
  { src: "images/image1.jpeg", title: 'Red Placeholder' },
  { src: "images/image2.jpeg", title: 'Green Placeholder' },
  { src: "images/image3.jpeg", title: 'Blue Placeholder' },
  { src: "images/image4.jpeg", title: 'Yellow Placeholder' },
  { src: "images/image5.jpeg", title: 'Red Placeholder' },
  { src: "images/image6.jpeg", title: 'Green Placeholder' },
  { src: "images/image7.jpeg", title: 'Blue Placeholder' },
  { src: "images/image8.jpeg", title: 'Yellow Placeholder' },
];

let editIndex = null;

// Function to render gallery
function renderGallery() {
  gallery.innerHTML = '';
  images.forEach((image, index) => {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.innerHTML = `
      <img src="${image.src}" alt="${image.title}" onclick="viewImage('${image.src}')">
      <div class="actions">
        <button class="menu" onclick="toggleDropdown(${index})">⋮</button>
        <div class="dropdown" id="dropdown-${index}">
          <button onclick="editImage(${index})">✏️ Edit</button>
          <button onclick="deleteImage(${index})">🗑️ Delete</button>
        </div>
      </div>
    `;
    gallery.appendChild(card);
  });
}

// Upload image
uploadButton.addEventListener('click', () => {
  const file = uploadInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      images.push({ src: reader.result, title: 'Untitled' });
      renderGallery();
      uploadModal.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
});

// Open upload modal
openUploadModal.addEventListener('click', () => {
  uploadModal.style.display = 'flex';
});

// Close upload modal
closeUploadModal.addEventListener('click', () => {
  uploadModal.style.display = 'none';
});

// View image
function viewImage(src) {
  centeredImage.src = src;
  imageModal.style.display = 'flex';
}

// Close image modal
closeImageModal.addEventListener('click', () => {
  imageModal.style.display = 'none';
});

// Edit image
function editImage(index) {
  editIndex = index;
  previewImage.src = images[index].src;
  editTitle.value = images[index].title;
  editModal.style.display = 'flex';
}

// Save changes
saveChanges.addEventListener('click', () => {
  images[editIndex].title = editTitle.value;
  renderGallery();
  editModal.style.display = 'none';
});

// Delete image
function deleteImage(index) {
  images.splice(index, 1);
  renderGallery();
}

// Toggle dropdown
function toggleDropdown(index) {
  const dropdown = document.getElementById(`dropdown-${index}`);
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Close edit modal
closeEditModal.addEventListener('click', () => {
  editModal.style.display = 'none';
});

// Initial render
renderGallery();
