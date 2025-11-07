# Snippet CurrentDate - Installazione MODX

## Problema Risolto

Il template email `contactEmail` mostrava la label "Data e ora:" ma nessun valore, perché il placeholder `[[!+date]]` non viene passato automaticamente da FormIt.

## Soluzione

Snippet MODX che restituisce la data/ora corrente formattata in italiano con timezone **Europe/Rome** (gestisce automaticamente ora solare CET e ora legale CEST).

## Installazione

### 1. Crea lo Snippet in MODX

1. Accedi al **Manager MODX**
2. Vai su **Elements > Snippets**
3. Click su **New Snippet** (tasto destro o bottone)
4. Compila i campi:
   - **Name**: `CurrentDate`
   - **Description**: `Restituisce data e ora corrente formattata (es: 07/11/2025 alle 14:30)`
   - **Category**: `FormIt` (o altra categoria a scelta)
   - **Snippet Code**: Copia il contenuto del file `CurrentDate.snippet.php`

```php
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
```

5. **Salva** lo snippet

### 2. Verifica che il Template Email usi lo Snippet

Il chunk `contactEmail` è già stato aggiornato per usare:

```html
Data e ora: [[!CurrentDate]]
```

### 3. Svuota Cache MODX

1. Vai su **Site > Clear Cache**
2. Conferma

### 4. Testa il Form

1. Compila e invia il form di contatto
2. Controlla l'email ricevuta
3. Verifica che appaia la data/ora corrente nel footer

## Formato Output

**Output**: `07/11/2025 alle 14:30`

Il formato è:
- `dd/mm/YYYY` per la data
- `HH:MM` per l'ora (24h)
- Separatore: `alle`

## Timezone

Lo snippet è configurato per il timezone **Europe/Rome** (Italia) che gestisce automaticamente:
- **Ora solare (CET)**: UTC+1 (ottobre → marzo)
- **Ora legale (CEST)**: UTC+2 (marzo → ottobre)

### Cambiare Timezone

Se il tuo server/progetto si trova in un altro paese, modifica la riga:

```php
date_default_timezone_set('Europe/Rome');
```

**Esempi altri timezone:**

```php
// Svizzera (stessa ora dell'Italia)
date_default_timezone_set('Europe/Zurich');

// Regno Unito
date_default_timezone_set('Europe/London');

// USA Est (New York)
date_default_timezone_set('America/New_York');

// USA Ovest (Los Angeles)
date_default_timezone_set('America/Los_Angeles');

// UTC (nessun cambio ora solare/legale)
date_default_timezone_set('UTC');
```

Lista completa timezone: https://www.php.net/manual/en/timezones.php

## Personalizzazione Formato

Se vuoi modificare il formato, edita lo snippet e cambia:

```php
return date('d/m/Y \a\l\l\e H:i');
```

### Esempi formati alternativi:

```php
// Formato US: 11/07/2025 at 2:30 PM
return date('m/d/Y \a\t g:i A');

// Formato ISO: 2025-11-07 14:30:00
return date('Y-m-d H:i:s');

// Italiano esteso: Giovedì 7 Novembre 2025, ore 14:30
setlocale(LC_TIME, 'it_IT.UTF-8');
return strftime('%A %d %B %Y, ore %H:%M');
```

## Note

- Lo snippet usa `[[!CurrentDate]]` con `!` (uncached) per avere sempre la data corrente del momento di invio
- Se usi `[[CurrentDate]]` senza `!`, la data verrà cachata e sarà sempre uguale fino al clear cache
- **IMPORTANTE**: Usa sempre `[[!CurrentDate]]` nel template email

## Utilizzo in altri Template

Puoi usare questo snippet ovunque serva una data/ora corrente:

```modx
<!-- In qualsiasi chunk o template -->
Generato il: [[!CurrentDate]]

<!-- In un placeholder email -->
<p>Richiesta ricevuta: [[!CurrentDate]]</p>

<!-- In un template MODX -->
<footer>Ultima modifica: [[!CurrentDate]]</footer>
```

## Supporto

Se la data non appare:

1. Verifica che lo snippet sia creato e salvato in MODX
2. Controlla che il nome sia esattamente `CurrentDate` (case-sensitive)
3. Verifica che usi `[[!CurrentDate]]` con `!` (uncached)
4. Svuota la cache MODX
5. Controlla l'Error Log MODX per eventuali errori PHP

**Se l'ora è sbagliata (es: un'ora avanti o indietro):**

- Verifica che lo snippet abbia la riga `date_default_timezone_set('Europe/Rome');`
- Controlla di aver salvato lo snippet dopo le modifiche
- Svuota la cache MODX
- Se il problema persiste, verifica il timezone del server PHP: crea un file `phpinfo.php` con `<?php phpinfo();` e cerca "date.timezone"

---

**Installazione completata!** Ora le email mostreranno data e ora di invio. 📅
