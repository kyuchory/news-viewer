import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import styled from "styled-components";
import axios from "axios";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //async사용하는 함수 따로 선언 해야함.
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const query = category === "all" ? "" : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=104dbe486fc84c36a137c9809232de01`
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [category]);

  if (isLoading) {
    return <NewsListBlock> 뉴스가 로딩중 입니다. </NewsListBlock>;
  }
  //아직 articles 값이 설정 x
  if (!articles) {
    return null;
  }

  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article}></NewsItem>
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
