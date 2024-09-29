import styles from './Comments.module.css'
import {copy, unixToDate} from "../../utils/utils";
import {useState} from "react";

export function CommentsWrapper({comments}) {
    const [openedComments, setOpenedComments] = useState({})

    return (
        <div className={styles.container}>
            <Comments comments={comments} openedComments={openedComments} onExpandComments={setOpenedComments}/>
        </div>
    )
}

function Comments({comments, openedComments, onExpandComments}) {
    function expandComment(commentId) {
        const copyOpenedComments = copy(openedComments)
        if (copyOpenedComments[commentId]) {
            delete copyOpenedComments[commentId]

        } else {
            copyOpenedComments[commentId] = {}
        }
        onExpandComments(copyOpenedComments)
    }

    function expandSubComments(commentId, subComments) {
        const copyOpenedComments = copy(openedComments)
        copyOpenedComments[commentId] = subComments
        onExpandComments(copyOpenedComments)
    }

    return (
        <>
            {comments.map((commentItem) => (
                <div key={commentItem.id} className={styles.commentContainer}>
                    <div className={styles.commentUsername}>{commentItem.by}</div>
                    <div className={styles.commentText}>{commentItem.text}</div>
                    <div className={styles.commentBottom}>
                        <div className={styles.commentTime}>{unixToDate(commentItem.time)}</div>
                        {commentItem?.kids?.length
                            && (<button onClick={() => expandComment(commentItem.id)}
                                        className={styles.commentReplyButton}>Ответы</button>)}
                    </div>

                    {commentItem?.kids?.length && openedComments[commentItem.id] &&
                        <div className={styles.commentSubComment}>
                            <Comments comments={commentItem.kids}
                                      openedComments={openedComments[commentItem.id]}
                                      onExpandComments={(a) => expandSubComments(commentItem.id, a)}/>
                        </div>}

                </div>

            ))}
        </>
    )
}