# TypeScript Problem Solving — 8 Problems

এই repository-তে TypeScript ব্যবহার করে সমাধান করা ৮টি programming problem রাখা হয়েছে। প্রতিটি problem-এর উদ্দেশ্য, কীভাবে সমাধান করা হয়েছে, কোন TypeScript concept ব্যবহার হয়েছে এবং উদাহরণসহ expected output নিচে ব্যাখ্যা করা হয়েছে।

> **উদ্দেশ্য:** শুধু solution লেখা নয়—কেন এবং কীভাবে solution কাজ করে, সেটিও পরিষ্কারভাবে বোঝানো।

 

## 1. Multiply Value

### Problem কী ছিল?

এমন একটি function তৈরি করতে হবে, যেটি দুটি number নেবে:

- `value`: যে সংখ্যাটিকে গুণ করা হবে।
- `multiplier`: যে সংখ্যা দিয়ে গুণ করা হবে।

শর্ত:
- `multiplier` না দিলে default হিসেবে `2` ব্যবহার করতে হবে।
- `multiplier` হিসেবে `0` দিলেও সেটি গ্রহণ করতে হবে।

### কীভাবে সমাধান করা হয়েছে?

Function-এর দ্বিতীয় parameter-এ default value `2` দেওয়া হয়েছে। ফলে caller দ্বিতীয় argument না পাঠালে TypeScript/JavaScript নিজে থেকেই `2` ব্যবহার করবে।

```typescript
function multiplyValue(
  value: number,
  multiplier: number = 2
): number {
  return value * multiplier;
}
```

### Example

```typescript
console.log(multiplyValue(10));    // 20
console.log(multiplyValue(10, 5)); // 50
console.log(multiplyValue(7, 0));  // 0
```

### এখানে কী শিখেছি?

- Number type annotation
- Default parameter
- Function return type
- `0` এবং `undefined`-এর পার্থক্য

**মনে রাখবে:** `multiplier || 2` ব্যবহার করলে `0`-কেও falsy ধরে default `2` বসে যেতে পারে। Default parameter ব্যবহার করায় এই সমস্যা হয় না।

---

## 2. Process Input

### Problem কী ছিল?

একটি function তৈরি করতে হবে, যা `string`, `number` অথবা `boolean`—এই তিন ধরনের value গ্রহণ করবে।

শর্ত:
- String হলে whitespace বাদ দিয়ে lowercase করতে হবে।
- Number হলে `10` দিয়ে গুণ করতে হবে।
- Boolean হলে `true`-এর জন্য `"Active"` এবং `false`-এর জন্য `"Inactive"` return করতে হবে।

### কীভাবে সমাধান করা হয়েছে?

Parameter-এ union type (`string | number | boolean`) ব্যবহার করা হয়েছে। এরপর `typeof` দিয়ে value-এর type পরীক্ষা করে আলাদা logic চালানো হয়েছে। এই type check করার প্রক্রিয়াকে **Type Narrowing** বলা হয়।

```typescript
function processInput(
  value: string | number | boolean
): string | number {
  if (typeof value === "string") {
    return value.trim().toLowerCase();
  }

  if (typeof value === "number") {
    return value * 10;
  }

  if (typeof value === "boolean") {
    return value ? "Active" : "Inactive";
  }

  throw new Error("Invalid input type");
}
```

### Example

```typescript
console.log(processInput("  HELLO TypeScript  ")); // "hello typescript"
console.log(processInput(5));                      // 50
console.log(processInput(true));                   // "Active"
console.log(processInput(false));                  // "Inactive"
```

### এখানে কী শিখেছি?

- Union type (`|`)
- `typeof` operator
- Type narrowing
- Conditional logic
- Different return types

---

## 3. Format Coordinate

### Problem কী ছিল?

একটি function তৈরি করতে হবে, যা তিনটি item-সহ একটি tuple গ্রহণ করবে:

1. Latitude — `number`
2. Longitude — `number`
3. Location name — `string`

Function-টি নির্দিষ্ট format-এ একটি string return করবে:

`Location: Dhaka (23.81, 90.41)`

Tuple-টি `readonly` হতে হবে, অর্থাৎ function-এর ভেতর থেকে tuple-এর item পরিবর্তন করা যাবে না।

### কীভাবে সমাধান করা হয়েছে?

`readonly [number, number, string]` দিয়ে tuple-এর length, position এবং প্রতিটি item-এর type নির্দিষ্ট করা হয়েছে। Destructuring করে তিনটি value আলাদা variable-এ নেওয়া হয়েছে এবং template literal দিয়ে output তৈরি করা হয়েছে।

```typescript
function formatCoordinate(
  coordinate: readonly [number, number, string]
): string {
  const [latitude, longitude, locationName] = coordinate;

  return `Location: ${locationName} (${latitude}, ${longitude})`;
}
```

### Example

```typescript
console.log(formatCoordinate([23.81, 90.41, "Dhaka"]));
// Location: Dhaka (23.81, 90.41)

console.log(formatCoordinate([22.35, 91.78, "Chittagong"]));
// Location: Chittagong (22.35, 91.78)
```

### এখানে কী শিখেছি?

- Tuple type
- `readonly`
- Array destructuring
- Template literals
- Function return type

---

## 4. Concatenate Arrays

### Problem কী ছিল?

একটি generic function তৈরি করতে হবে, যা একই ধরনের element থাকা একাধিক array গ্রহণ করবে এবং সব array একত্র করে একটি নতুন array return করবে।

উদাহরণ: `[1, 2]` এবং `[3, 4]` দিলে `[1, 2, 3, 4]` return করতে হবে।

### কীভাবে সমাধান করা হয়েছে?

- `<T>` দিয়ে generic type parameter নেওয়া হয়েছে।
- `...arrays: T[][]` rest parameter দিয়ে একাধিক array গ্রহণ করা হয়েছে।
- `flat()` দিয়ে nested array-কে একটি single-level array-তে রূপান্তর করা হয়েছে।

```typescript
function concatenateArrays<T>(...arrays: T[][]): T[] {
  return arrays.flat();
}
```

### Example

```typescript
console.log(concatenateArrays([1, 2], [3, 4]));
// [1, 2, 3, 4]

console.log(concatenateArrays(["TypeScript"], ["JavaScript", "Node.js"]));
// ["TypeScript", "JavaScript", "Node.js"]
```

### এখানে কী শিখেছি?

- Generics (`<T>`)
- Rest parameters (`...`)
- Array of arrays (`T[][]`)
- `flat()` method
- Reusable and type-safe functions

**কেন Generic?** একই function number, string বা অন্য কোনো type-এর array-এর জন্য ব্যবহার করা যায়; `any` ব্যবহার করতে হয় না।

---

## 5. Get Popular Courses

### Problem কী ছিল?

একটি `Course` interface তৈরি করতে হবে, যেখানে থাকবে:

- `title`: string
- `students`: number
- `isPublished`: boolean

এরপর এমন একটি function তৈরি করতে হবে, যা শুধু সেই course-গুলো return করবে যেগুলো:

- Published (`isPublished === true`)
- নির্ধারিত minimum student সংখ্যার সমান বা বেশি student আছে (`students >= minStudents`)

Original array পরিবর্তন করা যাবে না।

### কীভাবে সমাধান করা হয়েছে?

প্রথমে `Course` interface দিয়ে object-এর structure নির্ধারণ করা হয়েছে। এরপর `filter()` ব্যবহার করে শর্ত পূরণ করা course-গুলো নিয়ে নতুন array তৈরি করা হয়েছে।

```typescript
interface Course {
  title: string;
  students: number;
  isPublished: boolean;
}

function getPopularCourses(
  courses: Course[],
  minStudents: number
): Course[] {
  return courses.filter((course) => {
    return course.isPublished === true &&
      course.students >= minStudents;
  });
}
```

### Example

```typescript
const courses: Course[] = [
  { title: "TypeScript Mastery", students: 120, isPublished: true },
  { title: "Draft Course", students: 200, isPublished: false },
  { title: "Basic HTML", students: 45, isPublished: true },
  { title: "Next.js Pro", students: 85, isPublished: true },
];

console.log(getPopularCourses(courses, 80));
```

### Expected Output

```typescript
[
  { title: "TypeScript Mastery", students: 120, isPublished: true },
  { title: "Next.js Pro", students: 85, isPublished: true }
]
```

### এখানে কী শিখেছি?

- Interface
- Array of objects
- `filter()` method
- Multiple conditions
- Non-mutating array operation
- Function parameter and return types

---

## 6. Pluck Values

### Problem কী ছিল?

একটি generic function তৈরি করতে হবে, যা object-এর array এবং একটি property key গ্রহণ করবে। এরপর প্রতিটি object থেকে ওই key-এর value বের করে নতুন array return করবে।

যেমন, `users` array থেকে `"name"` চাইলে সব user-এর name এবং `"id"` চাইলে সব user-এর id return করবে।

### কীভাবে সমাধান করা হয়েছে?

এখানে তিনটি গুরুত্বপূর্ণ TypeScript concept ব্যবহার হয়েছে:

- `T`: প্রতিটি object-এর type নির্ধারণ করে।
- `K extends keyof T`: নিশ্চিত করে যে দেওয়া key-টি object-এর বৈধ key।
- `T[K]`: নির্বাচিত property-এর value type নির্ধারণ করে।

`map()` দিয়ে প্রতিটি object থেকে `item[key]` নেওয়া হয়েছে।

```typescript
function pluckValues<T, K extends keyof T>(
  items: T[],
  key: K
): T[K][] {
  return items.map((item) => item[key]);
}
```

### Example

```typescript
type User = {
  id: number;
  name: string;
  role: string;
};

const users: User[] = [
  { id: 1, name: "Rakib", role: "Admin" },
  { id: 2, name: "Sadia", role: "Editor" },
  { id: 3, name: "Tariq", role: "Subscriber" },
];

console.log(pluckValues(users, "name"));
// ["Rakib", "Sadia", "Tariq"]

console.log(pluckValues(users, "id"));
// [1, 2, 3]
```

### এখানে কী শিখেছি?

- Generic type parameters
- `keyof` operator
- `K extends keyof T`
- Indexed access type (`T[K]`)
- `map()` method
- Type-safe property access

**বিশেষ সুবিধা:** `pluckValues(users, "name")` থেকে TypeScript `string[]` type বুঝতে পারে, আর `"id"` দিলে `number[]` বুঝতে পারে। ভুল property key দিলে compile-time error পাওয়া যায়।

---

## 7. Employee and Manager

### Problem কী ছিল?

Object-Oriented Programming ব্যবহার করে দুটি class তৈরি করতে হবে:

**Employee class**
- `name` হবে `protected`।
- `baseSalary` হবে `private`।
- Constructor দিয়ে name ও salary নিতে হবে।
- `getDetails()` employee-এর তথ্য string আকারে return করবে।

**Manager class**
- `Employee` class-কে `extends` করবে।
- `department` হবে `private`।
- Constructor-এ `super()` দিয়ে parent class-এর constructor call করবে।
- `getRoleInfo()` manager-এর department ও name return করবে।

### কীভাবে সমাধান করা হয়েছে?

প্রথমে `Employee` class তৈরি করা হয়েছে। `protected` property subclass-এর মধ্যে ব্যবহার করা যায়, কিন্তু `private` property শুধু নিজের class-এর মধ্যে access করা যায়।

এরপর `Manager extends Employee` দিয়ে inheritance করা হয়েছে। `super()` parent class-এর constructor চালায়।

```typescript
class Employee {
  protected name: string;
  private baseSalary: number;

  constructor(name: string, baseSalary: number) {
    this.name = name;
    this.baseSalary = baseSalary;
  }

  getDetails(): string {
    return `Employee: ${this.name}, Base Salary: ${this.baseSalary}`;
  }
}

class Manager extends Employee {
  private department: string;

  constructor(name: string, baseSalary: number, department: string) {
    super(name, baseSalary);
    this.department = department;
  }

  getRoleInfo(): string {
    return `Manager of ${this.department}: ${this.name}`;
  }
}
```

### Example

```typescript
const manager = new Manager("Alice", 50000, "Engineering");

console.log(manager.getDetails());
// Employee: Alice, Base Salary: 50000

console.log(manager.getRoleInfo());
// Manager of Engineering: Alice
```

### এখানে কী শিখেছি?

- Classes and objects
- Constructor
- `public`, `protected`, `private`
- Inheritance (`extends`)
- Parent constructor (`super()`)
- Method return types

---

## 8. Validate Age Async

### Problem কী ছিল?

একটি asynchronous function তৈরি করতে হবে, যার নাম `validateAgeAsync` এবং parameter হবে `age: number`।

শর্ত:
- বয়স ১৮ বা তার বেশি হলে ১ সেকেন্ড পরে `"Access Granted"` দিয়ে Promise resolve হবে।
- বয়স ১৮-এর কম হলে সঙ্গে সঙ্গে `Error` দিয়ে Promise reject হবে।
- Function-এর return type হবে `Promise<string>`।

### কীভাবে সমাধান করা হয়েছে?

`new Promise<string>()` দিয়ে Promise তৈরি করা হয়েছে। Promise-এর callback থেকে দুটি function পাওয়া যায়:

- `resolve()`: কাজ সফল হলে Promise fulfilled করে।
- `reject()`: কাজ ব্যর্থ হলে Promise rejected করে।

বয়স ১৮ বা বেশি হলে `setTimeout()` ব্যবহার করে এক সেকেন্ড পরে `resolve()` করা হয়েছে। অন্যথায় সঙ্গে সঙ্গে `reject(new Error(...))` করা হয়েছে।

```typescript
function validateAgeAsync(age: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (age >= 18) {
      setTimeout(() => {
        resolve("Access Granted");
      }, 1000);
    } else {
      reject(new Error("Access Denied: Must be 18 or older"));
    }
  });
}
```

### Example: Successful case

```typescript
async function main() {
  try {
    const result = await validateAgeAsync(20);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

main();
```

**Output (প্রায় ১ সেকেন্ড পরে):**

```text
Access Granted
```

### Example: Rejected case

```typescript
async function main() {
  try {
    const result = await validateAgeAsync(15);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

main();
```

**Result:** সঙ্গে সঙ্গে `Access Denied: Must be 18 or older` error পাওয়া যাবে।

### এখানে কী শিখেছি?

- Promise
- `Promise<string>` return type
- `resolve()` and `reject()`
- `setTimeout()`
- `async/await`
- `try/catch` error handling

**মনে রাখবে:** `setTimeout()` শুধু নির্দিষ্ট সময় পরে callback চালায়। Promise সফল করতে callback-এর ভেতরে `resolve()` call করতে হয়।

---

## 🧠 Concepts Practiced

এই ৮টি problem সমাধান করতে গিয়ে নিচের TypeScript ও JavaScript concept-গুলো অনুশীলন করা হয়েছে:

| Category | Concepts |
|---|---|
| Functions | Parameters, default parameters, return types |
| Type System | Union types, type narrowing, type annotations |
| Object Structure | Interfaces, object types |
| Advanced Types | Tuples, `readonly`, `keyof`, indexed access types |
| Generics | Generic functions, type parameters, constraints |
| Arrays | `filter()`, `map()`, `flat()` |
| OOP | Classes, constructors, inheritance, access modifiers |
| Async JavaScript | Promises, `async/await`, `setTimeout()`, error handling |
 
> যদি Problem 8-এর `await` function-এর বাইরে ব্যবহার করো, তাহলে project-কে ES Module হিসেবে configure করতে হবে। সহজ বিকল্প হলো `await`-কে `async function main()`-এর ভেতরে রাখা, যেমন Problem 8-এর example-এ দেখানো হয়েছে।

## ✅ Learning Progress

- [x] Problem 1 — Multiply Value
- [x] Problem 2 — Process Input
- [x] Problem 3 — Format Coordinate
- [x] Problem 4 — Concatenate Arrays
- [x] Problem 5 — Get Popular Courses
- [x] Problem 6 — Pluck Values
- [x] Problem 7 — Employee and Manager
- [x] Problem 8 — Validate Age Async

## 👨‍💻 Author

**MD. SOHAN**

- GitHub: [islammdsohan603](https://github.com/islammdsohan603)
- Portfolio: [Sohan Islam](https://my-nextjs-protfolio.vercel.app/)

---

এই repository TypeScript শেখার ধারাবাহিক অনুশীলনের অংশ। প্রতিটি problem-এর মাধ্যমে TypeScript-এর type system, reusable code, object-oriented programming এবং asynchronous programming সম্পর্কে বাস্তব অনুশীলন করা হয়েছে।
