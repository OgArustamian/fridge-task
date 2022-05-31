const addBtn = document.querySelector('.add-btn');
const prodList = document.querySelector('.products-list');

addBtn.addEventListener('click', async (evt) => {
  evt.preventDefault();
  const addProdForm = document.querySelector('.form-field');
  const productData = Object.fromEntries(new FormData(addProdForm));
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
    <li class="list-group-item">
        <span data-catId="${newFood.category_id}" data-userId="${newFood.user_id}">${newFood.name}</span>
        <span>${newFood.value}%</span>
        <img class="like-btn" src="/images/like-svgrepo-com.svg">
        <img data-id="${newFood.id}" class="remove-btn" src="/images/healthy-eating.png">
    </li>
    `);
  }
  const addInput = document.querySelector('input[name="food"]');
  addInput.value = '';
});

prodList.addEventListener('click', async (evt) => {
  if (evt.target.classList.contains('remove-btn')) {
    const { id } = evt.target.dataset;
    const deleteResponse = await fetch('/', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ id }),
    });

    if (deleteResponse.ok) {
      evt.target.closest('.list-group-item').remove();
    }
  }
});
