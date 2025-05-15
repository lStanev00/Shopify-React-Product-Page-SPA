import { paginateReviews } from "./paginateReviews.js";

export function sortOneToFive(array) {

  array = array.sort((a, b) => a.rating - b.rating);
  array = paginateReviews(array);
  return array;
}

export function filterHaveMedia(array) {
  try {
    array = (array || []).filter((entry) => entry?.media?.length > 0);

    if (array.length > 0){
  
      array = paginateReviews(array);
    }
  
  
    return array;
    
  } catch (error) {
    console.warn(error)
    return[[]]
  }
}

export function fiterUsefullReviews(array) {
    const score = { like: 1, dislike: -1 };

    array = array.sort((a, b) => {
        const aVotes = Object.values(a.votes || {});
        const bVotes = Object.values(b.votes || {});

        const aScore = aVotes.reduce((sum, v) => sum + (score[v] || 0), 0);
        const bScore = bVotes.reduce((sum, v) => sum + (score[v] || 0), 0);

        return bScore - aScore;
    });

    return paginateReviews(array);
}
