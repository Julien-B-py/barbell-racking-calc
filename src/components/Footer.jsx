function Footer() {
  const currentYear = new Date().getFullYear();
  const startYear = 2022;

  // Project created in 2022
  // Conditional render depending on current year
  const renderYearRange = () => {
    if (currentYear === startYear) {
      return startYear;
    }
    return `${startYear}-${currentYear}`;
  };

  return (
    <footer>
      ©{renderYearRange()}, <a href="https://github.com/Julien-B-py">Julien
        BEAUJOIN <i className="fab fa-github"></i></a>
    </footer>
  );
}

export default Footer;
