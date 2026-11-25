import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveGdprClause, shouldRenderGdprClause } from '../src/utils/gdprClause';

const POLISH_DEFAULT =
  'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji.';

test('selecting Poland shows the default clause', () => {
  assert.equal(resolveGdprClause(undefined, POLISH_DEFAULT), POLISH_DEFAULT);
});

test('an edited clause is kept as typed', () => {
  const edited = 'Wyrażam zgodę na przetwarzanie moich danych w celu tej rekrutacji.';
  assert.equal(resolveGdprClause(edited, POLISH_DEFAULT), edited);
});

test('clearing the field stays empty and does not restore the default', () => {
  assert.equal(resolveGdprClause('', POLISH_DEFAULT), '');
});

test('whitespace-only content counts as cleared for rendering', () => {
  assert.equal(resolveGdprClause('   ', POLISH_DEFAULT), '   ');
  assert.equal(shouldRenderGdprClause('   '), false);
});

test('a cleared clause is omitted from the exported CV', () => {
  assert.equal(shouldRenderGdprClause(''), false);
  assert.equal(shouldRenderGdprClause(undefined), false);
});

test('a present clause is printed in the exported CV', () => {
  assert.equal(shouldRenderGdprClause(POLISH_DEFAULT), true);
});

test('a country without a clause resolves to an empty field', () => {
  assert.equal(resolveGdprClause(undefined, undefined), '');
  assert.equal(shouldRenderGdprClause(resolveGdprClause(undefined, undefined)), false);
});
