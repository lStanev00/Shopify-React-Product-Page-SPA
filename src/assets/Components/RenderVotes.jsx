import { useContext, useEffect, useState } from "react";
import { ContextVariables } from "../context-variables/ContextVariables";
import Style from "../Styles/ReviewsMain.module.css"
import { svg } from "./svgs";

export function RenderVotes(review) {
    const {url, visitorId} = useContext(ContextVariables);
    const [vote, setVote] = useState(undefined);
    const [dinamicReview, setReview] = useState(review.review);
    const [votes, setVotes] = useState(countVotes(dinamicReview.votes))
    
    useEffect(() => {
        const exist = dinamicReview.votes?.[visitorId];
        if(exist) {
            setVote(exist);
            setVotes(countVotes(dinamicReview.votes))
        }

    }, [dinamicReview])

    const voteHandler = async (e, type) => {
        const endpoint = url + `/reviews/${dinamicReview._id}/react`;
        
        const res = await fetch(endpoint, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-visitor-id": visitorId,
            },
            body: JSON.stringify({
                type: type
            })
        })

        if (res.status == 200){
            const newData = await res.json();

            if(newData) {
                setReview(newData);
                setVote(type)
            }
        }


    }

    if (vote === "like") {
        return (
            <>
                <div onClick={async (e)=> await voteHandler(e, `like`)} className={Style.likes}>
                    <svg.Liked /> {votes.likes}
                </div>
                <div onClick={async (e)=> await voteHandler(e, `dislike`)} className={Style.dieslikes}>
                    <svg.Dislike /> {votes.dislikes}
                </div>
            </>
        );
    }

    if (vote === "dislike") {
        return (
            <>
                <div onClick={async (e)=> await voteHandler(e, `like`)} className={Style.likes}>
                    <svg.Like /> {votes.likes}
                </div>
                <div onClick={async (e)=> await voteHandler(e, `dislike`)} className={Style.dieslikes}>
                    <svg.Disliked /> {votes.dislikes}
                </div>
            </>
        );
    }

    return (
        <>
            <div onClick={async (e)=> await voteHandler(e, `like`)} className={Style.likes}>
                <svg.Like /> {votes.likes}
            </div>
            <div onClick={async (e)=> await voteHandler(e, `dislike`)} className={Style.dieslikes}>
                <svg.Dislike /> {votes.dislikes}
            </div>
        </>
    );
}

function countVotes(votes) {
    console.log(votes)
    let likes = 0;
    let dislikes = 0;

    if (votes instanceof Map) {
        for (const vote of votes.values()) {
            if (vote === "like") likes++;
            else if (vote === "dislike") dislikes++;
        }
    } else if (typeof votes === "object") {
        for (const vote of Object.values(votes)) {
            if (vote === "like") likes++;
            else if (vote === "dislike") dislikes++;
        }
    }

    return { likes, dislikes };
}
