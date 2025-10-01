# React Hook Form Learning Workspace

This is a monorepo containing two packages for learning and practicing form validation:

1. **Slidev Presentation** - Educational slides about input validation and XSS vulnerabilities
2. **Form Playground** - Interactive React application for mastering react-hook-form

## Getting Started

### Installation

```bash
npm install
```

### Running the Projects

#### Run Form Playground (default)
```bash
npm run dev
```
Access at http://localhost:5173

#### Run Slidev Presentation
```bash
npm run dev:slides
```
Access at http://localhost:3030

#### Run Both
Open two terminal windows and run each command separately.

### Building

```bash
# Build all packages
npm run build

# Build specific package
npm run build:playground
npm run build:slides
```

## Workspace Structure

```
.
├── packages/
│   ├── slidev-presentation/    # Educational presentation
│   └── form-playground/        # Interactive React app
├── package.json                # Workspace configuration
└── README.md                   # This file
```

## Form Playground

The Form Playground provides 15 escalating challenges to master react-hook-form:

### Beginner Level
- Basic text validation
- Email validation
- Password strength validation
- Number range validation
- Multi-field forms

### Intermediate Level
- Conditional field validation
- Dynamic field arrays
- Cross-field validation
- Custom validation rules

### Advanced Level
- Async validation with mocked APIs
- Debounced validation
- File upload validation
- Zod schema validation

### Expert Level
- Dynamic schema validation
- Nested form arrays
- Complex real-world scenarios

## Features

- Progress tracking with local storage
- Interactive challenges with requirements and hints
- Solution examples for each challenge
- Mocked API services for realistic async operations
- No external database dependencies

## Technologies

- React 18
- React Hook Form 7
- Zod (for schema validation challenges)
- TypeScript
- Tailwind CSS
- Vite
- Slidev

## Contributing

To add a new challenge:

1. Create the challenge component in `packages/form-playground/src/challenges/{difficulty}/`
2. Add the challenge to the registry in `packages/form-playground/src/challenges/index.ts`
3. Define requirements, hints, and metadata

## License

ISC
