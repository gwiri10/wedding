/**
 * image/ 폴더의 사진들을 image/thumb/ 에 저해상도 썸네일로 생성합니다.
 * 실행: node generate-thumbs.js (html 폴더에서)
 * 의존성: npm install sharp
 */
const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, '../image');
const THUMB_DIR = path.join(__dirname, '../image/thumb');
const THUMB_WIDTH = 120;

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    console.log('sharp가 필요합니다: npm install sharp');
    process.exit(1);
  }

  if (!fs.existsSync(IMG_DIR)) {
    console.log('image 폴더가 없습니다.');
    return;
  }

  if (!fs.existsSync(THUMB_DIR)) {
    fs.mkdirSync(THUMB_DIR, { recursive: true });
  }

  const files = fs.readdirSync(IMG_DIR).filter(f => {
    const p = path.join(IMG_DIR, f);
    return fs.statSync(p).isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(f);
  });

  for (const file of files) {
    const src = path.join(IMG_DIR, file);
    const dest = path.join(THUMB_DIR, file);
    if (fs.existsSync(dest)) continue;
    try {
      const ext = path.extname(file).toLowerCase();
      let pipeline = sharp(src).resize(THUMB_WIDTH, null, { withoutEnlargement: true });
      if (ext === '.png') pipeline = pipeline.png({ compressionLevel: 6 });
      else pipeline = pipeline.jpeg({ quality: 65 });
      await pipeline.toFile(dest);
      console.log('생성:', file);
    } catch (err) {
      console.error('실패:', file, err.message);
    }
  }
  console.log('완료');
}

main();
