## WELCOME TO ( সহজ সরল সিম্পল ) ASSIGNMENT (SwiftCart E-Commerce)

## Repository: Create your own public repository and submit the link.

---

## 🛍️ API Endpoints

---

1. Get 🛍️ All Products

```bash
https://fakestoreapi.com/products
```

2. Get 🛍️ All Categories

```bash
https://fakestoreapi.com/products/categories
```

3. Get 🛍️ Products by Category

```bash
https://fakestoreapi.com/products/category/${category}
```

Example:

```bash
https://fakestoreapi.com/products/category/jewelery
```

4. Get 🛍️ Single Product Detail

```bash
https://fakestoreapi.com/products/${id}
```

Example:

```bash
https://fakestoreapi.com/products/1
```

---

## 🎯 Project Specifications (UI/UX)

#### 1) Navbar

- Website **logo/name** ("SwiftCart") on the **left**
- **Menu items** (Home, Products, About, Contact) in the **center**
- **Cart Icon/Button** on the **right** (showing item count is a bonus)

#### 2) Banner / Hero Section

- A **background image** (related to shopping/fashion/electronics)
- A **title** (e.g., "Best Collection For You") and **subtitle**
- A **centered button** (e.g., "Shop Now")

#### 3) Features / Why Choose Us

- **Section heading**
- **3-4 items** highlighting features like "Fast Delivery", "24/7 Support", "Secure Payment", etc. (Icon + Title + Short Text)

#### 4) Trending / Top Rated Section

- Show **3 top-rated products** (you can filter by rating or just pick the first 3) based on API data or hardcoded for layout practice.

#### 5) Newsletter & Footer

- **Newsletter Subscription Form**: Email input + Subscribe button.
- **Footer** with copyright info, social links, and quick links.

#### 6) Responsiveness

- Website must be **mobile responsive**

---

#### 7) Create a README file to answer the following questions-

> **⚠️ Warning:** Do not use any AI tools to answer these questions. You must write the answers in **Bangla**.

#### 1) What is the difference between `null` and `undefined`?

**উত্তর:**
`null` এবং `undefined` দুটি আলাদা ডাটা টাইপ।

- **`undefined`** মানে হলো একটি ভেরিয়েবল ডিক্লেয়ার করা হয়েছে কিন্তু তাতে কোনো মান assign করা হয়নি। JavaScript নিজে থেকে এটি set করে। যেমন:

```javascript
let x;
console.log(x); // undefined
```

- **`null`** হলো একটি intentional খালি বা no value বোঝানোর জন্য ব্যবহৃত হয়। ডেভেলপার নিজে এটি set করে যখন একটি ভেরিয়েবলে কোনো object বা value নেই তা বোঝাতে চায়। যেমন:

```javascript
let y = null;
console.log(y); // null
```

সংক্ষেপে: `undefined` system generated এবং `null` user/developer assigned।

#### 2) What is the use of the `map()` function in JavaScript? How is it different from `forEach()`?

**উত্তর:**
`map()` ফাংশন একটি array এর প্রতিটি element এর উপর একটি function apply করে এবং নতুন একটি array return করে। Original array পরিবর্তন হয় না।

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8]
```

**Difference from `forEach()`:**

- `map()` একটি **নতুন array return** করে কিন্তু `forEach()` কিছু return করে না (undefined return করে)।
- `map()` ব্যবহার করা হয় যখন array transform করতে হয়, আর `forEach()` শুধু iteration এর জন্য।
- `forEach()` শুধু side effects এর জন্য ব্যবহার হয় (console.log, DOM manipulation ইত্যাদি)।

```javascript
numbers.forEach((num) => console.log(num)); // শুধু print করবে, নতুন array তৈরি করবে না
```

#### 3) What is the difference between `==` and `===`?

**উত্তর:**

- **`==` (Loose Equality):** এটি শুধু **value** check করে, data type check করে না। প্রয়োজনে type conversion করে compare করে।

```javascript
5 == "5"; // true (string কে number এ convert করে compare করে)
0 == false; // true
null == undefined; // true
```

- **`===` (Strict Equality):** এটি **value এবং data type** উভয়ই check করে। কোনো type conversion হয় না।

```javascript
5 === "5"; // false (একটি number, অন্যটি string)
0 === false; // false
null === undefined; // false
```

**Best Practice:** সবসময় `===` ব্যবহার করা উচিত কারণ এটি bugs কম হওয়ার সম্ভাবনা থাকে।

#### 4) What is the significance of `async`/`await` in fetching API data?

**উত্তর:**
`async/await` হলো JavaScript এ asynchronous code লেখার একটি আধুনিক এবং সহজ উপায়। এটি Promise-based code কে synchronous code এর মতো readable করে তোলে।

**Significance:**

1. **Readability:** Code পড়তে এবং বুঝতে সহজ হয়, callback hell এড়ানো যায়।
2. **Error Handling:** `try-catch` block দিয়ে error handle করা সহজ।
3. **Sequential Execution:** একের পর এক API call করা সহজ হয়।

```javascript
// async/await দিয়ে API fetch
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

**`async`** keyword একটি function কে asynchronous করে এবং সেটি সবসময় Promise return করে। **`await`** keyword Promise resolve হওয়া পর্যন্ত wait করে।

#### 5) Explain the concept of Scope in JavaScript (Global, Function, Block).

**উত্তর:**
Scope নির্ধারণ করে কোন variable কোথায় accessible হবে। JavaScript এ তিন ধরনের scope আছে:

**1. Global Scope:**

- যে variable function বা block এর বাইরে declare করা হয়, সেটি global scope এ থাকে।
- এটি পুরো program এ যেকোনো জায়গা থেকে access করা যায়।

```javascript
let globalVar = "I am global";

function test() {
  console.log(globalVar); // accessible
}
```

**2. Function Scope:**

- Function এর ভিতরে declare করা variable শুধু সেই function এর ভিতরেই accessible।
- `var`, `let`, `const` সবাই function scope follow করে।

```javascript
function myFunction() {
  var functionVar = "I am in function";
  console.log(functionVar); // accessible
}
console.log(functionVar); // Error: not accessible
```

**3. Block Scope:**

- `{}` curly braces এর ভিতরে `let` বা `const` দিয়ে declare করা variable শুধু সেই block এর ভিতরেই accessible।
- `var` block scope follow করে না, function scope follow করে।

```javascript
if (true) {
  let blockVar = "I am in block";
  const blockConst = "Me too";
  var notBlockScoped = "I am not block scoped";
  console.log(blockVar); // accessible
}
console.log(blockVar); // Error: not accessible
console.log(notBlockScoped); // accessible (কারণ var block scope follow করে না)
```

**সংক্ষেপ:** Global scope = সর্বত্র accessible, Function scope = function এর ভিতরে, Block scope = {} এর ভিতরে (শুধু let/const)।

---

## ⚡ Dynamic Features & Functionalities

1. Category Loading
   Load Product Categories dynamically on the UI (e.g., as filter buttons or a dropdown).
2. Category Click → Product Data
   On clicking a category: load products of that specific category.
   Display in a grid layout (e.g., 3 or 4 columns).
3. Card Contents
   Each product card must include:

- **Image** (from API)
- **Title** (truncated if too long)
- **Price** ($ value)
- **Category** (badge or text)
- **Rating** (Visualize stars or just show the number)
- **Details Button**
- **Add to Cart button**

4. Modal on "Details" Click
   Clicking the "Details" button on a card opens a modal with full product details:

- Full Title
- Full Description
- Price & Rating
- "Buy Now" or "Add to Cart" button in modal.

## 🧪 Challenges (Optional)

    1) Add to Cart Interaction
    Clicking "Add to Cart":
    - Adds the product to a Cart list/array.
    - Updates a Cart Count in the Navbar.
    - (Optional) Persist in LocalStorage.

    2) Cart Calculation
    Show a summary (maybe in a sidebar or a separate section/modal) that lists added items and calculates the**Total Price**.

    3) Remove from Cart
    Ability to remove an item from the cart and update the Total Price instantly.

    4) Loading Spinner
    Show a loading spinner or skeleton loader while fetching data from the API.

    5) Active State
    Highlight the currently selected category button.

🧰 Technology Stack:
HTML
CSS (Vanilla / Tailwind / DaisyUI)
JavaScript (Vanilla only, no frameworks like React/Vue for this assignment)

📌 Rules
✅ At least 5 meaningful commits
❌ No dummy text where real data can be shown.

## 🔗 Submission

- **Live Link:** [Add your deployed URL here (Netlify/Vercel/GitHub Pages)]
- **GitHub Repository:** [Add your repository URL here]

---

## ✅ Implemented Features

### Core Features (100% Complete):

- ✅ Responsive Navbar with logo, menu items, and cart icon with count
- ✅ Hero/Banner section with background image, title, subtitle, and CTA button
- ✅ Why Choose Us section with 4 feature cards (icons + text)
- ✅ Trending products section with 3 products
- ✅ Complete footer with newsletter subscription and social links
- ✅ Fully responsive design for all screen sizes

### Dynamic Features (100% Complete):

- ✅ Category loading from API
- ✅ Category filtering (click to filter products)
- ✅ Product cards with image, title, price, category, rating
- ✅ Details button with modal popup
- ✅ Add to Cart functionality
- ✅ Cart count updates in navbar
- ✅ LocalStorage persistence

### Challenge Features (100% Complete):

- ✅ Add to Cart with localStorage persistence
- ✅ Cart page with full summary and total calculation
- ✅ Remove from cart functionality
- ✅ Increase/decrease quantity in cart
- ✅ Loading spinner while fetching products
- ✅ Active state highlighting for category buttons
- ✅ Tax calculation (10%)
- ✅ Dynamic subtotal, tax, and total display

### Additional Features:

- ✅ Smooth animations and transitions
- ✅ Modal for product details
- ✅ Cart icon links to dedicated cart page
- ✅ Back to products navigation
- ✅ Empty cart state with message
- ✅ Product image hover effects

---

## 📁 Project Structure

```
assignment1/
├── index.html          # Home page
├── products.html       # Products listing page
├── product.html        # Single product detail page
├── cart.html           # Shopping cart page
├── index.js            # Main JavaScript file
├── style.css           # Custom styles
├── README.md           # Project documentation
└── images/             # Image assets
```

---

## 🚀 How to Run Locally

1. Clone the repository
2. Open `index.html` in your browser
3. Or use a local server:

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```

4. Navigate to `http://localhost:8000`

---

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styles and animations
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - No frameworks
- **Lucide Icons** - Icon library
- **Fake Store API** - Product data

---

### 📅 Deadline For 60 marks: 17th February, 2026 (11:59 pm ⏱️)

- Note: There won't be any 50 or 30 marks submission deadline. Only 60 marks submission deadline. After 17th February, 2026 (11:59 pm ⏱️) no submission will be accepted.
