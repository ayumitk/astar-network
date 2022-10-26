import AOS from "aos";
import "aos/dist/aos.css";

export default defineNuxtPlugin((NuxtApp) => {
  NuxtApp.AOS = new AOS.init({ 
    disable: window.innerWidth < 640,
    // offset: 200,
    duration: 500,
    easing: 'ease-in-out-cubic',
    once: false
  }); // or any other options you need
})
