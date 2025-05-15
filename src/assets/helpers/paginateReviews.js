export function paginateReviews(reviewsArray) {
    if (!Array.isArray(reviewsArray) || reviewsArray.length < 11) return [reviewsArray];

    const result = [];
    const desiredPageLength = 10;
    const total = reviewsArray.length;
    const iterations = Math.ceil(total / desiredPageLength);

    for (let i = 0; i < iterations; i++) {
        let start = i * desiredPageLength;
        let end = start + desiredPageLength;
        let page = reviewsArray.slice(start, end);
        result.push(page);
    }

    return result;
}
