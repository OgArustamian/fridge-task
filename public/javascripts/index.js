const addBtn = document.querySelector('.add-btn');
const prodList = document.querySelector('.products-list');
const openFormBtn = document.querySelector('.toggle-add-form');
const addForm = document.querySelector('.add-form');
const editForm = document.querySelector('.edit-form');
const sendEditBtn = editForm.querySelector('button');

function showAddForm() {
  addForm.classList.toggle('hidden');
}

function showEditForm() {
  editForm.classList.toggle('hidden');
}

openFormBtn.addEventListener('click', () => {
  showAddForm();
});

addBtn.addEventListener('click', async (evt) => {
  // add
  evt.preventDefault();
  const productData = Object.fromEntries(new FormData(addForm));

  const response = await fetch('/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(productData),
  });

  if (response.ok) {
    const newFood = await response.json();
    prodList.insertAdjacentHTML('beforeend', `
    <li data-id="${newFood.id}" class="list-group-item">
        <span data-catId="${newFood.category_id}" data-userId="${newFood.user_id}">${newFood.name}</span>
        <span>${newFood.value}%</span>
        <img class="like-btn" src="/images/like-svgrepo-com.svg">
        <img class="edit-btn" src="/images/edit-svgrepo-com.svg">
        <img class="remove-btn" src="/images/healthy-eating.png">
    </li>
    `);
  }
  const addInput = addForm.querySelector('input[name="food"]');
  addInput.value = '';
  showAddForm();
});

prodList.addEventListener('click', async (evt) => {
  const foodItem = evt.target.closest('.list-group-item');

  // delete
  if (evt.target.classList.contains('remove-btn')) {
    const { id } = foodItem.dataset;
    const deleteResponse = await fetch('/', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ id }),
    });
    if (deleteResponse.ok) {
      foodItem.remove();
    }
  }

  // edit
  if (evt.target.classList.contains('edit-btn')) {
    const { id } = foodItem.dataset;
    const editInput = editForm.querySelector('input[name="food"]');
    editInput.value = evt.target.closest('li').querySelector('span').textContent;
    showEditForm();

    sendEditBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const newFoodData = Object.fromEntries(new FormData(editForm));
      const editResponse = await fetch('/', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ newFoodData, id }),
      });

      if (editResponse.ok) {
        const editedFood = (await editResponse.json())[0];
        foodItem.innerHTML = `
        <span data-catId="${editedFood.category_id}" data-userId="${editedFood}">${editedFood.name}</span>
        <span>${editedFood.value}%</span>
        <img class="like-btn" src="/images/like-svgrepo-com.svg">
        <img class="edit-btn" src="/images/edit-svgrepo-com.svg">
        <img class="remove-btn" src="/images/healthy-eating.png">
        `;
      }
    });
  }

  // like
  if (evt.target.classList.contains('like-btn')) {
    evt.target.src = '/images/like-black.svg';
  }
});
