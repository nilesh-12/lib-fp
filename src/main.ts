import './style.css';
import typescriptLogo from './typescript.svg';
import * as lib from '../lib/main';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>LibFP (Using Vite + TypeScript)</h1>
    
    <div class="card">
      ValidationUsingCurry:<input id="pan-india"><div id="pan-india-helper-text"></div>
    </div>

    <div class="card">
      DataUsingPipe:<textarea id="user-json" rows="2"></textarea><pre id="user-json-transformed"></pre>
    </div>
    
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

interface ValidationData {
  surname?: string;
  entity?: string;
  value: string;
  errors: string[];
}
const uppercase = (data: ValidationData) => ({
  ...data,
  value: data.value.toUpperCase()
});
const checkLength = (data: ValidationData) => ({
  ...data,
  errors:
    data.value.length < 10
      ? [...data.errors, 'Less than 10 characters']
      : data.errors
});
const checkEntity = (data: ValidationData) => {
  if (!data.value.at(3)) {
    data.errors.push('Cannot identify the entity');
  } else if (data.value[3] !== 'P') {
    data.errors.push('Invalid entity, Pan number');
  }
  return data;
};
// const checkValidCharacter = (data: ValidationData) => {
//   // The regex you can use with matches() is formed based on the additional input from the users, and look-behinds check for the preceding 4th character. If the 4th letter is P, we check for the first letter in the surname, and if the 4th letter is not P, we check the first letter in the entity name:
//   const c1 = 'Y'; // data.surname?.at(0) ?? data.value.at(4); // First letter in surname coming from the EditText (with P before)
//   const c2 = data.surname?.at(0) ?? '[A-Z]'; // First letter in entity name coming from another EditText (not with P before)
//   const pattern =
//     '[A-Z]{3}([CHFATBLJGP])(?:(?<=P)' + c1 + '|(?<!P)' + c2 + ')d{4}[A-Z]';

//   if (RegExp(pattern).test(data.value) === false) {
//     data.errors = [...data.errors, `Wrong PAN format: e.g. AAAAA0000A`];
//   }
//   console.log();
//   return { ...data };
// };
// using pipeline to write validations rules
const panTransformAndValidatePipeline: (x: ValidationData) => ValidationData =
  lib.compose(
    uppercase,
    checkLength,
    checkEntity
    // checkValidCharacter
  );
// currying helps with error handler for validation for example
const getValidator = lib.curry(function handlePanValidation(
  onError: (a: string) => void,
  errors: string[],
  value: string
) {
  const validationResult = panTransformAndValidatePipeline({
    errors,
    value
  });
  onError(validationResult.errors.join('<br>'));
  return validationResult.value;
});

const inputValueFormatterAndValidator = getValidator(handleError);

function handleError(message: string) {
  document.getElementById(
    'pan-india-helper-text'
  )!.innerHTML = `<span style="color:red;">${message}</span>`;
}
document
  .getElementById('pan-india')!
  .addEventListener('input', function panInputListener() {
    if (this instanceof HTMLInputElement)
      this.value = inputValueFormatterAndValidator([], this.value);
  });
