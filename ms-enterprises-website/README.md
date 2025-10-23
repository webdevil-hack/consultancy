# M.S. Enterprises Website

A modern, responsive 5-page website for M.S. Enterprises featuring stunning 3D animations, modern UI design, and comprehensive fintech consultancy services information.

## 🌟 Features

- **5 Complete Pages**: Home, About Us, Services, Contact Us
- **Modern UI/UX**: Clean, professional design with gradient effects
- **3D Animations**: Interactive 3D elements including rotating cubes, floating cards, and morphing shapes
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Elements**: 
  - Animated counters
  - Testimonial carousel
  - FAQ accordions
  - Contact form with validation
  - Hover effects and transitions
- **Performance Optimized**: Fast loading with optimized animations
- **Cross-browser Compatible**: Works on all modern browsers

## 📁 Project Structure

```
ms-enterprises-website/
├── index.html          # Homepage
├── about.html          # About Us page
├── services.html       # Services page
├── contact.html        # Contact Us page
├── css/
│   ├── styles.css      # Main stylesheet
│   └── animations.css  # Animation styles
├── js/
│   ├── main.js         # Main JavaScript
│   └── animations.js   # Animation scripts
├── package.json        # Project metadata
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Installation

1. Clone or download the project files
2. Navigate to the project directory

### Running the Website

#### Option 1: Using Python (if installed)
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

#### Option 2: Using Node.js/npm (if installed)
```bash
npm install
npm start
```
Then open `http://localhost:8000` in your browser.

#### Option 3: Direct File Access
Simply open `index.html` in your web browser.

## 📄 Pages Overview

### 1. **Homepage** (index.html)
- Hero section with 3D rotating cube
- About preview with animated cards
- Services overview
- Statistics counter
- Process timeline
- Testimonials carousel
- Call-to-action section

### 2. **About Us** (about.html)
- Company story
- Timeline of milestones
- Core values with 3D cards
- Team member profiles
- Why choose us section

### 3. **Services** (services.html)
- Detailed accounting services
- Technology services
- Service process
- Pricing plans
- Technology stack
- FAQ section

### 4. **Contact Us** (contact.html)
- Contact form with validation
- Office information
- Map placeholder
- Quick contact methods
- Social media links
- Contact FAQs

## 🎨 Design Features

### Color Scheme
- Primary: #6366f1 (Purple)
- Secondary: #3b82f6 (Blue)
- Accent: #10b981 (Green)
- Dark: #1e293b
- Light: #f8fafc

### Typography
- Font Family: Poppins (Google Fonts)
- Responsive font sizes
- Clear hierarchy

### Animations
- Scroll-triggered animations
- 3D transformations
- Parallax effects
- Hover animations
- Loading states
- Particle effects

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **JavaScript**: Vanilla JS for interactivity
- **Font Awesome**: Icon library
- **Google Fonts**: Typography

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #3b82f6;
    --accent-color: #10b981;
    /* ... */
}
```

### Adding Content
Each section is clearly marked in the HTML files. Simply locate the section you want to modify and update the content.

### Modifying Animations
Animation settings can be adjusted in `css/animations.css` and `js/animations.js`.

## 📈 Performance Tips

1. **Optimize Images**: Use compressed images in production
2. **Minify Files**: Minify CSS and JS for production
3. **Enable Caching**: Configure server-side caching
4. **Use CDN**: Consider using a CDN for static assets

## 🤝 Support

For support or questions about the website, please contact:
- Email: info@msenterprises.com
- Phone: +1 (555) 123-4567

## 📄 License

This project is licensed under the MIT License.

---

**M.S. Enterprises** - *Transforming Finance Through Technology*