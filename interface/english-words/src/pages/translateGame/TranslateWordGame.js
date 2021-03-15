import React from 'react';
import wordService from '../../services/wordService';

export default function TranslateWordGame() {
  const [wordList, setWordList] = React.useState([]);
  const [limit, setLimit] = React.useState(0);
  const [spToEn, setSpToEn] = React.useState(false);
  const [gameList, setGameList] = React.useState([]);
  const [gameListIndex, setGameListIndex] = React.useState(0);
  const [isLoadedGame, setIsLoadedGame] = React.useState(false);
  const [showResp,setShowResp] = React.useState(false);
  React.useEffect(()=>{
      wordService.getAll().then((resp)=>setWordList(resp.data));
  }, []);
  const createGameList = () => {
    setIsLoadedGame(true);
    if(limit > 0 && limit <= wordList.length){
      const elementsToCut = wordList.length - limit;
      let showList = wordList.slice(elementsToCut);
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
    let word = '';
    if(spToEn === true) {
      word = `${item.type} - ${item.sentenceSp}`;
      return (
      <>
        <input
          type="text"
          disabled="disabled"
          value={word}
          style={{width:'100%'}}
        />
        <div style={{display}}>
          <h2>{item.word}</h2>
          <h4>{item.type}</h4>
          <span>{item.sound}</span>
          <h3>{`"${item.meaning}"`}</h3>
          <hr />
          <h2>{item.sentence}</h2>
          <h2>{item.sentenceSp}</h2>
        </div>
      </>
      );
    }
    word = item.word;
    return (
    <>
      <input type="text" disabled="disabled" value={word}/>
      <div style={{display}}>
        <span>{item.sound}</span>
        <h4>{item.type}</h4>
        <h3>{`"${item.meaning}"`}</h3>
        <hr />
        <h2>{item.sentence}</h2>
        <h2>{item.sentenceSp}</h2>
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
      <h1>Words:{wordList.length}</h1>
      <div>
        <p>How many words to play</p>
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

  console.log(wordList);

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
        <h3>NUMBER OF WORDS {gameList.length}</h3>
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
