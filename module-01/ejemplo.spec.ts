import { test, expect } from "@playwright/test";
 
const USERNAME = process.env.TEST_USER_USERNAME ?? "standard_user";
const PASSWORD = process.env.TEST_USER_PASSWORD ?? "pizza123";
 
test.describe("Smoke OmniPizza (M01)", () => {
    test("TC-01 - Successfull login using valid users credentials", async({page}) =>{
        //Arrange
        await page.goto("/");
        
        //Act
        await page.getByTestId("username-desktop").fill(USERNAME);
 
        await  page.getByTestId("password-desktop").fill(PASSWORD);

        await page.getByTestId("login-button-desktop").click();

        //Assert
        await expect(page).toHaveURL("/catalog");
        //await expect(page).toHaveURL(/\/catalog/)
    });
        test("TC-02 - Catalog shows at least 1 pizza", async({page}) =>{
        //Arrange
        await page.goto("/");
        
        //Act
        const h1Header = await page.getByRole("heading", {level: 1}).textContent();
        console.log(h1Header);
        const welcomeHeader = await page.getByRole("heading", { name: 'Welcome back!', level : 2}).textContent();
        console.log(welcomeHeader);
        const usernameLabel = await page.getByText("Username").innerText();
        console.log(usernameLabel);
        const details = await page.getByText("Please enter your details.", {exact: true}).innerText();
        console.log(details);


        await page.getByRole("textbox", {name: "standard_user"}).fill(USERNAME);
        //await page.getByTestId("username-desktop").fill(USERNAME);
        
        await page.getByPlaceholder("••••••••").fill(PASSWORD);
        //await  page.getByTestId("password-desktop").fill(PASSWORD);

        await page.getByRole("img", {name: "MX flag"}).click();
        //await page.getByTestId("market-MX").click();

        //Level 1
        await page.getByRole("button", {name: /sign in/i}).click();
        //await page.getByRole("button", {name: "Sign in"}).click();
        //await page.getByTestId("login-button-desktop").click();

        //Assert
        const pizzaCards = page.locator("[data-testid^='pizza-card-']");
        await expect(pizzaCards.first()).toBeVisible();
        const funghi = await pizzaCards.filter({hasText: "Funghi"}).textContent();
        const fourCheese = await page.getByRole("heading", {level:3}).filter({hasText: "Cheese"}).innerText();
        console.log(fourCheese);
        const count = await pizzaCards.count();
        expect(count).toBeGreaterThan(0);
        expect(count).toBeGreaterThanOrEqual(1);
    })
});