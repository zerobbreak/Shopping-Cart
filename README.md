# React Shopping App

This project is a simple React-based e-commerce application with two main pages: Home and Shop. The Shop page includes a shopping cart functionality. The application fetches product data from the FakeStore API, allowing users to view and interact with different products.

## Folder Structure

```
/src
|-- api
|   |--api.js
|-- components
|   |-- Navbar.jsx
|   |-- ShopFilter.jsx
|   |-- Shop.jsx
|   |-- ProductCard.jsx
|   |-- BlogPost.jsx
|   |-- FeaturedCard.jsx
|-- Pages
|   |-- About.jsx
|   |-- Blog.jsx
|   |-- Cart.jsx
|   |-- Home.jsx
|   |-- index.js
|   |-- Product.jsx
|   |-- Shop.jsx
|-- App.jsx
|-- App.css
|-- index.css
|-- main.jsx
|-- tests
|   |--setup.js

```

- **components**: Contains individual components used in the application.
- **styles**: Holds styling files for each component.

## Components

1. **Header.js**: Navigation bar component displayed on both Home and Shop pages.
2. **Home.js**: Home page component with introductory content and images.
3. **Shop.js**: Shop page component displaying product cards, shopping cart, and checkout button.
4. **ProductCard.js**: Individual card element for each product with quantity input, increment/decrement buttons, title, and "Add To Cart" button.

## Functionality

- **Navigation**: Users can navigate between the Home and Shop pages using the navigation bar.
- **Shopping Cart**: The shopping cart on the Shop page displays the number of items currently in the cart.
- **Product Cards**: Each product is displayed with a card containing an input field for quantity, increment/decrement buttons, title, and an "Add To Cart" button.
- **Fetch Data**: Product data is fetched from the FakeStore API.
- **Order Submission**: When a user submits their order, the cart's total adjusts accordingly.

## Testing

The application is thoroughly tested using the React Testing Library. Testing focuses on component functionality, user interactions, and data fetching.

## Styling

The application is styled for an aesthetically pleasing user experience. Each component has its own styling to maintain a cohesive and visually appealing design.

## Deployment

### Netlify

To deploy on Netlify, add a `_redirects` file to the `public/` directory with the following content:

```
/* /index.html 200

```

### Vercel

Add a `vercel.json` file at the root of your project with the following configuration:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

```

### Cloudflare Pages

No additional steps are required for Cloudflare Pages, as it automatically handles redirects for SPAs.

Follow the provided instructions for your chosen hosting solution to ensure proper routing for your React single-page application.