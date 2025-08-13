// Données de l'application
const AppData = {
  questionnaire: [
    {
      id: 1,
      category: "Profil",
      text: "Quel est votre âge ?",
      type: "radio",
      options: ["18-39 ans", "40-49 ans", "50-59 ans", "60-69 ans", "70 ans et plus"],
      score: [0, 1, 2, 4, 6]
    },
    {
      id: 2,
      category: "Profil", 
      text: "Quel est votre sexe ?",
      type: "radio",
      options: ["Homme", "Femme"],
      score: [1, 0]
    },
    {
      id: 3,
      category: "Habitudes de vie",
      text: "Fumez-vous actuellement (même occasionnellement) ?",
      type: "radio", 
      options: ["Oui", "Non", "J'ai arrêté depuis moins de 5 ans"],
      score: [4, 0, 2]
    },
    {
      id: 4,
      category: "Activité physique",
      text: "Pratiquez-vous au moins 30 minutes d'activité physique modérée 5 jours par semaine ou plus ?",
      type: "radio",
      options: ["Oui, régulièrement", "Parfois", "Rarement", "Jamais"],
      score: [0, 1, 2, 3]
    },
    {
      id: 5,
      category: "Alimentation",
      text: "Consommez-vous des fruits et légumes au moins 5 portions par jour ?",
      type: "radio",
      options: ["Oui, tous les jours", "Parfois", "Rarement", "Jamais"],
      score: [0, 1, 2, 3]
    },
    {
      id: 6,
      category: "Antécédents familiaux",
      text: "Un parent proche (père, mère, frère, sœur) a-t-il eu un infarctus ou un AVC avant 55 ans (homme) ou 65 ans (femme) ?",
      type: "radio",
      options: ["Oui", "Non", "Je ne sais pas"],
      score: [3, 0, 1]
    },
    {
      id: 7,
      category: "Santé actuelle", 
      text: "Êtes-vous suivi(e) pour une hypertension artérielle ?",
      type: "radio",
      options: ["Oui, avec traitement", "Oui, sans traitement", "Non"],
      score: [2, 3, 0]
    },
    {
      id: 8,
      category: "Santé actuelle",
      text: "Êtes-vous diabétique ?",
      type: "radio", 
      options: ["Oui, diabète de type 1", "Oui, diabète de type 2", "Non", "Je ne sais pas"],
      score: [4, 5, 0, 1]
    },
    {
      id: 9,
      category: "Santé actuelle",
      text: "Êtes-vous suivi(e) pour un excès de cholestérol ?",
      type: "radio",
      options: ["Oui, avec traitement", "Oui, sans traitement", "Non", "Je ne sais pas"],
      score: [2, 3, 0, 1]
    },
    {
      id: 10,
      category: "Mesures physiques",
      text: "Votre tour de taille est-il supérieur à 102 cm (homme) ou 88 cm (femme) ?",
      type: "radio",
      options: ["Oui", "Non", "Je ne sais pas"],
      score: [2, 0, 1]
    },
    {
      id: 11,
      category: "Stress et sommeil",
      text: "Avez-vous un stress chronique important ou des troubles du sommeil ?",
      type: "radio",
      options: ["Stress et sommeil perturbés", "L'un des deux seulement", "Aucun problème particulier"],
      score: [3, 1, 0]
    },
    {
      id: 12,
      category: "Habitudes de vie",
      text: "Quelle est votre consommation d'alcool ?",
      type: "radio",
      options: ["Plus de 3 verres/jour", "1-3 verres/jour", "Occasionnelle", "Aucune"],
      score: [3, 1, 0, 0]
    },
    {
      id: 13,
      category: "Santé actuelle",
      text: "Avez-vous une maladie rénale chronique connue ?",
      type: "radio", 
      options: ["Oui", "Non", "Je ne sais pas"],
      score: [4, 0, 1]
    },
    {
      id: 14,
      category: "Antécédents personnels",
      text: "Avez-vous déjà eu un problème cardiaque ou vasculaire ?",
      type: "radio",
      options: ["Oui (infarctus, AVC, artérite...)", "Non", "Je ne sais pas"],
      score: [6, 0, 1]
    },
    {
      id: 15,
      category: "Suivi médical",
      text: "À quand remonte votre dernier bilan de santé complet ?",
      type: "radio",
      options: ["Moins d'un an", "1 à 3 ans", "Plus de 3 ans", "Jamais fait"],
      score: [0, 1, 2, 3]
    }
  ],
  
  interpretations: {
    faible: {
      seuil: [0, 10],
      titre: "Risque cardiovasculaire faible",
      message: "Félicitations ! Votre risque cardiovasculaire est faible. Continuez vos bonnes habitudes.",
      couleur: "#2e7d32",
      classe: "risk-faible"
    },
    modere: {
      seuil: [11, 20], 
      titre: "Risque cardiovasculaire modéré",
      message: "Votre risque est modéré. Quelques ajustements de mode de vie peuvent vous aider.",
      couleur: "#ef6c00",
      classe: "risk-modere"
    },
    eleve: {
      seuil: [21, 30],
      titre: "Risque cardiovasculaire élevé", 
      message: "Votre risque est élevé. Il est recommandé de consulter rapidement votre médecin.",
      couleur: "#d32f2f",
      classe: "risk-eleve"
    },
    tres_eleve: {
      seuil: [31, 45],
      titre: "Risque cardiovasculaire très élevé",
      message: "Votre risque est très élevé. Une consultation médicale urgente est nécessaire.",
      couleur: "#b71c1c",
      classe: "risk-tres-eleve"
    }
  }
};

// État de l'application
class AppState {
  constructor() {
    this.currentQuestionIndex = 0;
    this.answers = [];
    this.totalScore = 0;
    this.riskLevel = null;
  }
  
  saveAnswer(questionIndex, optionIndex) {
    this.answers[questionIndex] = optionIndex;
  }
  
  calculateScore() {
    this.totalScore = 0;
    this.answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== undefined) {
        const question = AppData.questionnaire[questionIndex];
        this.totalScore += question.score[answerIndex] || 0;
      }
    });
    
    // Déterminer le niveau de risque
    for (const [key, level] of Object.entries(AppData.interpretations)) {
      if (this.totalScore >= level.seuil[0] && this.totalScore <= level.seuil[1]) {
        this.riskLevel = level;
        break;
      }
    }
  }
  
  reset() {
    this.currentQuestionIndex = 0;
    this.answers = [];
    this.totalScore = 0;
    this.riskLevel = null;
  }
}

// Gestionnaire de navigation
class NavigationManager {
  constructor() {
    this.currentPage = 'home-page';
    this.pages = ['home-page', 'privacy-page', 'quiz-page', 'results-page'];
  }
  
  showPage(pageId, direction = 'right') {
    const currentPageEl = document.getElementById(this.currentPage);
    const targetPageEl = document.getElementById(pageId);
    
    if (!targetPageEl || pageId === this.currentPage) return;
    
    console.log(`Navigating from ${this.currentPage} to ${pageId}`);
    
    // Masquer immédiatement la page actuelle
    currentPageEl.classList.remove('active');
    
    // Afficher immédiatement la nouvelle page
    targetPageEl.classList.add('active');
    
    this.currentPage = pageId;
    
    // Scroll vers le haut
    targetPageEl.scrollTop = 0;
  }
}

// Gestionnaire de questions
class QuizManager {
  constructor(appState) {
    this.appState = appState;
    this.questionCard = document.getElementById('question-card');
    this.questionCategory = document.getElementById('question-category');
    this.questionTitle = document.getElementById('question-title');
    this.questionOptions = document.getElementById('question-options');
    this.questionCounter = document.getElementById('question-counter');
    this.progressPercentage = document.getElementById('progress-percentage');
    this.progressFill = document.getElementById('progress-fill');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    
    this.initializeEventListeners();
  }
  
  initializeEventListeners() {
    this.prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.previousQuestion();
    });
    
    this.nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.nextQuestion();
    });
  }
  
  showQuestion(index) {
    if (index < 0 || index >= AppData.questionnaire.length) return;
    
    const question = AppData.questionnaire[index];
    
    // Animer la sortie de la question actuelle
    this.questionCard.classList.remove('active');
    
    setTimeout(() => {
      // Mettre à jour le contenu
      this.questionCategory.textContent = question.category;
      this.questionTitle.textContent = question.text;
      
      // Créer les options
      this.questionOptions.innerHTML = '';
      question.options.forEach((option, optionIndex) => {
        const optionEl = this.createOptionElement(option, optionIndex, index);
        this.questionOptions.appendChild(optionEl);
      });
      
      // Mettre à jour les contrôles
      this.updateControls(index);
      this.updateProgress(index);
      
      // Animer l'entrée de la nouvelle question
      setTimeout(() => {
        this.questionCard.classList.add('active');
      }, 50);
      
    }, 200);
  }
  
  createOptionElement(optionText, optionIndex, questionIndex) {
    const optionEl = document.createElement('div');
    optionEl.className = 'option';
    
    const radioId = `q${questionIndex}_o${optionIndex}`;
    const isSelected = this.appState.answers[questionIndex] === optionIndex;
    
    if (isSelected) {
      optionEl.classList.add('selected');
    }
    
    optionEl.innerHTML = `
      <input type="radio" id="${radioId}" name="question_${questionIndex}" value="${optionIndex}" ${isSelected ? 'checked' : ''}>
      <div class="option-text">${optionText}</div>
    `;
    
    optionEl.addEventListener('click', (e) => {
      e.preventDefault();
      this.selectOption(questionIndex, optionIndex);
    });
    
    return optionEl;
  }
  
  selectOption(questionIndex, optionIndex) {
    // Sauvegarder la réponse
    this.appState.saveAnswer(questionIndex, optionIndex);
    
    // Mettre à jour l'affichage
    const options = this.questionOptions.querySelectorAll('.option');
    options.forEach((option, index) => {
      option.classList.toggle('selected', index === optionIndex);
      const radio = option.querySelector('input[type="radio"]');
      radio.checked = (index === optionIndex);
    });
    
    // Activer le bouton suivant
    this.nextBtn.disabled = false;
    
    // Animation de validation
    const selectedOption = options[optionIndex];
    selectedOption.style.transform = 'scale(0.98)';
    setTimeout(() => {
      selectedOption.style.transform = 'scale(1)';
    }, 150);
  }
  
  updateControls(index) {
    this.prevBtn.disabled = index === 0;
    this.nextBtn.disabled = this.appState.answers[index] === undefined;
    
    if (index === AppData.questionnaire.length - 1) {
      this.nextBtn.textContent = 'Voir les résultats';
    } else {
      this.nextBtn.textContent = 'Suivant';
    }
  }
  
  updateProgress(index) {
    const progress = ((index + 1) / AppData.questionnaire.length) * 100;
    this.progressFill.style.width = `${progress}%`;
    this.questionCounter.textContent = `Question ${index + 1} sur ${AppData.questionnaire.length}`;
    this.progressPercentage.textContent = `${Math.round(progress)}%`;
  }
  
  nextQuestion() {
    if (this.appState.currentQuestionIndex < AppData.questionnaire.length - 1) {
      this.appState.currentQuestionIndex++;
      this.showQuestion(this.appState.currentQuestionIndex);
    } else {
      // Fin du questionnaire
      this.completeQuiz();
    }
  }
  
  previousQuestion() {
    if (this.appState.currentQuestionIndex > 0) {
      this.appState.currentQuestionIndex--;
      this.showQuestion(this.appState.currentQuestionIndex);
    }
  }
  
  completeQuiz() {
    // Afficher le loader
    const loader = document.getElementById('loading-overlay');
    loader.classList.remove('hidden');
    
    // Calculer le score
    setTimeout(() => {
      this.appState.calculateScore();
      
      // Masquer le loader
      loader.classList.add('hidden');
      
      // Afficher les résultats
      app.navigation.showPage('results-page');
      app.results.displayResults();
      
    }, 1500);
  }
}

// Gestionnaire de résultats
class ResultsManager {
  constructor(appState) {
    this.appState = appState;
    this.scoreValue = document.getElementById('score-value');
    this.scoreCircle = document.getElementById('score-circle');
    this.riskLevel = document.getElementById('risk-level');
    this.riskMessage = document.getElementById('risk-message');
    this.recommendationsList = document.getElementById('recommendations-list');
    
    this.initializeEventListeners();
  }
  
  initializeEventListeners() {
    document.getElementById('print-results-btn').addEventListener('click', (e) => {
      e.preventDefault();
      this.printResults();
    });
    
    document.getElementById('restart-test-btn').addEventListener('click', (e) => {
      e.preventDefault();
      this.restartTest();
    });
    
    document.getElementById('contact-cpts-btn').addEventListener('click', (e) => {
      e.preventDefault();
      this.contactCPTS();
    });
  }
  
  displayResults() {
    if (!this.appState.riskLevel) {
      this.appState.calculateScore();
    }
    
    // Animer le score
    this.animateScore();
    
    // Afficher le niveau de risque
    this.riskLevel.textContent = this.appState.riskLevel.titre;
    this.riskLevel.className = `risk-level ${this.appState.riskLevel.classe}`;
    this.riskMessage.textContent = this.appState.riskLevel.message;
    
    // Mettre à jour le cercle de score
    this.scoreCircle.style.borderColor = this.appState.riskLevel.couleur;
    
    // Générer les recommandations
    this.generateRecommendations();
  }
  
  animateScore() {
    const targetScore = this.appState.totalScore;
    let currentScore = 0;
    const increment = targetScore / 30; // Animation sur 30 frames
    
    const updateScore = () => {
      currentScore += increment;
      if (currentScore >= targetScore) {
        this.scoreValue.textContent = targetScore;
        return;
      }
      
      this.scoreValue.textContent = Math.floor(currentScore);
      requestAnimationFrame(updateScore);
    };
    
    updateScore();
  }
  
  generateRecommendations() {
    const recommendations = [];
    const score = this.appState.totalScore;
    
    // Recommandations basées sur le score
    if (score <= 10) {
      recommendations.push({
        category: "Maintien",
        title: "Continuez vos bonnes habitudes",
        text: "Maintenez une activité physique régulière et une alimentation équilibrée."
      });
      recommendations.push({
        category: "Prévention",
        title: "Bilan de santé régulier",
        text: "Effectuez un bilan cardiovasculaire tous les 5 ans après 40 ans."
      });
    } else if (score <= 20) {
      recommendations.push({
        category: "Amélioration",
        title: "Optimisez votre mode de vie",
        text: "Augmentez votre activité physique et améliorez votre alimentation."
      });
      recommendations.push({
        category: "Suivi",
        title: "Consultation médicale",
        text: "Consultez votre médecin pour un bilan cardiovasculaire dans l'année."
      });
    } else if (score <= 30) {
      recommendations.push({
        category: "Action",
        title: "Consultation médicale recommandée",
        text: "Prenez rendez-vous rapidement avec votre médecin généraliste."
      });
      recommendations.push({
        category: "Urgence",
        title: "Modifications immédiates",
        text: "Arrêt du tabac, réduction de l'alcool, activité physique adaptée."
      });
    } else {
      recommendations.push({
        category: "Urgence",
        title: "Consultation médicale urgente",
        text: "Contactez rapidement un professionnel de santé ou votre cardiologue."
      });
      recommendations.push({
        category: "Priorité",
        title: "Prise en charge immédiate",
        text: "Traitement médical et surveillance rapprochée nécessaires."
      });
    }
    
    // Afficher les recommandations
    this.recommendationsList.innerHTML = '';
    recommendations.forEach((rec, index) => {
      const recEl = document.createElement('div');
      recEl.className = 'recommendation-item';
      recEl.style.animationDelay = `${index * 0.2}s`;
      recEl.innerHTML = `
        <h4>${rec.title}</h4>
        <p>${rec.text}</p>
      `;
      this.recommendationsList.appendChild(recEl);
    });
  }
  
  printResults() {
    // Créer une version imprimable
    const printWindow = window.open('', '_blank');
    const printContent = this.generatePrintContent();
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Résultats Test Cardiovasculaire - CPTS Australe</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #167bab; padding-bottom: 20px; }
          .logo { color: #167bab; font-size: 24px; font-weight: bold; }
          .score-section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .recommendations { margin: 20px 0; }
          .recommendation { margin: 10px 0; padding: 15px; border-left: 4px solid #e67d3d; background: #f8f9fa; }
          .footer { margin-top: 40px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
  }
  
  generatePrintContent() {
    const currentDate = new Date().toLocaleDateString('fr-FR');
    return `
      <div class="header">
        <div class="logo">CPTS Australe</div>
        <h1>Résultats du Test Cardiovasculaire</h1>
        <p>Date : ${currentDate}</p>
      </div>
      
      <div class="score-section">
        <h2>Votre Score : ${this.appState.totalScore}/45</h2>
        <h3>${this.appState.riskLevel.titre}</h3>
        <p>${this.appState.riskLevel.message}</p>
      </div>
      
      <div class="recommendations">
        <h2>Recommandations</h2>
        ${Array.from(this.recommendationsList.children).map(rec => `
          <div class="recommendation">
            <strong>${rec.querySelector('h4').textContent}</strong><br>
            ${rec.querySelector('p').textContent}
          </div>
        `).join('')}
      </div>
      
      <div class="footer">
        <p><strong>Important :</strong> Ce test ne remplace pas une consultation médicale. Pour tout problème de santé, consultez un professionnel de santé.</p>
        <p>CPTS Australe - Réseau de soins coordonnés</p>
      </div>
    `;
  }
  
  restartTest() {
    if (confirm('Êtes-vous sûr de vouloir recommencer le test ? Vos réponses actuelles seront perdues.')) {
      this.appState.reset();
      app.navigation.showPage('home-page');
    }
  }
  
  contactCPTS() {
    alert('Pour contacter la CPTS Australe :\n\n📞 Téléphone : 02 62 XX XX XX\n📧 Email : contact@cpts-australe.fr\n🌐 Site web : www.cpts-australe.fr\n\nNous vous orienterons vers le professionnel de santé le plus adapté à votre situation.');
  }
}

// Application principale
class CPTSCardioApp {
  constructor() {
    this.state = new AppState();
    this.navigation = new NavigationManager();
    this.quiz = null;
    this.results = null;
    
    this.init();
  }
  
  init() {
    // Initialiser les gestionnaires
    this.quiz = new QuizManager(this.state);
    this.results = new ResultsManager(this.state);
    
    // Initialiser les événements
    this.initializeEventListeners();
    
    // Démarrer les animations de la page d'accueil
    this.startHomeAnimations();
  }
  
  initializeEventListeners() {
    // Boutons de la page d'accueil
    const startBtn = document.getElementById('start-test-btn');
    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Start test button clicked');
        this.navigation.showPage('privacy-page');
      });
    }
    
    // Boutons de la page de confidentialité
    const backHomeBtn = document.getElementById('back-home-btn');
    if (backHomeBtn) {
      backHomeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigation.showPage('home-page');
      });
    }
    
    const acceptBtn = document.getElementById('accept-privacy-btn');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Accept privacy button clicked');
        this.startQuiz();
      });
    }
  }
  
  startHomeAnimations() {
    // Animer les cartes d'information
    const cards = document.querySelectorAll('.card-animate');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 200 + (index * 200));
    });
  }
  
  startQuiz() {
    console.log('Starting quiz');
    this.navigation.showPage('quiz-page');
    
    // Réinitialiser le quiz si nécessaire
    if (this.state.answers.length === 0) {
      this.state.currentQuestionIndex = 0;
    }
    
    // Afficher la première question
    setTimeout(() => {
      this.quiz.showQuestion(this.state.currentQuestionIndex);
    }, 300);
  }
}

// Variables globales
let app;

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded');
  app = new CPTSCardioApp();
  
  // Gestion des raccourcis clavier
  document.addEventListener('keydown', (e) => {
    if (app.navigation.currentPage === 'quiz-page') {
      if (e.key === 'ArrowLeft' && !app.quiz.prevBtn.disabled) {
        app.quiz.previousQuestion();
      } else if (e.key === 'ArrowRight' && !app.quiz.nextBtn.disabled) {
        app.quiz.nextQuestion();
      } else if (e.key >= '1' && e.key <= '9') {
        const optionIndex = parseInt(e.key) - 1;
        const options = document.querySelectorAll('.option');
        if (options[optionIndex]) {
          options[optionIndex].click();
        }
      }
    }
  });
});