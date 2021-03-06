import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import "./App.css";
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState("");
  const [inputPercent, setInputPercent] = useState("");
  const [play, setPlay] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit (event){
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    try{
      const res = await axios.post(`/predict`, { "text": inputText, "percent": inputPercent });
      console.log(res.data);
      console.log(inputText);
      setPlay(res.data.prediction);
      setLoading(false);
      setSuccess(true);
    }
    catch(e){
      setLoading(false);
      console.log(e)
    }
  }

  const handleTextChange = event => {
    setInputText(event.target.value);
  }
  const handlePercentChange = event => {
    setInputPercent(event.target.value);
  }

  let id = 0; // acts as a key for <p></p> mapping

  return (
    <div className="App">
      <div className="container">
        <br />
        <br />
        <div className="row">
          <div className="col-md-12">
            <form className="form-group" method="POST" onSubmit={handleSubmit}>
              <label for="percent">Enter your Article here :</label>
              <input
                type="textarea"
                className="form-control"
                id="text"
                name="text"
                onChange={handleTextChange}
              />
              <label for="percent">Percentage of text you want to retain :</label>
              <input
                type="text"
                className="form-control"
                id="percent"
                name="percent"
                onChange={handlePercentChange}
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <br />
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <div className="jumbotron jumbotron-fluid">
                <div className="container">
                  <h1 className="display-4">
                    <u>Summary</u>
                  </h1>
                  {success ? <div className="lead" style={{ textAlign: "left" }}>
                    {play.split("\n").map((i) => {
                      return <p key={id++}>{i}</p>;
                    })}
                  </div> : <div></div> }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
