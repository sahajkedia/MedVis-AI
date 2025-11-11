import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const backendDir = path.join(repoRoot, 'backend');
const port = process.env.API_PORT || '8000';

// Candidate uvicorn executables to try
const candidates = [
  path.join(backendDir, '.venv', 'bin', 'uvicorn'),
  path.join(backendDir, 'venv', 'bin', 'uvicorn'),
  path.join(backendDir, 'Scripts', 'uvicorn.exe'), // Windows venv
  path.join(backendDir, '.venv', 'Scripts', 'uvicorn.exe'), // Windows venv
  'uvicorn',
  'python3 -m uvicorn',
  'python -m uvicorn'
];

function parseCmd(cmd) {
  const parts = cmd.split(' ');
  return { command: parts[0], args: parts.slice(1) };
}

function trySpawn() {
  for (const candidate of candidates) {
    const { command, args } = parseCmd(candidate);
    if (path.isAbsolute(command) && !existsSync(command)) continue;
    const uvicornArgs = [
      ...args,
      'app.main:app',
      '--reload',
      '--port',
      port,
      '--app-dir',
      'backend'
    ];
    try {
      const child = spawn(command, uvicornArgs, {
        stdio: 'inherit',
        env: process.env,
        shell: true
      });
      child.on('exit', (code, signal) => {
        if (signal) {
          process.kill(process.pid, signal);
        } else {
          process.exit(code ?? 0);
        }
      });
      process.on('SIGINT', () => child.kill('SIGINT'));
      process.on('SIGTERM', () => child.kill('SIGTERM'));
      return true;
    } catch {
      // try next candidate
    }
  }
  return false;
}

const ok = trySpawn();
if (!ok) {
  console.error(
    [
      'Failed to start backend: uvicorn not found.',
      'Quickstart:',
      '  cd backend',
      '  python3 -m venv .venv',
      '  source .venv/bin/activate',
      '  pip install -r requirements.txt',
      '',
      'Then re-run: npm run dev:all'
    ].join('\n')
  );
  process.exit(1);
}


