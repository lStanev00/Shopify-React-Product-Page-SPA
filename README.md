# Shopify Product Review Widget (Frontend)

This project is a React-based review widget for Shopify product pages.

## How to run

Pull the repository then `npm install` you can run on success `npm run dev` then you have to use the required path to use the widged

a valid path is `/products/belgian-hazelnut-cookie`

where `/product/` is replaced and the next `belgian-hazelnut-cookie` is the slug-name form the store api. If you want to run it local (manual)
you have to get familliar with the items in the database you can just instead open the live shiped/uploaded version at: 

 - https://lachezar-stanev.myshopify.com/collections/all
  
just pick item and the app will execute on the next route


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
- **FingerprintJS** (for anonymous session handling)
- **Express Backend** (external — see [backend repo](https://github.com/lStanev00/Shopify-REST-Api-Demo))

