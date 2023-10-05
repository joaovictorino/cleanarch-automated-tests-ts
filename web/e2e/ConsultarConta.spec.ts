import { test, expect } from '@playwright/test';

test('Consultar Conta', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Acessar Contas' }).click();
  await page.getByTestId('123456-ver').click();
  await expect(page.getByText('Saldo:R$ 1000.00')).toBeVisible();
});