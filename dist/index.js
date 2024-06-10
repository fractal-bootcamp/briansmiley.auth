"use strict";
// import "dotenv/config";
// const port = process.env.PORT;
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
    console.log(credentials);
    const response = yield fetch(`/${credentialsPurpose}`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: new Headers({ "content-type": "application/json" }),
        redirect: "follow"
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBCQUEwQjtBQUMxQixpQ0FBaUM7Ozs7Ozs7Ozs7QUFFakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFtQixjQUFjLENBQUMsQ0FBQztBQUM1RSxNQUFNLGFBQWEsR0FDakIsUUFBUSxDQUFDLGFBQWEsQ0FBbUIsaUJBQWlCLENBQUMsQ0FBQztBQUM5RCxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsYUFBYTtJQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7QUFZN0UsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFpQixFQUFFO0lBQ3ZDLE1BQU0sV0FBVyxHQUNmLFFBQVEsQ0FBQyxhQUFhLENBQW9CLGVBQWUsQ0FBQyxDQUFDO0lBQzdELE1BQU0sWUFBWSxHQUNoQixRQUFRLENBQUMsYUFBYSxDQUFvQixnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlELE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDakQsTUFBTSxNQUFNLEdBQUcsV0FBVyxJQUFJLFlBQVksQ0FBQztJQUMzQyxJQUFJLENBQUMsTUFBTTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7QUFDM0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUVMLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBQ3pCLHVGQUF1RjtBQUN2RixNQUFNLGtCQUFrQixHQUFHLEdBQXFCLEVBQUU7SUFDaEQsT0FBTztRQUNMLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSztRQUN2QixRQUFRLEVBQUUsYUFBYSxDQUFDLEtBQUs7S0FDOUIsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sd0JBQXdCLEdBQUcsQ0FDL0IsV0FBNkIsRUFDN0Isa0JBQXNDLEVBQ3RDLEVBQUU7SUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLElBQUksa0JBQWtCLEVBQUUsRUFBRTtRQUNyRCxNQUFNLEVBQUUsTUFBTTtRQUNkLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztRQUNqQyxPQUFPLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQztRQUM1RCxRQUFRLEVBQUUsUUFBUTtLQUNuQixDQUFDLENBQUM7SUFDSCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDLENBQUEsQ0FBQztBQUVGLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUM5Qix3QkFBd0IsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2RSx1REFBdUQ7QUFFdkQsZ0JBQWdCO0FBQ2hCLDJEQUEyRDtBQUMzRCxzQ0FBc0M7QUFDdEMsNkRBQTZEO0FBQzdELCtEQUErRDtBQUUvRCxxQ0FBcUMifQ==