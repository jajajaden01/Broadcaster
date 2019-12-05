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

selectElement('.menu-red').addEventListener('click', () => {
  selectElement('.interv').classList.remove('show-me');
  selectElement('.interv').classList.add('hide-me');

  selectElement('.redflag').classList.remove('hide-me');
  selectElement('.redflag').classList.add('show-me');
});

selectElement('.menu-inter').addEventListener('click', () => {
  selectElement('.redflag').classList.remove('show-me');
  selectElement('.redflag').classList.add('hide-me');

  selectElement('.interv').classList.remove('hide-me');
  selectElement('.interv').classList.add('show-me');
});

selectElement('.the-btn-add').addEventListener('click', () => {
  selectElement('.model-add').classList.add('show-me');
  selectElement('.model-add').classList.remove('hide-me');
});

selectElement('.the-btn-edit').addEventListener('click', () => {
  selectElement('.model-edit').classList.add('show-me');
  selectElement('.model-edit').classList.remove('hide-me');
});

selectElement('.the-span-closer').addEventListener('click', () => {
  selectElement('.model').classList.add('hide-me');
  selectElement('.model').classList.remove('show-me');
});
selectElement('.the-edit-closer').addEventListener('click', () => {
  selectElement('.model-edit').classList.add('hide-me');
  selectElement('.model-edit').classList.remove('show-me');
});

window.onclick = (e) => {
  if (e.target === selectElement('.model-add')) {
    selectElement('.model-add').classList.add('hide-me');
    selectElement('.model-add').classList.remove('show-me');
  }

  if (e.target === selectElement('.model-edit')) {
    selectElement('.model-edit').classList.add('hide-me');
    selectElement('.model-edit').classList.remove('show-me');
  }
};
