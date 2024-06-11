console.log("Site running");
const emailInput = document.querySelector<HTMLInputElement>("#email-input");
const passwordInput =
  document.querySelector<HTMLInputElement>("#password-input");
if (!emailInput || !passwordInput)
  throw new Error("This page is supposed to have email and password inputs");

type CredentialObject = {
  email: string;
  password: string;
};

type CredentialsPurpose = "login" | "signup";
type SubmitButton = {
  elt: HTMLButtonElement;
  purpose: CredentialsPurpose;
};
const submitButton = ((): SubmitButton => {
  const loginButton =
    document.querySelector<HTMLButtonElement>("#login-button");
  const signupButton =
    document.querySelector<HTMLButtonElement>("#signup-button");
  const purpose = loginButton ? "login" : "signup";
  const button = loginButton || signupButton;
  if (!button) throw new Error("No button found");
  return { elt: button, purpose: purpose };
})();

submitButton.elt.onclick;
//function that generates a fetch-postable credential object from the current DOM state
const enteredCredentials = (): CredentialObject => {
  return {
    email: emailInput.value,
    password: passwordInput.value
  };
};

const submitEnteredCredentials = async (
  credentials: CredentialObject,
  credentialsPurpose: CredentialsPurpose
) => {
  //disable button to prevent repeat calls
  submitButton.elt.disabled = true;

  console.log("Sending: ", credentials);

  //send current entered credentials to the backend
  const response = await fetch(`/api/${credentialsPurpose}`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: new Headers({ "content-type": "application/json" })
  });
  console.log("response: ", response);
  const body = await response.json();
  console.log("response.json: ", body);
  if (body.redirectUrl) window.location = body.redirectUrl;
  submitButton.elt.disabled = false;
  return response;
};

submitButton.elt.onclick = () =>
  submitEnteredCredentials(enteredCredentials(), submitButton.purpose);
// submitButton.onclick = () => console.log("clicked");

//start an async
//disable button and do any other loading state DOM updates
//await call the async fetch operation
//check for errors; e.g. show "user already exists" on signup
// >>fetch might make the server redirect; we dont handle this?

//to handle a redirect; history.push?
