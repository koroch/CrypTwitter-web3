"use client";
import Head from "next/head";

import { doLogin } from "@/services/Web3Service";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");


  function btnLoginClick() {
    setMessage("Conectando com a MataMask... aguarde!...");
    doLogin()
      .then(wallet => setMessage(wallet))
      .catch(error => setMessage(error))
  }

  return (
    <>
      <Head>
        <title>CrypTwitter | Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="geral-container">
        <div className="container px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img src="https://www.hardware.com.br/wp-content/uploads/2023/08/Elon-Musk-x-Mark-Zuckerberg.jpg" className="d-block mx-lg-auto img-fluid" width="700px" height="500px"></img>
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">CrypTwitter</h1>
              <p className="lead">Sua rede social descentralizada!</p>
              <p className="lead mb-3">Autentique-se com a sua carteira, escreva seus twitts e saiba o que está acontecendo no mundo!</p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button type="button" className="btn btn-primary btn-lg px-4 me-md-2" onClick={btnLoginClick}>
                  <img src="/metamask.svg" width="64" className="me-3" />
                  Conectar com a metamask
                </button>
              </div>
              <p className="message">{message}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
