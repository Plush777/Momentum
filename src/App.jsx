import './scss/App.scss';
import './scss/reset.scss'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from './components/Loading';
import BgError from './components/BgError';
import WhatsYourName from './components/WhatsYourName';

function App() {

    let [background, setBackground] = useState('');
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(false);
    let [yourName, setYourName] = useState(false);

    useEffect(() => {
        axios.get('https://api.thecatapi.com/v1/images/search').then((res) => {
            setBackground(res.data[0]);
            setLoading(false);
            setError(false);
        }).catch(() => {
            setError(true);
            setLoading(false);
            setBackground('');
        });
    },[]);

    useEffect(() => {
        if(localStorage.getItem('userName')){
            setYourName(true);
        }
    },[yourName]);

    console.log(yourName);

  return (
    <div className="App">
        <div id='bg'>
            {background && <img src={background.url} alt='background'/>}

            {loading && <Loading/>}

            {error && <BgError/>}

            {!yourName && <WhatsYourName/>}
        </div>
    </div>
  );
}

export default App;
