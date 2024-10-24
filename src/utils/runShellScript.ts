import { spawn } from 'child_process';
import path from 'node:path';

// Runs a shell script and streams its output in real-time
// Shows stdout in green and Docker/stderr messages in cyan
function runShellScript(scriptPath: string): void {
  // Spawn the script as a child process
  // 'ignore' stdin since we don't need it, but pipe stdout/stderr so we can read them
  const child = spawn('sh', [scriptPath], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  // Show script output in green - this catches all normal console.log() and echo statements
  child.stdout.on('data', (data) => {
    console.log('\x1b[32m%s\x1b[0m', `[STDOUT] ${data.toString().trim()}`);
  });

  // Show Docker messages in cyan - Docker usually writes to stderr even for normal operations
  child.stderr.on('data', (data) => {
    console.log('\x1b[36m%s\x1b[0m', `[DOCKER] ${data.toString().trim()}`);
  });

  // Let us know when the script finishes and if it was successful
  child.on('close', (code) => {
    if (code === 0) {
      console.log('\x1b[32m%s\x1b[0m', '✅ Script completed successfully');
    } else {
      console.log('\x1b[31m%s\x1b[0m', `❌ Script exited with code ${code}`);
    }
  });

  // Catch any errors trying to start or run the script
  // This is different from the script itself failing - this is for system-level errors
  child.on('error', (error) => {
    console.error('\x1b[31m%s\x1b[0m', '❌ Failed to start script:', error);
  });
}

// Main execution block - finds the deploy.sh script and runs it
function main() {
  try {
    // Get the full path to deploy.sh - it should be 2 levels up from this file
    const scriptPath = path.resolve(__dirname, '..', '..', 'deploy.sh');
    console.log('\x1b[35m%s\x1b[0m', `📁 Running script: ${scriptPath}`);
    runShellScript(scriptPath);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Failed to run script:', error);
  }
}

main();