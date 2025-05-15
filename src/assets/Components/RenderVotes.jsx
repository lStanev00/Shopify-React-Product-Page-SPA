import { useContext, useEffect, useState } from "react";
import { ContextVariables } from "../context-variables/ContextVariables";
import Style from "../Styles/ReviewsMain.module.css"
import { svg } from "./svgs";

export function RenderVotes(review) {
    const {url, visitorId} = useContext(ContextVariables);
    const [vote, setVote] = useState(undefined);
    const [dinamicReview, setReview] = useState(review.review);
    
    useEffect(() => {
        const exist = dinamicReview.votes?.[visitorId];
        if(exist) setVote(exist);

    }, [dinamicReview])

    const voteHandler = async (e, type) => {
        console.log(type)
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
                    <svg.Liked />
                </div>
                <div onClick={async (e)=> await voteHandler(e, `dislike`)} className={Style.dieslikes}>
                    <svg.Dislike />
                </div>
            </>
        );
    }

    if (vote === "dislike") {
        return (
            <>
                <div onClick={async (e)=> await voteHandler(e, `like`)} className={Style.likes}>
                    <svg.Like />
                </div>
                <div onClick={async (e)=> await voteHandler(e, `dislike`)} className={Style.dieslikes}>
                    <svg.Disliked />
                </div>
            </>
        );
    }

    return (
        <>
            <div onClick={async (e)=> await voteHandler(e, `like`)} className={Style.likes}>
                <svg.Like />
            </div>
            <div onClick={async (e)=> await voteHandler(e, `dislike`)} className={Style.dieslikes}>
                <svg.Dislike />
            </div>
        </>
    );
}
