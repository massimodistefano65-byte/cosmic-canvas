

## Problema identificato

Il problema NON è nel routing tra pagine diverse, ma nell'interazione con **fullPage.js** sulla homepage.

**Flusso che causa il bug:**
1. L'utente è sulla homepage (`/`)
2. Clicca "Painting" nella navbar → fullPage.js scorre alla sezione Painting (resta su `/`)
3. Clicca "Home" → il codice vede `pathname === "/"` → chiama `window.scrollTo({ top: 0 })`
4. **fullPage.js blocca lo scroll nativo** → nulla succede

Da Bio/Criticism funziona perché `pathname !== "/"`, quindi viene eseguito `window.location.href = "/"` (refresh completo che reinizializza fullPage.js dall'inizio).

## Soluzione

Modificare la gestione del click su "Home" in `src/components/Navbar.tsx` per usare l'API di fullPage.js quando si è sulla homepage, oppure (più semplice e affidabile) fare sempre un refresh completo con `window.location.href = "/"`.

### Modifica in `src/components/Navbar.tsx` (linee 26-32)

Sostituire:
```ts
if (item.label === "Home") {
  if (location.pathname !== "/") {
    window.location.href = "/";
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return;
}
```

Con:
```ts
if (item.label === "Home") {
  window.location.href = "/";
  return;
}
```

Questo fa sempre un reload completo quando si clicca Home, garantendo che fullPage.js si reinizializzi dalla Hero section. Funzionerà da qualsiasi pagina e da qualsiasi sezione della homepage.

