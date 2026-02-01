#!/usr/bin/env python3
"""Script pour rendre le fond d'une image transparent"""

from PIL import Image
import sys

def make_transparent(input_path, output_path, threshold=240):
    """
    Rend transparent le fond blanc/proche du blanc d'une image
    threshold: valeur de seuil pour considérer un pixel comme blanc (0-255)
    """
    # Ouvrir l'image
    img = Image.open(input_path)
    
    # Convertir en RGBA si nécessaire
    img = img.convert("RGBA")
    
    # Obtenir les données de pixels
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Si le pixel est proche du blanc (ou du gris clair), le rendre transparent
        # On vérifie que les 3 canaux RGB sont au-dessus du seuil
        if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
            # Rendre transparent (alpha = 0)
            newData.append((255, 255, 255, 0))
        else:
            # Garder le pixel tel quel
            newData.append(item)
    
    # Mettre à jour l'image
    img.putdata(newData)
    
    # Sauvegarder en PNG
    img.save(output_path, "PNG")
    print(f"✓ Image transparente créée : {output_path}")

if __name__ == "__main__":
    input_file = "/Users/magnes/.gemini/antigravity/brain/14ee3b5d-5820-4b1c-9f66-2326244642c4/uploaded_media_1769963670338.jpg"
    output_file = "assets/images/logo_transparent.png"
    
    # Utiliser un seuil de 200 pour capturer les fonds gris/blancs
    make_transparent(input_file, output_file, threshold=200)
