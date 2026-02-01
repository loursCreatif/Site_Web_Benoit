#!/usr/bin/env python3
"""Script pour rendre le fond quadrillé d'une image transparent"""

from PIL import Image

def make_transparent(input_path, output_path):
    """
    Supprime le fond quadrillé gris en détectant tous les pixels gris.
    """
    img = Image.open(input_path)
    img = img.convert("RGBA")
    
    width, height = img.size
    pixels = img.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # Détecter les pixels gris (R≈G≈B)
            is_gray = abs(r - g) < 25 and abs(g - b) < 25 and abs(r - b) < 25
            
            # Exclure le bleu du logo (BT) et le blanc du texte
            is_blue = b > r + 30 and b > g + 10  # Le bleu a une composante bleue dominante
            is_white = r > 230 and g > 230 and b > 230  # Blanc pur du texte
            
            # Si c'est gris et pas bleu ni blanc, rendre transparent
            if is_gray and not is_blue and not is_white:
                pixels[x, y] = (0, 0, 0, 0)
    
    img.save(output_path, "PNG")
    print(f"✓ Image transparente créée : {output_path}")

if __name__ == "__main__":
    input_file = "/Users/magnes/.gemini/antigravity/brain/14ee3b5d-5820-4b1c-9f66-2326244642c4/uploaded_media_1769963670338.jpg"
    output_file = "assets/images/logo_transparent.png"
    make_transparent(input_file, output_file)
