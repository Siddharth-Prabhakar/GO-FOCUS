/**
 * Background Service Worker for Brutal Focus Extension
 * Handles site blocking and navigation interception
 */

// Listen for navigation events
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    // Only process main frame navigation
    if (details.frameId !== 0) return;

    try {
        // Get the hostname from the URL
        const url = new URL(details.url);
        const hostname = url.hostname;

        // Get blocked sites from storage
        const result = await chrome.storage.sync.get('blockedSites');
        const blockedSites = result.blockedSites || [];

        // Check if the current site is blocked
        if (blockedSites.some(site => hostname.includes(site))) {
            // Redirect to blocked page
            chrome.tabs.update(details.tabId, {
                url: chrome.runtime.getURL('blocked.html')
            });
        }
    } catch (error) {
        console.error('Error processing navigation:', error);
    }
}, {
    url: [{
        schemes: ['http', 'https']
    }]
});

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
    // Initialize storage with empty blocked sites array if not exists
    chrome.storage.sync.get('blockedSites', (result) => {
        if (!result.blockedSites) {
            chrome.storage.sync.set({ blockedSites: [] });
        }
    });
}); 
