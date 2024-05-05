import "./index.css";
import React from "react";
import Quiz from "./Components/Quiz";
import SplashScreen from "./Components/SplashScreen";
import { nanoid } from "nanoid";
export default function App() {
  const [start, setStart] = React.useState(false);
  const [finish, setFinish] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [score, setScore] = React.useState(undefined);
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://opentdb.com/api.php?amount=5&category=12&difficulty=hard&type=multiple"
      );
      const res = await data.json();
      // res = res.replace(/&quot;/g, '"');
      let formattedData = res.results.map((data) => {
        let reponsesArray = [
          {
            value: data.correct_answer,
            isHeld: false,
            id: nanoid(),
            isCorrecte: undefined,
          },
        ];
        for (let i = 0; i < data.incorrect_answers.length; i++) {
          reponsesArray.push({
            value: data.incorrect_answers[i],
            id: nanoid(),
            isHeld: false,
            isCorrecte: undefined,
          });
        }
        reponsesArray.sort(() => Math.random() - 0.5);
        return {
          id: nanoid(),
          question: data.question,
          reponseCorrecte: {
            value: data.correct_answer,
            isHeld: false,
            id: nanoid(),
            isCorrecte: undefined,
          },
          reponses: reponsesArray,
        };
      });
      setQuestions(formattedData);
    };
    console.log(questions);
    fetchData().catch(console.error);
  }, [finish]);

  function startTheGame() {
    setStart(true);
  }
  function rejouer() {
    setScore(undefined);
    setFinish((prevState) => !prevState);
  }
  function isHeld(questionId, reponseId) {
    let copyQuestions = [...questions];
    for (let i = 0; i < copyQuestions.length; i++) {
      for (let j = 0; j < copyQuestions[i].reponses.length; j++) {
        if (
          copyQuestions[i].reponses[j].id == reponseId &&
          copyQuestions[i].id == questionId
        ) {
          copyQuestions[i].reponses[j].isHeld =
            !copyQuestions[i].reponses[j].isHeld;
        } else if (
          copyQuestions[i].id == questionId &&
          copyQuestions[i].reponses[j].id != reponseId
        ) {
          copyQuestions[i].reponses[j].isHeld = false;
        }
      }
    }
    setQuestions(copyQuestions);
  }
  function verifScore() {
    let copyQuestions = [...questions];
    let score = 0;
    for (let i = 0; i < copyQuestions.length; i++) {
      for (let j = 0; j < copyQuestions[i].reponses.length; j++) {
        if (
          copyQuestions[i].reponses[j].value ==
            copyQuestions[i].reponseCorrecte.value &&
          copyQuestions[i].reponses[j].isHeld == true
        ) {
          score++;
        }
      }
    }
    setScore(score);
  }
  function verifReponses() {
    let copyQuestions = [...questions];
    for (let i = 0; i < copyQuestions.length; i++) {
      copyQuestions[i].reponseCorrecte.isCorrecte = true;
      for (let j = 0; j < copyQuestions[i].reponses.length; j++) {
        if (
          copyQuestions[i].reponses[j].value ==
          copyQuestions[i].reponseCorrecte.value
        ) {
          copyQuestions[i].reponses[j].isCorrecte = true;
        } else if (
          copyQuestions[i].reponses[j].value !=
            copyQuestions[i].reponseCorrecte.value &&
          copyQuestions[i].reponses[j].isHeld
        ) {
          copyQuestions[i].reponses[j].isCorrecte = false;
        }
      }
    }
    setQuestions(copyQuestions);
    verifScore();
  }
  const questionsList = questions.map((question) => {
    return (
      <Quiz
        key={question.id}
        id={question.id}
        question={question.question}
        reponses={question.reponses}
        correct={question.reponseCorrecte}
        holding={isHeld}
      />
    );
  });
  return (
    <main>
      <div className="body">
        {start ? (
          <div className="conteneur-quiz">
            {questionsList}
            <div className={score != undefined ? "bas-page" : ""}>
              {score != undefined && (
                <p>You scored {score}/5 correct answers</p>
              )}
              <button
                className="bouton-fin"
                onClick={score != undefined ? rejouer : verifReponses}
              >
                {score != undefined ? "Play Again" : "Check Answers"}
              </button>
            </div>
          </div>
        ) : (
          <SplashScreen toggle={startTheGame} />
        )}
      </div>
    </main>
  );
}
