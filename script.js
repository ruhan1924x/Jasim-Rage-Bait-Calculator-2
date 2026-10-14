
const questions = [
  {
    question: "Apni ki Jasimer cheye beshi smart?",
    answers: [
      { text: "YES. 🧠", points: 7 },
      { text: "NO. 😎", points: 5 },
      { text: "Jasim abar ke? 💀", points: 10 }
    ]
  },
  {
    question: "Tumi kothay porashona koro?",
    answers: [
      { text: "Diploma 🎓", points: 5 },
      { text: "Emon jaygay, jekhane Jasim chance-o paibo na. 💀", points: 10 },
      { text: "Dhaka University.🤨", points: 0 }
    ]
  },
  {
    question: "Tomar ki girlfriend ba bou ache?",
    answers: [
      { text: "Hae, ami onek happy. ❤️", points: 5 },
      { text: "Jaim e amar bou. 💀", points: 10 },
      { text: "Nah nei. 📈", points: 0 }
    ]
  },
  {
    question: "Tumi ki Jasimer cheye beshi jano?",
    answers: [
      { text: "Obviously. Next question. 🔥", points: 10 },
      { text: "Nah 😔", points: 0 },
      { text: "Jasim to shob jane. Apparently. 😭", points: 5 }
    ]
  },
  {
    question: "Tumi ki chakri koro?",
    answers: [
      { text: "Hae, ami employed. 💸", points: 5 },
      { text: "nah. 😔", points: 0 },
      { text: "Jasim e to amar chakri. 😴", points: 10 }
    ]
  },
  {
    question: "Tomar aura ki Jasimer cheye beshi?",
    answers: [
      { text: "Yes. 🗿", points: 5 },
      { text: "nah . 🤝", points: 0 },
      { text: "ore gonay dhori na. 💀", points: 10 }
    ]
  },
  {
    question: "Jasimer machine koto boro? 💀",
    answers: [
      { text: "Onek boro. 🤐", points: 0 },
      { text: "Onek choto. 😭", points: 5 },
      { text: "Nai. 💀", points: 10 }
    ]
  },
  {
    question: "Jasim ki kipta?",
    answers: [
      { text: "Onek. 💸", points: 10 },
      { text: "Na. ❤️", points: 0 },
      { text: "Jasim valo chele. 🧐", points: 5 }
    ]
  },
  {
    question: "Jasim ki gay?",
    answers: [
      { text: "Yes. 🤝", points: 10 },
      { text: "No. 🌈", points: 0 },
      { text: "Debatable. 💀", points: 5 }
    ]
  },
  {
    question: "Jasim kothay porashona kore?",
    answers: [
      { text: "Dhaka College. 🎓", points: 0 },
      { text: "Dhaka City Collage. 💀", points: 10 },
      { text: "Age Sans paiya deha. 😭", points: 10 }
    ]
  }
];



const rageLevels = [
  {
    title: "CHILL MODE",
    caption: "Jasim is at peace. For now. 😎",
    image: "assets/jasim-01.png"
  },
  {
    title: "SUSPICIOUS MODE",
    caption: "Jasim has started asking questions. 🤨",
    image: "assets/jasim-02.png"
  },
  {
    title: "MILDLY TRIGGERED",
    caption: "One more question and things get awkward. 😒",
    image: "assets/jasim-03.png"
  },
  {
    title: "ANNOYED MODE",
    caption: "Jasim is reconsidering this friendship. 😤",
    image: "assets/jasim-04.png"
  },
  {
    title: "ANGER LOADING",
    caption: "The eyebrow has officially twitched. 😡",
    image: "assets/jasim-05.png"
  },
  {
    title: "RAGE MODE",
    caption: "Bro is typing a paragraph in the group chat. 🔥",
    image: "assets/jasim-06.png"
  },
  {
    title: "UNSTABLE MODE",
    caption: "Jasim has entered the voice chat. 💀",
    image: "assets/jasim-07.png"
  },
  {
    title: "BERSERK MODE",
    caption: "The group chat is no longer safe. ⚡",
    image: "assets/jasim-08.png"
  },
  {
    title: "FINAL BOSS",
    caption: "Jasim has requested a private conversation. 👹",
    image: "assets/jasim-09.png"
  },
  {
    title: "JASIM.EXE HAS CRASHED",
    caption: "CRITICAL ERROR: FRIENDSHIP NOT FOUND. 💀🔥",
    image: "assets/jasim-10.png"
  }
];


// ========================================
// HTML ELEMENTS
// ========================================

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const loadingScreen = document.getElementById("loadingScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startButton");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const shareButton = document.getElementById("shareButton");

const questionCounter = document.getElementById("questionCounter");
const progressBar = document.getElementById("progressBar");
const questionTag = document.getElementById("questionTag");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");

const loadingTitle = document.getElementById("loadingTitle");
const loadingMessage = document.getElementById("loadingMessage");
const loadingBar = document.getElementById("loadingBar");

const resultImage = document.getElementById("resultImage");
const resultFallback = document.getElementById("resultFallback");
const resultLevel = document.getElementById("resultLevel");
const scoreValue = document.getElementById("scoreValue");
const scoreBar = document.getElementById("scoreBar");
const resultTitle = document.getElementById("resultTitle");
const resultCaption = document.getElementById("resultCaption");
const resultRange = document.getElementById("resultRange");
const shareMessage = document.getElementById("shareMessage");

// ========================================
// GAME STATE
// ========================================

let currentQuestion = 0;
let selectedAnswers = Array(questions.length).fill(null);
let calculationTimers = [];

// ========================================
// SCREEN MANAGEMENT
// ========================================

function showScreen(screenToShow) {
  [startScreen, quizScreen, loadingScreen, resultScreen]
    .forEach(screen => screen.classList.add("hidden"));

  screenToShow.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ========================================
// START GAME
// ========================================

function startGame() {
  clearCalculationTimers();

  currentQuestion = 0;
  selectedAnswers = Array(questions.length).fill(null);
  shareMessage.textContent = "";

  showScreen(quizScreen);
  renderQuestion();
}

// ========================================
// RENDER QUESTION + 3 MCQ OPTIONS
// ========================================

function renderQuestion() {
  const question = questions[currentQuestion];
  const questionNumber = currentQuestion + 1;

  questionCounter.textContent =
    `${String(questionNumber).padStart(2, "0")} / 10`;

  questionTag.textContent =
    `QUESTION ${String(questionNumber).padStart(2, "0")}`;

  questionText.textContent = question.question;

  progressBar.style.width = `${questionNumber * 10}%`;

  backButton.disabled = currentQuestion === 0;
  backButton.style.opacity = currentQuestion === 0 ? "0.4" : "1";

  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "CALCULATE RAGE 🔥"
      : "NEXT QUESTION →";

  answerOptions.replaceChildren();

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    const letter = document.createElement("span");
    const text = document.createElement("span");
    const check = document.createElement("span");

    button.type = "button";
    button.className = "answer-option";

    letter.className = "option-letter";
    letter.textContent = ["A", "B", "C"][index];

    text.className = "option-text";
    text.textContent = answer.text;

    check.className = "option-check";
    check.textContent = "✓";

    if (selectedAnswers[currentQuestion] === index) {
      button.classList.add("selected");
      button.setAttribute("aria-pressed", "true");
      check.setAttribute("aria-label", "Selected");
    } else {
      button.setAttribute("aria-pressed", "false");
      check.textContent = "";
    }

    button.append(letter, text, check);

    button.addEventListener("click", () => {
      selectedAnswers[currentQuestion] = index;
      renderQuestion();
    });

    answerOptions.appendChild(button);
  });

  nextButton.disabled = selectedAnswers[currentQuestion] === null;
}

// ========================================
// NAVIGATION
// ========================================

function goNext() {
  if (selectedAnswers[currentQuestion] === null) {
    return;
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    startCalculation();
  }
}

function goBack() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

// ========================================
// SCORE CALCULATION
// ========================================

function calculateScore() {
  const totalPoints = questions.reduce((total, question, index) => {
    const selectedIndex = selectedAnswers[index];

    if (selectedIndex === null) {
      return total;
    }

    return total + question.answers[selectedIndex].points;
  }, 0);

  // Max score is 100, so points equal percentage.
  return Math.max(0, Math.min(100, totalPoints));
}

// 0–10 = level 1
// 11–20 = level 2
// ...
// 81–90 = level 9
// 91–100 = level 10

function getRageLevel(score) {
  if (score <= 10) {
    return 0;
  }

  return Math.min(9, Math.ceil(score / 10) - 1);
}

// ========================================
// FAKE CALCULATION ANIMATION
// ========================================

function clearCalculationTimers() {
  calculationTimers.forEach(timer => clearTimeout(timer));
  calculationTimers = [];
}

function startCalculation() {
  clearCalculationTimers();
  showScreen(loadingScreen);

  const messages = [
    {
      title: "Analyzing answers...",
      message: "Checking your Jasim knowledge..."
    },
    {
      title: "Measuring aura...",
      message: "Comparing totally imaginary aura levels..."
    },
    {
      title: "Checking friendship damage...",
      message: "Consulting the Department of Ego..."
    },
    {
      title: "Calculating rage...",
      message: "The science department is panicking..."
    }
  ];

  loadingBar.style.width = "0%";

  messages.forEach((item, index) => {
    const timer = setTimeout(() => {
      loadingTitle.textContent = item.title;
      loadingMessage.textContent = item.message;
      loadingBar.style.width = `${(index + 1) * 25}%`;
    }, index * 700);

    calculationTimers.push(timer);
  });

  const finalTimer = setTimeout(() => {
    showResult(calculateScore());
  }, messages.length * 700 + 250);

  calculationTimers.push(finalTimer);
}

// ========================================
// RESULT SCREEN + IMAGE LEVEL
// ========================================

function showResult(score) {
  clearCalculationTimers();

  const levelIndex = getRageLevel(score);
  const level = rageLevels[levelIndex];

  showScreen(resultScreen);

  scoreValue.textContent = score;
  scoreBar.style.width = `${score}%`;

  resultLevel.textContent =
    `LEVEL ${String(levelIndex + 1).padStart(2, "0")}`;

  resultTitle.textContent = level.title;
  resultCaption.textContent = level.caption;

  const lowerBound = levelIndex === 0 ? 0 : levelIndex * 10 + 1;
  const upperBound = levelIndex === 0 ? 10 : (levelIndex + 1) * 10;

  resultRange.textContent =
    `RAGE LEVEL ${String(levelIndex + 1).padStart(2, "0")} / 10 · ` +
    `${lowerBound}–${upperBound}%`;

  // Show a placeholder until the real image is added.
  resultImage.classList.add("hidden");
  resultFallback.classList.remove("hidden");
  resultFallback.textContent = levelIndex >= 7 ? "👹" :
    levelIndex >= 4 ? "😡" :
    levelIndex >= 2 ? "😤" : "💀";

  resultImage.onload = () => {
    resultImage.classList.remove("hidden");
    resultFallback.classList.add("hidden");
  };

  resultImage.onerror = () => {
    resultImage.classList.add("hidden");
    resultFallback.classList.remove("hidden");
  };

  resultImage.src = level.image;

  // Reset the result meter before animating it.
  scoreBar.style.width = "0%";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scoreBar.style.width = `${score}%`;
    });
  });

  shareMessage.textContent = "";
}

// ========================================
// SHARE RESULT
// ========================================

async function shareResult() {
  const score = calculateScore();
  const level = rageLevels[getRageLevel(score)];

  const shareText =
    `I scored ${score}% on the JASIM.EXE Rage Bait Calculator! 💀\n` +
    `Result: ${level.title}\n` +
    `${level.caption}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "JASIM.EXE Rage Calculator",
        text: shareText,
        url: window.location.href
      });
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(
        `${shareText}\n${window.location.href}`
      );

      shareMessage.textContent =
        "Result copied! Send it to your friends. 💜";
    } else {
      shareMessage.textContent =
        "Copy the page URL from your browser and share your result!";
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      shareMessage.textContent =
        "Sharing was unavailable. You can still share the website link!";
    }
  }
}

// ========================================
// EVENT LISTENERS
// ========================================

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", goNext);
backButton.addEventListener("click", goBack);
restartButton.addEventListener("click", startGame);
shareButton.addEventListener("click", shareResult);

// ========================================
// INITIAL STATE
// ========================================

showScreen(startScreen);
