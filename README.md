# Shopify Product Review Widget (Frontend)

This project is a React-based review widget for Shopify product pages.

## Features

- **Dynamic Product Page**  
  Fetches product data (title, image, price, description) from the Shopify Storefront API using the product handle.

- **Review Widget**  
  A fully interactive UI to:
  - Submit a review (name, email, rating, title, content, photo)
  - View existing reviews with pagination (10 per page)
  - Filter by star rating
  - Sort by:
    - Highest Rating (default)
    - Lowest Rating
    - Only Pictures
    - Most Helpful (most liked)
  - Like or dislike a review
  - See average product rating

- **No authentication** required  
  Likes/dislikes are stored per session using FingerprintJS or localStorage fallback.

##  Tech Stack

- **React**
- **Vite** 
<!-- - **Tailwind CSS** (for styling)
- **Axios** (for API communication)
- **FingerprintJS** (for anonymous session handling) -->
- **Express Backend** (external — see [backend repo](https://github.com/lStanev00/Shopify-REST-Api-Demo))

