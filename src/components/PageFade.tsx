import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

/**
 * Dissolvenza in entrata, puramente basata su opacity.
 * - Nessuna animazione in uscita, nessun AnimatePresence, nessun transform.
 * - La Home ("/") è esclusa: fullPage.js non viene toccato in alcun modo.
 * - Non altera layout né scrollHeight, quindi lo scroll restoration resta intatto.
 */
const PageFade = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  if (pathname === "/") return <>{children}</>;

  return (
    <div key={pathname} className="page-fade-in">
      {children}
    </div>
  );
};

export default PageFade;
