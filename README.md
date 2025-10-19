# Profile Card Component

A responsive, accessible profile card component built with vanilla HTML, CSS, and JavaScript. Features real-time timestamp updates, image upload functionality, and semantic markup with comprehensive test coverage.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with clean layouts for all screen sizes
- **Accessibility**: Full keyboard navigation, semantic HTML, and screen reader support
- **Image Upload**: Click-to-upload avatar functionality with validation and persistence
- **Real-time Updates**: Live timestamp display in milliseconds
- **Modern Styling**: Elegant monotone black and white design with Inter font
- **Test Ready**: Comprehensive data-testid attributes for automated testing

## 📋 Requirements Met

✅ All required elements with proper data-testid attributes  
✅ Semantic HTML structure (article, figure, nav, section, headings)  
✅ Real-time timestamp display (Date.now() in milliseconds)  
✅ Avatar with upload functionality and alt attributes  
✅ Social links with target="_blank" and rel="noopener noreferrer"  
✅ Separate hobbies and dislikes lists  
✅ Keyboard navigation with visible focus styles  
✅ Responsive layout for mobile, tablet, and desktop  

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Flexbox, responsive design, modern styling
- **Vanilla JavaScript**: DOM manipulation, file handling, localStorage
- **Google Fonts**: Inter font family for modern typography

## 📁 Project Structure

```
frontend/
├── index.html          # Main HTML structure
├── style.css           # Responsive CSS styles
├── script.js           # JavaScript functionality
├── public/
│   └── avatar.svg      # Default avatar image
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)




#### Live Server (VS Code Extension)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"


### Avatar Settings

- **Default Image**: `./public/avatar.svg`
- **Max File Size**: 5MB
- **Accepted Formats**: All image types
- **Storage**: localStorage for persistence

