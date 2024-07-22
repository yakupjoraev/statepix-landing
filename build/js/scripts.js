// Custom Scripts
// Custom scripts
// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })

  // Снять классы при клике на элементы меню, кроме элементов с классом dropdown
  const menuItems = document.querySelectorAll('.menu__item');

  menuItems.forEach(item => {
    item.addEventListener('click', function (event) {
      // Проверяем, имеет ли кликнутый элемент или его родитель класс dropdown
      if (!item.classList.contains('dropdown')) {
        menu.classList.remove('active');
        burger.classList.remove('active-burger');
        body.classList.remove('locked');
      }
    });
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu()


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav)

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector('.dropdown');

  if (!container) {
    return null
  }

  const dropdowns = document.querySelectorAll(".menu__item.dropdown");

  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector(".menu__item-link");

    // Обработчик для клика на ссылку
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Проверяем, есть ли у элемента класс active
      if (dropdown.classList.contains("active")) {
        // Если есть, удаляем его
        dropdown.classList.remove("active");
      } else {
        // Удаляем класс active у всех dropdown элементов
        dropdowns.forEach(item => item.classList.remove("active"));
        // Добавляем класс active к текущему элементу
        dropdown.classList.add("active");
      }
    });

    // Обработчик для кликов на ссылки внутри выпадающего меню
    const sublinks = dropdown.querySelectorAll(".menu__sublink");
    sublinks.forEach(sublink => {
      sublink.addEventListener("click", function () {
        dropdown.classList.remove("active");
      });
    });
  });

  // Обработчик для клика вне выпадающего меню
  document.addEventListener("click", function (event) {
    let isClickInside = false;
    dropdowns.forEach(dropdown => {
      if (dropdown.contains(event.target)) {
        isClickInside = true;
      }
    });

    if (!isClickInside) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
      });
    }
  });
});



// Аккордеон
const accordionItems = document.querySelectorAll('[data-accordion-item]');
let openAccordion = null; // переменная для хранения ссылки на открытый аккордеон

function toggleAccordion() {
  if (openAccordion && openAccordion !== this) {
    // Если есть открытый аккордеон, который не совпадает с текущим
    openAccordion.classList.remove('active'); // закрыть его
    const openAccordionContent = openAccordion.nextElementSibling;
    if (openAccordionContent) {
      // если у аккордеона есть содержимое
      openAccordionContent.style.maxHeight = null; // сбросить высоту контента
    }
  }

  this.classList.toggle('active'); // открыть или закрыть текущий аккордеон

  const content = this.nextElementSibling;
  if (content) {
    // если у аккордеона есть содержимое
    if (content.style.maxHeight) {
      // Если контент открыт, закрыть его
      content.style.maxHeight = null;
    } else {
      // Если контент закрыт, открыть его
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  openAccordion = this; // запомнить ссылку на открытый аккордеон
}


accordionItems.forEach(item => item.addEventListener('click', toggleAccordion));

