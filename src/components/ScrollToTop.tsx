import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Instantly show top of page on route change (no scroll animation)
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
