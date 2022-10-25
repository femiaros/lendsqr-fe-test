import { animateScroll as scroll } from "react-scroll";

const upScroll = ()=>{
  scroll.scrollToTop()
}

const autoPageUp = () => {
  return upScroll();
}

export default autoPageUp;