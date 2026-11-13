# Yan’s Pizza Co. – Pizza Menu

A pizza menu website I built with React for C304 Cloud Application Development.

Live site: [your Vercel link]

## What it does

Shows the full pizza menu with a photo, name, ingredients and price for each pizza

Checks the current time and shows whether the shop is open (10am – 10pm)
When open: shows the tagline, “We’re currently open” and an Order button

When closed: hides the tagline and shows “Sorry, we’re closed”

Search bar to find pizzas by name or ingredient (e.g. type “mush” to find the mushroom pizza)

Favourites: tap the heart on a pizza to save it, then use the Favourites button to only show those

Works on phones as well as laptops

## How I built it

I split the page into small components so each part has its own job:

App
├── Header
├── Menu
│   ├── MenuControls (search + favourites button)
│   └── Pizza (one for each pizza)
└── Footer
    └── Order (only shown when open)
The React things I used:

Components and props – one Pizza component is reused for every pizza, and the data is passed in as a prop

Array of data + .map() – all the pizzas are stored in one array, and .map() turns each one into a Pizza component (with key)

Conditional rendering – ternary (? :) for open/closed, and &amp;&amp; for the tagline

Passing data down – App works out if the shop is open once, then passes isOpen to both Menu and Footer

useState – for the search text, the list of favourites, and the favourites-only filter

Controlled input – the search box’s value comes from state

Passing functions as props – the heart button gets an onToggleFavourite function from Menu

.filter() – to only show pizzas that match the search or are in favourites

I also used semantic tags (header, main, section, footer, ul/li) and added labels for screen readers.

## Styling

All styling is in index.css (no CSS libraries)

I went with a tomato red, basil green and cream colour scheme, like the colours of a Margherita pizza

The colours are saved as CSS variables at the top of the file, so I can change the theme in one place

Font is Roboto Mono from Google Fonts, to give it a simple menu-board look

Pizzas are in a two-column grid, with name, ingredients and price side by side

Small touches: rounded corners, cards lift a bit when you hover, and rounded buttons

Media queries switch to one column on tablets and stack the details on phones

## Running it locally

npm install
npm start
Then open http://localhost:3000

## Hosting

Hosted on Vercel, connected to this GitHub repo, so every push updates the live site.

