# 🚀 Guida Pratica a GitHub per Principianti

Benvenuto! Questa guida ti aiuterà a capire GitHub e come usarlo per lavorare efficacemente con Claude.

## 📚 Indice

1. [Cos'è GitHub?](#cosè-github)
2. [Concetti Fondamentali](#concetti-fondamentali)
3. [Configurazione Iniziale](#configurazione-iniziale)
4. [Workflow Pratico](#workflow-pratico)
5. [Lavorare con Claude](#lavorare-con-claude)
6. [Comandi Essenziali](#comandi-essenziali)
7. [Best Practices](#best-practices)

---

## Cos'è GitHub?

**GitHub** è una piattaforma che ti permette di:
- 📂 Salvare e organizzare il tuo codice online
- 🕐 Tenere traccia di tutte le modifiche nel tempo
- 🤝 Collaborare con altri (incluso Claude!)
- ↩️ Tornare indietro a versioni precedenti se qualcosa va storto
- 🌿 Lavorare su più versioni del progetto in parallelo

Pensa a GitHub come a **Google Drive per il codice**, ma molto più potente!

---

## Concetti Fondamentali

### 1. Repository (Repo)
È la **cartella del tuo progetto** su GitHub. Contiene tutti i file e la storia delle modifiche.

```
📦 Il Tuo Repository
 ├── 📁 assets/
 ├── 📄 index.html
 └── 📄 GUIDA_GITHUB.md
```

### 2. Commit
Un **"salvataggio"** delle tue modifiche con una descrizione.

Esempio:
```
Commit: "Aggiungo pagina di contatto"
- Aggiunto contact.html
- Modificato menu di navigazione
```

### 3. Branch (Ramo)
Una **versione parallela** del tuo progetto dove puoi sperimentare senza toccare la versione principale.

```
main ──────────────────────► (versione stabile)
       \
        feature-contatti ───► (nuova funzionalità)
```

**Vantaggi:**
- Puoi lavorare su nuove funzionalità senza rompere il codice funzionante
- Claude può lavorare su branch separati
- Puoi sperimentare liberamente

### 4. Pull Request (PR)
Una **richiesta di unire** le modifiche di un branch in un altro. È come dire:
> "Ho finito questa funzionalità, possiamo aggiungerla al progetto principale?"

### 5. Push e Pull
- **Push**: Invii le tue modifiche locali su GitHub
- **Pull**: Scarichi le modifiche da GitHub sul tuo computer

---

## Configurazione Iniziale

### Installare Git

**Windows:**
1. Scarica da [git-scm.com](https://git-scm.com)
2. Installa con le opzioni predefinite

**Mac:**
```bash
# Apri Terminal e digita:
brew install git
```

**Linux:**
```bash
sudo apt install git
```

### Configurare Git

Apri il terminale e configura il tuo nome e email:

```bash
git config --global user.name "Il Tuo Nome"
git config --global user.email "tua.email@esempio.com"
```

### Autenticarsi con GitHub

1. Crea un account su [github.com](https://github.com)
2. Configura l'autenticazione con Personal Access Token:
   - Vai su GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Clicca "Generate new token (classic)"
   - Seleziona scope: `repo`, `workflow`
   - Salva il token in un posto sicuro!

---

## Workflow Pratico

### Scenario 1: Iniziare con un Nuovo Progetto

```bash
# 1. Crea una cartella per il progetto
mkdir mio-progetto
cd mio-progetto

# 2. Inizializza Git
git init

# 3. Crea il primo file
echo "# Mio Progetto" > README.md

# 4. Aggiungi il file
git add README.md

# 5. Crea il primo commit
git commit -m "Primo commit: aggiungo README"

# 6. Collega a GitHub (crea prima il repo su github.com)
git remote add origin https://github.com/tuo-username/mio-progetto.git

# 7. Invia su GitHub
git push -u origin main
```

### Scenario 2: Clonare un Progetto Esistente

```bash
# Scarica il progetto sul tuo computer
git clone https://github.com/username/progetto.git
cd progetto

# Ora puoi lavorare sui file!
```

### Scenario 3: Lavorare su una Nuova Funzionalità

```bash
# 1. Crea un nuovo branch
git checkout -b feature-menu

# 2. Lavora sui file
# ... modifica i file ...

# 3. Verifica le modifiche
git status

# 4. Aggiungi le modifiche
git add .

# 5. Crea un commit
git commit -m "Aggiungo nuovo menu di navigazione"

# 6. Invia su GitHub
git push -u origin feature-menu
```

---

## Lavorare con Claude

### Come Claude Usa GitHub

Quando lavori con Claude su questo progetto:

1. **Claude lavora sempre su branch dedicati** che iniziano con `claude/`
   - Esempio: `claude/github-learning-guide-011CUrntGbAERjss9S4jJpRo`

2. **Claude crea commit** per le modifiche che fa

3. **Claude può creare Pull Request** per proporre modifiche

### Workflow Consigliato con Claude

#### Opzione A: Lasciare Claude Lavorare Liberamente

```bash
# 1. Claude crea un branch e lavora
# 2. Claude fa commit e push
# 3. Tu rivedi le modifiche su GitHub
# 4. Se va bene, fai merge della PR
```

#### Opzione B: Collaborare Attivamente

```bash
# 1. Scarica il branch di Claude
git fetch origin
git checkout claude/nome-branch

# 2. Rivedi le modifiche localmente
git log
git diff main

# 3. Se vuoi fare modifiche, crea il tuo branch
git checkout -b mie-modifiche

# 4. Lavora e fai commit
git add .
git commit -m "Miglioro documentazione"

# 5. Push e crea PR
git push -u origin mie-modifiche
```

### Rivedere il Lavoro di Claude

Su GitHub:
1. Vai alla tab **"Pull Requests"**
2. Clicca sulla PR di Claude
3. Guarda la tab **"Files changed"** per vedere tutte le modifiche
4. Puoi:
   - ✅ Approvare e fare merge
   - 💬 Commentare per chiedere modifiche
   - ✏️ Modificare direttamente

---

## Comandi Essenziali

### Comandi Base

```bash
# Vedere lo stato del repository
git status

# Vedere la storia dei commit
git log
git log --oneline  # versione compatta

# Vedere i branch
git branch         # branch locali
git branch -a      # tutti i branch (anche remoti)

# Cambiare branch
git checkout nome-branch

# Creare e cambiare branch
git checkout -b nuovo-branch
```

### Salvare Modifiche

```bash
# Aggiungere file specifici
git add file1.html file2.css

# Aggiungere tutti i file modificati
git add .

# Creare un commit
git commit -m "Descrizione delle modifiche"

# Modificare l'ultimo commit (se non hai ancora fatto push)
git commit --amend -m "Nuova descrizione"
```

### Sincronizzare con GitHub

```bash
# Scaricare modifiche
git fetch origin              # scarica info sui branch
git pull origin main          # scarica e integra modifiche

# Inviare modifiche
git push origin nome-branch
git push -u origin nome-branch  # prima volta, imposta tracking
```

### Gestire i Branch

```bash
# Creare un branch
git branch nome-branch

# Eliminare un branch locale
git branch -d nome-branch

# Eliminare un branch remoto
git push origin --delete nome-branch

# Unire un branch nel branch corrente
git merge altro-branch
```

### Comandi Utili

```bash
# Vedere le differenze
git diff                    # modifiche non staged
git diff --staged          # modifiche staged
git diff main..feature     # differenze tra due branch

# Scartare modifiche
git checkout -- file.txt   # scarta modifiche a un file
git reset --hard          # scarta TUTTE le modifiche (attenzione!)

# Vedere i remote configurati
git remote -v

# Aggiornare lista branch remoti
git remote update origin --prune
```

---

## Best Practices

### 1. Commit Frequenti e Piccoli

❌ **Male:**
```bash
git commit -m "Modifiche varie"  # Troppo generico!
```

✅ **Bene:**
```bash
git commit -m "Correggo errore di validazione nel form contatti"
git commit -m "Aggiungo animazione al menu mobile"
```

### 2. Messaggi di Commit Chiari

Usa la forma imperativa:
- ✅ "Aggiungo menu di navigazione"
- ✅ "Correggo bug nel caricamento immagini"
- ✅ "Rifattorizzo funzione di login"
- ❌ "Aggiunto menu" (tempo sbagliato)
- ❌ "Fix" (troppo generico)

### 3. Branch con Nomi Significativi

- ✅ `feature-menu-mobile`
- ✅ `fix-login-bug`
- ✅ `update-homepage`
- ❌ `temp`
- ❌ `prova123`

### 4. Fai Pull Prima di Push

```bash
# Prima di inviare le tue modifiche, scarica quelle degli altri
git pull origin main
git push origin main
```

### 5. Non Committare File Sensibili

Crea un file `.gitignore` per escludere:
```
# File da non tracciare
.env
config.json
node_modules/
*.log
.DS_Store
```

### 6. Usa Branch per Sperimentare

Non aver paura di creare branch! Sono "economici" e ti permettono di:
- Provare idee senza rischi
- Lavorare su più funzionalità in parallelo
- Tornare indietro facilmente

---

## 🎯 Checklist del Principiante

Prova a completare queste attività:

- [ ] Installa Git sul tuo computer
- [ ] Configura nome e email
- [ ] Crea un account GitHub
- [ ] Crea il tuo primo repository
- [ ] Clona un repository
- [ ] Crea un branch
- [ ] Fai il tuo primo commit
- [ ] Fai push su GitHub
- [ ] Crea una Pull Request
- [ ] Rivedi una PR di Claude

---

## 🆘 Problemi Comuni

### "Non ho i permessi per fare push"

**Soluzione:** Controlla l'autenticazione
```bash
git remote -v
# Se vedi https://, devi configurare le credenziali
```

### "Conflitti durante il merge"

**Soluzione:** Git ti mostra i file in conflitto
```bash
git status  # vedi i file in conflitto
# Aprili e cerca i marcatori <<<<<<, =======, >>>>>>>
# Risolvi manualmente, poi:
git add file-risolto.txt
git commit -m "Risolvo conflitti"
```

### "Ho fatto commit di file sbagliati"

**Soluzione:** Se non hai ancora fatto push
```bash
git reset HEAD~1  # torna indietro di 1 commit
# I file restano modificati, rifai il commit correttamente
```

### "Ho perso le modifiche!"

**Soluzione:** Git raramente perde davvero qualcosa
```bash
git reflog  # mostra TUTTO quello che hai fatto
# Trova il commit che vuoi recuperare e:
git checkout <commit-hash>
```

---

## 📖 Risorse per Imparare

### Interattive
- [Learn Git Branching](https://learngitbranching.js.org/?locale=it_IT) - Tutorial visuale e interattivo
- [GitHub Learning Lab](https://skills.github.com/) - Corsi pratici

### Documentazione
- [Git Book (Italiano)](https://git-scm.com/book/it/v2)
- [GitHub Docs](https://docs.github.com/it)

### Cheat Sheet
- [Git Cheat Sheet PDF](https://education.github.com/git-cheat-sheet-education.pdf)

---

## 💡 Prossimi Passi

Ora che conosci le basi:

1. **Pratica regolarmente** - Usa Git per tutti i tuoi progetti
2. **Sperimenta con i branch** - Non aver paura di provare cose nuove
3. **Rivedi il lavoro di Claude** - Impara dai commit che fa
4. **Chiedi aiuto** - La comunità GitHub è molto disponibile

**Ricorda:** Tutti gli sviluppatori hanno iniziato da zero. La pratica rende perfetti!

---

## 🤝 Lavorare Efficacemente con Claude

### Cosa Puoi Chiedere a Claude

- "Crea un nuovo branch per questa feature"
- "Fai commit delle modifiche che hai fatto"
- "Crea una PR per la funzionalità X"
- "Mostrami le differenze rispetto a main"
- "Rivedi il codice in questo branch"

### Workflow Consigliato

1. **Descrivi cosa vuoi** a Claude
2. Claude lavora su un branch dedicato
3. **Rivedi le modifiche** su GitHub
4. **Testa localmente** se necessario
5. **Fai merge** quando sei soddisfatto

---

**Buon lavoro con GitHub! 🚀**

Se hai domande, chiedi pure a Claude o consulta la documentazione ufficiale.
