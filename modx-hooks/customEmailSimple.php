<?php
/**
 * Custom FormIt Hook: customEmailSimple
 *
 * Usa la funzione mail() nativa di PHP (come QuickEmail)
 * Bypassa il sistema email di FormIt che potrebbe avere problemi
 *
 * INSTALLAZIONE:
 * 1. Carica questo file in: /core/components/formit/hooks/customEmailSimple.php
 * 2. Usa nell'hook FormIt: &hooks=`customEmailSimple,redirect`
 *
 * CONFIGURAZIONE NEL FORMIT:
 * &customEmailTo=`danilo.bernabeo@gmail.com`
 * &customEmailSubject=`Nuova richiesta di contatto`
 * &customEmailTpl=`contactEmail` (opzionale)
 */

// Recupera i valori dal form
$to = $scriptProperties['customEmailTo'] ?? 'danilo.bernabeo@gmail.com';
$subject = $scriptProperties['customEmailSubject'] ?? 'Nuovo messaggio dal form';
$from = $modx->getOption('emailsender') ?? 'noreply@example.com';
$fromName = $scriptProperties['customEmailFromName'] ?? 'Form Contatti';

// Recupera i dati del form
$firstName = $hook->getValue('firstName');
$lastName = $hook->getValue('lastName');
$email = $hook->getValue('email');
$phone = $hook->getValue('phone');
$message = $hook->getValue('message');

// Se è specificato un template chunk, usalo
$emailTpl = $scriptProperties['customEmailTpl'] ?? '';

if (!empty($emailTpl)) {
    // Usa il template chunk
    $body = $modx->getChunk($emailTpl, array(
        'firstName' => $firstName,
        'lastName' => $lastName,
        'email' => $email,
        'phone' => $phone,
        'message' => $message,
        'date' => time()
    ));

    // Headers per HTML
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: {$fromName} <{$from}>\r\n";
    $headers .= "Reply-To: {$email}\r\n";

} else {
    // Usa template semplice plain text
    $body = "Nuova richiesta di contatto\n\n";
    $body .= "Nome: {$firstName}\n";
    $body .= "Cognome: {$lastName}\n";
    $body .= "Email: {$email}\n";
    $body .= "Telefono: {$phone}\n";
    $body .= "Messaggio:\n{$message}\n";

    // Headers per plain text
    $headers = "From: {$fromName} <{$from}>\r\n";
    $headers .= "Reply-To: {$email}\r\n";
}

// Invia email usando mail() nativo (come QuickEmail)
$sent = mail($to, $subject, $body, $headers);

// Log per debug
if ($sent) {
    $modx->log(modX::LOG_LEVEL_INFO, '[customEmailSimple] Email inviata con successo a: ' . $to);
} else {
    $modx->log(modX::LOG_LEVEL_ERROR, '[customEmailSimple] Errore invio email a: ' . $to);
}

// Ritorna sempre true per non bloccare il form
return true;
