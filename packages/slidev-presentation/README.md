# Input Validation Presentation

Educational slides covering input validation, XSS vulnerabilities, and security best practices for frontend applications.

## Getting Started

### From Workspace Root
```bash
npm run dev:slides
```

### From This Directory
```bash
npm install
npm run dev
```

Access the presentation at http://localhost:3030

## Building

### Export to PDF
```bash
npm run export
```

### Build for Production
```bash
npm run build
```

Output: `dist/`

## Content

The presentation covers:

- Understanding XSS vulnerabilities (Reflected, Stored, DOM-based)
- Validation contexts (HTML, JavaScript, CSS, URL)
- Server-side vs client-side validation
- Sanitization techniques
- Best practices and tools
- Interactive demonstrations

## Editing

Edit the slides in `slides.md` using Markdown syntax with Slidev extensions.

## Technologies

- Slidev (presentation framework)
- Vue 3 (interactive components)
- DOMPurify (sanitization demos)

## License

ISC
