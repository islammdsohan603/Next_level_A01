# What is Type Narrowing in TypeScript? Provide practical examples using typeof, instanceof, and the in operator.

# Introduction

TypeScript এর variable এর মধ্যে একাধিক value থাকতে পারে । তখন TypeScript বুঝতে পারে না যে নির্দিষ্ট সময়ে কোন value টি সঠিক type কী । এই সমস্যা সমাধানের জন্য Type Narrowing ব্যবহার করা হয় । সহজভাবে বললে কোনো condition ব্যবহার করে variable সম্ভাব্য type কমিয়ে নির্দিষ্ট
type-এ নিয়ে আসাকে Type Narrowing বলে।

# বিস্তারিত আলোচনা

প্রথমে typeof অপারেটর  দেখি এটি string, number বা boolean এর মতো primitive type ব্যবহার করা হয় 

function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

এখানে typeof পরীক্ষা করার পর TypeScript বুঝতে পারে কোন অংশে value
string এবং কোন অংশে number।

এবার instanceof ব্যবহার করি। এটি কোনো object নির্দিষ্ট class-এর instance
কি না, তা পরীক্ষা করে।

class Dog {
  bark() {
    console.log("Woof!");
  }
}

function makeSound(animal: Dog | Date) {
  if (animal instanceof Dog) {
    animal.bark();
  }
}

এখনে animal যদি Dog class এর instance হয় তাহলে bark method ব্যবহার করা যাবে 

এখন in operator দেখি এটি কোনো property object-এর মধ্যে আছে কি না পরীক্ষা করে।

type Admin = { name: string; role: string };
type User = { name: string; email: string };

function showInfo(person: Admin | User) {
  if ("role" in person) {
    console.log(person.role);
  } else {
    console.log(person.email);
  }
}

role property থাকলে TypeScript Admin type বুঝতে পারে, অন্যথায়
User type ধরে।

# Conclusion

Type Narrowing ব্যবহার করলে TypeScript-এ নিরাপদে বিভিন্ন type-এর value
নিয়ে কাজ করা যায়। typeof, instanceof এবং in operator-এর ব্যবহার
বুঝতে পারলে কোড লেখা আরও সহজ ও পরিষ্কার হয়
