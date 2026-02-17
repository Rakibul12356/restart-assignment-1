#### 1) What is the difference between `null` and `undefined`?

**উত্তর:**
`null` এবং `undefined` দুটি আলাদা ডাটা টাইপ।

- **`undefined`** মানে হলো একটি ভেরিয়েবল ডিক্লেয়ার করা হয়েছে কিন্তু তাতে কোনো মান assign করা হয়নি। JavaScript নিজে থেকে এটি set করে। যেমন:

let x;
console.log(x); // undefined

- **`null`** হলো একটি intentional খালি বা no value বোঝানোর জন্য ব্যবহৃত হয়। ডেভেলপার নিজে এটি set করে যখন একটি ভেরিয়েবলে কোনো object বা value নেই তা বোঝাতে চায়। যেমন:

let y = null;
console.log(y); // null

সংক্ষেপে: `undefined` system generated এবং `null` user/developer assigned।

#### 2) What is the use of the `map()` function in JavaScript? How is it different from `forEach()`?

**উত্তর:**
`map()` ফাংশন একটি array এর প্রতিটি element এর উপর একটি function apply করে এবং নতুন একটি array return করে। Original array পরিবর্তন হয় না।

const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8]

**Difference from `forEach()`:**

- `map()` একটি **নতুন array return** করে কিন্তু `forEach()` কিছু return করে না (undefined return করে)।
- `map()` ব্যবহার করা হয় যখন array transform করতে হয়, আর `forEach()` শুধু iteration এর জন্য।
- `forEach()` শুধু side effects এর জন্য ব্যবহার হয় (console.log, DOM manipulation ইত্যাদি)।

numbers.forEach((num) => console.log(num)); // শুধু print করবে, নতুন array তৈরি করবে না

#### 3) What is the difference between `==` and `===`?

**উত্তর:**

- **`==` (Loose Equality):** এটি শুধু **value** check করে, data type check করে না। প্রয়োজনে type conversion করে compare করে।

5 == "5"; // true (string কে number এ convert করে compare করে)
0 == false; // true
null == undefined; // true

5 === "5"; // false (একটি number, অন্যটি string)
0 === false; // false
null === undefined; // false

**Best Practice:** সবসময় `===` ব্যবহার করা উচিত কারণ এটি bugs কম হওয়ার সম্ভাবনা থাকে।

#### 4) What is the significance of `async`/`await` in fetching API data?

**উত্তর:**
`async/await` হলো JavaScript এ asynchronous code লেখার একটি আধুনিক এবং সহজ উপায়। এটি Promise-based code কে synchronous code এর মতো readable করে তোলে।

**Significance:**

1. **Readability:** Code পড়তে এবং বুঝতে সহজ হয়, callback hell এড়ানো যায়।
2. **Error Handling:** `try-catch` block দিয়ে error handle করা সহজ।
3. **Sequential Execution:** একের পর এক API call করা সহজ হয়।

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

**`async`** keyword একটি function কে asynchronous করে এবং সেটি সবসময় Promise return করে। **`await`** keyword Promise resolve হওয়া পর্যন্ত wait করে।

#### 5) Explain the concept of Scope in JavaScript (Global, Function, Block).

**উত্তর:**
Scope নির্ধারণ করে কোন variable কোথায় accessible হবে। JavaScript এ তিন ধরনের scope আছে:

**1. Global Scope:**

- যে variable function বা block এর বাইরে declare করা হয়, সেটি global scope এ থাকে।
- এটি পুরো program এ যেকোনো জায়গা থেকে access করা যায়।

let globalVar = "I am global";

function test() {
  console.log(globalVar); // accessible
}

**2. Function Scope:**

- Function এর ভিতরে declare করা variable শুধু সেই function এর ভিতরেই accessible।
- `var`, `let`, `const` সবাই function scope follow করে।

function myFunction() {
  var functionVar = "I am in function";
  console.log(functionVar); // accessible
}
console.log(functionVar); // Error: not accessible

**3. Block Scope:**

- `{}` curly braces এর ভিতরে `let` বা `const` দিয়ে declare করা variable শুধু সেই block এর ভিতরেই accessible।
- `var` block scope follow করে না, function scope follow করে।

if (true) {
  let blockVar = "I am in block";
  const blockConst = "Me too";
  var notBlockScoped = "I am not block scoped";
  console.log(blockVar); // accessible
}
console.log(blockVar); // Error: not accessible
console.log(notBlockScoped); // accessible (কারণ var block scope follow করে না)

---
