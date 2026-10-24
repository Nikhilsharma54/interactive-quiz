const questions = [
  { q: "Which language runs in the browser?", options: ["Python", "JavaScript", "C", "Java"], answer: 1 },
  { q: "What does CSS control?", options: ["Database", "Server speed", "Page styling", "Network"], answer: 2 },
  { q: "Which keyword creates a function in Python?", options: ["func", "def", "function", "fn"], answer: 1 },
  { q: "What does Git do?", options: ["Tracks changes in code", "Edits photos", "Hosts emails", "Compiles Java"], answer: 0 },
  { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Mode Language"], answer: 0 }
];

let index = 0;
let score = 0;
const $ = id => document.getElementById(id);

function showQuestion() {
  const item = questions[index];
  $("progress").textContent = `Question ${index + 1} of ${questions.length}`;
  $("question").textContent = item.q;
  $("feedback").textContent = "";
  $("next").hidden = true;
  $("options").innerHTML = "";
  item.options.forEach((text, i) => {
    const b = document.createElement("button");
    b.textContent = text;
    b.onclick = () => choose(i);
    $("options").appendChild(b);
  });
}

function choose(i) {
  const item = questions[index];
  const buttons = $("options").children;
  for (const b of buttons) b.disabled = true;
  buttons[item.answer].classList.add("correct");
  if (i === item.answer) {
    score++;
    $("feedback").textContent = "Correct.";
  } else {
    buttons[i].classList.add("wrong");
    $("feedback").textContent = "Not quite. The right answer is highlighted.";
  }
  $("next").textContent = index === questions.length - 1 ? "See result" : "Next question";
  $("next").hidden = false;
}

$("next").onclick = () => {
  index++;
  if (index < questions.length) return showQuestion();
  $("quiz").hidden = true;
  $("result").hidden = false;
  $("score").textContent = `You scored ${score} out of ${questions.length}`;
};

$("restart").onclick = () => {
  index = 0; score = 0;
  $("result").hidden = true;
  $("quiz").hidden = false;
  showQuestion();
};

showQuestion();
