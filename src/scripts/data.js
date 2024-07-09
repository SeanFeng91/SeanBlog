import { promises as fs } from 'fs';
import path from 'path';

export async function get() {
  const filePath = path.resolve('../../src/pages/data.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return {
    body: JSON.parse(data)
  };
}
