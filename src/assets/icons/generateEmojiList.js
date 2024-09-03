const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname);
const outputPath = path.join(__dirname, '/emojiList.ts');

function toCamelCase(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  const imports = [];
  const entries = [];

  files.forEach((file) => {
    const name = path.basename(file, '.svg');
    const pascalName = toCamelCase(name);
    imports.push(`import ${pascalName} from './${file}';`);
    entries.push(`${pascalName},`);
  });

  const content = `${imports.join('\n')}

  const NON_FACE_EMOJI_LIST = {
    ${entries.filter((entry) => !entry.includes('Face')).join('\n')}
  } as const;

  const FACE_EMOJI_LIST = {
    ${entries.filter((entry) => entry.includes('Face')).join('\n')}
  } as const;


export const EMOJI_LIST = {
  ...NON_FACE_EMOJI_LIST,
  ...FACE_EMOJI_LIST,
} as const;
`;

  fs.writeFileSync(outputPath, content);
  console.log('emojiList.ts has been generated.');
});
