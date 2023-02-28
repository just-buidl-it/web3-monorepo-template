import { execSync } from 'child_process';

// Execute Child Processes
const exec = (cmd: string, srcDir: string): Buffer => {
  try {
    return execSync(cmd, { cwd: srcDir, stdio: 'inherit' });
  } catch (e) {
    throw new Error(`Failed to run command \`${cmd}\``);
  }
};

export default exec;
