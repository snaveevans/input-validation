# React Hook Form Learning Workspace

This is a monorepo containing three packages for learning and practicing form validation:

1. **Slidev Presentation** - Educational slides about input validation and XSS vulnerabilities
2. **Form Playground** - Interactive React application with complete react-hook-form solutions
3. **Form Challenges Starter** - Empty templates for hands-on practice and learning

## Getting Started

### Installation

```bash
npm install
```

### Running the Projects

#### Run Form Playground (default - with complete solutions)
```bash
npm run dev
# or
npm run dev:playground
```
Access at http://localhost:5173

#### Run Form Challenges Starter (for hands-on practice)
```bash
npm run dev:starter
```
Access at http://localhost:5173

#### Run Slidev Presentation
```bash
npm run dev:slides
```
Access at http://localhost:3030

**Note:** Only run one React app at a time (playground or starter) as they use the same port.

### Building

```bash
# Build all packages
npm run build

# Build specific package
npm run build:playground
npm run build:starter
npm run build:slides
```

## Workspace Structure

```
.
├── packages/
│   ├── slidev-presentation/      # Educational presentation
│   ├── form-playground/          # React app with complete solutions
│   └── form-challenges-starter/  # React app with empty templates
├── package.json                  # Workspace configuration
└── README.md                     # This file
```

## Packages Overview

### Form Playground

The Form Playground provides 15 complete, working solutions for react-hook-form challenges. Use this to:
- Study working implementations
- Understand best practices
- Reference solutions while working on the starter challenges

### Form Challenges Starter

The Starter package provides empty templates where you implement the validation yourself. Features:
- Pre-styled forms with Tailwind CSS
- TypeScript interfaces defined
- Requirements, hints, and guidance for each challenge
- Reference path to complete solutions in form-playground
- Progress tracking with localStorage

**Both packages include the same 15 challenges:**

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

## Key Features

- **Two Learning Modes**: Study complete solutions (playground) or practice from scratch (starter)
- **15 Progressive Challenges**: From beginner to expert level
- **Progress Tracking**: Automatic save with localStorage
- **Mock APIs**: Realistic async validation scenarios
- **Type-Safe**: Full TypeScript support
- **No Database Required**: Fully client-side applications

## Technologies

- React 18
- React Hook Form 7
- Zod (for schema validation challenges)
- TypeScript
- Tailwind CSS
- Vite
- Slidev

## Learning Path

**Recommended approach:**

1. Start with the **Form Challenges Starter** package
2. Pick a challenge and read the requirements
3. Try implementing the validation yourself
4. If stuck, reference the complete solution in **Form Playground**
5. Mark challenges as complete to track progress
6. Move through difficulties: Beginner → Intermediate → Advanced → Expert

## Contributing

To add a new challenge to both packages:

1. Create the complete solution in `packages/form-playground/src/challenges/{difficulty}/`
2. Create the starter template in `packages/form-challenges-starter/src/challenges/{difficulty}/`
3. Add the challenge to the registry in both packages: `src/challenges/index.ts`
4. Define requirements, hints, and metadata

## License

ISC
