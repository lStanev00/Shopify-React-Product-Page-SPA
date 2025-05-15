export function paginateReviews(reviewsArray) {
    if (!reviewsArray ||reviewsArray.length < 11) return [reviewsArray]
    const result = [];
    const iterations = Math.floor(reviewsArray.length / 10);

    const desiredPageLength = 10;

    for (let i = 0; i < iterations; i++) {
        let page = reviewsArray.splice(0, desiredPageLength);
        result.push(page);
    }

    return result;
}