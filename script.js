
const products = PRODUCTS;
const productsContainer = document.getElementById('products-container');
const cartKey = 'cart';
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

function renderProducts(){
  productsContainer.innerHTML = '';
  products.forEach(p=>{
    const el = document.createElement('div');
    el.className = 'product';
    el.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
      <h4>${p.name}</h4>
      <p class="price">$${p.price.toFixed(2)}</p>
      <div class="btns">
        <button class="btn-outline" onclick="openModal(${p.id})">View Details</button>
        <button class="btn-primary" onclick="addToCartId(${p.id})">Add to Cart</button>
      </div>
    `;
    productsContainer.appendChild(el);
  });
}

const modal = document.getElementById('product-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');
const modalAdd = document.getElementById('modal-add');
const modalClose = document.getElementById('modal-close');
const modalClose2 = document.getElementById('modal-close-2');

function openModal(id){
  const p = products.find(x=>x.id===id);
  modalImg.src = p.img;
  modalTitle.textContent = p.name;
  modalPrice.textContent = '$' + p.price.toFixed(2);
  modalDesc.textContent = p.desc || 'High-quality product inspired by the Cherry Collection.';
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden','false');
  modalAdd.onclick = ()=>{ addToCart(p.name,p.price,p.img); closeModal(); };
}
function closeModal(){ modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true'); }
modalClose && modalClose.addEventListener('click', closeModal);
modalClose2 && modalClose2.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

function addToCart(name, price, img){
  cart.push({ name, price, img });
  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartCount();
  showToast(name + ' added to cart');
}
function addToCartId(id){ const p = products.find(x=>x.id===id); addToCart(p.name,p.price,p.img); }

function updateCartCount(){ const el = document.getElementById('cart-count'); if(el) el.textContent = cart.length; }

document.getElementById('shop-now').addEventListener('click', (e)=>{
  e.preventDefault();
  document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',(e)=>{
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
});

function showToast(msg){
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.position='fixed'; t.style.right='18px'; t.style.bottom='18px';
  t.style.background='#222'; t.style.color='#fff'; t.style.padding='10px 14px'; t.style.borderRadius='8px'; t.style.zIndex=9999;
  document.body.appendChild(t);
  setTimeout(()=>{ t.style.opacity='0'; setTimeout(()=>t.remove(),400); },1400);
}

renderProducts();
updateCartCount();
