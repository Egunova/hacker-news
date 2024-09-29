import {Link, useParams} from "react-router-dom";
import {NewsItem} from "../../components/NewsItem/NewsItem";
import {get} from "../../api/api";
import {useCallback, useEffect, useState} from "react";
import {CommentsWrapper} from "../../components/Comments/CommentsWrapper";

export function CommentsPage() {
    const {id} = useParams()
    const [news, setNews] = useState();
    const [comments, setComments] = useState([]);

    const getNewsComment = useCallback(async (commentIds) => {
        return await Promise
            .all(commentIds.map(async id => {
                const comment = await get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
                if (comment?.kids) {
                    comment.kids = await getNewsComment(comment.kids)
                }
                return comment;
            }))
    }, [])
    

    const getNewsData = useCallback(async () => {
            const newsData = await get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
            setNews(newsData)
            if (newsData?.kids) {
                const commentsData = await getNewsComment(newsData.kids)
                setComments(commentsData)
            }
        }, [id, getNewsComment]
    )


    useEffect(() => {
        getNewsData()
    }, []);

    return (<div>
        <Link to={'/'}>Назад</Link>
        {news && (
            <NewsItem title={news.title}
                      username={news.by}
                      date={news.time}
                      url={news.url}
            />
        )}

        {comments && (
            <CommentsWrapper comments={comments}/>
        )}

    </div>);
}