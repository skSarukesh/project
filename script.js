function initPage(activePage) {
  const linkId = `link-${activePage}`;
  const activeLink = document.getElementById(linkId);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  const container = document.querySelector('.container');
  if (container) {
    container.classList.add('fade-in');
  }
}
