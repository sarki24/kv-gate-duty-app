const fs = require('fs');
const vm = require('vm');

const appCode = fs.readFileSync('app.js', 'utf8');

const sandbox = {
  console,
  Math,
  Set,
  Array,
  Object,
  localStorage: { getItem: () => null, setItem: () => {} },
  document: { getElementById: () => ({ addEventListener: () => {}, querySelectorAll: () => [] }) },
  window: { addEventListener: () => {} }
};

vm.createContext(sandbox);
try {
  vm.runInContext(appCode, sandbox);
  const sol = sandbox.solveRosterCSP(
    sandbox.teachers.filter(t => t.category === 'Regular'),
    sandbox.teachers.filter(t => t.category === 'Contractual')
  );
  fs.writeFileSync('seed_roster.json', JSON.stringify(sol, null, 2));
  console.log('SEED_GEN_SUCCESS');
} catch (e) {
  console.log('SEED_GEN_ERROR:', e);
}
