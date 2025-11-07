<?php
/**
 * CurrentDate Snippet
 *
 * Restituisce la data e ora corrente formattata per l'email FormIt
 * con timezone Italia (Europe/Rome) che gestisce automaticamente ora solare/legale
 *
 * Utilizzo: [[!CurrentDate]]
 * Output: 07/11/2025 alle 14:30
 */

// Imposta timezone Italia (gestisce automaticamente CET/CEST)
date_default_timezone_set('Europe/Rome');

return date('d/m/Y \a\l\l\e H:i');
