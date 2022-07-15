import React from "react";
import HeadComponent from '../components/Head';

// Constants
const BUILDSPACE_TWITTER_HANDLE = "_buildspace";
const PERSONAL_TWITTER_HANDLE = "0x_Rohit";
const PERSONAL_TWITTER_LINK = `https://twitter.com/${PERSONAL_TWITTER_HANDLE}`;
const BUILDSPCE_TWITTER_LINK = `https://twitter.com/${BUILDSPACE_TWITTER_HANDLE}`;

const App = () => {
  
  
  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
          <p className="header"> 🎸 The Rock n Roll Memorabilia Store 🤟</p>
          <p className="sub-text">Rhythm and Blues, the crypto way</p>
        </header>

        <main>
          <img src="https://user-images.githubusercontent.com/54990929/179293529-ea6692a2-7886-467a-bfe7-e0b24e9077bf.jpg" alt="emoji" height={350} width={450}/>
        </main>

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg" />
          <a
            className="footer-text"
            href={PERSONAL_TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          style={{marginRight: "5px"}}>{`built by @${PERSONAL_TWITTER_HANDLE}`}</a>
          <a
            className="footer-text"
            href={BUILDSPCE_TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`on @${BUILDSPACE_TWITTER_HANDLE}`} with 🧡</a>
        </div>
      </div>
    </div>
  );
};

export default App;
