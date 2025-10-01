# React Hook Form Challenges - Starter

A hands-on learning platform for mastering react-hook-form. This package contains 15 challenges with empty starter templates where you implement the validation logic yourself.

## Overview

This is the starter version of the form validation challenges. Each challenge provides a styled form structure with TypeScript interfaces, but you need to implement all the react-hook-form validation logic.

## Getting Started

### From Workspace Root
```bash
npm run dev:starter
```

### From This Directory
```bash
npm install
npm run dev
```

Access the application at http://localhost:5173

## How It Works

1. Browse the available challenges on the home page
2. Select a challenge to view its requirements and hints
3. Implement the validation logic using react-hook-form
4. Test your implementation in the browser
5. Mark challenges as complete to track your progress

## Need Help?

Reference the complete solutions in the `form-playground` package:
- Path: `packages/form-playground/src/challenges/`
- Each challenge file contains a working implementation

## Challenge Structure

All 15 challenges are organized by difficulty:

### Beginner (5 challenges)
- Basic Text Validation
- Email Validation
- Password Strength Validation
- Number Range Validation
- Multi-Field Form

### Intermediate (4 challenges)
- Conditional Field Validation
- Dynamic Field Arrays
- Cross-Field Validation
- Custom Validation Rules

### Advanced (4 challenges)
- Async Validation
- Debounced Validation
- File Upload Validation
- Zod Schema Validation

### Expert (2 challenges)
- Dynamic Schema Validation
- Nested Form Arrays

## What You'll Implement

For each challenge, you'll need to:

1. Import and use the `useForm` hook from react-hook-form
2. Set up field registration with `register`
3. Add validation rules (required, minLength, pattern, validate, etc.)
4. Handle form submission with `handleSubmit`
5. Display validation errors from `formState.errors`
6. Implement advanced features like:
   - Watching field values with `watch`
   - Managing dynamic fields with `useFieldArray`
   - Async validation with API calls
   - Schema validation with Zod
   - Debouncing for performance

## Resources

- [React Hook Form Documentation](https://react-hook-form.com/)
- [React Hook Form API Reference](https://react-hook-form.com/api)
- [Zod Documentation](https://zod.dev/)

## Mock APIs

The following mock APIs are available in `utils/mockApi.ts`:

- `checkUsernameAvailability(username)` - Check if username is available
- `checkEmailExists(email)` - Check if email is already registered
- `uploadFile(file, onProgress)` - Simulate file upload with progress
- `validateCouponCode(code)` - Validate discount codes
- `fetchCountries()` - Get list of countries
- `fetchCitiesByCountry(country)` - Get cities for a country

All APIs include realistic delays for async validation practice.

## Progress Tracking

Your progress is automatically saved in browser localStorage. To reset progress, clear your browser's local storage.

## Technologies

- React 18.3
- React Hook Form 7.63
- React Router DOM 6.28
- Zod 3.23
- TypeScript 5.6
- Tailwind CSS 3.4
- Vite 5.4

## Tips

1. Start with beginner challenges to learn the basics
2. Read the requirements and hints carefully before coding
3. Use browser DevTools to inspect form state
4. Check the console for validation errors
5. Reference the form-playground solutions when stuck
6. Test edge cases and error scenarios
7. Focus on understanding concepts, not just copying code

## Building

```bash
npm run build
```

Output: `dist/`

## License

ISC
