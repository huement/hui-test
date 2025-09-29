<?php
/**
 * Development Server for HUI Test
 * Starts a PHP development server with /docs/ as the webroot
 */

// Configuration
$host = 'localhost';
$port = 8000;
$webroot = __DIR__ . '/docs/';
$indexFile = 'index.html';
$indexFileCSS = 'index.css';

// Check if docs directory exists
if (!is_dir($webroot)) {
    echo "Error: docs directory not found at: $webroot\n";
    echo "Please make sure the docs directory exists.\n";
    exit(1);
}

// Check if index.html exists in docs directory
if (!file_exists($webroot . $indexFile)) {
    echo "Warning: index.html not found in docs directory.\n";
    echo "The server will still start but may not display the expected content.\n";
}

// Display server information
echo "Starting HUI Test Development Server...\n";
echo "Webroot: $webroot\n";
echo "URL: http://$host:$port\n";
echo "Press Ctrl+C to stop the server\n\n";

// Start the server
$command = sprintf(
    'php -S %s:%d -t %s',
    $host,
    $port,
    escapeshellarg($webroot)
);

echo "Executing: $command\n\n";

// Execute the server command
passthru($command);
?>
