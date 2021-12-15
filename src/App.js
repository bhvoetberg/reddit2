import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import React, {useEffect, useState} from "react";
import header from "./components/header/Header"

function App() {
  const [endPoint, setEndPoint] = useState('https://www.reddit.com/hot.json?limit=15');
  const [redditData, setRedditData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getRedditPosts() {
      setLoading(true);
      try {
        const result = await axios.get(endPoint);
        setRedditData(result.data.data.children);
      } catch (e) {
        console.error(e);
        setError(true);
      }
      setLoading(false);
    }
    getRedditPosts();
  }, []);

  return (
      <div className="App">
        {error && <h2>Er is iets foutgegaan.</h2>}
        <h1>Hottest 15 posts on Reddit</h1>
        {redditData &&
            <ul>
              {redditData.map((child) => {
                return (
                    <li key="child.data.created_utc">
                      <h2><a href={`https://reddit.com${child.data.permalink}`}>{child.data.title}</a></h2>
                      <h3><a href={`https://reddit.com/${child.data.subreddit_name_prefixed}`}>{child.data.subreddit_name_prefixed}</a></h3>
                    </li>
                )
              })}
            </ul>
        }
      </div>
  );

}

export default App;