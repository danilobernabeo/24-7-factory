# Custom Hook FormIt - Email con mail() nativo

## Problema Risolto

FormIt non invia email anche se QuickEmail funziona con mail() di PHP.
Questo hook bypassa il sistema email di FormIt e usa direttamente mail().

## Installazione

### 1. Carica il file sul server

Carica `customEmailSimple.php` in:
```
/core/components/formit/hooks/customEmailSimple.php
```

**Percorso completo esempio:**
```
/home/tuosito/public_html/core/components/formit/hooks/customEmailSimple.php
```

### 2. Dai i permessi corretti

```bash
chmod 644 customEmailSimple.php
```

### 3. Verifica che FormIt trovi il file

Il file deve essere nella cartella hooks di FormIt, non in una sottocartella.

---

## Utilizzo

### Versione Base (Plain Text)

```modx
[[!FormIt?
   &hooks=`customEmailSimple,redirect`
   &customEmailTo=`danilo.bernabeo@gmail.com`
   &customEmailSubject=`Nuova richiesta di contatto da 27Factory`
   &customEmailFromName=`Form Contatti 27Factory`
   &redirectTo=`[[*id]]`
   &redirectParams=`{"success":"1"}`
   &validate=`
      firstName:required:minLength=^2^,
      lastName:required:minLength=^2^,
      email:email:required,
      phone:required:minLength=^8^,
      message:required:minLength=^10^:maxLength=^5000^
   `
   &validationErrorMessage=`Please correct the errors in the form below.`
   &successMessage=`Thank you for contacting us! We will respond as soon as possible.`
   &submitVar=`submit-contact`
   &store=`1`
]]

[[$contactForm]]
```

### Versione con Template HTML

```modx
[[!FormIt?
   &hooks=`customEmailSimple,redirect`
   &customEmailTo=`danilo.bernabeo@gmail.com`
   &customEmailSubject=`Nuova richiesta di contatto da 27Factory`
   &customEmailFromName=`Form Contatti 27Factory`
   &customEmailTpl=`contactEmail`
   &redirectTo=`[[*id]]`
   &redirectParams=`{"success":"1"}`
   &validate=`
      firstName:required:minLength=^2^,
      lastName:required:minLength=^2^,
      email:email:required,
      phone:required:minLength=^8^,
      message:required:minLength=^10^:maxLength=^5000^
   `
   &validationErrorMessage=`Please correct the errors in the form below.`
   &successMessage=`Thank you for contacting us! We will respond as soon as possible.`
   &submitVar=`submit-contact`
   &store=`1`
]]

[[$contactForm]]
```

---

## Parametri Disponibili

| Parametro | Obbligatorio | Default | Descrizione |
|-----------|--------------|---------|-------------|
| `customEmailTo` | Sì | `danilo.bernabeo@gmail.com` | Destinatario email |
| `customEmailSubject` | No | `Nuovo messaggio dal form` | Oggetto email |
| `customEmailFromName` | No | `Form Contatti` | Nome mittente |
| `customEmailTpl` | No | (plain text) | Nome chunk template HTML |

---

## Come Funziona

1. **Recupera i dati** dal form (firstName, lastName, email, phone, message)
2. **Usa il template** chunk se specificato, altrimenti plain text
3. **Invia con mail()** di PHP (stessa funzione di QuickEmail)
4. **Logga il risultato** in MODX Error Log per debug

---

## Differenze con Hook Email Standard

| Hook Standard | Custom Hook |
|---------------|-------------|
| Usa PHPMailer con configurazioni complesse | Usa mail() nativo semplice |
| Richiede configurazioni SMTP per Gmail | Funziona subito con mail() |
| Può fallire silenziosamente | Logga sempre in Error Log |
| Parametri: &emailTo, &emailFrom, etc. | Parametri: &customEmailTo, &customEmailSubject, etc. |

---

## Debug

### Verifica che il file sia caricato

1. Vai su MODX **System > Reports > Error Log**
2. Invia il form
3. Cerca messaggi `[customEmailSimple]`

### Messaggi Log

**Successo:**
```
[customEmailSimple] Email inviata con successo a: danilo.bernabeo@gmail.com
```

**Errore:**
```
[customEmailSimple] Errore invio email a: danilo.bernabeo@gmail.com
```

### Se il file non viene trovato

Errore tipico:
```
Could not load hook 'customEmailSimple'
```

**Soluzione:** Verifica il percorso:
```
/core/components/formit/hooks/customEmailSimple.php
```

---

## Vantaggi

✅ Usa mail() come QuickEmail (sappiamo che funziona)
✅ Semplice e diretto
✅ Non richiede configurazione SMTP
✅ Supporta template HTML chunks
✅ Reply-To automatico all'utente
✅ Log completo per debug

---

## Template Email Compatibili

Il hook supporta gli stessi chunk che hai già creato:

- `contactEmail` - Template HTML admin
- `contactAutoReply` - Template conferma utente

I placeholder disponibili nel template:
- `[[+firstName]]`
- `[[+lastName]]`
- `[[+email]]`
- `[[+phone]]`
- `[[+message]]`
- `[[+date]]`

---

## Esempio Completo con Salvataggio

Se vuoi anche salvare i dati + inviare email:

```modx
[[!FormIt?
   &hooks=`FormItSaveForm,customEmailSimple,redirect`
   &customEmailTo=`danilo.bernabeo@gmail.com`
   &customEmailSubject=`Nuova richiesta - [[+lastName]]`
   &customEmailTpl=`contactEmail`
   &formEncrypt=`1`
   &redirectTo=`[[*id]]`
   &redirectParams=`{"success":"1"}`
   &validate=`
      firstName:required:minLength=^2^,
      lastName:required:minLength=^2^,
      email:email:required,
      phone:required:minLength=^8^,
      message:required:minLength=^10^:maxLength=^5000^
   `
   &submitVar=`submit-contact`
   &store=`1`
]]

[[$contactForm]]
```

Ordine hooks:
1. `FormItSaveForm` - Salva nel database
2. `customEmailSimple` - Invia email
3. `redirect` - Reindirizza con success

---

## Note

- Il hook ritorna sempre `true` per non bloccare il form anche se mail() fallisce
- Il Reply-To è automaticamente impostato sull'email dell'utente
- Per email HTML, usa `&customEmailTpl=nomeChunk`
- Per plain text, ometti `&customEmailTpl`

---

## Supporto

Se l'email non arriva:

1. Controlla Error Log MODX
2. Verifica che mail() funzioni sul server (QuickEmail test)
3. Controlla spam/junk
4. Verifica che il file sia in `/core/components/formit/hooks/`
5. Controlla permessi file (644)

---

**Questo hook usa ESATTAMENTE lo stesso metodo di QuickEmail, quindi dovrebbe funzionare!** 🎯
