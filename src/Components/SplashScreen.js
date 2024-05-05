import "../index.css";

export default function SplashScreen(props) {
  return (
    <div className="splash-screen">
      <h1>Quizzical</h1>
      <p>A quiz to test your knowledge in science</p>
      <button className="start-quiz" onClick={props.toggle}>Start Quiz</button>
    </div>
  );
}
