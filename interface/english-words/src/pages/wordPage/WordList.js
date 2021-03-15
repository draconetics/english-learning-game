import React from 'react';
import wordService from '../../services/wordService';
import {nanoid} from 'nanoid';

import './WordList.css';

export default function WordList() {
    const [wordList, setWordList] = React.useState([]);
    React.useEffect(()=>{
        wordService.getAll().then((resp)=>setWordList(resp.data));
    }, []);
  return (
    <div className="word-list">
        <div className="word-list__container">
            <h2>word list</h2>
            {JSON.stringify(wordList)}
            <ul>
                <li className="word-list__header">
                    <div>ID</div>
                    <div>WORD</div>
                    <div>SENTENCE</div>
                    <div>SPANISH</div>
                    <div>MEANING</div>
                    <div>SOUND</div>
                    <div>TYPE</div>
                </li>
                {wordList && wordList.map((item) => {
                    return (
                    <li key={nanoid()}>
                        <div className="word-list__id">{item._id}</div>
                        <div className="word-list__word">
                            <h2>{item.word}</h2>
                            <span>{item.sound}</span>
                            <h3>{item.type}</h3>
                            <p>{item.meaning}</p>
                            <div>
                                <div>{item.sentence}</div>
                                <div>{item.sentenceSp}</div>
                            </div>
                        </div>
                        <div className="word-list__operations"><button type="button">edit</button></div>
                    </li>
                    );
                })}
            </ul>
        </div>
    </div>
  );
}
