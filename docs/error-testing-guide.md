# Complete Error Page Testing Guide

This guide provides step-by-step instructions for thoroughly testing all error pages in the Next.js application.

## 📋 Quick Start

For rapid testing, use the **Quick Checklist**: `docs/error-testing-quick-checklist.md` (20 minutes)

For comprehensive testing, follow this complete guide (60+ minutes)

## 🤖 Automated Testing

Run the automated test suite first:
```bash
npm run test:errors
# or
node scripts/test-error-pages.js
```

This will verify basic functionality and highlight any major issues before manual testing.

## Phase 1: Initial Setup and Verification

### Step 1: Start Development Server
```bash
npm run dev
# or
yarn dev
```

### Step 2: Verify Base Functionality
1. Open browser to `http://localhost:3000`
2. Confirm homepage loads correctly with warm beige background (#F1EBE2)
3. Open browser developer tools (F12)
4. Navigate to Network and Console tabs

## Phase 2: 404 Error Page Testing

### Test 2.1: Basic 404 Routes
**Objective**: Verify custom 404 page displays correctly

**Test Cases**:
1. Navigate to `http://localhost:3000/nonexistent-page`
2. Navigate to `http://localhost:3000/some/deep/nested/path`
3. Navigate to `http://localhost:3000/admin`
4. Navigate to `http://localhost:3000/blog/post-123`

**Expected Results**:
- [ ] Custom not-found.tsx component displays
- [ ] Warm beige background (#F1EBE2) is applied
- [ ] "404" error code is prominently displayed
- [ ] "Page Not Found" title is shown
- [ ] Navigation suggestions are present and functional
- [ ] "Return Home" button works correctly
- [ ] Network tab shows 404 HTTP status code
- [ ] No JavaScript errors in console

### Test 2.2: Interactive Testing Interface
**Objective**: Use built-in test interface

**Steps**:
1. Navigate to `http://localhost:3000/test-errors`
2. Verify test page loads with warm beige background
3. Test each provided test case by clicking "Test This Route →"
4. For each test case, verify:
   - [ ] Proper 404 page display
   - [ ] Correct HTTP status code in Network tab
   - [ ] Browser back button returns to test page
   - [ ] No console errors

### Test 2.3: URL Variations
**Objective**: Test edge cases and URL handling

**Test Cases**:
1. **Trailing Slash**: `http://localhost:3000/test-errors/`
   - Should redirect to `/test-errors` (301 status)
2. **Query Parameters**: `http://localhost:3000/nonexistent?param=value`
   - Should show 404 page, preserve query params in URL
3. **Hash Fragments**: `http://localhost:3000/nonexistent#section`
   - Should show 404 page, preserve hash in URL
4. **Special Characters**: `http://localhost:3000/café`
   - Should handle Unicode characters properly

## Phase 3: Error Boundary Testing

### Test 3.1: Application Error Boundary
**Objective**: Test error.tsx component

**Steps**:
1. Navigate to `http://localhost:3000/test-errors/error-trigger`
2. This should trigger the error boundary

**Expected Results**:
- [ ] error.tsx component displays
- [ ] Warm beige background (#F1EBE2) is applied
- [ ] Error icon and "Something went wrong!" message shown
- [ ] "Try again" button is present and functional
- [ ] Error is logged to console
- [ ] No infinite error loops

### Test 3.2: Global Error Boundary
**Objective**: Test global-error.tsx component

**Note**: Global errors are harder to trigger in development. This typically catches errors in the root layout.

**Manual Test**:
1. Temporarily modify `src/app/layout.tsx` to throw an error
2. Refresh the page
3. Verify global-error.tsx displays
4. Revert the layout change

## Phase 4: API Route Error Testing

### Test 4.1: Non-existent API Routes
**Objective**: Verify API 404 handling

**Test Cases**:
1. Open browser to `http://localhost:3000/api/nonexistent`
2. Open browser to `http://localhost:3000/api/users/123`

**Expected Results**:
- [ ] JSON error response returned
- [ ] HTTP 404 status code
- [ ] Content-Type: application/json header
- [ ] No custom 404 page (just JSON response)

### Test 4.2: Valid API Route (Control Test)
**Objective**: Confirm valid API routes work

**Steps**:
1. Navigate to `http://localhost:3000/api/test`
2. Verify JSON response with success message

## Phase 5: Static Asset Error Testing

### Test 5.1: Non-existent Static Files
**Objective**: Test static asset 404 handling

**Test Cases**:
1. `http://localhost:3000/images/nonexistent.jpg`
2. `http://localhost:3000/fonts/nonexistent.woff2`
3. `http://localhost:3000/favicon-missing.ico`

**Expected Results**:
- [ ] HTTP 404 status code
- [ ] No custom 404 page
- [ ] Appropriate Content-Type headers
- [ ] Fast response time

## Phase 6: Navigation Method Testing

### Test 6.1: Client-Side Navigation
**Objective**: Test different navigation methods

**Test Cases**:
1. **Link Navigation**: Use Next.js Link components to navigate to non-existent routes
2. **Programmatic Navigation**: Use router.push() in browser console
3. **Browser Navigation**: Use address bar, back/forward buttons
4. **Bookmark Navigation**: Bookmark a 404 URL and revisit

**Expected Results**:
- [ ] All methods trigger not-found.tsx
- [ ] Browser history works correctly
- [ ] No JavaScript errors

## Phase 7: Responsive and Accessibility Testing

### Test 7.1: Responsive Design
**Objective**: Verify error pages work on all screen sizes

**Steps**:
1. Open browser dev tools
2. Test various viewport sizes:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)
3. Navigate to 404 page at each size

**Expected Results**:
- [ ] Layout adapts properly
- [ ] Text remains readable
- [ ] Buttons remain accessible
- [ ] No horizontal scrolling

### Test 7.2: Accessibility Testing
**Objective**: Verify accessibility compliance

**Steps**:
1. Navigate to 404 page
2. Test keyboard navigation (Tab, Enter, Space)
3. Test with screen reader (if available)
4. Check color contrast

**Expected Results**:
- [ ] All interactive elements reachable via keyboard
- [ ] Focus indicators visible
- [ ] Proper heading hierarchy
- [ ] Alt text on images/icons
- [ ] ARIA labels where appropriate

## Phase 8: Performance Testing

### Test 8.1: Loading Performance
**Objective**: Verify error pages load quickly

**Steps**:
1. Open Network tab in dev tools
2. Navigate to 404 page
3. Check loading metrics

**Expected Results**:
- [ ] Page loads in under 2 seconds
- [ ] Minimal resource requests
- [ ] No blocking resources
- [ ] Good Core Web Vitals scores

## Phase 9: Cross-Browser Testing

### Test 9.1: Browser Compatibility
**Objective**: Verify error pages work across browsers

**Browsers to Test**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Test Cases for Each Browser**:
- [ ] Basic 404 page display
- [ ] Navigation functionality
- [ ] Responsive design
- [ ] JavaScript functionality

## Phase 10: Production-Like Testing

### Test 10.1: Build and Production Mode
**Objective**: Test error pages in production build

**Steps**:
```bash
npm run build
npm run start
```

**Test Cases**:
1. Repeat key tests from previous phases
2. Verify error pages work in production mode
3. Check for any build-specific issues

## Troubleshooting Common Issues

### Issue: 404 Page Not Showing
**Solutions**:
- Check that `not-found.tsx` is in `src/app/` directory
- Verify file naming is correct (not `not-found.js`)
- Check for TypeScript errors

### Issue: Styling Not Applied
**Solutions**:
- Verify CSS Module import in `not-found.tsx`
- Check class names match CSS file
- Ensure warm beige background color is defined

### Issue: Navigation Not Working
**Solutions**:
- Check Link components have correct href attributes
- Verify navigation suggestions in `src/lib/navigation.ts`
- Test with browser dev tools Network tab

### Issue: Console Errors
**Solutions**:
- Check for missing dependencies
- Verify all imports are correct
- Look for hydration mismatches

## Test Results Documentation

Create a test results document with:
- [ ] Date and time of testing
- [ ] Browser versions tested
- [ ] Pass/fail status for each test case
- [ ] Screenshots of any issues
- [ ] Performance metrics
- [ ] Accessibility audit results

## Automated Testing Recommendations

Consider implementing:
- [ ] Unit tests for navigation utilities
- [ ] Integration tests for error page rendering
- [ ] E2E tests for critical error scenarios
- [ ] Performance regression tests
- [ ] Accessibility automated testing
