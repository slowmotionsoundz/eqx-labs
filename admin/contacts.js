/**
 * @file Contacts rendering module for EQX Admin CRM.
 * Displays the address book and studio contacts list.
 */

import { contacts } from './data.js';

export function renderContacts() {
  document.getElementById('contacts-tbody').innerHTML = contacts.map(c => `
    <tr>
      <td><strong style="color:var(--text)">${c.name}</strong></td>
      <td style="color:var(--muted)">${c.email}</td>
      <td style="color:var(--muted)">${c.phone}</td>
      <td style="color:var(--muted)">${c.interest}</td>
    </tr>
  `).join('') || '<tr><td colspan="4" style="text-align:center; color:var(--muted); padding:30px;">No contacts.</td></tr>';
}
