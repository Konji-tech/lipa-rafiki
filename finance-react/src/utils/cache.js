export function setCache(key, value) {
  localStorage.setItem(`finance-${key}`, JSON.stringify(value));
}

export function getCache(key) {
  return JSON.parse(localStorage.getItem(`finance-${key}`) ?? "null");
}

// getters

export function getContacts() {
  return getCache("contacts") ?? [];
}

export function getTransfers() {
  return getCache("transfers") ?? [];
}

export function getDeposits() {
  return getCache("deposits") ?? [];
}

export function getWithdrawals() {
  return getCache("withdrawals") ?? [];
}

export function getGroups() {
  return getCache("groups") ?? [];
}
