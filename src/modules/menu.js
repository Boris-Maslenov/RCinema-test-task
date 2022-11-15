const menu = () => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".main-nav");

  const openmenu = () => {
    hamburger.addEventListener("click", (e) => {
      window.document.documentElement.style.overflow = hamburger.matches(
        ".burger-menu_open"
      )
        ? ""
        : "hidden";
      hamburger.classList.toggle("burger-menu_open");
      menu.classList.toggle("burger-menu_open");
    });
  };

  if (hamburger && menu) openmenu();
};

export default menu;