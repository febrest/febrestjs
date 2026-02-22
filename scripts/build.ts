import { assemble } from 't-packer';
import fs from 'node:fs';
import path from 'node:path';

const packages = fs.readdirSync(path.join(__dirname, '../packages'));
const build = () => {
  return Promise.all(
    packages.map((pkg) => {
      return assemble({
        src: `packages/${pkg}/src`,
        output: `packages/${pkg}/dist`,
      });
    })
  );
};

if (require.main === module) {
  build();
}
