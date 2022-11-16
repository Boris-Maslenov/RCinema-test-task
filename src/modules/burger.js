const burger = () => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".main-nav");

  const toggleClass = () => {
    window.document.documentElement.style.overflow = hamburger.matches(".burger-menu_open") ? "" : "hidden";
    hamburger.classList.toggle("burger-menu_open");
    menu.classList.toggle("burger-menu_open");
  }

  const openmenu = () => {
    hamburger.addEventListener("click", (e) => {
      toggleClass();
    });
  };

  if (hamburger && menu) openmenu();

  return toggleClass;

};

export default burger;
