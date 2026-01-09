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
const WEBHOOK_CANDIDATURE = "https://discord.com/api/webhooks/1458988900172435620/OBrKfj85FDnrvS3mH4RQGi0VWXMQ2B-Db-6-_Ly3xeBsQmF8ij0CP2KB5kCNhyG-Qzr8";

// ID RUOLI PER TAG
const ROLE_TAGS = "<@&1458992367762673837> <@&1433091724384665814> <@&1433091874435895377>";

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
    { q: "Quale manovra BOX prevede l'ausilio di una struttura come blocco?", options: ["Box a I", "Box a T", "Box a Muro", "Box a Sandwich"], correct: 2 },
    { q: "Cosa indica lo stato di DEFCON 1?", options: ["Rifornimento centrali", "Guerre civili o colpi di stato", "Inseguimento alto rischio", "Rapina in corso"], correct: 1 },
    { q: "Qual è la regola fondamentale sull’uso della radio di servizio?", options: ["Parlare liberamente", "Cambiare canale se necessario", "Usare solo il canale assegnato", "Rispondere sempre al centralino"], correct: 2 },
    { q: "Come deve rispondere la pattuglia se chiamata in CODICE 3?", options: ["Senza sirene rispettando il codice", "Solo lampeggianti e limiti di velocità", "Lampeggianti e sirene senza rispettare i codici stradali", "Solo se autorizzata dal comando"], correct: 2 },
    { q: "Entro quanto tempo deve essere inoltrato il rapporto dopo un arresto?", options: ["Immediatamente", "Entro massimo un'ora", "Entro due ore", "Entro fine turno"], correct: 1 },
    { q: "Chi ha l'autorità per approvare il DEFCON 3?", options: ["Qualsiasi Supervisore", "Governatore", "Procuratore Generale o Alto Comando", "Sergente"], correct: 2 },
    { q: "Qual è lo STATUS radio che indica che una pattuglia è in rifornimento o riparazione?", options: ["STATUS 1", "STATUS 2", "STATUS 3", "STATUS 4"], correct: 2 }
];

const questionsSergente = [
    { q: "In presenza di un coordinatore radio, quale deve essere il comportamento di un Sergente sul campo?", options: ["Limitarsi a ricevere informazioni", "Coordinare solo la propria pattuglia", "Seguire e far rispettare gli ordini del coordinatore", "Agire in autonomia per rapidità operativa"], correct: 2 },
    { q: "Chi ha la responsabilità finale durante una Joint Operation interforze?", options: ["Il responsabile dell’agenzia capofila", "Il coordinatore radio", "Il grado più alto presente", "Il comando centrale"], correct: 2 },
    { q: "Quando un fermo si trasforma legalmente in arresto?", options: ["Al termine del tempo massimo del fermo", "Quando emergono prove o flagranza", "Quando il soggetto viene portato in centrale", "Alla lettura del Miranda Warning"], correct: 1 },
    { q: "Qual è la priorità di un Sergente durante un 10-10 (conflitto a fuoco)?", options: ["Supportare direttamente gli agenti in prima linea", "Mettere in sicurezza la propria unità", "Coordinare unità e neutralizzare la minaccia", "Richiedere rinforzi e attendere"], correct: 2 },
    { q: "In quali condizioni un Sergente può autorizzare armamento pesante?", options: ["In operazioni pianificate ad alto rischio", "In presenza di più sospetti armati", "In conflitto a fuoco o minaccia elevata", "Solo con autorizzazione preventiva del comando"], correct: 2 },
    { q: "Qual è la procedura corretta se un subordinato viola le regole radio?", options: ["Correzione immediata via radio", "Annotazione informale dell’evento", "Richiamo privato e segnalazione formale", "Segnalazione diretta al comando"], correct: 2 },
    { q: "Durante un inseguimento prolungato e pericoloso, chi può autorizzare la PIT?", options: ["Il capo pattuglia coinvolto", "Il coordinatore o grado più alto", "L’unità HSU presente", "Il primo agente che valuta il rischio"], correct: 1 },
    { q: "Qual è il comportamento corretto se una pattuglia LINCOLN richiede supporto in zona ad alto rischio?", options: ["Fornire indicazioni a distanza", "Attendere conferma della centrale", "Integrare unità ADAM prima di operare", "Affiancare temporaneamente la LINCOLN"], correct: 2 },
    { q: "Cosa comporta una perquisizione illegittima?", options: ["Richiamo interno senza conseguenze operative", "Ripetizione corretta della procedura", "Inammissibilità prove e sanzioni disciplinari", "Solo segnalazione al comando"], correct: 2 },
    { q: "Qual è il ruolo del Sergente in uno scenario con ostaggi?", options: ["Supportare direttamente la squadra d’irruzione", "Gestire le comunicazioni radio", "Perimetro, coordinamento e negoziazione", "Monitorare la situazione in attesa di ordini superiori"], correct: 2 },
    { q: "Quando è giustificato l’uso della forza letale?", options: ["Quando il sospetto è armato ma non collabora", "Durante una fuga pericolosa", "Minaccia reale e immediata alla vita", "Per impedire un reato grave"], correct: 2 },
    { q: "Chi può approvare l’emanazione del DEFCON 3?", options: ["Il Sergente di turno", "Il coordinatore operativo", "Procuratore Generale o Alto Comando", "Il comando locale"], correct: 2 },
    { q: "Qual è la durata massima del DEFCON 2?", options: ["12 ore con rinnovo", "24 ore", "48 ore", "Fino a cessata emergenza"], correct: 1 },
    { q: "In una BOX a T, qual è l’obiettivo principale?", options: ["Bloccare la via di fuga anteriore", "Bloccare frontalmente e posteriormente", "Forzare l’arresto del veicolo", "Limitare i danni collaterali"], correct: 1 },
    { q: "Se un agente utilizza eccessivamente il Taser, quale deve essere l’intervento del Sergente?", options: ["Valutare solo l’esito operativo", "Fornire correzione verbale immediata", "Segnalare e avviare indagine interna", "Riassegnare temporaneamente l’agente"], correct: 2 },
    { q: "Qual è la responsabilità del Sergente dopo un arresto complesso?", options: ["Delegare completamente la gestione", "Verificare rapporto e corrette procedure", "Informare esclusivamente il comando", "Supervisionare solo la detenzione"], correct: 1 },
    { q: "Cosa indica il ritorno a CODICE 4?", options: ["Conclusione dell’evento operativo", "Fine stato di emergenza", "Rientro in pattugliamento ordinario", "Ripristino delle comunicazioni standard"], correct: 1 },
    { q: "In caso di panic button attivo, cosa deve fare un Sergente?", options: ["Intervenire immediatamente sul posto", "Mettersi in ascolto radio", "Raccogliere info e coordinare risposta", "Attendere indicazioni del comando"], correct: 2 },
    { q: "Chi coordina le unità durante una fuga a piedi in ambiente boschivo?", options: ["L’unità più vicina", "Il coordinatore radio", "Il grado più alto sul posto", "La centrale operativa"], correct: 2 },
    { q: "Qual è l’obiettivo primario di un Sergente in servizio?", options: ["Essere presente sul campo", "Garantire efficienza operativa", "Garantire sicurezza e rispetto delle procedure", "Supportare attivamente gli agenti"], correct: 2 }
];

// --- VARIABILI GLOBALI ---
let currentQuestionsDB = [];
let currentQuestion = 0;
let score = 0;
let userName = "";
let examType = "";
let timeLeft = 1200; 
let timerInterval;
let isExamStarted = false;
let userAnswers = []; 
let startTime;
let cheatTries = 3;
let isCheatProcessing = false;

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

// --- SISTEMA DI NOTIFICHE AVANZATO ---
function showNotification(message, type = 'error', isCheat = false) {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    if (isCheat) toast.style.minWidth = "400px";

    let icon = "⚠️";
    if(type === 'success') icon = "✅";
    if(type === 'error') icon = "🚫";
    if(type === 'warning') icon = "⚡";
    
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <span style="font-size: 1.5rem;">${icon}</span>
            <div style="flex-grow: 1;">
                <div style="font-weight: bold; text-transform: uppercase;">LSPD - Sistema Controllo</div>
                <div style="font-size: 0.9rem;">${message}</div>
            </div>
            ${isCheat ? `<button onclick="restoreAndClose(this)" style="background: white; color: var(--error-red); border: none; padding: 8px 15px; font-weight: bold; cursor: pointer; border-radius: 4px; text-transform: uppercase; margin-left: 10px;">Ripristina</button>` : ''}
        </div>
    `;
    
    container.appendChild(toast);

    if (!isCheat) {
        setTimeout(() => {
            toast.style.animation = "toastOut 0.4s forwards";
            setTimeout(() => toast.remove(), 400);
        }, 5000);
    }
}

function restoreAndClose(btn) {
    const toast = btn.closest('.toast');
    enterFullScreen(); 
    setTimeout(() => {
        isCheatProcessing = false;
        toast.style.animation = "toastOut 0.4s forwards";
        setTimeout(() => toast.remove(), 400);
    }, 500);
}

// --- LOGICA LOGIN E RP ---
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

function selectExam(type) {
    let dbOriginale = type === 'recluta' ? questionsRecluta : questionsSergente;
    currentQuestionsDB = shuffleArray([...dbOriginale]).slice(0, 20); 
    examType = type === 'recluta' ? "RECLUTA / CADETTO" : "SERGENTE";
    userAnswers = new Array(currentQuestionsDB.length).fill(undefined);
    currentQuestion = 0;
    
    document.getElementById('nameModal').classList.add('hidden');
    document.getElementById('course-section').classList.add('hidden');
    document.getElementById('briefing-title').innerText = `BRIEFING ESAME ${examType}`;
    document.getElementById('briefing-section').classList.remove('hidden');
    showNotification("DATA-PACK MESCOLATO E CARICATO", "warning");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startFinalExam() {
    enterFullScreen();
    startTime = new Date(); 
    document.getElementById('briefing-section').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('exam-timer').classList.remove('hidden');
    document.getElementById('exam-title-display').innerText = `ESAME ${examType}`;
    isExamStarted = true;
    startTimer();
    loadQuestion();
    showNotification("TEST AVVIATO - SCHERMO INTERO ATTIVATO", "success");
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

// --- QUIZ CORE ---
function loadQuestion() {
    const quizBox = document.getElementById('quiz-box');
    const qData = currentQuestionsDB[currentQuestion];
    const isLastQuestion = currentQuestion === currentQuestionsDB.length - 1;

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
        <h2 style="color: var(--main-blue); font-size: 0.9rem; margin-bottom: 5px; text-transform: uppercase;">MODULO ${currentQuestion + 1} / ${currentQuestionsDB.length}</h2>
        <div class="question-text" style="font-size: 1.1rem; margin-bottom: 25px; padding: 15px; background: rgba(0, 114, 255, 0.05); border-left: 3px solid var(--main-blue);">${qData.q}</div>
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
                : `<p style="font-size: 0.8rem; opacity: 0.5; font-style: italic;">Seleziona una risposta per proseguire</p>`
            }
        </div>
    `;
}

function selectAnswer(idx) {
    userAnswers[currentQuestion] = idx;
    loadQuestion(); 
    if (currentQuestion < currentQuestionsDB.length - 1) {
        setTimeout(() => {
            currentQuestion++;
            loadQuestion();
        }, 300);
    }
}

function jumpToQuestion(idx) {
    currentQuestion = idx;
    loadQuestion();
}

function openReviewModal() {
    if (userAnswers.includes(undefined)) return showNotification("MANCANO DELLE RISPOSTE!", "error");
    document.getElementById('review-modal').classList.remove('hidden');
}

function closeReviewModal() { document.getElementById('review-modal').classList.add('hidden'); }

async function submitExam() {
    if (document.getElementById('review-modal')) closeReviewModal();
    clearInterval(timerInterval);
    const endTime = new Date();
    const tempoImpiegato = `${Math.floor((Math.abs(endTime - startTime) / 1000) / 60)}m ${Math.floor((Math.abs(endTime - startTime) / 1000) % 60)}s`;

    score = 0;
    let reportDettagliato = "";
    currentQuestionsDB.forEach((q, index) => {
        const isCorretta = userAnswers[index] === q.correct;
        if (isCorretta) score++;
        reportDettagliato += `**D${index + 1}:** ${q.q}\n${isCorretta ? "✅" : "❌"} Risposta: *${q.options[userAnswers[index]] || "Nessuna"}*\n\n`;
    });

    const percent = Math.round((score / currentQuestionsDB.length) * 100);
    const status = percent >= 75 ? "IDONEO" : "NON IDONEO";

    showResults(score, currentQuestionsDB.length, percent, status);
    await sendToDiscord(userName, score, percent, status, examType);
    await sendDetailedToDiscord(userName, score, reportDettagliato, examType, tempoImpiegato);
}

function showResults(pts, total, perc, stat) {
    isExamStarted = false;
    if (document.fullscreenElement) document.exitFullscreen();
    document.getElementById('quiz-box').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('exam-timer').classList.add('hidden');
    const color = stat === "IDONEO" ? 'var(--success-green)' : 'var(--error-red)';
    document.getElementById('score-display').innerHTML = `
        <div style="border: 1px solid ${color}; padding: 25px; background: rgba(0,0,0,0.3);">
            <h3 style="color: ${color};">ESITO: ${stat}</h3>
            <p>AGENTE: ${userName}</p>
            <p>PUNTEGGIO: ${pts}/${total} (${perc}%)</p>
        </div>`;
}

// --- ANTI-CHEAT ENGINE ---
function handleCheatDetected(reason) {
    if (!isExamStarted || isCheatProcessing) return;

    isCheatProcessing = true;
    cheatTries--;

    if (cheatTries > 0) {
        showNotification(`SISTEMA ANTI-MANOMISSIONE: ${reason}. Tentativi rimasti: ${cheatTries}`, "error", true);
    } else {
        forceAbortExam(`ESPULSIONE AUTOMATICA: ${reason}`);
    }
}

function enterFullScreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && isExamStarted) {
        handleCheatDetected("CAMBIO SCHEDA/APP");
    }
});

const checkWindowSize = () => {
    if (!isExamStarted || isCheatProcessing) return;
    const isNotFullscreen = !document.fullscreenElement && !document.webkitFullscreenElement;
    const isSmallWindow = window.innerWidth < (screen.width - 100) || window.innerHeight < (screen.height - 100);
    if (isNotFullscreen || isSmallWindow) {
        handleCheatDetected("USCITA DA AREA DI TEST");
    }
};

document.addEventListener('fullscreenchange', checkWindowSize);
window.addEventListener('resize', checkWindowSize);

async function forceAbortExam(reason) {
    isExamStarted = false;
    clearInterval(timerInterval);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});

    localStorage.setItem("pendingNotification", `TEST ANNULLATO: ${reason}`);
    localStorage.setItem("pendingType", "error");
    await sendToDiscord(userName, 0, 0, `🛑 ${reason}`, examType);
    location.reload();
}

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', (e) => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) || (e.ctrlKey && e.key === "u")) {
        e.preventDefault();
        showNotification("AZIONE BLOCCATA", "error");
    }
});

// --- DISCORD WEBHOOKS ---
async function sendToDiscord(user, pts, perc, stat, type) {
    let color = stat === "IDONEO" ? 3066993 : 15158332;
    if (stat.includes("ESPULSIONE") || stat.includes("ANNULLATO")) color = 0;

    const payload = {
        content: `📊 **NOTIFICA ESAME:** L'utente **${user}** ha terminato il test.\n${ROLE_TAGS}`,
        embeds: [{
            title: `📋 RAPPORTO LSPD - ${type}`,
            color: color,
            fields: [
                { name: "👤 Agente", value: `\`${user}\``, inline: true },
                { name: "⚖️ Verdetto", value: `**${stat}**`, inline: true },
                { name: "📊 Risultato", value: `Punti: ${pts}/20 (${perc}%)` }
            ],
            footer: { text: "LSPD - Gestione esami" },
            timestamp: new Date().toISOString()
        }]
    };
    await fetch(WEBHOOK_URL, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
}

async function sendDetailedToDiscord(user, pts, report, type, durata) {
    const payload = {
        content: `🔍 **LOG REVISIONE DETTAGLIATA:** ${user}\n${ROLE_TAGS}`,
        embeds: [{
            title: `🔍 REVISIONE - ${user}`,
            color: 3447003,
            description: report,
            fields: [
                { name: "📋 Tipo", value: type, inline: true },
                { name: "⏱️ Durata", value: durata, inline: true }
            ],
            footer: { text: "LSPD - Gestione esami" },
            timestamp: new Date().toISOString()
        }]
    };
    await fetch(WEBHOOK_DETTAGLI_URL, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
}

function finalLogout() {
    localStorage.setItem("pendingNotification", "TERMINALE RESETTATO");
    localStorage.setItem("pendingType", "success");
    location.reload();
}

// --- LOGICA CANDIDATURA SPONTANEA ---
function openCandidatura() {
    document.getElementById('candidatura-modal').classList.remove('hidden');
}

function closeCandidatura() {
    document.getElementById('candidatura-modal').classList.add('hidden');
}

async function submitCandidatura() {
    // RECUPERO DATI (Incluso il nuovo ID Discord)
    const discordID = document.getElementById('candDiscordID').value.trim(); 
    const nomeOOC = document.getElementById('candNomeOOC').value.trim();
    const etaOOC = document.getElementById('candEtaOOC').value;
    const nomeIC = document.getElementById('candNomeIC').value.trim();
    const dataIC = document.getElementById('candDataIC').value.trim();
    const telefono = document.getElementById('candTel').value.trim();
    const porto = document.getElementById('candPorto').value;
    const fedina = document.getElementById('candFedina').checked;
    const exp = document.getElementById('candExp').value.trim();
    const desc = document.getElementById('candDesc').value.trim();
    const motivazioni = document.getElementById('candMotivazioni').value.trim();

    let patenti = [];
    document.querySelectorAll('.candPatente:checked').forEach(p => patenti.push(p.value));

    // VALIDAZIONE (Aggiunto discordID ai campi obbligatori)
    if (!nomeOOC || !etaOOC || !discordID || !nomeIC || !telefono) {
        return showNotification("DATI MANCANTI: COMPILA TUTTI I CAMPI OBBLIGATORI", "error");
    }
    
    if (!fedina) {
        return showNotification("ERRORE: DICHIARAZIONE FEDINA PULITA NECESSARIA", "error");
    }

    // GENERIAMO L'ID PRATICA
    const registroID = `LSPD-${Math.floor(Math.random() * 9000) + 1000}`;

    const payload = {
        content: `📢 **NUOVA CANDIDATURA DISPONIBILE**\n${ROLE_TAGS}`,
        embeds: [{
            title: "📩 DOMANDA DI ARRUOLAMENTO - LSPD",
            color: 3447003, 
            // Mostriamo ID Pratica e ID Discord (con tag) nella descrizione
            description: `**ID PRATICA:** \`${registroID}\`\n**UTENTE DISCORD:** <@${discordID}> (\`${discordID}\`)`,
            fields: [
                { name: "👤 INFORMAZIONI OOC", value: `**Nome:** ${nomeOOC}\n**Età:** ${etaOOC} anni`, inline: false },
                { name: "🏢 INFORMAZIONI IC", value: `**Nome:** ${nomeIC}\n**Tel:** ${telefono}`, inline: false },
                { name: "🪪 Documentazione", value: `**Patenti:** ${patenti.join(", ") || "Nessuna"}\n**Porto d'armi:** ${porto}`, inline: true },
                { name: "📜 Fedina Penale", value: "✅ Dichiarata Pulita", inline: true },
                { name: "💼 Esperienze Pregresse", value: exp || "Nessuna info" },
                { name: "🎯 Motivazioni", value: motivazioni || "Nessuna info" }
            ],
            footer: { text: `LSPD Global Terminal | Registro: ${registroID}` },
            timestamp: new Date().toISOString()
        }]
    };

    try {
        const response = await fetch(WEBHOOK_CANDIDATURE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // Passiamo entrambi gli ID alla schermata di successo
            showPostSubmissionProtocol(nomeIC, registroID, discordID);
            
            // Reset campi
            document.querySelectorAll('#candidatura-modal input, #candidatura-modal textarea').forEach(el => el.value = "");
            document.querySelectorAll('.candPatente').forEach(el => el.checked = false);
        } else {
            throw new Error("Errore Webhook");
        }
    } catch (err) {
        showNotification("ERRORE CRITICO: IMPOSSIBILE CONTATTARE IL TERMINALE", "error");
    }
}

function showPostSubmissionProtocol(nomeAgente, registroID, discordID) {
    const modalBox = document.querySelector('#candidatura-modal .modal-box');
    if (!modalBox) return;

modalBox.innerHTML = `
        <div class="protocol-success-container">
            <span class="protocol-icon">🛡️</span>
            <h1 class="protocol-title">Richiesta Acquisita</h1>
            
            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                <div class="protocol-id">REGISTRO_PRATICA: #${registroID}</div>
                <div class="protocol-id" style="color: var(--main-blue); border-color: var(--main-blue);">DISCORD_ID: ${discordID}</div>
            </div>
            
            <div class="protocol-divider"></div>

            <p style="font-size: 1rem; color: #fff; line-height: 1.5; margin-bottom: 20px;">
                Gentile cittadino <strong>${nomeAgente}</strong>, i tuoi dati sono stati registrati sotto l'identificativo unico fornito.
            </p>

            <div class="protocol-steps">
                <div class="protocol-step-item">
                    <span class="protocol-step-number">01</span>
                    <span><strong>Valutazione:</strong> Un reclutatore valuterà la richiesta e la veridicità dei dati. <strong style="color: var(--gold);">Annotati subito il codice pratica #${registroID}</strong>, ti servirà per tutti gli step successivi.</span>
                </div>
                <div class="protocol-step-item">
                    <span class="protocol-step-number">02</span>
                    <span><strong>Contatto:</strong> Una volta controllati i dati, verrai contattato in città per il colloquio conoscitivo se risulterai idoneo.</span>
                </div>
                <div class="protocol-step-item">
                    <span class="protocol-step-number">03</span>
                    <span><strong>Convocazione:</strong> Dovrai recarti in centrale e presentare il codice pratica <u>#${registroID}</u> ricevuto all'invio.</span>
                </div>
            </div>

            <p class="protocol-footer-note">"To Protect and to Serve"</p>

            <button onclick="location.reload()" class="btn-primary" style="margin-top: 20px;">
                CHIUDI SESSIONE
            </button>
        </div>
    `;
}