const cards = [...document.querySelectorAll('.person-card')];
const searchInputs = [document.getElementById('topSearch'), document.getElementById('heroSearch')];
const noResults = document.getElementById('noResults');
let cartCount = 0;
let toastTimer;
function showToast(message){
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove('show'),2600);
}
function filterCards(value){
  const term = value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card=>{
    const match = card.dataset.name.includes(term) || card.innerText.toLowerCase().includes(term);
    card.hidden = !match;
    if(match) visible++;
  });
  noResults.hidden = visible !== 0;
}
searchInputs.forEach(input=>input?.addEventListener('input',()=> {
  filterCards(input.value);
  searchInputs.forEach(other=>{if(other && other!==input) other.value=input.value;});
}));
document.getElementById('searchButton').addEventListener('click',()=>{
  filterCards(document.getElementById('heroSearch').value);
  document.getElementById('shop').scrollIntoView({behavior:'smooth'});
});
document.querySelectorAll('.add-cart').forEach(button=>button.addEventListener('click',()=>{
  cartCount++;
  document.getElementById('cartCount').textContent=cartCount;
  const name=button.closest('.person-card').querySelector('h3').textContent;
  showToast(`${name} character card added to your demo cart.`);
}));
const modal=document.getElementById('loginModal');
document.getElementById('openLogin').addEventListener('click',()=>modal.hidden=false);
document.getElementById('closeLogin').addEventListener('click',()=>modal.hidden=true);
modal.addEventListener('click',e=>{if(e.target===modal) modal.hidden=true;});
document.addEventListener('keydown',e=>{if(e.key==='Escape') modal.hidden=true;});
document.getElementById('loginForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('loginMessage').textContent='This is a front-end demo. Add Firebase Authentication to securely verify accounts.';
  showToast('Demo form only — no account was created.');
});
document.getElementById('googleLogin').addEventListener('click',()=>{
  showToast('Google sign-in needs Firebase setup. See README.txt.');
});
