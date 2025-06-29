/**
 * Blocked Page Script for Brutal Focus Extension
 * Displays motivational quotes and handles audio/speech functionality
 */

// Brutal motivational quotes
const quotes = [
    "You said you had goals. Why are you here?",
    "Instagram won't build your future.",
    "You're feeding the algorithm, not your ambition.",
    "Excuses don't build empires.",
    "Work now. Regret never.",
    "No one is coming to save you.",
    "This scroll is stealing your future.",
    "Your dream is dying for your distraction.",
    "Discipline is doing it even when you don't want to.",
    "Stop running from your potential.",
    "Your future self is watching you waste time.",
    "The algorithm doesn't care about your dreams.",
    "Every minute here is a minute away from success.",
    "Your competition isn't scrolling right now.",
    "This site is stealing your life, one click at a time.",
    "Your potential is being wasted on likes.",
    "The only thing you're building here is regret.",
    "Your goals don't care about your excuses.",
    "This distraction is costing you your future.",
    "Your success story won't include this website.",
    "The only thing you're gaining here is lost time.",
    "Your future self will thank you for leaving now.",
    "This site is a black hole for your productivity.",
    "Your dreams don't have a 'scroll more' button.",
    "The only thing you're achieving here is nothing.",
    "Your potential is being drained by this site.",
    "This distraction is your enemy in disguise.",
    "Your success won't come from endless scrolling.",
    "The only thing you're building here is regret.",
    "Your future is being traded for likes.",
    "This site is stealing your greatness.",
    "Your goals don't have a 'maybe later' option.",
    "The only thing you're gaining here is lost time.",
    "Your potential is being wasted on this site.",
    "This distraction is your biggest enemy.",
    "Your success story starts with closing this tab.",
    "The only thing you're building here is nothing.",
    "Your future self is disappointed in you.",
    "This site is a trap for your productivity.",
    "Your dreams don't have a 'scroll more' button.",
    "The only thing you're achieving here is regret.",
    "Your potential is being drained by this site.",
    "This distraction is costing you your future.",
    "Your success won't come from endless scrolling.",
    "The only thing you're building here is nothing.",
    "Your future is being traded for likes.",
    "This site is stealing your greatness.",
    "Your goals don't have a 'maybe later' option.",
    "The only thing you're gaining here is lost time."
];

// Audio elements
let quoteSound;
let ambientSound;
let isMuted = false;
let speechCache = new Map();

/**
 * Initialize text-to-speech functionality
 */
function initSpeech() {
    if (!window.speechSynthesis) {
        console.warn('Speech synthesis not supported');
        return;
    }

    // Set up speech synthesis with preferred voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.name.includes('Male')) || voices[0];
    
    if (preferredVoice) {
        window.speechSynthesis.defaultVoice = preferredVoice;
    }
}

/**
 * Speak text with caching for better performance
 * @param {string} text - Text to speak
 */
async function speakText(text) {
    if (isMuted || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create and configure utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;  // Slightly slower for better clarity
    utterance.pitch = 1;
    utterance.volume = 1;

    // Use cached voice if available
    if (speechCache.has(text)) {
        utterance.voice = speechCache.get(text);
    } else {
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => voice.name.includes('Male')) || voices[0];
        if (preferredVoice) {
            utterance.voice = preferredVoice;
            speechCache.set(text, preferredVoice);
        }
    }

    // Speak the text
    window.speechSynthesis.speak(utterance);
}

/**
 * Toggle mute state for speech and audio
 */
function toggleMute() {
    isMuted = !isMuted;
    const muteButton = document.getElementById('muteToggle');
    const muteIcon = muteButton.querySelector('.mute-icon');
    
    if (isMuted) {
        muteButton.classList.add('muted');
        muteIcon.innerHTML = '&#128263;'; // Muted speaker
        window.speechSynthesis.cancel();
    } else {
        muteButton.classList.remove('muted');
        muteIcon.innerHTML = '&#128266;'; // Speaker
        // Speak current quote when unmuting
        const currentQuote = document.getElementById('quote').textContent;
        if (currentQuote !== 'Loading...') {
            speakText(currentQuote);
        }
    }
}

/**
 * Get a random quote from the quotes array
 * @returns {string} - Random motivational quote
 */
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

/**
 * Play quote sound effect
 */
function playQuoteSound() {
    if (quoteSound) {
        quoteSound.currentTime = 0;
        quoteSound.play().catch(error => console.log('Audio playback failed:', error));
    }
}

/**
 * Update quote with animation and sound effects
 */
function updateQuote() {
    const quoteElement = document.getElementById('quote');
    const newQuote = getRandomQuote();
    
    // Fade out animation
    quoteElement.style.opacity = '0';
    
    setTimeout(() => {
        quoteElement.textContent = newQuote;
        // Fade in animation
        quoteElement.style.opacity = '1';
        // Play sound and speak quote
        playQuoteSound();
        speakText(newQuote);
    }, 500);
}

/**
 * Initialize audio elements
 */
function initAudio() {
    quoteSound = document.getElementById('quoteSound');
    ambientSound = document.getElementById('ambientSound');

    // Set volume levels
    if (quoteSound) quoteSound.volume = 0.5;
    if (ambientSound) ambientSound.volume = 0.2;

    // Start ambient sound
    if (ambientSound) {
        ambientSound.play().catch(error => console.log('Ambient audio playback failed:', error));
    }
}

/**
 * Initialize the blocked page when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Set initial quote
    const initialQuote = getRandomQuote();
    document.getElementById('quote').textContent = initialQuote;
    
    // Initialize audio and speech
    initAudio();
    initSpeech();
    
    // Speak initial quote
    speakText(initialQuote);
    
    // Update quote every 15 seconds
    setInterval(updateQuote, 15000);
    
    // Add click event to update quote manually
    document.getElementById('quote').addEventListener('click', updateQuote);
    
    // Add click event to mute toggle
    document.getElementById('muteToggle').addEventListener('click', toggleMute);
}); 