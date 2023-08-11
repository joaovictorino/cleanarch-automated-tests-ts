import { Account } from "../../model/account";

describe("Account", () => {
  test("transfer", async () => {
    const account = new Account();
    expect(account.transfer()).toBe(1000);
  });
});