"""
convert-images.py
Converte i JPEG da _originali/ in WebP ottimizzati dentro docs/assets/imgs/

Requisiti: pip install Pillow

Uso: python convert-images.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent
SRC = ROOT / '_originali'
DST = ROOT / 'docs' / 'assets' / 'imgs'

# Configurazione per cartella
CONFIG = {
    'pascolo':      {'long_edge': 1920, 'quality': 78},
    'metamorfosi':  {'long_edge': 1920, 'quality': 78},
    'stagionatura': {'long_edge': 1920, 'quality': 78},
    'tavola':       {'long_edge': 1920, 'quality': 78},
    'lana':         {'long_edge': 1920, 'quality': 78},
    'pecorino':     {'long_edge': 800,  'quality': 85},
}

# Override quality per singole immagini pesanti
OVERRIDES = {
    'pascolo-2': {'quality': 65},
    'stagionatura-3': {'quality': 65},
}

def resize_to_long_edge(img, long_edge):
    w, h = img.size
    if max(w, h) <= long_edge:
        return img
    if w >= h:
        new_w = long_edge
        new_h = int(h * long_edge / w)
    else:
        new_h = long_edge
        new_w = int(w * long_edge / h)
    return img.resize((new_w, new_h), Image.LANCZOS)

def convert():
    for folder, cfg in CONFIG.items():
        src_folder = SRC / folder
        dst_folder = DST / folder
        if not src_folder.exists():
            print(f'  SKIP {folder}/ (non trovata)')
            continue
        dst_folder.mkdir(parents=True, exist_ok=True)
        for jpg in sorted(src_folder.glob('*.jpg')):
            out = dst_folder / (jpg.stem + '.webp')
            img = Image.open(jpg)
            img = resize_to_long_edge(img, cfg['long_edge'])
            quality = OVERRIDES.get(jpg.stem, {}).get('quality', cfg['quality'])
            img.save(out, 'WEBP', quality=quality, method=4)
            kb = out.stat().st_size / 1024
            print(f'  {folder}/{out.name}  {img.size[0]}x{img.size[1]}  {kb:.0f} KB')

if __name__ == '__main__':
    print('Conversione immagini _originali/ -> docs/assets/imgs/\n')
    convert()
    print('\nFatto.')
