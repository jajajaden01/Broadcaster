/* eslint-disable camelcase */

const selectElement = (element) => document.querySelector(element);

function hide_details() {
  const displayed_details = [...document.querySelectorAll('.data-details')];
  displayed_details.forEach(
    // eslint-disable-next-line no-unused-vars
    (currentValue, currentIndex, listObj) => {
      currentValue.classList.remove('show-me');
      currentValue.classList.add('hide-me');
    },
    'myThisArg',
  );
}

document.addEventListener('click', (e) => {
  const clicked_classList = [...e.target.classList];

  if (clicked_classList.includes('more')) {
    const theParent = e.target.parentNode.parentNode.parentNode;
    const class_list = [...theParent.childNodes[3].classList];

    if (class_list.includes('show-me')) {
      theParent.childNodes[3].classList.remove('show-me');
      theParent.childNodes[3].classList.add('hide-me');
    } else {
      hide_details();
      theParent.childNodes[3].classList.remove('hide-me');
      theParent.childNodes[3].classList.add('show-me');
    }
  }
}, false);

selectElement('.menu-icon').addEventListener('click', () => {
  const class_list = [...selectElement('.menus').classList];
  if (class_list.includes('menu-responsive')) {
    selectElement('.menus').classList.remove('menu-responsive');
  } else {
    selectElement('.menus').classList.add('menu-responsive');
  }
});

/*
function hide_subMenus() {
  const red_classes = [...selectElement('.menu-list').childNodes[5].classList];
  const inter_classes = [...selectElement('.menu-list').childNodes[13].classList];

  if (red_classes.includes('show-me')) {
    selectElement('.menu-list').childNodes[5].classList.remove('show-me');
    selectElement('.menu-list').childNodes[5].classList.add('hide-me');
  }

  if (inter_classes.includes('show-me')) {
    selectElement('.menu-list').childNodes[13].classList.remove('show-me');
    selectElement('.menu-list').childNodes[13].classList.add('hide-me');
  }
}
selectElement('.red-sub').addEventListener('click', (e) => {
  const red_classes = [...selectElement('.menu-list').childNodes[5].classList];
  if (red_classes.includes('show-me')) {
    hide_subMenus();
    const inter_classes = [...selectElement('.menu-list').childNodes[13].classList];
    console.log(inter_classes);
  } else {
    hide_subMenus();
    selectElement('.menu-list').childNodes[5].classList.add('show-me');
  }
}, false);

selectElement('.inter-sub').addEventListener('click', (e) => {
  const red_classes = [...selectElement('.menu-list').childNodes[13].classList];
  if (red_classes.includes('show-me')) {
    hide_subMenus();
  } else {
    hide_subMenus();
    selectElement('.menu-list').childNodes[13].classList.add('show-me');
  }
}, false);
*/

selectElement('.the-btn-add').addEventListener('click', () => {
  selectElement('.model').classList.add('show-me');
  selectElement('.model').classList.remove('hide-me');
});

selectElement('.the-span-closer').addEventListener('click', () => {
  selectElement('.model').classList.add('hide-me');
  selectElement('.model').classList.remove('show-me');
});

window.onclick = (e) => {
  if (e.target === selectElement('.model')) {
    selectElement('.model').classList.add('hide-me');
    selectElement('.model').classList.remove('show-me');
  }
};
