/**
 * Compõe public/images/social/novavida-og.jpg (1200×630) a partir do hero + logo oficiais.
 */
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const heroPath = join(root, "public/images/home/hero-palavra.jpg");
const logoPath = join(root, "public/brand/logo-oficial.png");
const outPath = join(root, "public/images/social/novavida-og.jpg");

const WIDTH = 1200;
const HEIGHT = 630;
const OLIVE = { r: 107, g: 122, b: 47, alpha: 0.42 };
const IVORY = { r: 246, g: 242, b: 232, alpha: 0.92 };

mkdirSync(dirname(outPath), { recursive: true });

const hero = await sharp(heroPath)
  .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
  .toBuffer();

const overlay = await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: OLIVE,
  },
})
  .png()
  .toBuffer();

const panel = await sharp({
  create: {
    width: 420,
    height: 520,
    channels: 4,
    background: IVORY,
  },
})
  .png()
  .toBuffer();

const logo = await sharp(logoPath)
  .resize({ width: 320, height: 320, fit: "inside", withoutEnlargement: true })
  .png()
  .toBuffer();

const taglineSvg = Buffer.from(`
<svg width="420" height="120" xmlns="http://www.w3.org/2000/svg">
  <text x="210" y="36" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" fill="#3F4338" font-style="italic">Renovando Vidas</text>
  <text x="210" y="68" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" fill="#3F4338" font-style="italic">pela Palavra</text>
  <text x="210" y="100" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="#6B7A2F" letter-spacing="1">NOVA VIDA</text>
</svg>
`);

const composed = await sharp(hero)
  .composite([
    { input: overlay, blend: "over" },
    { input: panel, left: 48, top: 55 },
    { input: logo, left: 98, top: 95 },
    { input: taglineSvg, left: 48, top: 430 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(outPath);

console.log(
  JSON.stringify({
    outPath,
    width: composed.width,
    height: composed.height,
    sizeBytes: composed.size,
  }),
);
