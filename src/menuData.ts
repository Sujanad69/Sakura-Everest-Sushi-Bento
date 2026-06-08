/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  n: string;
  p: string;
  d: string;
  image?: string;
  isChefPick?: boolean;
}

export const MENU_DATA: Record<string, MenuItem[]> = {
  highlights: [
    { n: "Menu Sakura Combo Sushi", p: "£15.99", d: "Shrimp maki roll and katsu chicken roll.", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80", isChefPick: true },
    { n: "Vegetarian Sushi Platter", p: "£36.99", d: "Various vegie sushi rolls, inari pocket and nigiri served with wasabi, ginger and soya sauce.", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80" },
    { n: "Katsu Chicken Poke Bowl", p: "£9.99", d: "Rice, salmon, edamame, ginger, katsu chicken, tamago, wakame.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80", isChefPick: true },
    { n: "Dragon Roll", p: "£7.99", d: "Tempura shrimp, cucumber, topped with avocado and unagi sauce.", image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=800&q=80" }
  ],
  starters: [
    { n: "Miso Soup", p: "£4.99", d: "Dry wakame, tofu, spring onion." },
    { n: "Vegetable Gyozas (6pcs)", p: "£6.99", d: "Dumplings with mix vegetables." },
    { n: "Chicken Gyozas (6pcs)", p: "£6.99", d: "Dumplings with chicken and mix vegetables." },
    { n: "Ebi (Shrimp) Fried (6pcs)", p: "£6.99", d: "Crispy deep-fried shimps." },
    { n: "Crepes (Spring Rolls) (6pcs)", p: "£5.99", d: "Deep fried, filled with mixed vegetables." },
    { n: "Edamame", p: "£4.99", d: "Boiled edamame beans." },
    { n: "Wakame Salad", p: "£4.99", d: "Wakame with sesame seeds." }
  ],
  uramaki: [
    { n: "Duck Roll (8pcs)", p: "£7.99", d: "Nori, sushi rice, roasted duck, cucumber, mayonnaise with hoisin sauce and spring onion, served with wasabi, ginger and soya sauce." },
    { n: "Teriyaki Chicken Roll (8pcs)", p: "£7.99", d: "Nori, sushi rice, teriyaki chicken, cucumber topping with mayonnaise and fried onion." },
    { n: "Tamago (8pcs)", p: "£7.99", d: "Nori, sushi rice, tamago, avocado, philadelphia cheese, topping with sesame seeds." },
    { n: "Teriyaki Salmon (8pcs)", p: "£7.99", d: "Nori, sushi rice, cooked salmon with teriyaki sauce, cucumber topping with mayonnaise and fried onion, served with wasabi, ginger and soya sauce." },
    { n: "Skin Maki (8pcs)", p: "£8.99", d: "Nori, sushi rice, fried salmon skin, cucumber, mayonnaise, topping with sesame seeds and teriyaki sauce, served with wasabi, ginger and soya sauce." },
    { n: "Shrimp Tempura Roll (8pcs)", p: "£7.99", d: "Nori, sushi rice, fried shrimp, avocado, topping with kimchi mayonnaise and sesame seeds, served with wasabi, ginger and soya sauce." },
    { n: "Veggie Uramaki (8pcs)", p: "£7.99", d: "Nori, sushi rice, cucumber, carrot, tawkan and avocado topping with sesame seeds, served with wasabi, ginger and soya sauce." },
    { n: "Spicy Tuna Roll", p: "£7.99", d: "Spicy tuna with cucumber and spicy mayo." },
    { n: "Salmon Lover Roll", p: "£7.99", d: "Fresh salmon and avocado roll." },
    { n: "California Maki", p: "£7.99", d: "Crabstick, avocado, cucumber and sesame seeds." },
    { n: "Dragon Roll", p: "£7.99", d: "Tempura shrimp topped with avocado." }
  ],
  hosomaki: [
    { n: "Crabstick Hosomaki (8pcs)", p: "£5.99", d: "Nori, sushi rice and crabstick, served with wasabi, ginger and soya sauce." },
    { n: "Avocado Hosomaki (8pcs)", p: "£5.99", d: "Nori, sushi rice and avocado, served with wasabi, ginger and soya sauce." },
    { n: "Cucumber Hosomaki (8pcs)", p: "£5.99", d: "Nori, sushi rice and cucumber, served with wasabi, ginger and soya sauce." },
    { n: "Carrot Hosomaki (8pcs)", p: "£5.99", d: "Nori, sushi rice and carrot, served with wasabi, ginger and soya sauce." },
    { n: "Salmon Hosomaki (8 pcs)", p: "£5.99", d: "Fresh salmon in a thin roll." },
    { n: "Tuna Hosomaki (8 pcs)", p: "£5.99", d: "Fresh tuna in a thin roll." }
  ],
  futomaki: [
    { n: "Katsu Chicken Futomaki (10pcs)", p: "£8.99", d: "Nori, sushi rice, katsu chicken, mix salad topping with sweet chilli sauce served with wasabi, ginger and soya sauce." },
    { n: "Prawn Futomaki (10pcs)", p: "£9.99", d: "Nori, sushi rice, fried shrimp, cucumber, mayonnaise topping with kimchi mayonnaise served with wasabi, ginger and soya sauce." },
    { n: "Veg Futomaki (10pcs)", p: "£8.99", d: "Nori, suchi rice, cucumber, carrot, radish (tawkan), mix salad, topping with sweet chilli sauce and sesame seeds served with wasabi, ginger and soya sauce." },
    { n: "Salmon Avocado Futomaki", p: "£8.99", d: "Large roll with salmon and avocado." }
  ],
  inari: [
    { n: "Inari Pocket (4pcs)", p: "£5.99", d: "Deep fried tofu inside filled with suchi rice, teriyaki sauce." }
  ],
  nigiri: [
    { n: "Nigiri Ebi (Shrimp) (6 Pcs)", p: "£7.99", d: "Sushi rice topped with shrimp, served with wasabi, ginger and soya sauce." },
    { n: "Vegetable Nigiri (6pcs)", p: "£7.99", d: "Sushi rice topped with avocado, wakame, fried tofu served with wasabi, ginger and soya sauce." }
  ],
  combo: [
    { n: "Menu Sakura Combo Sushi", p: "£15.99", d: "Shrimp maki roll and katsu chicken roll." },
    { n: "Grilled Lover Special", p: "£14.99", d: "A selection of our best grilled sushi favorites." }
  ],
  platters: [
    { n: "Vegetarian Sushi Platter (40pcs)", p: "£36.99", d: "Various vegie sushi rolls, inari pocket and nigiri served with wasabi, ginger and soya sauce." }
  ],
  temaki: [
    { n: "Vegetables Temaki", p: "£7.99", d: "Hand rolled cone of seaweed with avocado, carrot, cucumber, mix salad, sesame seeds, served with wasabi, ginger and soya sauce." }
  ],
  poke: [
    { n: "Katsu Chicken Poke Bowl", p: "£9.99", d: "Rice, salmon, edamame, ginger, katsu chicken, tamago, wakame." },
    { n: "Salmon Poke Bowl", p: "£9.99", d: "Rice, fresh salmon, edamame, ginger, tamago, wakame." }
  ],
  curry: [
    { n: "Japanese Chicken Curry", p: "£7.99", d: "Specially tempered teriyaki chicken, rice, sesame seeds and toppings." },
    { n: "Katsu Chicken Curry", p: "£7.99", d: "Deep fried katsu chicken, Japanese curry, rice, sesame seeds and toppings." },
    { n: "Prawn Curry", p: "£8.99", d: "Deep fried prawn, Japanese curry, rice, sesame seeds and toppings." },
    { n: "Grilled Salmon Curry", p: "£8.99", d: "Grilled salmon in teriyaki sauce, broth, rice, sesame seeds and toppings." },
    { n: "Japanese Mix Curry", p: "£8.99", d: "Japanese curry with mix options, rice sesame seeds and toppings." },
    { n: "Vegetable Curry (Pumpkin Katsu)", p: "£7.99", d: "Deep fried pumpkin katsu Japanese curry, rice, sesame seeds and toppings." },
    { n: "Teriyaki Chicken Curry", p: "£7.99", d: "Chicken thigh with teriyaki sauce and Japanese curry." }
  ],
  ramen: [
    { n: "Grilled Chicken Ramen", p: "£7.99", d: "Specially tempered chicken thigh with thin teriyaki sauce, chicken broth, wakame, bamboo shoot, edamame, boiled egg." },
    { n: "Spicy Chicken Ramen", p: "£7.99", d: "Specially marinated chicken breast with herbs, broth, wakame, bamboo shoot, edamame, boiled egg." },
    { n: "Katsu Chicken Ramen", p: "£7.99", d: "Specially deep-fried chicken breast with herbs, broth, wakame, bamboo shoot, edamame, boiled egg." },
    { n: "Prawn Ramen", p: "£8.99", d: "Deep fried battered prawn, broth, wakame, spinach, edamame, boiled egg." },
    { n: "Grilled Salmon Ramen", p: "£8.99", d: "Specially marinated salmon with thin teriyaki, miso broth, wakame, bamboo shoot, boiled egg." },
    { n: "Vegetable Ramen", p: "£7.99", d: "Specially prepared, miso broth, wakame, edamame, bamboo shoot." }
  ],
  desserts: [
    { n: "Mochi", p: "£2.99", d: "Japanese rice cake with delicious sweet filling." },
    { n: "Dorayaki Green Tea, Strawberry and Chocolate", p: "£2.99", d: "Japanese pancake sandwich with sweet fillings." }
  ],
  sauces: [
    { n: "Teriyaki", p: "£0.60", d: "" },
    { n: "Spicy Mayo", p: "£0.60", d: "" },
    { n: "Kimchi Mayo", p: "£0.60", d: "" },
    { n: "Ketchup", p: "£0.60", d: "" },
    { n: "Sweet Chilli Sauce", p: "£0.60", d: "" },
    { n: "Ginger", p: "£0.60", d: "" },
    { n: "Wasabi", p: "£0.60", d: "" },
    { n: "Fried Onion", p: "£0.60", d: "" },
    { n: "Soya Sauce", p: "£0.60", d: "" }
  ],
  drinks: [
    { n: "Water 500ml", p: "£1.75", d: "" },
    { n: "Coca-Cola 330ml", p: "£1.99", d: "" },
    { n: "Coca-Cola Zero 330ml", p: "£1.99", d: "" },
    { n: "Fanta 330ml", p: "£1.99", d: "" },
    { n: "Aloe Vera Juice 500ml", p: "£2.50", d: "" },
    { n: "Strawberry Ramune 200ml", p: "£2.99", d: "" },
    { n: "Lychee Ramune 200ml", p: "£2.99", d: "" },
    { n: "Original Ramune 200ml", p: "£2.99", d: "" }
  ],
  deals: [
    { n: "Meal Deal 1", p: "£14.99", d: "Nigiri Salmon 6 Pcs + Uramaki Sushi Roll 8pcs + 1 drink" },
    { n: "Meal Deal 2", p: "£14.99", d: "Shrimp Tempura Roll 8 pcs + Spring Roll 6pcs + 1 drink" },
    { n: "Meal Deal 3", p: "£14.99", d: "Salmon Lover Roll 8 pcs + Hosomaki Avocado 8 pcs + 1 drink" },
    { n: "Meal Deal 4", p: "£14.99", d: "Katsu Chicken Futomaki 10 pcs + 1 Ramen + 1 Drink (Spicy)" },
    { n: "Meal Deal 5", p: "£15.99", d: "Crunchy Fried Sushi 8 pcs + Gyozas 6 pcs + Miso Soup" },
    { n: "Meal Deal 6", p: "£14.99", d: "Any 1 Choice of Japanese Curry + Any 1 Choice Of Ramen + 1 Drink" },
    { n: "Vegetarian Meal Deal", p: "£14.99", d: "Uramaki Sushi Roll 8pcs + Vegetable Gyozas 6 pcs + Miso Soup" }
  ]
};

