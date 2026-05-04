function generateAvatar(){
    let g=document.getElementById("gender").value;
    if(g=="male") document.getElementById("avatar").innerText="🕺";
    else if(g=="female") document.getElementById("avatar").innerText="💃";
    else document.getElementById("avatar").innerText="🙂";
}

function startQuizApp(){
    let name=document.getElementById("username").value;
    let email=document.getElementById("email").value;
    let gender=document.getElementById("gender").value;

    if(name=="" || email=="" || gender==""){
        alert("Please fill all details");
        return;
    }

    document.getElementById("profileSection").style.display="none";
    document.querySelector(".tagline").style.display="none";
    document.querySelectorAll(".brainFloat").forEach(x=>x.style.display="none");

    document.getElementById("quizSection").style.display="block";
    document.getElementById("welcomeUser").innerText="🔥 Welcome "+name+" 🔥";

    shuffleQuestions();
    currentQuestion=0;
    score=0;
    loadQuestion();
}

let questions=[
    {question:"What does HTML stand for?",options:["Hyper Text Markup Language","High Tool Markup Language","Home Tool Markup Language","Hyperlink Text Makeup Language"],answer:"Hyper Text Markup Language"},
    {question:"Which language is used for styling web pages?",options:["HTML","CSS","C","Python"],answer:"CSS"},
    {question:"Which language is used for dynamic website functionality?",options:["JavaScript","C++","Java","SQL"],answer:"JavaScript"},
    {question:"What does CSS stand for?",options:["Cascading Style Sheet","Computer Style Sheet","Creative Style Sheet","Colorful Style Sheet"],answer:"Cascading Style Sheet"},
    {question:"Which company developed JavaScript?",options:["Netscape","Google","Microsoft","Oracle"],answer:"Netscape"},
    {question:"Which tag inserts image in HTML?",options:["img","pic","image","src"],answer:"img"},
    {question:"Which symbol is used for id selector in CSS?",options:["#",".","*","$"],answer:"#"},
    {question:"Which method displays message box in JavaScript?",options:["alert()","msg()","show()","display()"],answer:"alert()"}
];

let selectedQuestions=[],currentQuestion=0,score=0,timeLeft=20,timer;

function shuffleQuestions(){
    selectedQuestions=[...questions].sort(()=>Math.random()-0.5).slice(0,5);
}

function loadQuestion(){
    clearInterval(timer);
    timeLeft=20;
    startTimer();

    document.getElementById("message").innerText="";
    document.getElementById("progress").innerText="🎮 Level "+(currentQuestion+1)+" / 5";

    let q=selectedQuestions[currentQuestion];
    document.getElementById("question").innerText=q.question;
    let optionsDiv=document.getElementById("options");
    optionsDiv.innerHTML="";

    q.options.forEach(function(opt){
        let btn=document.createElement("button");
        btn.innerText=opt;
        btn.className="option-btn";
        btn.onclick=function(){checkAnswer(opt);};
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected){
    if(selected===selectedQuestions[currentQuestion].answer){
        score++;
        document.getElementById("message").innerText="🎉 Great Move!";
    }else{
        document.getElementById("message").innerText="😅 Oops! Try Next!";
    }
    setTimeout(nextQuestion,1000);
}

function nextQuestion(){
    currentQuestion++;
    if(currentQuestion<5) loadQuestion();
    else showResult();
}

function startTimer(){
    document.getElementById("timer").innerText="⏰ "+timeLeft+" Seconds Left";
    timer=setInterval(function(){
        timeLeft--;
        document.getElementById("timer").innerText="⏰ "+timeLeft+" Seconds Left";
        if(timeLeft<=0){
            clearInterval(timer);
            document.getElementById("message").innerText="⌛ Time Up!";
            setTimeout(nextQuestion,1000);
        }
    },1000);
}

function createConfetti(){
    for(let i=0;i<30;i++){
        let c=document.createElement("div");
        c.className="confetti";
        c.style.left=Math.random()*100+"vw";
        c.style.backgroundColor=hsl(${Math.random()*360},100%,50%);
        c.style.animationDuration=(Math.random()*3+2)+"s";
        document.body.appendChild(c);
    }
}

function showResult(){
    clearInterval(timer);
    document.getElementById("question").style.display="none";
    document.getElementById("options").style.display="none";
    document.getElementById("timer").style.display="none";
    document.getElementById("progress").style.display="none";
    document.getElementById("message").innerText="";

    let avatar=document.getElementById("avatar");
    avatar.classList.add("dance");
    document.getElementById("quizSection").insertBefore(avatar,document.getElementById("result"));

    document.getElementById("result").innerText="🏆 Your Final Brain Score: "+score+"/5";
    document.getElementById("celebrate").innerText="👏 YOU ROCK 👏";
    createConfetti();
}

function restartQuiz(){
    location.reload();
}
