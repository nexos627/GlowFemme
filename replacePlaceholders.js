const { replaceInFile } = require('replace-in-file');
const path = require('path');

const options = {
  files: path.resolve('dist/index.html'),
  from: [
    /__SHOPIFY_DOMAIN__/g,
    /__SHOPIFY_TOKEN__/g,
  ],
  to: [
    process.env.VITE_SHOPIFY_DOMAIN,
    process.env.VITE_SHOPIFY_TOKEN,
  ],
  allowEmptyPaths: false,
};

try {
  const results = replaceInFile(options);
  console.log('Replacement results:', results);
} catch (error) {
  console.error('Error occurred:', error);
  process.exit(1);
}