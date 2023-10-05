import { test, expect } from '@playwright/test';

test('Transferir valor', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Acessar Contas' }).click();
  await page.getByTestId('123456-transferir').click();
  await page.locator('#destino').click();
  await page.locator('#destino').fill('654321');
  await page.locator('#valor').click();
  await page.locator('#valor').fill('100.00');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByTestId('654321-ver').click();
  await expect(page.getByText('Saldo:R$ 1100.00')).toBeVisible();
});