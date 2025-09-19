# Guida Amministratore - Sistema di Gestione Contenuti

## 🚀 Come Creare il Primo Admin

### Passo 1: Bootstrap del Primo Admin
1. Avvia l'applicazione con `npm run dev`
2. Vai su `http://localhost:3000/admin/bootstrap`
3. Inserisci email e password per il primo admin (es: `admin@example.com` / `admin123`)
4. Clicca "Crea admin"

⚠️ **IMPORTANTE**: La pagina di bootstrap funziona SOLO se non esistono già admin nel sistema. È sicura e può essere lasciata online.

### Passo 2: Accesso alla Dashboard
1. Vai su `http://localhost:3000/admin/login`
2. Inserisci le credenziali create nel passo 1
3. Verrai reindirizzato alla dashboard admin

## 📋 Funzionalità della Dashboard

### Creazione Contenuti Base
- **Categoria**: Es. "Ristoranti", "Attrazioni", "Trasporti"
- **Sottocategoria**: Es. "Pizzerie", "Musei", "Autobus"

### Modifica Contenuti Completa
Cliccando su "Modifica" puoi aggiungere:

#### 📝 Informazioni Base
- **Titolo**: Nome del contenuto
- **Descrizione**: Breve descrizione
- **Contenuto**: Descrizione dettagliata
- **Icona**: Emoji o nome icona

#### 📞 Contatti
- **Telefono**: Numero di telefono
- **Email**: Indirizzo email
- **Indirizzo**: Indirizzo fisico
- **Sito web**: URL del sito

#### 📋 Istruzioni e Consigli
- **Istruzioni**: Lista di istruzioni passo-passo
- **Consigli**: Suggerimenti utili

#### 🔗 Link Utili
- **Titolo**: Nome del link
- **URL**: Indirizzo web
- **Descrizione**: Descrizione opzionale

#### 💰 Prezzi
- **Prezzo**: Range di prezzo (es. "10-20")
- **Valuta**: EUR, USD, GBP
- **Note**: Informazioni aggiuntive sui prezzi

#### ⏰ Orari e Disponibilità
- **Orari di apertura**: Es. "9:00-18:00"
- **Disponibilità**: Es. "Tutti i giorni"
- **Stagionalità**: Es. "Aperto da marzo a ottobre"

#### 📍 Posizione
- **Indirizzo**: Indirizzo completo
- **Coordinate**: Latitudine e longitudine
- **Indicazioni**: Come raggiungere il luogo

#### ⚙️ Impostazioni
- **Tag**: Parole chiave separate da virgola
- **Priorità**: Numero da 0 a 100 (più alto = più importante)
- **Attivo**: Se il contenuto è visibile pubblicamente

## 🔐 Sistema di Autenticazione

### Sicurezza
- **Token JWT**: Sessioni sicure con scadenza
- **Hash Password**: Password crittografate con salt
- **Validazione**: Controllo autorizzazioni su ogni richiesta

### Gestione Sessioni
- **Durata**: 24 ore di default
- **Auto-logout**: Logout automatico alla scadenza
- **Persistenza**: Token salvato in localStorage

## 🛠️ Struttura Tecnica

### File Principali
```
src/app/admin/
├── bootstrap/page.tsx    # Creazione primo admin
├── login/page.tsx        # Login admin
├── page.tsx             # Dashboard principale
└── edit/[id]/page.tsx   # Modifica contenuto

convex/
├── adminAuth.ts         # Autenticazione admin
├── adminContents.ts     # Gestione contenuti
└── schema.ts           # Schema database
```

### Database
- **admin_users**: Utenti amministratori
- **admin_sessions**: Sessioni attive
- **contents**: Contenuti del sito

## 🔧 Comandi Utili

### Sviluppo
```bash
npm run dev          # Avvia in modalità sviluppo
npx convex dev       # Avvia Convex in sviluppo
```

### Produzione
```bash
npm run build        # Build per produzione
npx convex deploy    # Deploy Convex
```

### Debug
```bash
npx convex logs      # Visualizza log Convex
npx convex dashboard # Apri dashboard Convex
```

## 🚨 Risoluzione Problemi

### Admin non riesce a loggarsi
1. Verifica che l'admin sia stato creato correttamente
2. Controlla i log di Convex: `npx convex logs`
3. Verifica che il token non sia scaduto

### Errori di autorizzazione
1. Controlla che il token sia valido
2. Verifica che l'utente abbia ruolo "admin"
3. Controlla la scadenza della sessione

### Contenuti non si salvano
1. Verifica la connessione a Convex
2. Controlla i log per errori di validazione
3. Verifica che tutti i campi obbligatori siano compilati

## 📱 Utilizzo Mobile

La dashboard è responsive e funziona su:
- ✅ Desktop
- ✅ Tablet
- ✅ Smartphone

## 🔄 Backup e Sicurezza

### Backup Automatico
Convex gestisce automaticamente:
- Backup incrementali
- Replica dei dati
- Disaster recovery

### Sicurezza
- Connessioni HTTPS
- Validazione input
- Protezione CSRF
- Rate limiting

## 📈 Monitoraggio

### Metriche Disponibili
- Numero di contenuti
- Sessioni admin attive
- Errori di sistema
- Performance query

### Dashboard Convex
Accedi a `https://dashboard.convex.dev` per:
- Visualizzare dati in tempo reale
- Monitorare performance
- Gestire deployment
- Visualizzare log

## 🎯 Best Practices

### Gestione Contenuti
1. **Categorizzazione**: Usa categorie coerenti
2. **SEO**: Compila sempre titolo e descrizione
3. **Immagini**: Usa URL validi per le immagini
4. **Priorità**: Imposta priorità per ordinamento

### Sicurezza
1. **Password**: Usa password complesse
2. **Logout**: Fai sempre logout quando finisci
3. **Sessioni**: Non condividere token di sessione
4. **Accesso**: Limita l'accesso alla dashboard

### Performance
1. **Contenuti**: Non creare troppi contenuti inattivi
2. **Immagini**: Ottimizza le immagini prima dell'upload
3. **Cache**: Il sistema usa cache automatica
4. **Indici**: Il database è ottimizzato automaticamente

---

## 🆘 Supporto

Per problemi tecnici:
1. Controlla questa guida
2. Verifica i log di Convex
3. Controlla la console del browser
4. Contatta il team di sviluppo

**Buona gestione dei contenuti! 🎉**
