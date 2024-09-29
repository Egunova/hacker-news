import {useEffect, useState} from "react";
import {get} from "../../api/api";
import {NewsItem} from "../../components/NewsItem/NewsItem";
import styles from './NewsListPage.module.css'

export function NewsListPage() {
    const [news, setNews] = useState([])
    const [count, setCount] = useState(0)

    const getNewsList = async () => {
        const ids = await get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$priority"&limitToFirst=10')

        const newsList = await Promise.all(ids.map((id) => get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)))
        setNews(newsList)
    }

    useEffect(() => {
        getNewsList()
    }, []);

    return (<>
        <div>Количество новостей: {news.length}</div>
        <button onClick={() => setCount(count + 1)}>{count}</button>


        {news.map(item => {
            return <NewsItem
                className={styles.newsItem}
                key={item.id}
                id={item.id}
                title={item.title}
                username={item.by}
                date={item.time}
                score={item.score}
            />
        })}
    </>);
}

