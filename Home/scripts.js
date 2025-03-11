function toggleMenu() {
  const hamburger = document.querySelector(".hamburger");
  const menus = document.querySelectorAll(
    ".item, .item-show, .menu, .menu-show, .logo, .logo-show, .navbar, .navbar-show"
  );
  const body = document.body;
  hamburger.classList.toggle("active");
  menus.forEach((menu) => {
    ["item", "menu", "logo", "navbar"].forEach((baseClass) => {
      if (menu.classList.contains(baseClass)) {
        menu.classList.remove(baseClass);
        menu.classList.add(`${baseClass}-show`);
      } else if (menu.classList.contains(`${baseClass}-show`)) {
        menu.classList.remove(`${baseClass}-show`);
        menu.classList.add(baseClass);
      }
    });
  });
  body.classList.toggle("no-scroll");
  menus.forEach((menu) => {
    if (menu.classList.contains("item-show")) {
      menu.addEventListener("click", () => {
        closeMenu();
      });
    }
  });
}

const links = document.querySelectorAll(".navbar a");
links.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

function closeMenu() {
  const hamburger = document.querySelector(".hamburger");
  const menus = document.querySelectorAll(
    ".item, .item-show, .menu, .menu-show, .logo, .logo-show, .navbar, .navbar-show"
  );
  const body = document.body;
  menus.forEach((menu) => {
    ["item", "menu", "logo", "navbar"].forEach((baseClass) => {
      if (menu.classList.contains(`${baseClass}-show`)) {
        menu.classList.remove(`${baseClass}-show`);

        setTimeout(() => {
          menu.classList.add(baseClass);
        }, 100);
      }
    });
  });
  hamburger.classList.remove("active");
  body.classList.remove("no-scroll");
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;

      smoothScrollTo(targetPosition, 500);
    }
  });
});
function smoothScrollTo(target, duration) {
  const startPosition = window.pageYOffset;
  const distance = target - startPosition;
  let startTime = null;
  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const ease = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, ease);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);
}
function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

let isScrolling = false;
let scrollSpeed = 0;
let friction = 0.05;
let scrollDirection = 0;
let targetPosition = 0;

function smoothScroll() {
  if (Math.abs(scrollSpeed) < 0.1) {
    isScrolling = false;
    scrollSpeed = 0;
  }
  if (isScrolling) {
    scrollSpeed *= 1 - friction;
    window.scrollBy(0, scrollSpeed);
    requestAnimationFrame(smoothScroll);
  }
}
window.addEventListener(
  "wheel",
  function (e) {
    if (!isScrolling) {
      isScrolling = true;
      smoothScroll();
    }
    scrollDirection = e.deltaY > 0 ? 1 : -1;
    scrollSpeed += scrollDirection * 10;
    e.preventDefault();
  },
  { passive: false }
);

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("bounceInUp");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  const elements = document.querySelectorAll(".animate-item");
  elements.forEach((element) => observer.observe(element));
});









const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'AC') {
      display.textContent = display.textContent.slice(0, 0);

      if (display.textContent === '' || display.textContent === 'Error') {
        display.textContent = '0';
      }

    } else if (value === '=') {
      calculateResult();

    } else if (value === '+/-') {
      toggleSign();

    } else if (isOperator(value)) {
      if (display.textContent === 'Error') return;
      handleOperator(value);

    } else {
      if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = value;
      } else {
        display.textContent += value;
      }
    }
  });
});

function isOperator(char) {
  return ['+', '-', '×', '÷'].includes(char);
}

function handleOperator(operator) {
  const lastChar = display.textContent.slice(-1);

  if (isOperator(lastChar)) {
    display.textContent = display.textContent.slice(0, -1) + operator;
  } else {
    display.textContent += operator;
  }
}

function calculateResult() {
  try {
    let expression = display.textContent;

    // Reemplaza los símbolos por los que eval() entiende
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/');

    // Procesa los porcentajes: convierte 50% en (50/100)
    expression = expression.replace(/([0-9.]+)%/g, '($1/100)');

    const result = eval(expression);

    display.textContent = result;
  } catch (error) {
    display.textContent = 'Error';
  }
}

function percent() {
  if (display.textContent === '0' || display.textContent === 'Error') return;

  // Si ya hay un % al final, no lo agregues otra vez
  if (display.textContent.endsWith('')) return;

  // Agrega el símbolo % al final del número actual
  display.textContent += '%';
}

function toggleSign() {
  if (display.textContent === '0' || display.textContent === 'Error') return;

  // Si ya empieza con "-", se lo quitamos
  if (display.textContent.startsWith('-')) {
    display.textContent = display.textContent.substring(1);
  } else {
    display.textContent = '-' + display.textContent;
  }
}
