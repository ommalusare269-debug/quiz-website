// Example questions per level
const easyQuestions = [
  { question: "I ___ a student.", options: ["am", "is", "are", "be"], correct: "am" },
  { question: "She ___ happy.", options: ["is", "am", "are", "be"], correct: "is" },
  { question: "They ___ playing.", options: ["is", "am", "are", "be"], correct: "are" },
  { question: "We ___ friends.", options: ["am", "is", "are", "be"], correct: "are" },
  { question: "He ___ from India.", options: ["is", "am", "are", "be"], correct: "is" },
  { question: "You ___ my best friend.", options: ["is", "am", "are", "be"], correct: "are" },
  { question: "It ___ a sunny day.", options: ["is", "are", "was", "were"], correct: "is" },
  { question: "I ___ tea every morning.", options: ["drink", "drinks", "drinking", "drank"], correct: "drink" },
  { question: "She ___ to school by bus.", options: ["go", "goes", "going", "gone"], correct: "goes" },
  { question: "They ___ football on Sunday.", options: ["play", "plays", "played", "playing"], correct: "play" },
  { question: "We ___ English every day.", options: ["study", "studies", "studying", "studied"], correct: "study" },
  { question: "He ___ not like coffee.", options: ["do", "does", "did", "done"], correct: "does" },
  { question: "I ___ my homework now.", options: ["do", "does", "am doing", "did"], correct: "am doing" },
  { question: "She ___ a cat.", options: ["have", "has", "had", "having"], correct: "has" },
  { question: "They ___ late yesterday.", options: ["are", "was", "were", "is"], correct: "were" }
    // ... add total 15 questions
];

const mediumQuestions = [
  { question: "Choose correct: I have ___ book.", options: ["a", "an", "the", "no article"], correct: "a" },
  { question: "He has ___ his homework.", options: ["done", "do", "does", "did"], correct: "done" },
  { question: "She has been ___ for two hours.", options: ["sleep", "slept", "sleeping", "sleeps"], correct: "sleeping" },
  { question: "If I ___ you, I would go there.", options: ["was", "were", "am", "be"], correct: "were" },
  { question: "She speaks English ___ than me.", options: ["good", "well", "better", "best"], correct: "better" },
  { question: "They ___ in Delhi since 2010.", options: ["lived", "have lived", "are living", "live"], correct: "have lived" },
  { question: "We ___ the movie already.", options: ["see", "saw", "seen", "have seen"], correct: "have seen" },
  { question: "She ___ her leg yesterday.", options: ["broke", "break", "broken", "breaking"], correct: "broke" },
  { question: "The book ___ on the table.", options: ["is", "are", "was", "were"], correct: "is" },
  { question: "He will come if it ___ not rain.", options: ["do", "does", "did", "doesn't"], correct: "doesn't" },
  { question: "I prefer coffee ___ tea.", options: ["than", "over", "to", "for"], correct: "to" },
  { question: "We reached the station ___ time.", options: ["in", "on", "at", "by"], correct: "in" },
  { question: "He is the ___ of the two boys.", options: ["taller", "tallest", "tall", "most tall"], correct: "taller" },
  { question: "They ___ to finish their work now.", options: ["try", "trying", "tried", "tries"], correct: "are trying" },
  { question: "The cake was ___ by my mother.", options: ["bake", "baked", "baking", "bakes"], correct: "baked" }
    // ... add 15 questions
];

const hardQuestions = [
  { question: "Had I ___ you earlier, I would have helped.", options: ["know", "knew", "known", "knowing"], correct: "known" },
  { question: "He suggested that she ___ earlier.", options: ["leave", "left", "leaves", "leaving"], correct: "leave" },
  { question: "No sooner ___ he entered than it started raining.", options: ["had", "has", "did", "was"], correct: "had" },
  { question: "If only I ___ more careful!", options: ["was", "were", "am", "be"], correct: "were" },
  { question: "She insisted that he ___ honest.", options: ["be", "was", "is", "being"], correct: "be" },
  { question: "I wish I ___ the answer.", options: ["know", "knew", "knowing", "known"], correct: "knew" },
  { question: "The movie, ___ we watched yesterday, was boring.", options: ["that", "which", "who", "where"], correct: "which" },
  { question: "Scarcely ___ the bell rung when the class started.", options: ["has", "had", "was", "did"], correct: "had" },
  { question: "It’s high time you ___ your homework.", options: ["do", "did", "done", "doing"], correct: "did" },
  { question: "He talks as if he ___ everything.", options: ["knows", "knew", "know", "knowing"], correct: "knew" },
  { question: "By next year, I ___ completed my studies.", options: ["will", "will have", "would", "would have"], correct: "will have" },
  { question: "The more you practice, the ___ you get.", options: ["good", "better", "best", "well"], correct: "better" },
  { question: "He was accused ___ stealing money.", options: ["of", "for", "by", "with"], correct: "of" },
  { question: "Neither of the boys ___ done their homework.", options: ["has", "have", "having", "had"], correct: "has" },
  { question: "Hardly ___ he reached when the show started.", options: ["had", "has", "did", "was"], correct: "had" }
    // ... add 15 questions
];

// Shuffle array function
function shuffle(array) {
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
    return array;
}

// Initialize
let level = localStorage.getItem('quizLevel') || 'easy';
let allQuestions = level === 'easy' ? easyQuestions : level === 'medium' ? mediumQuestions : hardQuestions;
let questions = shuffle([...allQuestions]).slice(0,15); // pick 15 unique
localStorage.setItem('questions', JSON.stringify(questions));

let current = 0;
let userAnswers = Array(questions.length).fill(null);
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const progressEl = document.getElementById('progress');

// Timer
let time = 1200; // 20 mins in seconds
const timerEl = document.getElementById('timer');
let timerInterval = setInterval(() => {
    let minutes = Math.floor(time/60);
    let seconds = time%60;
    timerEl.innerHTML = `Time Left: ${minutes}:${seconds<10?'0'+seconds:seconds}`;
    time--;
    if(time < 0){
        clearInterval(timerInterval);
        submitQuiz();
    }
},1000);

function renderQuestion() {
    const q = questions[current];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.className = userAnswers[current] === opt ? 'selected' : '';
        btn.onclick = () => { userAnswers[current] = opt; renderQuestion(); };
        optionsEl.appendChild(btn);
    });
    progressEl.textContent = `Question ${current+1} / ${questions.length}`;
}

function submitQuiz() {
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    window.location.href = 'result.html';
}

document.getElementById('nextBtn').onclick = () => { if(current<questions.length-1) current++; renderQuestion(); };
document.getElementById('prevBtn').onclick = () => { if(current>0) current--; renderQuestion(); };
document.getElementById('submitBtn').onclick = submitQuiz;

renderQuestion();
