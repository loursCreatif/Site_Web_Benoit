<?php
/**
 * Script d'envoi d'email pour le formulaire de contact
 * BT Électricité
 * 
 * Envoie 2 emails :
 * 1. Notification à Benoit (texte simple)
 * 2. Confirmation au client (HTML avec logo)
 */

// Configuration
$destinataire = "contact@btelectricite.fr";
$nom_entreprise = "BT Électricité";
$telephone_entreprise = "07 49 45 79 23";
$url_site = "https://www.btelectricite.fr"; // À modifier avec l'URL réelle
$url_logo = $url_site . "/assets/images/logo_transparent.png";

// Vérifier que c'est une requête POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html");
    exit;
}

// Récupérer les données du formulaire
$nom = htmlspecialchars(strip_tags($_POST["name"] ?? ""));
$email = htmlspecialchars(strip_tags($_POST["email"] ?? ""));
$telephone = htmlspecialchars(strip_tags($_POST["phone"] ?? ""));
$type_demande = htmlspecialchars(strip_tags($_POST["type_demande"] ?? ""));
$message = htmlspecialchars(strip_tags($_POST["message"] ?? ""));

// Validation simple
if (empty($nom) || empty($email) || empty($telephone) || empty($message)) {
    header("Location: index.html?status=error");
    exit;
}

// ============================================
// EMAIL 1 : Notification à Benoit
// ============================================
$sujet_benoit = "Nouvelle demande de devis - $type_demande";
$contenu_benoit = "
===========================================
NOUVELLE DEMANDE DE DEVIS
===========================================

TYPE DE DEMANDE : $type_demande

-------------------------------------------
COORDONNÉES DU CLIENT
-------------------------------------------
Nom : $nom
Email : $email
Téléphone : $telephone

-------------------------------------------
MESSAGE
-------------------------------------------
$message

-------------------------------------------
Envoyé depuis le site BT Électricité
";

$headers_benoit = "From: Site BT Électricité <noreply@btelectricite.fr>\r\n";
$headers_benoit .= "Reply-To: $email\r\n";
$headers_benoit .= "Content-Type: text/plain; charset=UTF-8\r\n";

$envoi_benoit = mail($destinataire, $sujet_benoit, $contenu_benoit, $headers_benoit);

// ============================================
// EMAIL 2 : Confirmation au client (HTML)
// ============================================
$sujet_client = "Confirmation de votre demande - $nom_entreprise";

$contenu_client = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- En-tête avec logo -->
        <tr>
            <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
                <img src="' . $url_logo . '" alt="' . $nom_entreprise . '" style="max-width: 180px; height: auto;">
            </td>
        </tr>
        
        <!-- Contenu principal -->
        <tr>
            <td style="padding: 40px 30px;">
                <h1 style="color: #1a1a2e; font-size: 24px; margin: 0 0 20px 0;">
                    Bonjour ' . $nom . ',
                </h1>
                
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                    Merci pour votre demande ! Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.
                </p>
                
                <!-- Récapitulatif -->
                <div style="background-color: #f8f9fa; border-left: 4px solid #f59e0b; padding: 20px; margin: 25px 0;">
                    <h2 style="color: #1a1a2e; font-size: 16px; margin: 0 0 15px 0; text-transform: uppercase;">
                        📋 Récapitulatif de votre demande
                    </h2>
                    <p style="color: #666; font-size: 14px; margin: 5px 0;">
                        <strong>Type :</strong> ' . $type_demande . '
                    </p>
                    <p style="color: #666; font-size: 14px; margin: 5px 0;">
                        <strong>Message :</strong><br>' . nl2br($message) . '
                    </p>
                </div>
                
                <!-- Contact -->
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 25px 0 10px 0;">
                    En cas d\'urgence, vous pouvez me joindre directement :
                </p>
                <p style="margin: 0;">
                    <a href="tel:' . str_replace(' ', '', $telephone_entreprise) . '" style="display: inline-block; background-color: #f59e0b; color: #1a1a2e; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        📞 ' . $telephone_entreprise . '
                    </a>
                </p>
                
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                    Cordialement,<br>
                    <strong>Benoit</strong><br>
                    <span style="color: #f59e0b;">' . $nom_entreprise . '</span>
                </p>
            </td>
        </tr>
        
        <!-- Pied de page -->
        <tr>
            <td style="background-color: #1a1a2e; padding: 25px 30px; text-align: center;">
                <p style="color: #888; font-size: 12px; margin: 0;">
                    Cet email a été envoyé automatiquement suite à votre demande sur notre site.<br>
                    Pour toute question : <a href="mailto:' . $destinataire . '" style="color: #f59e0b;">' . $destinataire . '</a>
                </p>
            </td>
        </tr>
        
    </table>
</body>
</html>
';

$headers_client = "From: $nom_entreprise <noreply@btelectricite.fr>\r\n";
$headers_client .= "Reply-To: $destinataire\r\n";
$headers_client .= "MIME-Version: 1.0\r\n";
$headers_client .= "Content-Type: text/html; charset=UTF-8\r\n";

$envoi_client = mail($email, $sujet_client, $contenu_client, $headers_client);

// Rediriger selon le résultat
if ($envoi_benoit) {
    header("Location: index.html?status=success");
} else {
    header("Location: index.html?status=error");
}
exit;
?>
