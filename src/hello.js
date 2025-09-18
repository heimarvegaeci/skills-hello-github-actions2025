#!/usr/bin/env node

/**
 * Simple Hello World application for GitHub Actions demonstration
 * This script demonstrates basic functionality that can be tested in CI/CD
 */

const greeting = process.env.GREETING || 'Hello, GitHub Actions!';
const name = process.env.NAME || 'World';

/**
 * Main function to display greeting
 */
function main() {
    const message = `${greeting} Welcome to ${name}! 🚀`;
    console.log(message);
    
    // Exit successfully
    return 0;
}

/**
 * Simple function to validate environment
 */
function validateEnvironment() {
    const requiredVars = ['NODE_ENV'];
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
        console.warn(`⚠️  Optional environment variables not set: ${missing.join(', ')}`);
    }
    
    return true;
}

// Run the application
if (require.main === module) {
    validateEnvironment();
    process.exit(main());
}

module.exports = { main, validateEnvironment };