async function validateAgeAsync(age: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (age < 18) {
      reject(new Error("Access Denied: Must be 18 or older"));
      return;
    }

    setTimeout(() => {
      resolve("Access Granted");
    }, 1000);
  });
}

async function main(): Promise<void> {
  try {
    const result = await validateAgeAsync(20);
    console.log(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

main();
