import assert from 'node:assert/strict';

// Run through control-browser's Node REPL after opening a fresh audit viewport.
export async function check_mortgage_focus(tab, viewport = 'desktop') {
  assert.ok(['desktop', 'mobile', 'short'].includes(viewport));
  const url = `http://terminal.local:4173/__audit/mortgage_${viewport}`;
  assert.equal(await tab.url(), url);
  const frame = tab.playwright.frameLocator('iframe');
  const button = (name) => frame.getByRole('button', { name, exact: true });
  const reader = frame.getByRole('complementary', { name: 'Concept reader' });
  const overflow = () => frame.locator('body').evaluate((el) => el.style.overflow);
  async function expect_focus(selector) {
    await frame.locator(`${selector}:focus`).waitFor({ state: 'attached' });
    assert.equal(await frame.locator(':focus').count(), 1);
    assert.equal(await frame.locator(`${selector}:focus`).count(), 1);
  }
  async function choose(title) {
    const search = frame.getByRole('searchbox', { name: 'Search mortgage concepts' });
    await search.fill(title);
    await button(`${title} Prepayment / Measuring a speed`).waitFor({ state: 'visible' });
    await search.press('Enter');
    await expect_focus('h2');
    assert.equal(await reader.locator('h2').innerText(), title);
  }
  await button('Expand map').waitFor({ state: 'visible' });
  await button('Back to overview').press('Enter');
  const original_overflow = await overflow();
  await choose('CPR');
  await button('Expand map').press('Enter');
  await button('Exit expanded map').waitFor({ state: 'visible' });
  assert.equal(await overflow(), 'hidden');
  await button('Exit expanded map').press('Enter');
  await expect_focus('button[aria-label="Expand map"]');
  assert.equal(await overflow(), original_overflow);
  assert.equal(await reader.locator('h2').innerText(), 'CPR');
  assert.equal(await frame.getByRole('dialog').count(), 0);

  for (const expanded of [false, true]) {
    if (expanded) {
      await button('Expand map').press('Enter');
      await expect_focus('button[aria-label="Exit expanded map"]');
    }
    await choose('SMM');
    await button('Previous concept').press('Enter');
    await expect_focus('h2');
    assert.equal(await reader.locator('h2').innerText(), 'CPR');
    await button('Explore connections').press('Enter');
    await expect_focus('#concept-connections');
    if (expanded) {
      const first_control = viewport === 'mobile' ? 'Exit expanded map' : 'How to explore';
      await button(first_control).press('Shift+Tab');
      assert.equal(await frame.getByRole('dialog').locator(':focus').count(), 1);
      await frame.locator(':focus').press('Tab');
      await expect_focus(viewport === 'mobile'
        ? 'button[aria-label="Exit expanded map"]'
        : 'button[aria-expanded]');
    }
  }
  await frame.locator(':focus').press('Escape');
  assert.equal(await reader.count(), 0);
  assert.equal(await frame.getByRole('dialog').count(), 1);
  assert.equal(await overflow(), 'hidden');
  await frame.locator(':focus').press('Escape');
  await expect_focus('button[aria-label="Expand map"]');
  assert.equal(await frame.getByRole('dialog').count(), 0);
  assert.equal(await overflow(), original_overflow);
  return { viewport, exit_focus: 'PASS', reader_navigation: 'PASS', focus_containment: 'PASS', escape: 'PASS' };
}
