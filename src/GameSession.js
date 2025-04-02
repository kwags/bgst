//Add a Game Session to Play History
//import logo from './logo.svg';
//import './App.css';


function GameSession(props) {
  const name = props.name;
  const description = props.description;
  const id = props.id;
  const deleteGameSession = props.delete;

  return (
      <div>
          <h3> { name } </h3>
          <p> { description } </p>
          <button onClick={()=>{ deleteGameSession(id) }}>Delete</button>
      </div>
  );

}

export default GameSession;

