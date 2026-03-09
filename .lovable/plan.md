

## Piano: Social icons compatti su mobile

### Cosa cambia

In `src/components/ContactSection.tsx`:

1. **Riga di icone social compatte** (`md:hidden`) subito dopo il titolo/email, prima del grid — 4 icone in riga, piccole e cliccabili
2. **Nascondere colonna social su mobile** — il blocco grande diventa `hidden md:flex`
3. **Ridurre spacing su mobile** — padding e gap più stretti per far entrare tutto nello schermo

### Rischio

Minimo. Solo classi CSS responsive e una riga di icone aggiuntiva. Zero interazione con fullPage.js.

