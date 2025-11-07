# Troubleshooting Email FormIt - 27Factory

## Problema Attuale
- FormIt completa il processo (redirect con success=1) ✅
- QuickEmail funziona (server può inviare email) ✅
- Email FormIt NON arriva ❌
- Nessun errore nel log MODX ❌

## Causa Identificata

Il tuo codice FormIt aveva **2 problemi critici**:

### 1. ❌ Mancava `&emailHtml=1`
**Problema:** Il chunk `contactEmail` è HTML, ma FormIt non sapeva di inviarlo come HTML.
**Risultato:** L'email potrebbe essere inviata ma rifiutata dal server o finire in quarantena.

### 2. ❌ Hook `spam` potrebbe bloccare silenziosamente
**Problema:** L'hook spam di FormIt può bloccare l'invio senza generare errori visibili.
**Risultato:** Il form sembra funzionare ma l'email non parte.

### 3. ⚠️ `&emailFrom=[[++emailsender]]` potrebbe non funzionare
**Problema:** Il placeholder potrebbe non essere risolto correttamente.
**Soluzione:** Usa direttamente `danilo.bernabeo@gmail.com`

---

## Soluzione Passo-Passo

### STEP 1: Usa la versione DEBUG (5 minuti)

1. **Apri la tua pagina MODX** dove hai il form
2. **Sostituisci il codice FormIt** con quello in `contactFormCall-DEBUG.snippet.html`
3. **Crea un chunk semplice** chiamato `contactEmail-SIMPLE`:
   - Vai su Elements > Chunks > New Chunk
   - Nome: `contactEmail-SIMPLE`
   - Copia il contenuto da `contactEmail-SIMPLE.chunk.html`
   - Salva
4. **Modifica il debug FormIt** per usare il chunk semplice:
   ```modx
   &emailTpl=`contactEmail-SIMPLE`
   ```
5. **Svuota la cache MODX:** Site > Clear Cache
6. **Testa il form**
   - Compila con dati di test
   - Clicca Submit
   - Guarda se appare il messaggio verde di debug
   - Controlla la tua email

**Risultato atteso:**
- Se l'email arriva → Il problema era nel chunk HTML originale o mancanza di `&emailHtml=1`
- Se NON arriva → Vai allo STEP 2

---

### STEP 2: Usa la versione FIXED (dopo debug)

Se lo STEP 1 ha funzionato:

1. **Sostituisci** il codice FormIt con quello in `contactFormCall-FIXED.snippet.html`
2. **Svuota cache** MODX
3. **Testa** di nuovo

Questa versione usa il chunk HTML completo `contactEmail` ma con tutte le correzioni.

---

### STEP 3: Test con messaggio inline (se STEP 1 fallisce)

Se anche con il chunk semplice non funziona, prova SENZA chunk:

```modx
[[!FormIt?
   &hooks=`email`
   &emailTo=`danilo.bernabeo@gmail.com`
   &emailFrom=`danilo.bernabeo@gmail.com`
   &emailSubject=`Test FormIt Inline`
   &emailUseFieldForSubject=`0`
   &emailBody=`
      Nome: [[!+firstName]]
      Email: [[!+email]]
      Messaggio: [[!+message]]
   `
   &validate=`firstName:required,email:required:email,message:required`
   &submitVar=`submit-contact`
]]

[[$contactForm]]
```

**Se anche questo non funziona**, il problema è più profondo.

---

## Checklist Completa

Prima di contattare il supporto, verifica:

### ✅ Chunks MODX
- [ ] Chunk `contactForm` creato e salvato
- [ ] Chunk `contactEmail` creato e salvato
- [ ] Chunk `contactEmail-SIMPLE` creato per debug
- [ ] Nessun errore di sintassi nei chunks

### ✅ System Settings
- [ ] `emailsender` = `danilo.bernabeo@gmail.com`
- [ ] `site_name` = qualsiasi valore
- [ ] Mail SMTP configurato (se necessario)

### ✅ FormIt
- [ ] FormIt 5.1.1 installato (Extras > Installer)
- [ ] FormIt abilitato (Extras > Manage)
- [ ] Chiamata usa `[[!FormIt?` con `!` (uncached)

### ✅ Test
- [ ] Cache MODX svuotata dopo ogni modifica
- [ ] QuickEmail funziona (conferma: SÌ ✅)
- [ ] Form si sottomette (redirect success=1: SÌ ✅)
- [ ] Controllato spam/junk della casella email
- [ ] Provato a inviare a un altro indirizzo email

---

## Debug Avanzato

### Abilita Error Reporting MODX

1. Vai su **System Settings**
2. Cerca `log_level`
3. Imposta a `4` (DEBUG)
4. Cerca `log_target`
5. Imposta a `FILE`
6. Testa il form
7. Controlla: **System > Reports > Error Log**

### Verifica Hook Email Execution

Aggiungi un hook custom per loggare:

1. Crea file `/core/components/formit/hooks/testlog.php`:
```php
<?php
$modx->log(modX::LOG_LEVEL_ERROR, 'FormIt Hook Executed - Email should send now');
return true;
```

2. Modifica FormIt:
```modx
&hooks=`testlog,email`
```

3. Testa e controlla Error Log

---

## Soluzioni Alternative

Se nulla funziona, puoi:

### Opzione 1: Usa FormItSaveForm + Script Custom

Salva i dati nel database e invia email con uno script PHP separato.

### Opzione 2: Usa FormItRetriever + Cron

Salva submissions e invia email via cron job.

### Opzione 3: Integra servizio esterno

Usa Formspree, Mailgun API, SendGrid API direttamente.

---

## Cosa Fare ORA

**Prova in ORDINE:**

1. ✅ **STEP 1** - Debug con chunk semplice (5 min)
2. Se funziona → **STEP 2** - Versione fixed (2 min)
3. Se non funziona → **STEP 3** - Test inline (5 min)
4. Se ancora non funziona → **Debug Avanzato** (15 min)
5. Se nulla funziona → **Contatta supporto MODX** con screenshot Error Log

---

## File Creati per Te

- `contactFormCall-FIXED.snippet.html` - Versione corretta per produzione
- `contactFormCall-DEBUG.snippet.html` - Versione debug con output
- `contactEmail-SIMPLE.chunk.html` - Template email semplificato per test
- `TROUBLESHOOTING_EMAIL.md` - Questa guida

---

## Nota Importante

Il parametro **`&emailHtml=1`** è ESSENZIALE quando usi template HTML.
Senza questo parametro, FormIt invia l'email come plain text e molti server email
la rifiutano o la mettono in quarantena se contiene tag HTML.

**Questo era molto probabilmente il tuo problema principale.**

---

## Supporto

Se dopo tutti questi test non funziona ancora:

1. Esporta il contenuto dei tuoi chunks
2. Fai screenshot dell'Error Log MODX
3. Verifica versione PHP del server
4. Contatta il tuo hosting per verificare restrizioni su mail()
5. Considera di usare SMTP invece di mail()

---

Buon debug! 🔍
