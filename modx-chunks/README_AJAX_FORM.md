# Form di Contatto AJAX - Guida Implementazione

## Caratteristiche

✅ **Nessun reload della pagina**
✅ **Validazione client-side (HTML5)**
✅ **Validazione server-side (FormIt)**
✅ **Errori mostrati inline istantaneamente**
✅ **Messaggio successo senza reload**
✅ **Form nascosto dopo invio**
✅ **Loading state durante invio**
✅ **Scroll automatico a errori/successo**
✅ **Animazioni smooth**

---

## Installazione

### 1. Crea il Chunk AJAX in MODX

**Nome:** `contactFormAjax`

1. Vai su **Elements > Chunks**
2. Click destro > **New Chunk**
3. Nome: `contactFormAjax`
4. Copia il contenuto da: `contactFormAjax.chunk.html`
5. **Save**

### 2. Usa nella Pagina MODX

Sostituisci la chiamata FormIt con:

```modx
[[!FormIt?
   &hooks=`email`
   &emailTpl=`contactEmail`
   &emailSubject=`Nuova richiesta di contatto da 27Factory`
   &emailTo=`danilo.bernabeo@gmail.com`
   &emailFrom=`danilo.bernabeo@gmail.com`
   &emailFromName=`Form Contatti 27Factory`
   &emailReplyTo=`[[!+email]]`
   &emailReplyToName=`[[!+firstName]] [[!+lastName]]`
   &emailHtml=`1`
   &validate=`
      firstName:required:minLength=^2^,
      lastName:required:minLength=^2^,
      email:email:required,
      phone:required:minLength=^8^,
      message:required:minLength=^10^:maxLength=^5000^
   `
   &validationErrorMessage=`Si prega di correggere gli errori nel form.`
   &successMessage=`Grazie per averci contattato!`
   &submitVar=`submit-contact`
   &store=`1`
]]

[[$contactFormAjax]]
```

**Nota:** Usa `[[$contactFormAjax]]` invece di `[[$contactForm]]`

### 3. Svuota Cache

**System > Site > Clear Cache**

---

## Come Funziona

### Flow Utente - Errori di Validazione

1. Utente compila form (es. dimentica il telefono)
2. Click "Submit"
3. **JavaScript intercetta** il submit
4. **Validazione HTML5** verifica campi
5. **Submit AJAX** invia a FormIt
6. **FormIt valida** server-side
7. **JavaScript riceve errori**
8. **Mostra errori inline** senza reload
9. **Scroll al primo campo** con errore
10. **NO RELOAD PAGINA**

### Flow Utente - Invio Successo

1. Utente compila correttamente
2. Click "Submit"
3. **Button mostra "Sending..."** con spinner
4. **AJAX invia** a FormIt
5. **FormIt invia email** via SMTP
6. **JavaScript riceve successo**
7. **Form si nasconde** con fade out
8. **Messaggio verde** appare con checkmark ✓
9. **Scroll smooth** al messaggio
10. **NO RELOAD PAGINA**

---

## Tecnologie Usate

### Validazione Client-Side (HTML5)

```html
<input
   type="email"
   required
   minlength="8"
>
```

Validazione istantanea nel browser prima di inviare.

### Validazione Server-Side (FormIt)

```modx
&validate=`email:email:required`
```

Sicurezza: anche se JS è disabilitato, FormIt valida.

### AJAX (Fetch API)

```javascript
fetch(window.location.href, {
   method: 'POST',
   body: formData
})
```

Invio senza reload pagina.

### Parse Risposta HTML

```javascript
var parser = new DOMParser();
var doc = parser.parseFromString(html, 'text/html');
```

Legge gli errori FormIt dalla risposta HTML.

---

## Stati del Form

### 1. Stato Iniziale
- ✅ Form visibile
- ✅ Campi vuoti
- ✅ Nessun errore
- ✅ Button "Submit"

### 2. Durante Invio (Loading)
- ✅ Button disabilitato
- ✅ Testo "Sending..."
- ✅ Spinner animato
- ❌ Form non editabile

### 3. Errori Validazione
- ✅ Form visibile
- ✅ Campi con errori evidenziati rosso
- ✅ Messaggi errore sotto ogni campo
- ✅ Banner errore generale in alto
- ✅ Scroll al primo errore
- ✅ Valori form preservati

### 4. Successo
- ❌ Form nascosto
- ✅ Messaggio verde con checkmark
- ✅ Scroll al messaggio
- ✅ Email inviata

---

## Personalizzazione

### Messaggi

```javascript
// Successo (nel chunk)
Grazie per averci contattato! Riceverai una conferma via email...

// Errore generale (nel chunk)
Si prega di correggere gli errori evidenziati.

// Errore rete
Si è verificato un errore. Riprova più tardi.
```

### Colori

```css
/* Successo */
.success-message-ajax {
   background-color: #d4edda;
   border: 2px solid #28a745;
   color: #155724;
}

/* Errore */
.error-message-ajax {
   background-color: #f8d7da;
   border: 2px solid #BF0A0B;
   color: #721c24;
}

/* Campo con errore */
.field-error {
   border-color: #BF0A0B !important;
   background-color: #fff5f5 !important;
}
```

### Animazioni

```css
/* Velocità animazioni */
@keyframes slideDown {
   from { opacity: 0; transform: translateY(-20px); }
   to { opacity: 1; transform: translateY(0); }
}

/* Durata */
animation: slideDown 0.5s ease-out;
```

---

## Validazione Real-Time (Opzionale)

Il chunk include validazione real-time quando l'utente esce da un campo:

```javascript
input.addEventListener('blur', function() {
   if (this.validity.valid) {
      // Rimuovi errore se campo valido
   }
});
```

**Puoi rimuovere** questa sezione se non vuoi la validazione real-time.

---

## Compatibilità Browser

✅ Chrome / Edge (moderno)
✅ Firefox
✅ Safari
✅ Opera
✅ Mobile browsers

**Richiede:**
- `fetch` API (supportato da tutti i browser moderni)
- `FormData` API
- `DOMParser` API

**Fallback:** Se JS è disabilitato, il form funziona comunque in modo tradizionale (con reload).

---

## Debug

### JavaScript Console

Apri DevTools (F12) > Console per vedere:

```javascript
console.log('Form submitted via AJAX');
console.log('Response received');
console.error('Error:', error);
```

### Network Tab

DevTools > Network > cerca POST alla pagina stessa

Verifica:
- Status: 200 OK
- Response contiene HTML FormIt

---

## Troubleshooting

### Messaggio successo non appare

**Causa:** FormIt restituisce errori nascosti
**Soluzione:** Controlla la risposta HTML in Network tab

### Errori non appaiono inline

**Causa:** ID campi non corrispondono
**Soluzione:** Verifica che ID input = name input

### Loading infinito

**Causa:** JavaScript error
**Soluzione:** Controlla Console per errori

### Email non arriva ma successo appare

**Causa:** SMTP non configurato correttamente
**Soluzione:** Verifica SMTP settings in MODX

---

## Differenze con Versione Non-AJAX

| Versione Standard | Versione AJAX |
|-------------------|---------------|
| Reload pagina | ❌ Nessun reload |
| Scroll automatico post-reload | ✅ Rimane dove sei |
| Errori dopo reload | ✅ Errori istantanei |
| Successo dopo redirect | ✅ Successo inline |
| Form sempre visibile | ✅ Form si nasconde |
| Nessun loading state | ✅ "Sending..." + spinner |

---

## Vantaggi AJAX

✅ **UX migliore** - Nessuna interruzione
✅ **Più veloce** - Nessun reload completo
✅ **Feedback istantaneo** - Errori immediati
✅ **Moderna** - Standard 2024+
✅ **Mobile friendly** - Evita reload su mobile
✅ **Validazione doppia** - Client + Server

---

## Note Importanti

1. **FormIt rimane uguale** - Solo il chunk cambia
2. **Email funziona** - SMTP configurato funziona
3. **Sicurezza OK** - Validazione server-side attiva
4. **Graceful degradation** - Funziona anche senza JS
5. **SEO friendly** - Nessun impatto SEO

---

## Testing

### Test 1: Validazione Client
- Compila solo nome
- Submit → Vedi errori HTML5 browser?

### Test 2: Validazione Server
- Compila email sbagliata (es: "test")
- Submit → Vedi errore "formato email non valido"?

### Test 3: Successo
- Compila tutto correttamente
- Submit → Form scompare? Messaggio verde appare?
- Email arriva?

### Test 4: Loading State
- Click Submit
- Vedi "Sending..." con spinner?
- Button disabilitato?

### Test 5: Scroll
- Scroll in alto pagina
- Submit con errori
- Scroll automatico al form?

---

**Pronto all'uso! Nessuna configurazione aggiuntiva necessaria.** 🚀
