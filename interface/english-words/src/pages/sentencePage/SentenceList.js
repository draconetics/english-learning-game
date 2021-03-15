import React from 'react';
import sentenceService from '../../services/sentenceService';
import {nanoid} from 'nanoid';

import './SentenceList.css';

export default function SentenceList() {
    const [sentenceList, setSentenceList] = React.useState([]);
    React.useEffect(()=>{
        sentenceService.getAll().then((resp)=>setSentenceList(resp.data));
    }, []);
  return (
    <div className="sentence-list">
        <div className="sentence__container">
            <h2>word list</h2>
            {JSON.stringify(sentenceList)}
            <ul>
                {sentenceList && sentenceList.map((item) => {
                    return (
                    <li key={nanoid()}>
                        <div className="sentence__id">{item._id}</div>
                        <div className="sentence__english">
                            <h3>{item.sentence}</h3>
                        </div>
                        <div className="sentence__spanish">
                            <h3>{item.spanishSentence}</h3>    
                        </div>
                        <div className="sentence__operations"><button type="button">edit</button></div>
                    </li>
                    );
                })}
            </ul>
        </div>
    </div>
  );
}
