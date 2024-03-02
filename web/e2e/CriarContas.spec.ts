import { test, expect } from '@playwright/test';

test('Criar Conta', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Acessar Contas' }).click();

  await page.getByRole('link', { name: '+ Criar nova conta' }).click();
  await page.getByLabel('Número:').click();
  await page.getByLabel('Número:').fill("999999");
  await page.getByLabel('Saldo (R$):').click();
  await page.getByLabel('Saldo (R$):').fill("1000.0");
  await page.getByRole('button', { name: 'Salvar' }).click();

  await page.getByTestId('999999-ver').click();
  await expect(page.getByText('Saldo:R$ 1000.00')).toBeVisible();
  await page.getByRole('link', { name: 'Retornar' }).click();

  await page.getByRole('link', { name: '+ Criar nova conta' }).click();
  await page.getByLabel('Número:').click();
  await page.getByLabel('Número:').fill("777777");
  await page.getByLabel('Saldo (R$):').click();
  await page.getByLabel('Saldo (R$):').fill("5000.0");
  await page.getByRole('button', { name: 'Salvar' }).click();

  await page.getByTestId('777777-ver').click();
  await expect(page.getByText('Saldo:R$ 5000.00')).toBeVisible();
});