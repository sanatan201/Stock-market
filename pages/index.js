import React from "react";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch("https://newsapi.org/v2/top-headlines?category=business&country=in&apiKey=YOUR_NEWSAPI_KEY");
      const data = await res.json();
      setArticles(data.articles);
    };

    const fetchStockPrice = async () => {
      const res = await fetch("https://finnhub.io/api/v1/quote?symbol=NSE:RELIANCE&token=YOUR_FINNHUB_KEY");
      const data = await res.json();
      setPrice(data.c);
    };

    fetchNews();
    fetchStockPrice();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <Head>
        <title>Stock Market Blog</title>
      </Head>
      <h1>Latest Stock Market News</h1>

      <div style={{ background: "#f9f9f9", padding: "10px", borderRadius: "10px", marginBottom: "20px" }}>
        <h2>RELIANCE (NSE)</h2>
        <p>Current Price: ₹{price ? price.toFixed(2) : "Loading..."}</p>
      </div>

      {articles.length === 0 && <p>Loading news...</p>}
      {articles.map((article, index) => (
        <div key={index} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
      }
