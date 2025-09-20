// ===============================================
// ALOO SMP FLIPKART-STYLE GALLERY JAVASCRIPT
// ===============================================

// ===========================================
// BUILD DATA WITH MULTIPLE IMAGES
// ===========================================
const builds = [
    {
        title: "Morden Minecraft House",
        description: "A sleek modern house",
        images: [
            "assets/images/image.png",
            "assets/images/jeet2.png",
            "assets/images/jeet3.png"
        ],
        builder: "Legend_jeet",
        category: "house"
    },
    {
        title: "India Gate",
        description: "INDIA GATE with automated lighting, and a beautiful garden.",
        images: [
            "https://i.postimg.cc/SQXPPnmr/1.png",
            "https://i.postimg.cc/mkG7VpbK/2.png",
            "https://i.postimg.cc/j2QP1622/3.png"
        ],
        builder: "TheBiswas001",
        category: "other"
    },
    // ADD MORE BUILDS HERE
    // {
    //     title: "Your Build Name",
    //     description: "Description of your build",
    //     images: [
    //         "image1.jpg",
    //         "image2.jpg", 
    //         "image3.jpg"
    //     ],
    //     builder: "YourUsername",
    //     category: "castle"
    // }
];

// Categories for filters
const categories = [
    { id: 'all', name: 'All Builds' },
    { id: 'castle', name: 'Castles' },
    { id: 'house', name: 'Houses' },
    { id: 'redstone', name: 'Redstone' },
    { id: 'farm', name: 'Farms' },
    { id: 'other', name: 'Other' }
];

// Global variables for modal
let currentBuild = null;
let currentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

// Generate random stats
function generateStats() {
    const blocks = Math.floor(Math.random() * 4000) + 500;
    const days = Math.floor(Math.random() * 25) + 3;
    const extras = [
        { label: 'Rooms', value: Math.floor(Math.random() * 20) + 5 },
        { label: 'Height', value: Math.floor(Math.random() * 150) + 50 },
        { label: 'Width', value: Math.floor(Math.random() * 100) + 30 },
        { label: 'Items', value: Math.floor(Math.random() * 50) + 10 },
        { label: 'Towers', value: Math.floor(Math.random() * 8) + 2 },
        { label: 'Floors', value: Math.floor(Math.random() * 10) + 3 }
    ];
    
    return {
        blocks: blocks > 1000 ? (blocks/1000).toFixed(1) + 'K' : blocks.toString(),
        days: days.toString(),
        extra: extras[Math.floor(Math.random() * extras.length)]
    };
}

// Get builder avatar
function getBuilderAvatar(builderName) {
    return `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGm4bPKHi-JvZW3TCT7CxToTrOM8Wy6-4iIg&s`;
}

// ===========================================
// HTML GENERATION FUNCTIONS
// ===========================================

// Create gallery header
function createHeader() {
    const headerHTML = `
        <div class="gallery-header">
            <h1 class="gallery-title">Build Gallery</h1>
            <p class="gallery-subtitle">Amazing creations from our ALOO SMP community</p>
        </div>
    `;
    document.getElementById('gallery-header').innerHTML = headerHTML;
}

// Create filter tabs
function createFilters() {
    const filterHTML = categories.map(cat => 
        `<button class="filter-btn ${cat.id === 'all' ? 'active' : ''}" data-filter="${cat.id}">${cat.name}</button>`
    ).join('');
    
    document.getElementById('filter-tabs').innerHTML = `<div class="filter-tabs">${filterHTML}</div>`;
    
    // Add filter event listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterBuilds(btn.dataset.filter, btn));
    });
}

// Create upload section
function createUploadSection() {
    const uploadHTML = `
        <div class="upload-section">
            <h3 style="color: #ecf0f1; margin-bottom: 15px; font-size: 1.1rem;">Submit Your Build!</h3>
            <p style="color: #bdc3c7; margin-bottom: 20px; font-size: 0.9rem;">Built something amazing? Share it with the community!</p>
            <button class="upload-btn" onclick="window.open('https://discord.gg/Ecf6UJq8MR', '_blank')">
                Submit via Discord
            </button>
        </div>
    `;
    document.getElementById('upload-section').innerHTML = uploadHTML;
}

// Create single build card
function createBuildCard(build, index) {
    const stats = generateStats();
    const avatarUrl = getBuilderAvatar(build.builder);
    const mainImage = build.images[0];
    const imageCount = build.images.length;
    
    return `
        <div class="build-card" data-category="${build.category}" onclick="openImageGallery(${index})">
            <div class="build-image-container">
                <img src="${mainImage}" 
                     alt="${build.title}" 
                     class="build-image"
                     onerror="this.src='https://via.placeholder.com/400x250/34495e/ecf0f1?text=Image+Not+Found'">
                ${imageCount > 1 ? `<div class="image-counter">${imageCount} photos</div>` : ''}
            </div>
            <div class="build-info">
                <h3 class="build-title">${build.title}</h3>
                <p class="build-description">${build.description}</p>
                <div class="builder-info">
                    <img src="${avatarUrl}" 
                         alt="${build.builder}" 
                         class="builder-avatar"
                         onerror="this.src='https://crafatar.com/avatars/steve?size=40'">
                    <span class="builder-name">${build.builder}</span>
                </div>
                <div class="build-stats">
                  
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create all build cards
function createGalleryCards() {
    if (builds.length === 0) {
        document.getElementById('gallery-grid').innerHTML = `
            <div class="empty-gallery">
                <h3>No builds yet!</h3>
                <p>Be the first to submit your amazing creation!</p>
            </div>
        `;
        return;
    }
    
    const galleryHTML = builds.map((build, index) => createBuildCard(build, index)).join('');
    document.getElementById('gallery-grid').innerHTML = galleryHTML;
}

// ===========================================
// FILTER FUNCTIONALITY
// ===========================================

// Filter builds by category
function filterBuilds(category, button) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter cards with animation
    document.querySelectorAll('.build-card').forEach(card => {
        const cardCategory = card.dataset.category;
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            // Add entrance animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.display = 'none';
        }
    });
}

// ===========================================
// FLIPKART-STYLE IMAGE GALLERY MODAL
// ===========================================

// Open image gallery modal
function openImageGallery(buildIndex) {
    currentBuild = builds[buildIndex];
    currentImageIndex = 0;
    
    if (!currentBuild || !currentBuild.images || currentBuild.images.length === 0) {
        console.error('No images found for this build');
        return;
    }
    
    createImageModal();
    document.getElementById('imageModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Show current image
    showImage(0);
    
    // Add keyboard listeners
    document.addEventListener('keydown', handleKeyPress);
    
    // Add touch listeners for mobile swipe
    const modalImageArea = document.querySelector('.modal-image-area');
    modalImageArea.addEventListener('touchstart', handleTouchStart, { passive: true });
    modalImageArea.addEventListener('touchend', handleTouchEnd, { passive: true });
}

// Create modal HTML
function createImageModal() {
    const modalHTML = `
        <div class="modal-content-wrapper">
            <div class="modal-header">
                <h3 class="modal-title">${currentBuild.title}</h3>
                <button class="close-modal" onclick="closeImageModal()">&times;</button>
            </div>
            
            <div class="modal-image-area">
                <button class="modal-nav prev" onclick="previousImage()">‹</button>
                <img class="modal-main-image" id="modalMainImage" alt="${currentBuild.title}">
                <button class="modal-nav next" onclick="nextImage()">›</button>
                <div class="modal-counter" id="modalCounter">1 / ${currentBuild.images.length}</div>
                ${currentBuild.images.length === 1 ? '' : '<div class="swipe-indicator">Swipe or use arrow keys to navigate</div>'}
            </div>
            
            ${currentBuild.images.length > 1 ? `
            <div class="modal-thumbnails" id="modalThumbnails">
                ${currentBuild.images.map((img, index) => `
                    <div class="thumbnail-item ${index === 0 ? 'active' : ''}" onclick="showImage(${index})">
                        <img class="thumbnail-image" src="${img}" alt="Image ${index + 1}">
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
    `;
    
    let modal = document.getElementById('imageModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = modalHTML;
}

// Show specific image
function showImage(index) {
    if (!currentBuild || !currentBuild.images) return;
    
    const images = currentBuild.images;
    currentImageIndex = index;
    
    // Update main image with loading state
    const mainImage = document.getElementById('modalMainImage');
    if (mainImage) {
        mainImage.style.opacity = '0';
        
        // Create new image to preload
        const newImage = new Image();
        newImage.onload = () => {
            mainImage.src = images[index];
            mainImage.style.opacity = '1';
        };
        newImage.src = images[index];
    }
    
    // Update counter
    const counter = document.getElementById('modalCounter');
    if (counter) {
        counter.textContent = `${index + 1} / ${images.length}`;
    }
    
    // Update thumbnail active state
    document.querySelectorAll('.thumbnail-item').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
    
    // Update navigation visibility
    const prevBtn = document.querySelector('.modal-nav.prev');
    const nextBtn = document.querySelector('.modal-nav.next');
    
    if (images.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    } else {
        if (prevBtn) prevBtn.style.display = index === 0 ? 'none' : 'block';
        if (nextBtn) nextBtn.style.display = index === images.length - 1 ? 'none' : 'block';
    }
}

// Navigate to previous image
function previousImage() {
    if (!currentBuild || currentImageIndex <= 0) return;
    showImage(currentImageIndex - 1);
}

// Navigate to next image
function nextImage() {
    if (!currentBuild || currentImageIndex >= currentBuild.images.length - 1) return;
    showImage(currentImageIndex + 1);
}

// Close modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Remove event listeners
    document.removeEventListener('keydown', handleKeyPress);
    
    // Reset variables
    currentBuild = null;
    currentImageIndex = 0;
}

// Handle keyboard navigation
function handleKeyPress(e) {
    if (!currentBuild) return;
    
    switch(e.key) {
        case 'Escape':
            closeImageModal();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            previousImage();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextImage();
            break;
    }
}

// Handle touch events for swipe navigation
function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next image
            nextImage();
        } else {
            // Swipe right - previous image
            previousImage();
        }
    }
}

// ===========================================
// COPY SERVER ADDRESS FUNCTIONALITY
// ===========================================

// Copy server address to clipboard
function copyServerAddress() {
    const serverAddress = document.getElementById('serverAddress');
    if (!serverAddress) return;
    
    const address = serverAddress.textContent;
    
    navigator.clipboard.writeText(address).then(() => {
        showSuccessMessage();
        animateCopyButton();
    }).catch(() => {
        fallbackCopy(address);
        showSuccessMessage();
        animateCopyButton();
    });
}

// Show success message popup
function showSuccessMessage() {
    const msg = document.getElementById('copySuccessMessage');
    if (msg) {
        msg.classList.add('show');
        setTimeout(() => msg.classList.remove('show'), 3000);
    }
}

// Animate copy button
function animateCopyButton() {
    const btn = document.querySelector('.copy-server-btn');
    const icon = btn?.querySelector('.copy-icon');
    
    if (btn && icon) {
        const original = icon.textContent;
        
        icon.textContent = '✓';
        btn.style.color = '#28a745';
        
        setTimeout(() => {
            icon.textContent = original;
            btn.style.color = '';
        }, 2000);
    }
}

// Fallback copy method
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Copy failed:', err);
    }
    
    document.body.removeChild(textArea);
}

// ===========================================
// BUILD MANAGEMENT FUNCTIONS
// ===========================================

// Add new build with multiple images
function addNewBuild(title, description, images, builder, category = 'other') {
    // Ensure images is an array
    if (typeof images === 'string') {
        images = [images];
    }
    
    if (!Array.isArray(images) || images.length === 0) {
        console.error('Images must be an array with at least one image');
        return;
    }
    
    const newBuild = {
        title: title,
        description: description,
        images: images,
        builder: builder,
        category: category
    };
    
    builds.push(newBuild);
    createGalleryCards();
    
    console.log(`Added new build: ${title} by ${builder} with ${images.length} images`);
}

// Remove build by title
function removeBuild(title) {
    const index = builds.findIndex(build => build.title === title);
    if (index > -1) {
        builds.splice(index, 1);
        createGalleryCards();
        console.log(`Removed build: ${title}`);
    }
}

// Get build statistics
function getBuildStats() {
    const stats = {
        total: builds.length,
        totalImages: builds.reduce((sum, build) => sum + build.images.length, 0),
        byCategory: {}
    };
    
    categories.forEach(cat => {
        if (cat.id !== 'all') {
            stats.byCategory[cat.id] = builds.filter(build => build.category === cat.id).length;
        }
    });
    
    return stats;
}

// ===========================================
// SEARCH FUNCTIONALITY
// ===========================================

// Search builds
function searchBuilds(query) {
    const searchTerm = query.toLowerCase();
    const cards = document.querySelectorAll('.build-card');
    
    cards.forEach(card => {
        const title = card.querySelector('.build-title').textContent.toLowerCase();
        const builder = card.querySelector('.builder-name').textContent.toLowerCase();
        const description = card.querySelector('.build-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || builder.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===========================================
// INITIALIZATION
// ===========================================

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('ALOO SMP Gallery: Initializing responsive gallery...');
    
    // Create gallery sections
    createHeader();
    createFilters();
    createUploadSection();
    createGalleryCards();
    
    // Setup modal click outside to close
    document.addEventListener('click', (e) => {
        if (e.target.id === 'imageModal') {
            closeImageModal();
        }
    });
    
    // Load player count if available
    if (typeof updateOnlinePlayers === 'function') {
        updateOnlinePlayers();
        setInterval(updateOnlinePlayers, 30000);
    }
    
    console.log(`Gallery loaded: ${builds.length} builds, ${getBuildStats().totalImages} total images`);
    console.log('Gallery Statistics:', getBuildStats());
});

// ===========================================
// EXAMPLES AND UTILITIES
// ===========================================

// Example of adding a build with multiple images:
// addNewBuild(
//     "My Epic Castle", 
//     "This is my amazing castle with multiple views!", 
//     [
//         "castle-front.jpg",
//         "castle-side.jpg", 
//         "castle-interior.jpg",
//         "castle-aerial.jpg"
//     ],
//     "MyUsername", 
//     "castle"
// );

// Bulk add builds
function addMultipleBuilds(buildsArray) {
    buildsArray.forEach(build => {
        builds.push(build);
    });
    createGalleryCards();
}

// Debug function
function debugGallery() {
    console.log('Current builds:', builds);
    console.log('Statistics:', getBuildStats());
    console.log('Current modal build:', currentBuild);
    console.log('Current image index:', currentImageIndex);
}

// Performance optimization - lazy loading for images
function addLazyLoading() {
    const images = document.querySelectorAll('.build-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addNewBuild,
        removeBuild,
        getBuildStats,
        searchBuilds,
        openImageGallery,
        builds
    };
}