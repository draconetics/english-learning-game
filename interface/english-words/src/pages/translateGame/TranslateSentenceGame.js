import React from 'react';
import sentenceService from '../../services/sentenceService';

export default function TranslateSentenceGame() {
  const [sentenceList, setSentenceList] = React.useState([]);
  const [limit, setLimit] = React.useState(0);
  const [spToEn, setSpToEn] = React.useState(false);
  const [gameList, setGameList] = React.useState([]);
  const [gameListIndex, setGameListIndex] = React.useState(0);
  const [isLoadedGame, setIsLoadedGame] = React.useState(false);
  const [showResp,setShowResp] = React.useState(false);
  React.useEffect(()=>{
      sentenceService.getAll().then((resp)=>setSentenceList(resp.data));
  }, []);
  const createGameList = () => {
    setIsLoadedGame(true);
    if(limit > 0 && limit <= sentenceList.length){
      const elementsToCut = sentenceList.length - limit;
      let showList = sentenceList.slice(elementsToCut);
      showList = shuffleArray(showList);
      setGameList(showList);
    }
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    } 
    return array;
  }

  const showQuestion = () => {
    const display = showResp? 'block':'none';
    if(isLoadedGame === false){
      return null;
    }
    const item = gameList[gameListIndex];
    
    if(spToEn === true) {
      return (
      <>
        <input
          type="text"
          disabled="disabled"
          value={item.spanishSentence}
          style={{width:'100%'}}
        />
        <div style={{display}}>
          <h2>{item.sentence}</h2>
        </div>
      </>
      );
    }
    
    return (
    <>
      <input
        type="text"
        disabled="disabled"
        value={item.sentence}
        style={{width:'100%'}}
      />
      <div style={{display}}>
        <h3>{item.spanishSentence}</h3>
      </div>
    </>
    );
  }

  const setSpanishToEnglish = (e) => {
    console.log(e.target.value);
    if(e.target.value === 'true'){
      setSpToEn(true);
    }else{
      setSpToEn(false);
    }
  }

  const showConfiguration = () => {
    if(isLoadedGame === true){
      return null;
    }
    return (
    <div className="translate-game">
      <h1>Sentences:{sentenceList.length}</h1>
      <div>
        <p>How many sentences to play</p>
        <input type="number" onChange={(e) => setLimit(e.target.value)} />
        <select onChange={(e) => setSpanishToEnglish(e)}>
          <option value={false}>English to spanish</option>
          <option value={true}>Spanish to english</option>
        </select>
      </div>
      <div>
        <button type="buttom" onClick={() => createGameList()}>create game</button>
      </div>
    </div>
    );
  }

  console.log(sentenceList);

  const setIndex = () => {
    if(gameListIndex+1 < gameList.length) {
      setGameListIndex(gameListIndex+1);
      setShowResp(false);
    }else{
      alert('game is finished');
    }
  }

  const showGameSpace = () => {
    if(isLoadedGame === false){
      return null;
    }
    return (
      <div>
        <h3>NUMBER OF SENTENCES {gameList.length}</h3>
        <button type="button" onClick={()=> window.location.reload(false)}>Reset</button>
        <h3>Question {gameListIndex+1} of {gameList.length}</h3>
        {showQuestion()}
        <div>
          <button type="button" onClick={() => setShowResp(true)}>show</button>
          <br />
          <br />
          <button type="button" style={{width: '100px',height:'100px'}} onClick={() => setIndex()}>next</button>
        </div>
      </div>
    );
  }
  return (
    <>
    {showConfiguration()}
    {showGameSpace()}
    </>
  );
}
