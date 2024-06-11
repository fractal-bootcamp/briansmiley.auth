// import "dotenv/config";
// const port = process.env.PORT;

console.log("Site running");
const emailInput: HTMLInputElement = document.querySelector("#email-input");
const passwordInput: HTMLInputElement =
  document.querySelector("#password-input");
const submitButton: HTMLButtonElement =
  document.querySelector("#submit-button");

//function that generates a fetch-postable credential object from the current DOM state
const enteredCredentials = (): CredentialObject => {
  return {
    email: emailInput.value,
    password: passwordInput.value
  };
};

type CredentialObject = {
  email: string;
  password: string;
};

const submitEnteredCredentials = async (credentials: CredentialObject) => {
  const response = await fetch(`/submit`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: new Headers({ "content-type": "application/json" })
  });
  return response;
};
submitButton.onclick = () => submitEnteredCredentials(enteredCredentials());
// submitButton.onclick = () => console.log("clicked");
