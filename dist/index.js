"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("Site running");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
if (!emailInput || !passwordInput)
    throw new Error("This page is supposed to have email and password inputs");
const submitButton = (() => {
    const loginButton = document.querySelector("#login-button");
    const signupButton = document.querySelector("#signup-button");
    const purpose = loginButton ? "login" : "signup";
    const button = loginButton || signupButton;
    if (!button)
        throw new Error("No button found");
    return { elt: button, purpose: purpose };
})();
submitButton.elt.onclick;
//function that generates a fetch-postable credential object from the current DOM state
const enteredCredentials = () => {
    return {
        email: emailInput.value,
        password: passwordInput.value
    };
};
const submitEnteredCredentials = (credentials, credentialsPurpose) => __awaiter(void 0, void 0, void 0, function* () {
    //disable button to prevent repeat calls
    submitButton.elt.disabled = true;
    console.log("Sending: ", credentials);
    //send current entered credentials to the backend
    const response = yield fetch(`/api/${credentialsPurpose}`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: new Headers({ "content-type": "application/json" })
    });
    console.log("response: ", response);
    const body = yield response.json();
    console.log("response.json: ", body);
    if (body.redirectUrl)
        window.location = body.redirectUrl;
    submitButton.elt.disabled = false;
    return response;
});
submitButton.elt.onclick = () => submitEnteredCredentials(enteredCredentials(), submitButton.purpose);
// submitButton.onclick = () => console.log("clicked");
//start an async
//disable button and do any other loading state DOM updates
//await call the async fetch operation
//check for errors; e.g. show "user already exists" on signup
// >>fetch might make the server redirect; we dont handle this?
//to handle a redirect; history.push?
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUIsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBbUIsY0FBYyxDQUFDLENBQUM7QUFDNUUsTUFBTSxhQUFhLEdBQ2pCLFFBQVEsQ0FBQyxhQUFhLENBQW1CLGlCQUFpQixDQUFDLENBQUM7QUFDOUQsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLGFBQWE7SUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO0FBWTdFLE1BQU0sWUFBWSxHQUFHLENBQUMsR0FBaUIsRUFBRTtJQUN2QyxNQUFNLFdBQVcsR0FDZixRQUFRLENBQUMsYUFBYSxDQUFvQixlQUFlLENBQUMsQ0FBQztJQUM3RCxNQUFNLFlBQVksR0FDaEIsUUFBUSxDQUFDLGFBQWEsQ0FBb0IsZ0JBQWdCLENBQUMsQ0FBQztJQUM5RCxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ2pELE1BQU0sTUFBTSxHQUFHLFdBQVcsSUFBSSxZQUFZLENBQUM7SUFDM0MsSUFBSSxDQUFDLE1BQU07UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDaEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO0FBQzNDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFTCxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUN6Qix1RkFBdUY7QUFDdkYsTUFBTSxrQkFBa0IsR0FBRyxHQUFxQixFQUFFO0lBQ2hELE9BQU87UUFDTCxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7UUFDdkIsUUFBUSxFQUFFLGFBQWEsQ0FBQyxLQUFLO0tBQzlCLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLHdCQUF3QixHQUFHLENBQy9CLFdBQTZCLEVBQzdCLGtCQUFzQyxFQUN0QyxFQUFFO0lBQ0Ysd0NBQXdDO0lBQ3hDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUVqQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUV0QyxpREFBaUQ7SUFDakQsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsUUFBUSxrQkFBa0IsRUFBRSxFQUFFO1FBQ3pELE1BQU0sRUFBRSxNQUFNO1FBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQ2pDLE9BQU8sRUFBRSxJQUFJLE9BQU8sQ0FBQyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxDQUFDO0tBQzdELENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsSUFBSSxJQUFJLENBQUMsV0FBVztRQUFFLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN6RCxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDbEMsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFBLENBQUM7QUFFRixZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FDOUIsd0JBQXdCLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkUsdURBQXVEO0FBRXZELGdCQUFnQjtBQUNoQiwyREFBMkQ7QUFDM0Qsc0NBQXNDO0FBQ3RDLDZEQUE2RDtBQUM3RCwrREFBK0Q7QUFFL0QscUNBQXFDIn0=