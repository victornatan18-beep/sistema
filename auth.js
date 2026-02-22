// js/auth.js — SEM autenticação, usa Firebase apenas para salvar dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import FIREBASE_CONFIG from './firebase-config.js';

const app = initializeApp(FIREBASE_CONFIG);
export const db = getFirestore(app);

// ID fixo sem autenticação
export const USER_ID = 'default-user';

// Sem proteção — chama callback direto
export function requireAuth(callback) {
  callback({ uid: USER_ID });
}

export function logout() {
  // Sem logout, só recarrega o dashboard
  window.location.href = '../pages/dashboard.html';
}

// Toast global
export function toast(msg, type = 'info') {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = `toast-${type}`;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3200);
}
