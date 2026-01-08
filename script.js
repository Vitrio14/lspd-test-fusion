// --- CONFIGURAZIONE FIREBASE ---
const firebaseConfig = {
    apiKey: "AIzaSyDfIW4GjBZ4QGPvfJtzLAr34VxDRLzcU6M",
    authDomain: "lspd-portal-d34b0.firebaseapp.com",
    projectId: "lspd-portal-d34b0",
    storageBucket: "lspd-portal-d34b0.firebasestorage.app",
    messagingSenderId: "991237515788",
    appId: "1:991237515788:web:302c1b6819947116199c29",
    measurementId: "G-Y4XMD4QLMQ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); 

// --- CONFIGURAZIONE WEBHOOK DISCORD ---
const WEBHOOK_URL = "https://discord.com/api/webhooks/1458948979193548800/JivwVvSrdbIoWQDUPXKKnX1sBV_4aIqaKtp2hNLWp0h702aD774QuYamz2w6eTVJ22jH"; 
const WEBHOOK_DETTAGLI_URL = "https://discord.com/api/webhooks/1458951733358231694/wRmUgMvp8jHH9zl_H3EHUR5LdmyNEnANNo6dH-HgdyR567PtBxS-Uvhs7-IPDERgawCA";

// --- DATABASE DOMANDE ---
const questionsRecluta = [
    { q: "In una pattuglia ADAM, quale ruolo ricopre l'agente seduto sul lato passeggero?", options: ["Guidatore", "Capo Pattuglia", "Addetto ai prigionieri", "Supporto tattico"], correct: 1 },
    { q: "Qual è il grado minimo richiesto per una pattuglia LINCOLN senza necessità di permessi?", options: ["Agente I", "Agente II", "Agente Scelto", "Sergente"], correct: 3 },
    { q: "Quante ADAM devono essere attive per autorizzare una pattuglia MARY (Moto)?", options: ["Almeno 2", "Almeno 3", "Almeno 4", "Almeno 5"], correct: 2 },
    { q: "Cosa indica il CODICE 0 nel protocollo emergenze?", options: ["Fine emergenza", "Emergenza massima (attacco istituzioni)", "Soggetto in custodia", "Rifornimento"], correct: 1 },
    { q: "Quale codice indica un fermo stradale operativo?", options: ["10-15", "10-20", "10-55", "10-80"], correct: 2 },
    { q: "Quante volte può essere ripetuto il Miranda Warning prima che si consideri accettato?", options: ["Sempre e solo 1 volta", "Massimo 2 volte", "Massimo 3 volte", "Fino a 5 volte"], correct: 2 },
    { q: "Se il soggetto non risponde dopo 3 ripetizioni dei diritti, quale reato si configura?", options: ["Resistenza a pubblico ufficiale", "Intralcio alla giustizia", "Oltraggio", "Nessun reato aggiuntivo"], correct: 1 },
    { q: "Qual è la durata fissa prevista per uno Stato di Fermo?", options: ["15 minuti", "20 minuti", "30 minuti", "60 minuti"], correct: 2 },
    { q: "Durante un 10-55, come va posizionata la volante rispetto al veicolo fermato?", options: ["Affiancata sul lato guida", "Davanti al veicolo per bloccarlo", "A 2m dietro con inclinazione 45° verso l'esterno", "Direttamente dietro in asse"], correct: 2 },
    { q: "Dopo quanti minuti di inseguimento (10-80) è possibile richiedere una manovra PIT o BOX?", options: ["Subito", "Dopo 5 minuti", "Dopo 10 minuti", "Dopo 15 minuti"], correct: 2 },
    { q: "Qual è la velocità massima consentita per eseguire una manovra PIT in sicurezza?", options: ["Inferiore a 80 km/h", "Inferiore a 100 km/h", "Inferiore a 120 km/h", "Senza limiti"], correct: 2 },
    { q: "In quale caso l'agente può agire senza mandato (Probable Cause)?", options: ["Sempre se ha un sospetto", "Se ritiene ragionevolmente che la persona sia colpevole di un crimine", "Solo su ordine del comando", "Solo se il soggetto ha precedenti"], correct: 1 },
    { q: "Chi può emanare o approvare lo stato di DEFCON 2?", options: ["Qualsiasi Agente", "Sergente o superiore", "Procuratore Generale o Governatore", "Solo il Governatore"], correct: 2 },
    { q: "Quale manovra BOX prevede l'ausilio di una struttura (es. muro) come blocco?", options: ["Box a I", "Box a T", "Box a Muro", "Box a Sandwich"], correct: 2 },
    { q: "Cosa indica lo stato di DEFCON 1?", options: ["Rifornimento centrali", "Guerre civili o colpi di stato", "Inseguimento alto rischio", "Rapina in corso"], correct: 1 },
    { q: "Cosa si intende per 'Paralleling' durante un inseguimento?", options: ["Speronare lateralmente", "Posizionarsi su strade parallele per anticipare il sospetto", "Inseguimento a luci spente", "Blocco stradale"], correct: 1 },
    { q: "Come deve rispondere la pattuglia si chiamata in CODICE 3?", options: ["Senza sirene rispettando il codice", "Solo lampeggianti e limiti di velocità", "Lampeggianti e sirene senza rispettare i codici stradali", "Solo se autorizzata dal comando"], correct: 2 },
    { q: "Entro quanto tempo deve essere inoltrato il rapporto dopo un arresto?", options: ["Immediatamente", "Entro massimo un'ora", "Entro due ore", "Entro fine turno"], correct: 1 },
    { q: "Chi ha l'autorità per approvare il DEFCON 3?", options: ["Qualsiasi Supervisore", "Governatore", "Procuratore Generale o Alto Comando", "Sergente"], correct: 2 },
    { q: "Qual è lo STATUS radio che indica che una pattuglia è in rifornimento o riparazione?", options: ["STATUS 1", "STATUS 2", "STATUS 3", "STATUS 4"], correct: 2 }
];

const questionsSergente = [
    { q: "In qualità di supervisore, un'unità ADAM richiede il supporto per un 10-80 ad alta velocità. Qual è la tua priorità?", options: ["Prendere il comando radio e coordinare", "Inseguire personalmente", "Autorizzare il PIT subito", "Chiedere il modello auto"], correct: 0 },
    { q: "Durante un conflitto a fuoco, un Agente è a terra. Cosa impone il protocollo sotto fuoco?", options: ["Rianimarlo subito", "Neutralizzare la minaccia prima dei soccorsi", "Aspettare i medici senza fare nulla", "Trasportarlo via mentre sparano"], correct: 1 },
    { q: "Un cittadino lamenta un abuso di potere da un Agente I. Come procedi?", options: ["Ignori il civile", "Sospendi l'agente subito", "Raccogli prove e apri rapporto disciplinare", "Dai ragione all'agente"], correct: 2 },
    { q: "Differenza tra DEFCON 2 e DEFCON 3?", options: ["Il 2 riguarda solo rapine", "Il 2 indica pericolo critico (approvazione Governatore)", "Nessuna", "Il 3 è più grave"], correct: 1 },
    { q: "Soggetto barricato con ostaggio. Ruolo del Sergente?", options: ["Irrompere da solo", "Perimetro, negoziazione e attesa SWAT/Specialisti", "Sparare alle vetrine", "Ordinare il fuoco libero"], correct: 1 },
    { q: "Cosa definisce la 'Catena di Custodia'?", options: ["L'arresto", "Documentazione cronologica per integrità prove", "Trasporto detenuti", "Gradi della pattuglia"], correct: 1 },
    { q: "Un'unità LINCOLN può operare in zone rosse (alto rischio)?", options: ["Sì, sempre", "No, serve supporto o integrazione in ADAM", "Solo con fucile", "Solo di giorno"], correct: 1 },
    { q: "Logica: Sospetto in vicolo cieco. Posizionamento volanti?", options: ["Tutte dentro il vicolo", "A 'V' (tappo) all'uscita del vicolo", "Affiancate al sospetto", "Lontano dal vicolo"], correct: 1 },
    { q: "Subordinato non rispetta protocollo radio. Azione correttiva?", options: ["Urla via radio", "Richiamo privato e poi rapporto scritto", "Ignora", "Licenziamento subito"], correct: 1 },
    { q: "Quando è giustificata la forza letale (Codice 4)?", options: ["Sospetto scappa a piedi", "Minaccia attiva alla vita con armi", "Insulti all'agente", "Furto d'auto"], correct: 1 },
    { q: "Obiettivo 'Air Support' (Elicottero)?", options: ["Sparare", "Visuale costante e coordinamento unità terra", "Trasporto", "Rifornimento"], correct: 1 },
    { q: "Soggetto dichiara vizio di forma e chiede rilascio. Cosa fai?", options: ["Lo rilasci", "Verifichi diritti e prosegui (deciderà il Giudice)", "Lo minacci", "Sequestri il telefono"], correct: 1 },
    { q: "Differenza tra Furto e Rapina?", options: ["Nessuna", "Furto senza violenza, Rapina con violenza/minaccia", "Rapina solo in banca", "Furto solo di notte"], correct: 1 },
    { q: "Regola d'oro negoziazione ostaggi?", options: ["Promettere tutto", "Mai scambiare ostaggio con agenti o armi", "Arrendersi", "Entrare mentre si parla"], correct: 1 },
    { q: "Chi coordina i rinforzi in una fuga a piedi nei boschi?", options: ["L'agente che corre", "Il grado più alto sul posto", "La centrale", "Nessuno"], correct: 1 },
    { q: "Cosa sono le 'Joint Operations'?", options: ["Operazioni tra diverse agenzie (LSPD/FIB)", "Pattuglia a due", "Turno notturno", "Adunata"], correct: 0 },
    { q: "Uso eccessivo del Taser da parte di un subordinato. Intervento?", options: ["Ti complimenti", "Segnali l'abuso e apri indagine interna", "Ignori", "Usi il taser anche tu"], correct: 1 },
    { q: "Velocità Codice 2?", options: ["Senza limiti", "Crociera rispettando il codice stradale", "Fissa 100km/h", "Sempre 200km/h"], correct: 1 },
    { q: "Il Sergente può autorizzare armamento pesante?", options: ["Sì, se la situazione lo richiede (conflitto a fuoco)", "No, mai", "Solo il Governatore", "Solo in caserma"], correct: 0 },
    { q: "Cosa si intende per 'Perimetro Tattico'?", options: ["Stare alla porta", "Isolare l'area impedendo accessi/uscite", "Entrare subito", "Fare foto"], correct: 1 }
];

// --- VARIABILI GLOBALI ---
let currentQuestionsDB = [];
let currentQuestion = 0;
let score = 0;
let userName = "";
let examType = "";
let timeLeft = 1800; 
let timerInterval;
let isExamStarted = false;
let userAnswers = []; 
let startTime;

// --- INIZIALIZZAZIONE ---
window.addEventListener('DOMContentLoaded', () => {
    updateClock();
    const pendingMsg = localStorage.getItem("pendingNotification");
    const pendingType = localStorage.getItem("pendingType");
    if (pendingMsg) {
        setTimeout(() => {
            showNotification(pendingMsg, pendingType || "success");
            localStorage.removeItem("pendingNotification");
            localStorage.removeItem("pendingType");
        }, 800);
    }
});

function updateClock() {
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.innerText = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);

function showNotification(message, type = 'error') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = "⚠️";
    if(type === 'success') icon = "✅";
    if(type === 'error') icon = "🚫";
    if(type === 'warning') icon = "⚡";
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = "toastOut 0.4s forwards";
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginBtn = document.getElementById('loginBtn');
    if (!email || !password) return showNotification("DATI MANCANTI", "error");
    loginBtn.innerText = "ACCESSO IN CORSO...";
    loginBtn.disabled = true;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            showNotification("ACCESSO AUTORIZZATO", "success");
            document.getElementById('auth-section').classList.add('hidden');
            document.getElementById('rp-section').classList.remove('hidden');
        })
        .catch(() => {
            loginBtn.innerText = "EFFETTUA LOGIN";
            loginBtn.disabled = false;
            showNotification("ACCESSO NEGATO", "error");
        });
}

function confirmIdentity() {
    const nameInput = document.getElementById('rpName').value;
    if (nameInput.trim().length < 5) return showNotification("NOME TROPPO CORTO", "error");
    userName = nameInput.trim().toUpperCase();
    document.getElementById('rp-section').classList.add('hidden');
    document.getElementById('course-section').classList.remove('hidden');
    showNotification(`IDENTITÀ REGISTRATA: ${userName}`, "success");
}

function backToName() {
    document.getElementById('course-section').classList.add('hidden');
    document.getElementById('rp-section').classList.remove('hidden');
    showNotification("RESET IDENTITÀ IN CORSO", "warning");
}

function selectExam(type) {
    examType = type === 'recluta' ? "RECLUTA / CADETTO" : "SERGENTE";
    currentQuestionsDB = type === 'recluta' ? questionsRecluta : questionsSergente;
    userAnswers = new Array(currentQuestionsDB.length).fill(undefined);
    currentQuestion = 0;
    
    document.getElementById('nameModal').classList.add('hidden');
    document.getElementById('course-section').classList.add('hidden');
    document.getElementById('briefing-title').innerText = `BRIEFING ESAME ${examType}`;
    document.getElementById('briefing-section').classList.remove('hidden');
    showNotification("DATA-PACK CARICATO", "warning");
}

function cancelBriefing() {
    document.getElementById('briefing-section').classList.add('hidden');
    document.getElementById('nameModal').classList.remove('hidden');
    document.getElementById('course-section').classList.remove('hidden');
    showNotification("REINDIRIZZAMENTO ALLA SELEZIONE CORSI", "warning");
}

function startFinalExam() {
    startTime = new Date(); 
    document.getElementById('briefing-section').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('exam-timer').classList.remove('hidden');
    document.getElementById('exam-title-display').innerText = `ESAME ${examType}`;
    if(document.getElementById('abort-btn')) document.getElementById('abort-btn').classList.remove('hidden');
    isExamStarted = true;
    startTimer();
    loadQuestion();
    showNotification("TEST AVVIATO - BUONA FORTUNA", "success");
}

function confirmAbort() { document.getElementById('abort-modal').classList.remove('hidden'); }
function closeAbortModal() { document.getElementById('abort-modal').classList.add('hidden'); }

async function abortExam() {
    clearInterval(timerInterval);
    isExamStarted = false; 
    localStorage.setItem("pendingNotification", "OPERAZIONE ANNULLATA");
    localStorage.setItem("pendingType", "error");
    await sendToDiscord(userName, 0, 0, "🛑 ANNULLATO", examType);
    location.reload();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        const display = document.getElementById('exam-timer');
        if (display) {
            display.innerText = `TEMPO: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
            if (timeLeft <= 300) display.style.color = "var(--error-red)";
        }
        if (timeLeft <= 0) { clearInterval(timerInterval); submitExam(); }
    }, 1000);
}

function jumpToQuestion(index) {
    currentQuestion = index;
    loadQuestion();
}

function loadQuestion() {
    const quizBox = document.getElementById('quiz-box');
    const qData = currentQuestionsDB[currentQuestion];
    const progressBar = document.getElementById('progress-bar');
    
    if (progressBar) progressBar.style.width = ((currentQuestion + 1) / currentQuestionsDB.length * 100) + "%";
    
    const isLastQuestion = currentQuestion === currentQuestionsDB.length - 1;

    // Generazione della barra numerica
    const questionDots = currentQuestionsDB.map((_, i) => {
        let stateClass = "";
        if (i === currentQuestion) stateClass = "active";
        else if (userAnswers[i] !== undefined) stateClass = "completed";
        return `<div class="q-dot ${stateClass}" onclick="jumpToQuestion(${i})">${i + 1}</div>`;
    }).join('');

    quizBox.innerHTML = `
        <div class="question-nav-bar" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 25px; justify-content: center;">
            ${questionDots}
        </div>

        <h2 style="color: var(--main-blue); font-size: 0.9rem; margin-bottom: 5px; text-transform: uppercase;">
            MODULO ${currentQuestion + 1} / ${currentQuestionsDB.length}
        </h2>
        
        <div class="question-text" style="font-size: 1.1rem; margin-bottom: 25px; padding: 15px; background: rgba(0, 114, 255, 0.05); border-left: 3px solid var(--main-blue);">
            ${qData.q}
        </div>

        <div class="options-list">
            ${qData.options.map((opt, i) => `
                <button class="option ${userAnswers[currentQuestion] === i ? 'selected' : ''}" onclick="selectAnswer(${i})">
                    <span class="bullet">></span> ${opt}
                </button>
            `).join('')}
        </div>

        <div class="nav-controls" style="margin-top: 30px; display: flex; justify-content: center;">
            ${isLastQuestion 
                ? `<button class="btn-primary" style="width: 100%; background: var(--success-green) !important;" onclick="openReviewModal()">REVISIONE FINALE</button>`
                : `<p style="font-size: 0.8rem; opacity: 0.5; font-style: italic;">Seleziona una risposta per proseguire o usa i numeri in alto per navigare</p>`
            }
        </div>
    `;
}

function selectAnswer(idx) {
    // 1. Salva la risposta nell'array
    userAnswers[currentQuestion] = idx;
    
    // 2. Ricarica la domanda per mostrare graficamente il tasto selezionato
    loadQuestion(); 

    // 3. Aspetta un breve momento (300ms) per dare feedback visivo, poi passa alla successiva
    // Se è l'ultima domanda, non fa nulla (l'utente dovrà premere "Revisione Finale")
    if (currentQuestion < currentQuestionsDB.length - 1) {
        setTimeout(() => {
            currentQuestion++;
            loadQuestion();
        }, 300); // 300 millisecondi di ritardo
    } else {
        showNotification("ULTIMA DOMANDA RAGGIUNTA - CONTROLLA E INVIA", "warning");
    }
}

function nextQuestion() {
    if (userAnswers[currentQuestion] === undefined) {
        return showNotification("SELEZIONA UNA RISPOSTA", "error");
    }
    if (currentQuestion < currentQuestionsDB.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function openReviewModal() {
    if (userAnswers.includes(undefined)) {
        return showNotification("MANCANO DELLE RISPOSTE!", "error");
    }
    document.getElementById('review-modal').classList.remove('hidden');
}

function closeReviewModal() {
    document.getElementById('review-modal').classList.add('hidden');
}

async function submitExam() {
    if (document.getElementById('review-modal')) closeReviewModal();
    clearInterval(timerInterval);
    
    const endTime = new Date();
    const diff = Math.abs(endTime - startTime);
    const minutes = Math.floor((diff / 1000) / 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const tempoImpiegato = `${minutes}m ${seconds}s`;

    score = 0;
    let reportDettagliato = "";

    currentQuestionsDB.forEach((q, index) => {
        const rispostaUtente = userAnswers[index];
        const isCorretta = rispostaUtente === q.correct;
        if (isCorretta) score++;
        reportDettagliato += `**D${index + 1}:** ${q.q}\n`;
        reportDettagliato += `${isCorretta ? "✅" : "❌"} Risposta: *${q.options[rispostaUtente]}*\n\n`;
    });

    const total = currentQuestionsDB.length;
    const percent = Math.round((score / total) * 100);
    const status = score >= 15 ? "IDONEO" : "NON IDONEO";

    showResults(score, total, percent, status);
    await sendToDiscord(userName, score, percent, status, examType);
    await sendDetailedToDiscord(userName, score, reportDettagliato, examType, tempoImpiegato);
}

function showResults(pts, total, perc, stat) {
    isExamStarted = false;
    document.getElementById('quiz-box').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('exam-timer').classList.add('hidden');
    if(document.getElementById('abort-btn')) document.getElementById('abort-btn').classList.add('hidden');
    
    document.getElementById('score-display').innerHTML = `
        <div style="border: 1px solid ${pts >= 15 ? 'var(--success-green)' : 'var(--error-red)'}; padding: 25px; background: rgba(0,0,0,0.3);">
            <h3 style="color: ${pts >= 15 ? 'var(--success-green)' : 'var(--error-red)'};">ESITO: ${stat}</h3>
            <p>AGENTE: ${userName}</p>
            <p>PUNTEGGIO: ${pts}/${total} (${perc}%)</p>
            <p style="font-size: 0.8rem; margin-top: 15px; opacity: 0.7;">I dati sono stati inviati al database centrale LSPD.</p>
        </div>`;
}

async function sendToDiscord(user, pts, perc, stat, type) {
    let color = stat === "IDONEO" ? 3066993 : 15158332;
    if (stat.includes("ANNULLATO")) color = 8355711;

    const payload = {
        embeds: [{
            title: `📋 RAPPORTO LSPD - ${type}`,
            color: color,
            fields: [
                { name: "👤 Agente", value: `\`${user}\``, inline: true },
                { name: "⚖️ Verdetto", value: `**${stat}**`, inline: true },
                { name: "📊 Risultato", value: `Punti: ${pts}/${currentQuestionsDB.length} (${perc}%)` }
            ],
            footer: { 
                text: "LSPD - Sistema Corsi" 
            },
            timestamp: new Date().toISOString()
        }]
    };

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
    } catch (e) {
        console.error("Errore invio report principale");
    }
}

async function sendDetailedToDiscord(user, pts, report, type, durata) {
    const payload = {
        embeds: [{
            title: `🔍 REVISIONE ISTRUTTORI - ${user}`,
            color: 3447003,
            description: report,
            fields: [
                { name: "📋 Tipo Esame", value: type, inline: true },
                { name: "⏱️ Durata", value: durata, inline: true },
                { name: "📊 Esito", value: `${pts}/${currentQuestionsDB.length}`, inline: true }
            ],
            footer: { text: "LSPD - Sistema Corsi" },
            timestamp: new Date().toISOString()
        }]
    };
    try {
        await fetch(WEBHOOK_DETTAGLI_URL, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
    } catch (e) { console.error("Errore invio dettagli"); }
}

function finalLogout() {
    localStorage.setItem("pendingNotification", "TERMINALE RESETTATO");
    localStorage.setItem("pendingType", "success");
    location.reload();
}

window.onbeforeunload = () => { if (isExamStarted) return "Il test verrà annullato!"; };