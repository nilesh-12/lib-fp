// https://www.typescriptlang.org/play/?#code/PTAEGcCcGNgBwJZwKYDoAu4BQAzArgHbToID2BoiKAFKnTgeAFygBihxZBA2gLoCUoAN5ZQoSMnR5IFAIbgAnkVD4iJcqGoAPFrIILBIsWIlSZKxqgkATPNGTV5S6JtnRoABUikAtgnDIADQWggC8AHzCosZi0OTg6KBuLqFJAO6yCInJXr7+yADc0TGm0hQMju78RTEAvsG5fgFWyOCkADYAbg5a-NXRtUW1WLgc6hTWyO2yCtTghtGl5gTIaaCN+dQS4KAREJIAKgg+yKR46FutwXOgAFSgAIwADC99-FjDWCAQMMCqnPEMNgnMp-uMVJJoAALACqAUg4GoCzE3wAysc8NN0MgIehoQgCABzUB4eE7HDeHxJCgAQQ8AElonFGB00O1SITqCs1gARWTYpHBABErEhUIJxLhyARdFQQveYlkGSyoEm01mACYFaBmQkSWTdqBuEJQAhrCwHsECLITiwAOQ09oIex20D1YSm82gDVWm3Ie0AIVIACNXbVeDUdfFWah2ZzuaA+QL+MFSdL5otJGV9emPiMQS4wVxQJ1ZE7rPzkFKEdQ0wjdPo+MjQGiMVicaXy-zi3HnUzo+02RyuatE5XBaAhQA1Mtm7tE0DV8Cy+VfMCK5WJNUzaha-uMRLcpeGuvLnAIdrYyC1+G7SJ11Bm0CRJ79WIDofx0dJhwp0BHsltSWCgANzT4CxUMZixwUhIB8fklxvdMGwUJsohRMB0R8TFKxUWD4PQEgiX3NpB1jYcEx-CcRXw-kiMlMkV21JVMi3KYdwebVdUPVZj1SU9UHguAkMgO9QAAAwAEiEB8zVqFhpIfa0TlqcS3yjFkyLjEdeXHP9QIRICs2WXiyTzLBuMoJApgJHFUioBwcDFJdgk7OdsRcvC4IQwCiiwCCiw0SBCCRdDQHQSAFDC98D3EVpMUSVIWJVBynRWJFIxi0jP0ucAEuqFswAAeXOOBzhYbghQeFhHWdZAhWFDUWCDYMhV4AYdX5aFNGlbxIGbLKY162DqDtABRSA+tNChUtspg7WCYb+sjYZPmCggMqAA

import { pipeAsync } from '../../lib/pipe';

// src/pipe.ts
function delay(s) {
  return new Promise(res => setTimeout(res, s * 1000));
}

// src/functions.ts
async function fetchUsers() {
  // Simulate fetching users from an API
  console.log(new Date(), 'Fetching Users...');
  await delay(2);
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
  console.log(new Date(), users);
  return users;
}

async function validateUsers(users: any[]) {
  // Simulate validation logic
  console.log(new Date(), 'Validating Users...');
  await delay(2);
  const newUsers = users.filter(user => user.id > 0);
  console.log(new Date(), newUsers);
  return newUsers;
}

async function formatUsers(users: any[]) {
  // Simulate formatting
  console.log(new Date(), 'Formatting Users...');
  await delay(1);
  const newUsers = users.map(user => `${user.id}: ${user.name}`);
  console.log(new Date(), newUsers);
  return newUsers;
}

export const pipeline: (x?: any) => Promise<string[]> = pipeAsync(
  fetchUsers,
  validateUsers,
  formatUsers
);

export async function run() {
  try {
    const result = await pipeline();
    console.log(result); // Output: ["1: Alice", "2: Bob"]
  } catch (error) {
    console.error('Error in pipeline:', error);
  }
}

// run();
