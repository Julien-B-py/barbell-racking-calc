function Footer() {
  const currentYear = new Date().getFullYear();

  // Project created in 2022
  // Conditional render depending on current year
  return (
    <footer>
      ©{currentYear === 2022 ? currentYear : "2022-" + currentYear}, <a href="https://github.com/Julien-B-py">Julien
      BEAUJOIN <i className="fab fa-github"></i></a>
    </footer>
  );
}

export default Footer;
