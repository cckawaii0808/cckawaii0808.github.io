import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULTS_PATH = path.resolve(__dirname, '../data/defaults.ts');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('No config provided');
  process.exit(1);
}

const config = JSON.parse(args[0]);

let content = fs.readFileSync(DEFAULTS_PATH, 'utf-8');

// 更新 avatar_config 的 Regex
const configPattern = /avatar_config:\s*{[^}]*}/;
const newConfigStr = `avatar_config: {
    scale: ${config.scale},
    x: ${config.x},
    y: ${config.y}
  }`;

if (configPattern.test(content)) {
  content = content.replace(configPattern, newConfigStr);
} else {
  // 如果還沒有這個欄位，加在 avatar_url 後面
  content = content.replace(/(avatar_url:[^,]*),/, `$1,\n  ${newConfigStr},`);
}

fs.writeFileSync(DEFAULTS_PATH, content);
console.log('Successfully updated avatar config in defaults.ts');
