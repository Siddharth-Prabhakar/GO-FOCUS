// Function to show the modal
function showModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.add('active');
    speakQuote();
}

// Function to hide the modal
function hideModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
}

// Function to speak the quote
function speakQuote() {
    if (!window.speechSynthesis) return;

    const quote = "It's your life, stay average. You want that?";
    const utterance = new SpeechSynthesisUtterance(quote);
    
    // Configure voice settings for a more robotic sound
    utterance.rate = 0.9; // Slightly slower
    utterance.pitch = 0.8; // Lower pitch for robotic effect
    utterance.volume = 1;

    // Get voices and try to find a suitable one
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
        voice.name.includes('Male') || 
        voice.name.includes('Google') || 
        voice.name.includes('Microsoft')
    ) || voices[0];

    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }

    // Speak the quote
    window.speechSynthesis.speak(utterance);
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    const successButton = document.getElementById('successButton');
    const failureButton = document.getElementById('failureButton');

    successButton.addEventListener('click', () => {
        hideModal();
        // Send message to background script that user chose success
        chrome.runtime.sendMessage({ action: 'modalSuccess' });
    });

    failureButton.addEventListener('click', () => {
        hideModal();
        // Send message to background script that user chose failure
        chrome.runtime.sendMessage({ action: 'modalFailure' });
    });
}); 