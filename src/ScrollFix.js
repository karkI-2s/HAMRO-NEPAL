import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollFix() {
const { pathname } = useLocation();

useEffect(() => {
    window.scrollTo(0, 0); // always move to top on route change
}, [pathname]);

return null;
}
