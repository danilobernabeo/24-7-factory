# Guida Installazione FormIt per Form di Contatto 27Factory

## Requisiti

- **MODX Revolution** 3.x
- **FormIt** 5.1.1 (già installato)
- **PHP** 7.4+ con supporto per mail() o PHPMailer configurato

---

## File Creati

Nella cartella `modx-chunks/` troverai:

1. **contactForm.chunk.html** - Chunk del form HTML con validazione
2. **contactEmail.chunk.html** - Template email per l'amministratore
3. **contactAutoReply.chunk.html** - Email di conferma per l'utente (opzionale)
4. **contactFormCall.snippet.html** - Chiamata FormIt con tutte le configurazioni

---

## Installazione Passo per Passo

### 1. Verifica FormIt

Vai su **Extras > Installer** e verifica che FormIt 5.1.1 sia installato e aggiornato.

### 2. Crea i Chunks in MODX

**a) Chunk: contactForm**
1. Vai su **Elements > Chunks**
2. Click destro > **New Chunk**
3. Nome: `contactForm`
4. Categoria: `Forms` (o quella che preferisci)
5. Copia il contenuto da `contactForm.chunk.html`
6. Salva

**b) Chunk: contactEmail**
1. Crea nuovo chunk
2. Nome: `contactEmail`
3. Categoria: `Forms`
4. Copia il contenuto da `contactEmail.chunk.html`
5. Salva

**c) Chunk: contactAutoReply (OPZIONALE)**
1. Crea nuovo chunk
2. Nome: `contactAutoReply`
3. Categoria: `Forms`
4. Copia il contenuto da `contactAutoReply.chunk.html`
5. Salva

### 3. Configura le System Settings per Email

Vai su **System > System Settings** e configura:

```
emailsender = noreply@27factory.ch (o il tuo indirizzo)
site_name = 27Factory
mail_smtp_auth = Yes (se usi SMTP)
mail_smtp_hosts = [il tuo server SMTP]
mail_smtp_user = [username SMTP]
mail_smtp_pass = [password SMTP]
```

**IMPORTANTE:** Se usi un hosting condiviso, potrebbe essere già configurato per usare la funzione `mail()` di PHP.

### 4. Inserisci il Form nella Pagina MODX

**Opzione A - Con AutoReply (email di conferma all'utente):**

```modx
[[!FormIt?
   &hooks=`spam,email,FormItAutoResponder,redirect`
   &emailTpl=`contactEmail`
   &emailSubject=`Nuova richiesta di contatto da 27Factory.ch`
   &emailTo=`hello@27factory.ch`
   &emailFrom=`[[++emailsender]]`
   &emailFromName=`Form Contatti 27Factory`
   &emailReplyTo=`[[!+email]]`
   &emailReplyToName=`[[!+firstName]] [[!+lastName]]`
   &fiarTpl=`contactAutoReply`
   &fiarSubject=`Conferma ricezione messaggio - 27Factory`
   &fiarToField=`email`
   &fiarFrom=`hello@27factory.ch`
   &fiarFromName=`27Factory Team`
   &redirectTo=`[[*id]]`
   &redirectParams=`{"success":"1"}`
   &validate=`
      firstName:required:minLength=^2^,
      lastName:required:minLength=^2^,
      email:email:required,
      phone:required:minLength=^8^,
      message:required:minLength=^10^:maxLength=^5000^
   `
   &validationErrorMessage=`Si prega di correggere gli errori nel form.`
   &successMessage=`Grazie per averci contattato! Ti risponderemo al più presto.`
   &submitVar=`submit-contact`
   &store=`1`
   &storeLocation=`cache`
]]

[[$contactForm]]
```

**Opzione B - Solo notifica admin (senza AutoReply):**

Usa il codice da `contactFormCall.snippet.html`

### 5. Sostituisci il Form HTML Esistente

Nella tua pagina MODX (o template), trova il codice del form HTML esistente e sostituiscilo con la chiamata FormIt di sopra.

**Prima:**
```html
<form id="contact-form" name="wf-form-Contact-Form" method="get"...>
   <!-- tutto il codice HTML del form -->
</form>
```

**Dopo:**
```modx
[[!FormIt? ... ]]
[[$contactForm]]
```

---

## Regole di Validazione Configurate

Tutti i campi sono **obbligatori** con le seguenti regole:

| Campo      | Validazione                                    |
|------------|------------------------------------------------|
| firstName  | Obbligatorio, minimo 2 caratteri               |
| lastName   | Obbligatorio, minimo 2 caratteri               |
| email      | Obbligatorio, formato email valido             |
| phone      | Obbligatorio, minimo 8 caratteri               |
| message    | Obbligatorio, min 10 - max 5000 caratteri      |

---

## Test del Form

### Test Base
1. Compila il form con dati validi
2. Clicca Submit
3. Verifica che arrivi l'email a `hello@27factory.ch`
4. Verifica che l'utente riceva l'email di conferma (se attivata)
5. Verifica che appaia il messaggio di successo

### Test Validazione
1. Prova a inviare form vuoto → Dovrebbero apparire errori
2. Prova email non valida → Errore formato email
3. Prova messaggio troppo corto → Errore minimo caratteri

### Test Spam Protection
FormIt include protezione antispam integrata con l'hook `spam`. Puoi configurare opzioni aggiuntive:

```modx
&spamEmailFields=`email`
&spamCheckIp=`1`
```

---

## Configurazione PHPMailer (se necessario)

Se il server non invia email con `mail()`, devi configurare SMTP.

### Metodo 1: System Settings MODX
Vai su System Settings e configura:
- `mail_smtp_auth`
- `mail_smtp_hosts`
- `mail_smtp_user`
- `mail_smtp_pass`
- `mail_smtp_port` (solitamente 587 o 465)
- `mail_smtp_secure` (tls o ssl)

### Metodo 2: Extra PHPMailer per MODX
Installa l'extra **QuickEmail** da Package Management che configura automaticamente SMTP.

---

## Personalizzazione Email

### Modificare il Template Email Admin
Modifica il chunk `contactEmail` per cambiare:
- Colori (cambia `#BF0A0B` con il tuo brand color)
- Layout
- Campi visualizzati

### Modificare l'AutoReply
Modifica il chunk `contactAutoReply` per personalizzare:
- Messaggio di ringraziamento
- Tempi di risposta
- Link e informazioni aziendali

---

## Troubleshooting

### Le email non arrivano
1. **Verifica log MODX:** System > Reports > Error Log
2. **Controlla cartella Spam** nella tua casella email
3. **Verifica configurazione SMTP** in System Settings
4. **Test funzione mail():** Crea una pagina PHP di test con `mail()`
5. **Contatta il tuo hosting** per verificare che l'invio email sia abilitato

### Errori di validazione non appaiono
1. Verifica che il chunk `contactForm` sia stato creato correttamente
2. Controlla che i placeholder `[[!+fi.error.fieldname]]` siano presenti
3. Svuota la cache MODX: Site > Clear Cache

### Il form si ricarica ma non mostra messaggi
1. Assicurati di usare `[[!FormIt?` con `!` (uncached)
2. Verifica che `&submitVar=submit-contact` corrisponda al name del button
3. Controlla che `&redirectTo` sia configurato correttamente

### CSS rotto dopo l'installazione
Il chunk usa le classi CSS esistenti (w-form, w-input, ecc.). Se mancano:
1. Verifica che `style.css` sia caricato
2. Aggiungi il CSS custom presente nel chunk `contactForm`

---

## Funzionalità Avanzate (Opzionali)

### 1. Salvare i Submission nel Database

Installa **FormItSaveForm** extra:
```modx
&hooks=`spam,FormItSaveForm,email,redirect`
```

### 2. Integrare con Google reCAPTCHA

```modx
&hooks=`spam,recaptcha,email,redirect`
&recaptchaTheme=`light`
```

### 3. Inviare a Multiple Email

```modx
&emailTo=`hello@27factory.ch,info@27factory.ch`
```

### 4. CC o BCC

```modx
&emailCC=`manager@27factory.ch`
&emailBCC=`archive@27factory.ch`
```

---

## Supporto

Per problemi con FormIt consulta:
- **Documentazione ufficiale:** https://docs.modx.com/current/en/extras/formit
- **Forum MODX:** https://community.modx.com/

---

## Note Finali

- ✅ Tutti i campi sono obbligatori come richiesto
- ✅ Utilizza PHPMailer tramite le configurazioni SMTP di MODX
- ✅ Include protezione antispam
- ✅ Email HTML responsive e professionale
- ✅ Mantiene le classi CSS esistenti (w-form, w-input, ecc.)
- ✅ Include validazione client-side (HTML5) e server-side (FormIt)

**Ricorda di testare sempre il form dopo l'installazione!**
