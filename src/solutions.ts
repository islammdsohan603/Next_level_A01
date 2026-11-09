type User = {
  id: number;
  name: string;
  role: string;
};

function pluckValues<T, k extends keyof T>(items: T[], key: k): T[k][] {
  return items.map((item) => item[key]);
}

const users: User[] = [
  { id: 1, name: "Rakib", role: "Admin" },
  { id: 2, name: "Sadia", role: "Editor" },
  { id: 3, name: "Tariq", role: "Subscriber" },
];

console.log(pluckValues(users, "name"));
console.log(pluckValues(users, "id"));
