import { useContext } from "react";
import { ContextVariables } from "../context-variables/ContextVariables";

export function RenderVotes(review) {
    const {url, visitorId} = useContext(ContextVariables);
    const exist = review.votes[visitorId];

    const voteHandler = (e) => {
        
    }


    if (exist === "like") {
        return (
            <>
                <div className={Style.likes}>
                    <svg.Liked />
                </div>
                <div className={Style.dieslikes}>
                    <svg.Dislike />
                </div>
            </>
        );
    }

    if (exist === "dislike") {
        return (
            <>
                <div className={Style.likes}>
                    <svg.Like />
                </div>
                <div className={Style.dieslikes}>
                    <svg.Disliked />
                </div>
            </>
        );
    }

    return (
        <>
            <div className={Style.likes}>
                <svg.Like />
            </div>
            <div className={Style.dieslikes}>
                <svg.Dislike />
            </div>
        </>
    );
}
