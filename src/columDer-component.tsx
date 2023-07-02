import { useEffect, useState } from "react";
import "../dist/tailwind.css";
import "../styles.css";

const Root = (props) => {
  const [names, setNames] = useState([]);
  const [filter, setFilter] = useState("all");
  const [news, setNews] = useState([]);
  // console.log("filter:", filter);

  useEffect(() => {
    const uniqueNames = getUniqueNames(props.myPropsNews);
    setNames(uniqueNames);
  }, []);

  const getUniqueNames = (namesArray) => {
    const bank = [];
    for (let i = 0; i < namesArray.length; i++) {
      if (bank.includes(namesArray[i].userName)) {
        continue;
      } else {
        bank.push(namesArray[i].userName);
      }
    }
    return bank;
  };

  useEffect(() => {
    const noticias = getNews(props.myPropsNews);
    setNews(noticias);
  }, [filter]);

  // console.log(news);
  const toggleText = (index) => {
    setNews((prevNews) =>
      prevNews.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            expanded: !item.expanded,
          };
        }
        return item;
      })
    );
  };

  const getNews = (arrayNews) => {
    const bank = [];
    if (filter === "all") {
      return arrayNews;
    } else {
      for (let i = 0; i < arrayNews.length; i++) {
        if (arrayNews[i].userName === filter) {
          bank.push(arrayNews[i]);
        } else {
          continue;
        }
      }
      return bank;
    }
  };

  const changeNews = (e) => {
    setFilter(e.target.value);
  };
  const truncateText = (text) => {
    const words = text.split(" ");
    const halfLength = Math.ceil(30); // words.length / 2
    const truncatedWords = words.slice(0, halfLength);
    return truncatedWords.join(" ");
  };

  return (
    <div className="h-screen">
      <div className="flex bg-slate-200 h-16 overflow-x-auto p-4">
        <div className="flex justify-center items-center gap-4">
          {names.map((name, index) => (
            <button
              className="hover:bg-slate-500 hover:text-white rounded-md p-2"
              onClick={changeNews}
              value={name}
              key={index}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <div className="h-4/5">
        <div className="overflow-y-auto h-4/5">
          {news.map((newsItem, index) => (
            <div
              className={`p-2 flex flex-col gap-2 rounded-md ${
                index % 2 === 0 ? "bg-slate-400 " : "bg-slate-300"
              }`}
              key={index}
            >
              <h1 className="whitespace-pre-wrap text-center break-words">
                {newsItem.userName}
              </h1>
              {newsItem.text.includes("Noticia:") ? (
                <h1 className="whitespace-pre-wrap break-words text-xs">
                  {newsItem.expanded
                    ? newsItem.text.split("Noticia:")[1]
                    : truncateText(newsItem.text.split("Noticia:")[1])}
                  {newsItem.text.split(" ").length > 30 && (
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => toggleText(index)}
                    >
                      {newsItem.expanded ? "Ver menos" : "Ver más"}
                    </button>
                  )}
                </h1>
              ) : (
                <>
                  <h1 className="whitespace-pre-wrap break-words text-xs">
                    {newsItem.expanded
                      ? newsItem.text
                      : truncateText(newsItem.text)}
                    {newsItem.text.split(" ").length > 10 && (
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => toggleText(index)}
                      >
                        {newsItem.expanded ? "Ver menos" : "Ver más"}
                      </button>
                    )}
                  </h1>
                </>
              )}
              {newsItem.expanded ? (
                <>
                  {newsItem.urlImage ? (
                    <img
                      className="rounded-sm"
                      src={newsItem.urlImage}
                      alt={newsItem.userName}
                    />
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Root;
