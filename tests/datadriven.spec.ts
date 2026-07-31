import { test, expect } from "@playwright/test";
import { Market, User, Currency } from "../types/";
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

        await page.goto("/");
        await page.getByTestId("username-desktop").fill(standardUser.username);
        await page.getByTestId("password-desktop").fill(standardUser.password);
        await page.getByTestId(`market-${market.code}`).click();
        await page.getByTestId("login-button-desktop").click();
        await expect(page).toHaveURL("/catalog");

        const symbol = currencySymbol[market.currency];
        if(!symbol) return;
        await expect(page.locator("body")).toContainText(symbol);

        });
    }
})