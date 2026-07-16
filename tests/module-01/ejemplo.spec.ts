import { test, expect } from "@playwright/test";
 
const USERNAME = process.env.TEST_USER_USERNAME ?? "standard_user";
const PASSWORD = process.env.TEST_USER_PASSWORD ?? "pizza123";
 
test.describe("Smoke OmniPizza (M01)", () => {
    test("TC-01 - Successfull login ising valid users credentials", ({page}) =>{
        page.goto("https://playwright.dev/");
 
        page.getByTestId("username-desktop").fill(USERNAME);
 
        page.getByTestId("password-desktop").fill(PASSWORD);
    })
});