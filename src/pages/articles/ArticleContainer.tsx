import  { useEffect } from "react";
import { useArticleDispatch } from "../../context/articles/context";
import { fetchArticle } from "../../context/articles/actions";
import { Outlet } from "react-router-dom";

const ArticleContainer = () => {
  const articleDispatch = useArticleDispatch();
  useEffect(() => {
    fetchArticle(articleDispatch);
  }, [articleDispatch]);
  return <Outlet />;
};

export default ArticleContainer;