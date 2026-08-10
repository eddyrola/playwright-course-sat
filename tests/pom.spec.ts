import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Market, User, Currency } from "../types";
import marketJson from "../data/markets.json" with {type: "json"};
import userJson from "../data/users.json" with {type: "json"}

const markets = marketJson as Market[];
const users = userJson as User[];

const standardUser = users.find((user) => user.username === "standard_user");
if (!standardUser){
    throw new Error("data/user.json does not cointain a username with 'standard_user'");
}

const currencySymbol: Partial<Record<Currency, string>> = {
    MXN: "$",
    JYP: "¥"
}

test.describe("Smoke parametrized by market", () => {
    for (const market of markets){
        test(`TC-${market.code} - Login + catalog in market ${market.code}`, async ({page}) =>{
        const loginPage = new LoginPage(page);

        //Arrange
        await loginPage.goTo();

        //Actions
        await loginPage.loginMarket(standardUser, market.code)
        //Assert
        await expect(page).toHaveURL("/catalog");
        
        const symbol = currencySymbol[market.currency];

        if(!symbol) return;
        await expect(page.locator("body")).toContainText(symbol);

        });
    }
})