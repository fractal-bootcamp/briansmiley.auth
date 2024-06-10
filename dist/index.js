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
    const response = yield fetch(`/submit`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: new Headers({ "content-type": "application/json" })
    });
    return response;
});
submitButton.elt.onclick = () => submitEnteredCredentials(enteredCredentials(), submitButton.purpose);
// submitButton.onclick = () => console.log("clicked");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBCQUEwQjtBQUMxQixpQ0FBaUM7Ozs7Ozs7Ozs7QUFFakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFtQixjQUFjLENBQUMsQ0FBQztBQUM1RSxNQUFNLGFBQWEsR0FDakIsUUFBUSxDQUFDLGFBQWEsQ0FBbUIsaUJBQWlCLENBQUMsQ0FBQztBQUM5RCxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsYUFBYTtJQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7QUFZN0UsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFpQixFQUFFO0lBQ3ZDLE1BQU0sV0FBVyxHQUNmLFFBQVEsQ0FBQyxhQUFhLENBQW9CLGVBQWUsQ0FBQyxDQUFDO0lBQzdELE1BQU0sWUFBWSxHQUNoQixRQUFRLENBQUMsYUFBYSxDQUFvQixnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlELE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDakQsTUFBTSxNQUFNLEdBQUcsV0FBVyxJQUFJLFlBQVksQ0FBQztJQUMzQyxJQUFJLENBQUMsTUFBTTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7QUFDM0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUVMLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBQ3pCLHVGQUF1RjtBQUN2RixNQUFNLGtCQUFrQixHQUFHLEdBQXFCLEVBQUU7SUFDaEQsT0FBTztRQUNMLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSztRQUN2QixRQUFRLEVBQUUsYUFBYSxDQUFDLEtBQUs7S0FDOUIsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sd0JBQXdCLEdBQUcsQ0FDL0IsV0FBNkIsRUFDN0Isa0JBQXNDLEVBQ3RDLEVBQUU7SUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxTQUFTLEVBQUU7UUFDdEMsTUFBTSxFQUFFLE1BQU07UUFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7UUFDakMsT0FBTyxFQUFFLElBQUksT0FBTyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLENBQUM7S0FDN0QsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFBLENBQUM7QUFDRixZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FDOUIsd0JBQXdCLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkUsdURBQXVEIn0=