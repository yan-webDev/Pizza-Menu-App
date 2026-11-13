import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  // Work out the shop status once, then pass it down as a prop
  const hour = new Date().getHours();
  const openHour = 10; // 10am
  const closeHour = 22; // 10pm
  const isOpen = hour >= openHour && hour < closeHour;

  return (
    <div className="container">
      <Header />
      <Menu isOpen={isOpen} />
      <Footer isOpen={isOpen} />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Yan's Pizza Co.</h1>
    </header>
  );
}

function Menu({ isOpen }) {
  // Extended features: search text, list of favourite pizza names, favourites-only filter
  const [query, setQuery] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [showFavsOnly, setShowFavsOnly] = useState(false);

  function handleToggleFavourite(name) {
    if (favourites.includes(name)) {
      setFavourites(favourites.filter((fav) => fav !== name));
    } else {
      setFavourites([...favourites, name]);
    }
  }

  // Only show pizzas that match the search (name or ingredients)
  // and, if the filter is on, only favourites
  const search = query.trim().toLowerCase();
  const shownPizzas = pizzaData.filter((pizza) => {
    const matchesSearch =
      pizza.name.toLowerCase().includes(search) ||
      pizza.ingredients.toLowerCase().includes(search);
    const matchesFavourite = !showFavsOnly || favourites.includes(pizza.name);
    return matchesSearch && matchesFavourite;
  });

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {isOpen && (
        <p className="tagline">Authentic Italian cuisine, all from our stone oven</p>
      )}

      <MenuControls
        query={query}
        onQueryChange={setQuery}
        showFavsOnly={showFavsOnly}
        onToggleFavsOnly={() => setShowFavsOnly(!showFavsOnly)}
        favouriteCount={favourites.length}
      />

      {shownPizzas.length > 0 ? (
        <ul className="pizzas">
          {shownPizzas.map((pizza) => (
            <Pizza
              pizzaObj={pizza}
              key={pizza.name}
              isFavourite={favourites.includes(pizza.name)}
              onToggleFavourite={() => handleToggleFavourite(pizza.name)}
            />
          ))}
        </ul>
      ) : (
        <p className="empty">No pizzas match. Try another search!</p>
      )}
    </main>
  );
}

function MenuControls({
  query,
  onQueryChange,
  showFavsOnly,
  onToggleFavsOnly,
  favouriteCount,
}) {
  return (
    <section className="controls">
      <label htmlFor="search" className="visually-hidden">
        Search pizzas
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search pizza or ingredient..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <button
        className={showFavsOnly ? "fav-filter active" : "fav-filter"}
        onClick={onToggleFavsOnly}
      >
        ♥ Favourites ({favouriteCount})
      </button>
    </section>
  );
}

function Pizza({ pizzaObj, isFavourite, onToggleFavourite }) {
  return (
    <li className="pizza">
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div className="pizza-info">
        <div className="pizza-name">
          <h3>{pizzaObj.name}</h3>
          <button
            className={isFavourite ? "fav-btn active" : "fav-btn"}
            onClick={onToggleFavourite}
            aria-label={
              isFavourite ? "Remove from favourites" : "Add to favourites"
            }
          >
            {isFavourite ? "♥" : "♡"}
          </button>
        </div>
        <p>{pizzaObj.ingredients}</p>
        <span className="price">{"$" + pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer({ isOpen }) {
  return (
    <footer className="footer">
      {isOpen ? <Order /> : <p>Sorry, we're closed</p>}
    </footer>
  );
}

function Order() {
  return (
    <div className="order">
      <p>We're currently open</p>
      <button className="btn">Order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);