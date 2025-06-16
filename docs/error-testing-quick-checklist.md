# Quick Error Page Testing Checklist

Use this checklist for rapid verification of error page functionality.

## Pre-Testing Setup
- [ ] Development server running (`npm run dev`)
- [ ] Browser dev tools open (Network + Console tabs)
- [ ] Test in multiple browsers if possible

## Core 404 Testing (5 minutes)

### Basic Functionality
- [ ] Navigate to `/nonexistent-page`
  - [ ] Custom 404 page displays
  - [ ] Warm beige background (#F1EBE2) visible
  - [ ] "404" and "Page Not Found" text present
  - [ ] Navigation suggestions work
  - [ ] "Return Home" button works
  - [ ] HTTP 404 status in Network tab
  - [ ] No console errors

### Interactive Test Suite
- [ ] Visit `/test-errors`
  - [ ] Page loads with warm beige background
  - [ ] All test case buttons work
  - [ ] Each test shows proper 404 page
  - [ ] Browser back button returns to test page

## Error Boundary Testing (3 minutes)

### Application Errors
- [ ] Visit `/test-errors/error-trigger`
  - [ ] Error boundary displays (error.tsx)
  - [ ] Warm beige background present
  - [ ] "Try again" button works
  - [ ] Error logged to console

## API Route Testing (2 minutes)

### API 404s
- [ ] Visit `/api/nonexistent`
  - [ ] JSON error response
  - [ ] HTTP 404 status
  - [ ] Content-Type: application/json

### Valid API (Control Test)
- [ ] Visit `/api/test`
  - [ ] JSON success response
  - [ ] HTTP 200 status

## Responsive Testing (3 minutes)

### Screen Sizes
- [ ] Desktop view (1920px+)
  - [ ] Layout looks good
  - [ ] All elements accessible
- [ ] Tablet view (768px)
  - [ ] Responsive layout works
  - [ ] Text remains readable
- [ ] Mobile view (375px)
  - [ ] Mobile-optimized layout
  - [ ] Touch targets adequate

## Accessibility Quick Check (2 minutes)

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter/Space activate buttons
- [ ] Focus indicators visible

### Visual Check
- [ ] Text contrast adequate
- [ ] Error icons have alt text
- [ ] Heading hierarchy logical

## Cross-Browser Spot Check (5 minutes)

Test in at least 2 browsers:
- [ ] Chrome: Basic 404 page works
- [ ] Firefox: Basic 404 page works
- [ ] Safari: Basic 404 page works (if available)
- [ ] Edge: Basic 404 page works (if available)

## Performance Quick Check (2 minutes)

### Loading Speed
- [ ] 404 page loads quickly (< 2 seconds)
- [ ] No unnecessary network requests
- [ ] No blocking resources

## Security Headers Check (1 minute)

In Network tab, verify response headers include:
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`
- [ ] `X-XSS-Protection: 1; mode=block`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`

## Automated Testing (Optional)

Run the automated test script:
```bash
node scripts/test-error-pages.js
```

- [ ] All automated tests pass
- [ ] No unexpected failures

## Common Issues to Watch For

### Visual Issues
- [ ] Background color is warm beige (#F1EBE2), not white
- [ ] Text is readable and properly styled
- [ ] Layout doesn't break on small screens
- [ ] Icons and images display correctly

### Functional Issues
- [ ] Navigation links work correctly
- [ ] Browser back button functions properly
- [ ] No JavaScript errors in console
- [ ] Proper HTTP status codes returned

### Performance Issues
- [ ] Page loads quickly
- [ ] No excessive network requests
- [ ] No console warnings about performance

## Quick Fix Verification

If you make any changes to error pages, re-test:
- [ ] Basic 404 functionality
- [ ] Warm beige background still applied
- [ ] No new console errors
- [ ] Navigation still works

## Production Testing Reminder

Before deploying:
- [ ] Test with production build (`npm run build && npm run start`)
- [ ] Verify error pages work in production mode
- [ ] Check that all styling is applied correctly

## Documentation

Record any issues found:
- [ ] Screenshot any visual problems
- [ ] Note browser-specific issues
- [ ] Document any performance concerns
- [ ] Update team on any critical issues

---

**Estimated Total Time: 20-25 minutes for complete quick check**

For comprehensive testing, use the full guide in `docs/error-testing-guide.md`.
