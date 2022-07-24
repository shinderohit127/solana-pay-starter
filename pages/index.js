import React, { useEffect, useState } from "react";
import CreateProduct from "../components/CreateProduct";
import Product from "../components/Product";

import HeadComponent from '../components/Head';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// Constants
const BUILDSPACE_TWITTER_HANDLE = "_buildspace";
const BUILDSPCE_TWITTER_LINK = `https://twitter.com/${BUILDSPACE_TWITTER_HANDLE}`;
const PERSONAL_TWITTER_HANDLE = "0x_Rohit";
const PERSONAL_TWITTER_LINK = `https://twitter.com/${PERSONAL_TWITTER_HANDLE}`;

const App = () => {
  const { publicKey } = useWallet();
  const isOwner = (publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false);
  const [creating, setCreating] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (publicKey) {
      fetch(`api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Products", data);
        })
    }
  }, [publicKey]);

  const renderNotConnectedContainer = () => (
    <div>
      {/* <img src="https://user-images.githubusercontent.com/54990929/179293529-ea6692a2-7886-467a-bfe7-e0b24e9077bf.jpg" alt="emoji" height={350} width={450}/> */}
      <div style={{ display: "inline", overflowX: "hidden", overflowY: "scroll" }}>
        <h4 style={{textDecoration: "underline"}}>How to get started?</h4>
        <p style={{marginBottom: 0}}><b>1.</b> Add the <a href="https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa" style={{color: "#d8243c"}} target="_blank">Phantom wallet</a> to your browser</p>
        <p style={{marginTop: 0, marginBottom: 0}}><b>2.</b> Head over to this <a href="https://spl-token-faucet.com/?token-name=USDC?utm_source=buildspace.so&utm_medium=buildspace_project" style={{color: "#d8243c"}} target="_blank">faucet</a></p>
        <p style={{marginTop: 0, marginBottom: 0}}><b>3.</b> Firstly, airdrop 1 SOL into your wallet</p>
        <p style={{marginTop: 0, marginBottom: 0}}><b>4.</b> Now, airdrop 1000 USDC into your wallet</p>
        <p style={{marginTop: 0, marginBottom: 0}}><b>5.</b> Enjoy the Vibe!!</p>
      </div>
      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>
    </div>
  );

  const renderItemBuyContainer = () => (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <div className="App">
      <HeadComponent />
      <div className="container">
        <header className="header-container">
          <p className="header"> 🎸 The Rock n Roll Memorabilia Store 🤟</p>
          <p className="sub-text">Rhythm and Blues, the crypto way</p>

          {isOwner && (
            <button onClick={() => setCreating(!creating)} style={{
              margin: 10,
              border: 0,
              fontSize: 20,
              fontWeight: "bold",
              position: "fixed",
              top: 20,
              right: 20,
              cursor: "pointer",
              color: "white",
              backgroundColor: "transparent",
              zIndex: 1,
            }}>
              {creating ? "Close" : "Create Product"}
            </button>
          )}

        </header>

        <main>
          {creating && <CreateProduct />}
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
        </main>

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg" />
          <a
            className="footer-text"
            href={PERSONAL_TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
            style={{ marginRight: "5px" }}>{`built by @${PERSONAL_TWITTER_HANDLE}`}</a>
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
