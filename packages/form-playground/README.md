# React Hook Form Playground

An interactive learning platform for mastering react-hook-form through escalating challenges.

## Overview

This application provides 15 carefully crafted challenges that progressively teach form validation concepts, from basic field validation to expert-level patterns like dynamic schemas and nested arrays.

## Features

- **15 Challenges** across 4 difficulty levels (Beginner, Intermediate, Advanced, Expert)
- **Progress Tracking** using local storage
- **Interactive Learning** with requirements, hints, and working solutions
- **Mocked APIs** for realistic async validation scenarios
- **No Database Required** - completely client-side
- **Type-Safe** with TypeScript

## Challenge Categories

### Basic Validation (Beginner)
Learn fundamental react-hook-form concepts including register, errors, and validation rules.

### Dynamic Forms (Intermediate)
Master conditional fields, dynamic arrays, and complex validation logic.

### Async Operations & Performance (Advanced)
Implement async validation, debouncing, file uploads, and Zod schema validation.

### Advanced Patterns (Expert)
Handle dynamic schemas, deeply nested structures, and production-ready patterns.

## Getting Started

### From Workspace Root
```bash
npm run dev:playground
```

### From This Directory
```bash
npm install
npm run dev
```

Access the application at http://localhost:5173

## Project Structure

```
src/
├── challenges/          # Challenge implementations
│   ├── beginner/       # Basic validation challenges
│   ├── intermediate/   # Dynamic form challenges
│   ├── advanced/       # Async & schema validation
│   ├── expert/         # Complex patterns
│   └── index.ts        # Challenge registry
├── components/         # Reusable UI components
├── pages/             # Route components
├── utils/             # Mock APIs and storage
└── types/             # TypeScript definitions
```

## Adding New Challenges

1. Create component in appropriate difficulty folder
2. Import and add to `challenges/index.ts`
3. Define metadata:
   - id, title, difficulty, category
   - description, requirements, hints
   - component reference

Example:
```typescript
{
  id: 'my-challenge',
  title: 'My Challenge',
  difficulty: 'intermediate',
  category: 'Dynamic Forms',
  description: 'Learn to...',
  requirements: ['Requirement 1', 'Requirement 2'],
  hints: ['Hint 1', 'Hint 2'],
  component: MyChallenge
}
```

## Mock APIs

The playground includes mock APIs in `utils/mockApi.ts`:

- `checkUsernameAvailability` - Validate username uniqueness
- `checkEmailExists` - Check if email is registered
- `uploadFile` - Simulate file upload with progress
- `validateCouponCode` - Validate discount codes
- `fetchCountries` / `fetchCitiesByCountry` - Dependent dropdowns

All APIs include realistic delays for async validation practice.

## Technologies

- React 18.3
- React Hook Form 7.63
- React Router DOM 6.28
- Zod 3.23 (schema validation)
- TypeScript 5.6
- Tailwind CSS 3.4
- Vite 5.4

## Building

```bash
npm run build
```

Output: `dist/`

## Development Tips

- Use React DevTools to inspect form state
- Check browser console for validation errors
- Study working solutions before attempting challenges
- Progress is saved automatically in localStorage
- Reset progress by clearing browser storage

## License

ISC
