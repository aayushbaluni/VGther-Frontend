import { useEffect, useState } from "react";
export default function Scrolltop(){
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        // Button is displayed after scrolling for 500 pixels
        const toggleVisibility = () => {
          if (window.pageYOffset > 300) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };
    
        window.addEventListener("scroll", toggleVisibility);
    
        return () => window.removeEventListener("scroll", toggleVisibility);
      }, []);
        const scrollToTop = () => {
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          };
    return(
        <>{isVisible && (<div style={{cursor:"pointer",position:"fixed",zIndex:999,right:"24px",bottom:"7rem"}} onClick={scrollToTop}><img src="https://i.postimg.cc/XNGznn0f/icons8-collapse-arrow.gif"/></div>)}</>
    )
}