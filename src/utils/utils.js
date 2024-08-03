const utils = () => {
  const ajustarTabela = (div) => {
    const mainElement = document.getElementById(div);
    const windowHeight = window.innerHeight;
    const offsetTop = mainElement.getBoundingClientRect().top;

    mainElement.style.height = `${windowHeight / 2}px`;
    mainElement.style.transition = 'height 0.8s';

    setTimeout(() => {
      mainElement.style.height = `${windowHeight - offsetTop - 20}px`;
    }, 0);
  }

  return {
    ajustarTabela
  }
}

export default utils;
