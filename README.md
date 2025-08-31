# GO FOCUS - Extension 

A honest Chrome extension that motivates you to stay focused by blocking distracting websites with reality-check motivational messages and a cyberpunk 3D look.

## Installation

1. Download this zip file of repository.
2. Extract all files from zip.
3. Open Chrome or Chromium-based browsers and navigate to `chrome://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select the extension folder
6. The extension icon should appear in your toolbar

## Usage

1. **Add Sites to Block**:
   - Click the extension icon
   - Enter a domain (e.g., "youtube.com")
   - Click "Block Site"

2. **Remove Sites**:
   - Click "Remove" next to a blocked site
   - Choose "Success – I'm Strong" to keep it blocked
   - Choose "Failure – Remove Anyway" to unblock

3. **When Sites Are Blocked**:
   - You'll see a motivational quote
   - The robot will speak the message
   - Click the quote to get a new one
   - Use the mute button to toggle audio
   - Quotes auto-update every 15 seconds

## Features

- **Site Blocking**: Block any website by entering its domain
- **Motivational Quotes**: Harsh, reality-check quotes to keep you focused
- **Text-to-Speech**: Robotic voice reads motivational messages
- **Animated UI**: Cyberpunk-style, 3D header, and effects
- **Interactive Robot**: Animated robot character with glowing eyes
- **Matrix Effects**: Green matrix rain effects on buttons
- **Audio Feedback**: Sound effects and ambient audio
- **3D Header**: Popup header with a bold, 3D look

## File Structure

### Core Extension Files
- `manifest.json` - Extension configuration and permissions
- `background.js` - Service worker for site blocking logic
- `popup.js` - Popup interface functionality
- `modal.js` - Motivation modal and speech synthesis
- `blocked.js` - Blocked site page with quotes and audio

### HTML Pages
- `popup.html` - Extension popup interface
- `modal.html` - Motivation modal page
- `blocked.html` - Blocked site page with quotes

### Stylesheets
- `popup.css` - Popup interface styling
- `modal.css` - Modal and matrix effects styling
- `blocked.css` - Blocked page with cyber grid background
- `warning-popup.css` - Warning popup with animated robot

### Assets
- `icons/` - Extension icons (16px, 48px, 128px)

## Code Organization

### JavaScript Files

#### `background.js`
- **Purpose**: Service worker for site blocking
- **Key Functions**:
  - `onBeforeNavigate` listener for intercepting navigation
  - Site blocking logic with hostname matching
  - Storage initialization on extension install

#### `popup.js`
- **Purpose**: Popup interface management
- **Key Functions**:
  - `loadBlockedSites()` - Load and display blocked sites
  - `addBlockedSite()` - Add new sites to block list
  - `removeBlockedSite()` - Remove sites from block list
  - `showMotivationModal()` - Display motivation modal
  - `isValidDomain()` - Domain validation

#### `modal.js`
- **Purpose**: Motivation modal functionality
- **Key Functions**:
  - `showModal()` / `hideModal()` - Modal visibility control
  - `speakQuote()` - Text-to-speech with robotic voice
  - Event listeners for success/failure buttons

#### `blocked.js`
- **Purpose**: Blocked page functionality
- **Key Functions**:
  - `initSpeech()` - Initialize text-to-speech
  - `speakText()` - Speak quotes with caching
  - `updateQuote()` - Rotate motivational quotes
  - `toggleMute()` - Audio mute control
  - Quote rotation every 30 seconds

### CSS Organization

#### `popup.css`
- CSS variables for consistent theming
- Popup layout and styling
- Animated background stripe
- Custom scrollbar styling

#### `modal.css`
- Modal overlay and content styling
- Matrix rain button effects
- Quote text animations
- Responsive design for mobile

#### `blocked.css`
- Cyber grid background animation
- Robot styling (moved to inline styles)
- Quote container effects
- Neon mute button styling

#### `warning-popup.css`
- Warning popup modal styling
- Animated robot character
- Button hover effects
- Text glow animations



## Customization

### Adding New Quotes
Edit the `quotes` array in `blocked.js` to add your own motivational messages.

### Changing Colors
Modify CSS variables in the respective CSS files:
```css
:root {
    --primary-color: #ff3e3e;
    --secondary-color: #2a2a72;
    --accent-color: #00ff88;
    --background: #1a1a2e;
    --text-color: #ffffff;
}
```

### Modifying Animations
Adjust animation durations and effects in the CSS files to change the visual experience.

### 3D Header
The popup header uses a 3D text-shadow and perspective effect for a bold look. Adjust in `popup.css` under `h1`.

## Browser Compatibility

- Chrome 88+ (Manifest V3)
- Edge 88+ (Chromium-based)
- Other Chromium-based browsers

## License

This project is open source and available under the MIT License.

## Author

Siddharth Prabhakar - Creator of GO FOCUS Extension 

