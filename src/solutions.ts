// Problem 2

function processInput(value: string | number | boolean): string | number {
  if (typeof value === "string") {
    return value.trim().toLowerCase();
  } else if (typeof value === "number") {
    return value * 10;
  } else {
    return value ? "Active" : "Inactive";
  }
}

console.log(processInput("  TypeScript  "));
console.log(processInput(7));
console.log(processInput(true));
console.log(processInput(false));
