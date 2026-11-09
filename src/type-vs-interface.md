
#  What are the core differences between type aliases and interface in TypeScript? When should you choose one over the other?

# Introduction

TypeScript শেখার সময় type এবং interface---দুটিই আমাদের ডেটার ধরন
নির্ধারণ করতে সাহায্য করে। শুরুতে আমার কাছে দুটিকে প্রায় একই মনে হয়েছিল। কারণ,
দুটো দিয়েই একটি object-এর property এবং তার type নির্ধারণ করা যায়। তবে কিছু
গুরুত্বপূর্ণ পার্থক্য আছে, যেগুলো জানা থাকলে সঠিকটি বেছে নেওয়া সহজ হয়।

# বিস্তারিত আলোচনা

প্রথমে interface দেখি। এটি সাধারণত object-এর structure নির্ধারণ করতে
ব্যবহার করা হয়। 

interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Sohan",
  age: 22,
};

এখানে User interface বলছে, object-এর মধ্যে name string এবং age
number হতে হবে।

অন্যদিকে, type alias দিয়ে object-এর পাশাপাশি union, primitive, array
এবং function-এর type-ও তৈরি করা যায়।

type Status = "success" | "error" | "loading";

type UserInfo = {
  name: string;
  age: number;
};

আরেকটি পার্থক্য হলো, একই নামে একাধিক interface তৈরি করলে সেগুলো একসঙ্গে
merge হতে পারে। কিন্তু একই নামে একাধিক type ঘোষণা করা যায় না।

interface Person {
  name: string;
}

interface Person {
  age: number;
}

আমার মতে, শুধু object-এর structure তৈরি করতে interface ব্যবহার করা
সহজ। আর union বা একাধিক type একসঙ্গে প্রকাশ করতে type বেশি সুবিধাজনক। তবে
অনেক ক্ষেত্রে দুটোই ব্যবহার করা যায়।

# Conclusion

type এবং interface দুটিই TypeScript-এর গুরুত্বপূর্ণ বিষয়। কোনটি
ব্যবহার করব, তা নির্ভর করবে প্রয়োজনের ওপর। নিয়মিত কোড লেখা এবং প্রেজেক্ট করার মাধ্যমে এই
পার্থক্য আরও ভালোভাবে বোঝা সম্ভব।