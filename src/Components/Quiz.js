import "../index.css";

export default function Quiz(props) {
  let classQuestion = "reponse";

  let reponsesMap = [];
  reponsesMap = props.reponses.map((reponse) => {
    if (reponse.isHeld && reponse.isCorrecte) {
      classQuestion = "reponse correcte";
    } else if (reponse.isHeld && reponse.isCorrecte == false) {
      classQuestion = "reponse fausse";
    } else if (reponse.isHeld) {
      classQuestion = "reponse held";
    } else if (reponse.isCorrecte) {
      classQuestion = "reponse correcte";
    } else {
      classQuestion = "reponse";
    }
    return (
      <div
        className={classQuestion}
        onClick={() => props.holding(props.id, reponse.id)}
        dangerouslySetInnerHTML={{ __html: reponse.value }}
      ></div>
    );
  });
  return (
    <div className="quiz">
      <h2
        className="question"
        dangerouslySetInnerHTML={{ __html: props.question }}
      ></h2>
      <div className="series-reponses">{reponsesMap}</div>
      <hr />
    </div>
  );
}
