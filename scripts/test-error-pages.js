#!/usr/bin/env node

/**
 * Automated Error Page Testing Script
 * 
 * This script performs automated testing of error pages by making HTTP requests
 * and verifying the responses. Run this alongside manual testing.
 * 
 * Usage:
 *   node scripts/test-error-pages.js
 *   
 * Prerequisites:
 *   - Development server running on localhost:3000
 *   - Node.js with fetch support (Node 18+)
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

// Test cases for different error scenarios
const TEST_CASES = [
  // 404 Page Routes
  {
    name: 'Basic 404 - Non-existent page',
    url: '/nonexistent-page',
    expectedStatus: 404,
    expectedType: 'html',
    shouldContain: ['404', 'Page Not Found', '#F1EBE2']
  },
  {
    name: 'Nested 404 - Deep path',
    url: '/some/deep/nested/path',
    expectedStatus: 404,
    expectedType: 'html',
    shouldContain: ['404', 'Page Not Found']
  },
  {
    name: 'File extension 404',
    url: '/document.pdf',
    expectedStatus: 404,
    expectedType: 'html',
    shouldContain: ['404']
  },
  {
    name: 'Query parameters 404',
    url: '/nonexistent?param=value&test=123',
    expectedStatus: 404,
    expectedType: 'html',
    shouldContain: ['404']
  },
  
  // API Route Tests
  {
    name: 'API 404 - Non-existent endpoint',
    url: '/api/nonexistent',
    expectedStatus: 404,
    expectedType: 'json',
    shouldContain: ['error', '404']
  },
  {
    name: 'API 404 - Non-existent with params',
    url: '/api/users/123',
    expectedStatus: 404,
    expectedType: 'json',
    shouldContain: ['error']
  },
  
  // Valid Routes (Control Tests)
  {
    name: 'Valid route - Homepage',
    url: '/',
    expectedStatus: 200,
    expectedType: 'html',
    shouldContain: ['#F1EBE2']
  },
  {
    name: 'Valid route - Test errors page',
    url: '/test-errors',
    expectedStatus: 200,
    expectedType: 'html',
    shouldContain: ['Test Suite', '#F1EBE2']
  },
  {
    name: 'Valid API route',
    url: '/api/test',
    expectedStatus: 200,
    expectedType: 'json',
    shouldContain: ['message', 'working correctly']
  },
  
  // Static Asset Tests
  {
    name: 'Static asset 404 - Image',
    url: '/images/nonexistent.jpg',
    expectedStatus: 404,
    expectedType: 'other',
    shouldContain: []
  },
  {
    name: 'Static asset 404 - Font',
    url: '/fonts/nonexistent.woff2',
    expectedStatus: 404,
    expectedType: 'other',
    shouldContain: []
  },
  
  // Trailing Slash Tests
  {
    name: 'Trailing slash redirect',
    url: '/test-errors/',
    expectedStatus: 301,
    expectedType: 'redirect',
    shouldContain: []
  }
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

async function testUrl(testCase) {
  const { name, url, expectedStatus, expectedType, shouldContain } = testCase;
  const fullUrl = `${BASE_URL}${url}`;
  
  console.log(`\n${colorize('Testing:', 'cyan')} ${name}`);
  console.log(`${colorize('URL:', 'blue')} ${fullUrl}`);
  
  try {
    const response = await fetch(fullUrl, {
      redirect: 'manual' // Don't follow redirects automatically
    });
    
    const actualStatus = response.status;
    const contentType = response.headers.get('content-type') || '';
    
    // Check status code
    const statusMatch = actualStatus === expectedStatus;
    console.log(`${colorize('Status:', 'blue')} ${actualStatus} ${statusMatch ? colorize('✓', 'green') : colorize('✗', 'red')} (expected ${expectedStatus})`);
    
    // Check content type
    let typeMatch = true;
    if (expectedType === 'html') {
      typeMatch = contentType.includes('text/html');
    } else if (expectedType === 'json') {
      typeMatch = contentType.includes('application/json');
    } else if (expectedType === 'redirect') {
      typeMatch = actualStatus >= 300 && actualStatus < 400;
    }
    
    console.log(`${colorize('Content-Type:', 'blue')} ${contentType} ${typeMatch ? colorize('✓', 'green') : colorize('✗', 'red')}`);
    
    // Check response content
    let contentMatches = 0;
    if (shouldContain.length > 0 && actualStatus !== 301) {
      const responseText = await response.text();
      
      for (const searchTerm of shouldContain) {
        const found = responseText.toLowerCase().includes(searchTerm.toLowerCase());
        if (found) contentMatches++;
        console.log(`${colorize('Contains:', 'blue')} "${searchTerm}" ${found ? colorize('✓', 'green') : colorize('✗', 'red')}`);
      }
    }
    
    // Check security headers for HTML responses
    if (expectedType === 'html' && actualStatus === 200) {
      const securityHeaders = [
        'x-content-type-options',
        'x-frame-options',
        'x-xss-protection',
        'referrer-policy'
      ];
      
      console.log(`${colorize('Security Headers:', 'blue')}`);
      for (const header of securityHeaders) {
        const value = response.headers.get(header);
        console.log(`  ${header}: ${value ? colorize(value, 'green') : colorize('Missing', 'red')}`);
      }
    }
    
    // Overall result
    const allPassed = statusMatch && typeMatch && (shouldContain.length === 0 || contentMatches === shouldContain.length);
    console.log(`${colorize('Result:', 'bright')} ${allPassed ? colorize('PASS', 'green') : colorize('FAIL', 'red')}`);
    
    return {
      name,
      url,
      passed: allPassed,
      status: actualStatus,
      contentType,
      details: {
        statusMatch,
        typeMatch,
        contentMatches: `${contentMatches}/${shouldContain.length}`
      }
    };
    
  } catch (error) {
    console.log(`${colorize('Error:', 'red')} ${error.message}`);
    return {
      name,
      url,
      passed: false,
      error: error.message
    };
  }
}

async function runAllTests() {
  console.log(colorize('🧪 Error Page Testing Script', 'bright'));
  console.log(colorize('================================', 'bright'));
  console.log(`${colorize('Base URL:', 'blue')} ${BASE_URL}`);
  console.log(`${colorize('Total Tests:', 'blue')} ${TEST_CASES.length}`);
  
  const results = [];
  
  for (const testCase of TEST_CASES) {
    const result = await testUrl(testCase);
    results.push(result);
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Summary
  console.log('\n' + colorize('📊 Test Summary', 'bright'));
  console.log(colorize('================', 'bright'));
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.length - passed;
  
  console.log(`${colorize('Total Tests:', 'blue')} ${results.length}`);
  console.log(`${colorize('Passed:', 'green')} ${passed}`);
  console.log(`${colorize('Failed:', 'red')} ${failed}`);
  console.log(`${colorize('Success Rate:', 'blue')} ${((passed / results.length) * 100).toFixed(1)}%`);
  
  if (failed > 0) {
    console.log('\n' + colorize('❌ Failed Tests:', 'red'));
    results.filter(r => !r.passed).forEach(result => {
      console.log(`  • ${result.name} (${result.url})`);
      if (result.error) {
        console.log(`    Error: ${result.error}`);
      }
    });
  }
  
  console.log('\n' + colorize('💡 Next Steps:', 'yellow'));
  console.log('1. Review any failed tests above');
  console.log('2. Run manual testing using the guide in docs/error-testing-guide.md');
  console.log('3. Test responsive design and accessibility manually');
  console.log('4. Test in different browsers');
  console.log('5. Test in production build mode');
  
  process.exit(failed > 0 ? 1 : 0);
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch(BASE_URL);
    return response.ok;
  } catch {
    return false;
  }
}

// Main execution
async function main() {
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log(colorize('❌ Error: Development server not running', 'red'));
    console.log(`Please start the server first:`);
    console.log(`  npm run dev`);
    console.log(`  # or`);
    console.log(`  yarn dev`);
    console.log(`\nThen run this script again.`);
    process.exit(1);
  }
  
  await runAllTests();
}

main().catch(console.error);
