import { binding, given, when, then } from "cucumber-tsflow";
import { expect } from '@playwright/test';
import {
	Browser,
	chromium,
  BrowserContext,
  Page
} from '@playwright/test';

@binding()
class TransferirPlay {
  private browser: Browser;
  private context: BrowserContext;
  private page: Page;

  @given("conta web {string} com saldo {float} e a conta web {string} com saldo {float}", { timeout: -1 })
  public async dadaDuasContas(numeroOrigem: string, saldoOrigem: number, numeroDestino: string, saldoDestino: number) {    
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.goto('http://localhost:3000/');
    await this.page.getByRole('link', { name: 'Acessar Contas' }).click();

    await this.page.getByRole('link', { name: '+ Criar nova conta' }).click();
    await this.page.getByLabel('Número:').click();
    await this.page.getByLabel('Número:').fill(numeroOrigem);
    await this.page.getByLabel('Saldo (R$):').click();
    await this.page.getByLabel('Saldo (R$):').fill(saldoOrigem.toFixed(2));
    await this.page.getByRole('button', { name: 'Salvar' }).click();

    await this.page.getByRole('link', { name: '+ Criar nova conta' }).click();
    await this.page.getByLabel('Número:').click();
    await this.page.getByLabel('Número:').fill(numeroDestino);
    await this.page.getByLabel('Saldo (R$):').click();
    await this.page.getByLabel('Saldo (R$):').fill(saldoDestino.toFixed(2));
    await this.page.getByRole('button', { name: 'Salvar' }).click();
  }

  @when("a conta web {string} transferir {float} para a conta web {string}")
  public async quandoTransferirValores(numeroOrigem: string, valor: number, numeroDestino: string) {
    await this.page.getByTestId(`${numeroOrigem}-transferir`).click();
    await this.page.locator('#destino').click();
    await this.page.locator('#destino').fill(numeroDestino);
    await this.page.locator('#valor').click();
    await this.page.locator('#valor').fill(valor.toFixed(2));
    await this.page.getByRole('button', { name: 'Salvar' }).click();
  }

  @then("o saldo da conta web {string} deve ser {float} e a conta web {string} {float}")
  public async entaoSaldoDeveSer(numeroOrigem: string, resultadoOrigem: number, numeroDestino: string, resultadoDestino: number) {
    await this.page.getByTestId(`${numeroOrigem}-ver`).click();
    await expect(this.page.getByText(`Saldo:R$ ${resultadoOrigem.toFixed(2)}`)).toBeVisible();
    await this.page.getByRole('link', { name: 'Retornar' }).click();
    await this.page.getByTestId(`${numeroDestino}-ver`).click();
    await expect(this.page.getByText(`Saldo:R$ ${resultadoDestino.toFixed(2)}`)).toBeVisible();
    await this.page.close();
    await this.context.close();
    await this.browser.close();
  }
}

export default TransferirPlay;