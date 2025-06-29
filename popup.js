/**
 * Popup Script for Brutal Focus Extension
 * Handles the extension popup interface and site management
 */

// Global variables
let siteToRemove = null;

/**
 * Initialize popup when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    const siteInput = document.getElementById('siteInput');
    const addSiteButton = document.getElementById('addSite');
    const blockedList = document.getElementById('blockedList');

    // Load and display blocked sites
    loadBlockedSites();

    // Add site to blocked list
    addSiteButton.addEventListener('click', () => {
        const site = siteInput.value.trim().toLowerCase();
        if (site && isValidDomain(site)) {
            addBlockedSite(site);
            siteInput.value = '';
        } else {
            showError('Please enter a valid domain (e.g., youtube.com)');
        }
    });

    // Handle Enter key
    siteInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addSiteButton.click();
        }
    });
});

/**
 * Validate domain format
 * @param {string} domain - Domain to validate
 * @returns {boolean} - True if valid domain
 */
function isValidDomain(domain) {
    // Basic domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
}

/**
 * Display error message to user
 * @param {string} message - Error message to display
 */
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.querySelector('.input-group').appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
}

/**
 * Load blocked sites from storage and display them
 */
async function loadBlockedSites() {
    const result = await chrome.storage.sync.get('blockedSites');
    const blockedSites = result.blockedSites || [];
    displayBlockedSites(blockedSites);
}

/**
 * Display blocked sites in the UI
 * @param {Array} sites - Array of blocked site domains
 */
function displayBlockedSites(sites) {
    const blockedList = document.getElementById('blockedList');
    blockedList.innerHTML = '';
    
    sites.forEach(site => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${site}</span>
            <button class="delete-btn" data-site="${site}">Remove</button>
        `;
        blockedList.appendChild(li);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const site = e.target.dataset.site;
            showMotivationModal(site);
        });
    });
}

/**
 * Show motivation modal when user tries to remove a site
 * @param {string} site - Site domain to potentially remove
 */
function showMotivationModal(site) {
    const modal = document.getElementById('modalOverlay');
    modal.style.display = 'flex';
    modal.classList.add('active');
    
    // Play motivational speech
    if (window.speechSynthesis) {
        const quote = "It's your life, stay average. You want that?";
        const utterance = new SpeechSynthesisUtterance(quote);
        utterance.rate = 0.9;
        utterance.pitch = 0.8;
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);
    }
    
    // Set up button handlers
    const successButton = document.getElementById('successButton');
    const failureButton = document.getElementById('failureButton');
    
    // Remove old listeners and add new ones
    successButton.onclick = null;
    failureButton.onclick = null;
    
    successButton.onclick = () => {
        modal.classList.remove('active');
        modal.style.display = 'none';
    };
    
    failureButton.onclick = async () => {
        await removeBlockedSite(site);
        modal.classList.remove('active');
        modal.style.display = 'none';
    };
}

// Listen for messages from the modal
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'modalSuccess') {
        siteToRemove = null;
    } else if (message.action === 'modalFailure') {
        if (message.site) {
            removeBlockedSite(message.site);
            siteToRemove = null;
        }
    }
});

/**
 * Remove a site from the blocked list
 * @param {string} site - Site domain to remove
 */
async function removeBlockedSite(site) {
    const result = await chrome.storage.sync.get('blockedSites');
    let blockedSites = result.blockedSites || [];
    
    blockedSites = blockedSites.filter(s => s !== site);
    await chrome.storage.sync.set({ blockedSites });
    displayBlockedSites(blockedSites);
}

/**
 * Add a site to the blocked list
 * @param {string} site - Site domain to add
 */
async function addBlockedSite(site) {
    const result = await chrome.storage.sync.get('blockedSites');
    let blockedSites = result.blockedSites || [];
    
    if (!blockedSites.includes(site)) {
        blockedSites.push(site);
        await chrome.storage.sync.set({ blockedSites });
        displayBlockedSites(blockedSites);
    }
}

/**
 * Initialize interactive effects for the stripe background
 */
window.addEventListener('DOMContentLoaded', function() {
    const stripe = document.querySelector('.stripe');
    const stripeInner = document.querySelector('.stripe_inner');
    
    if (!stripe || !stripeInner) return;
    
    // Add hover effects
    stripe.addEventListener('mouseenter', function() {
        stripeInner.style.transform = 'scale(1.1)';
    });
    
    stripe.addEventListener('mouseleave', function() {
        stripeInner.style.transform = 'scale(1)';
    });
    
    // Add click effect
    stripe.addEventListener('click', function() {
        stripeInner.style.animationDuration = '0.5s';
        setTimeout(() => {
            stripeInner.style.animationDuration = '2s';
        }, 500);
    });
}); 