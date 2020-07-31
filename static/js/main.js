const modal = document.getElementById('info-modal');
const viewModal = document.getElementById('view-more');
const closeModal = document.getElementById('close-info');

viewModal.addEventListener('click', () => {
    modal.classList.add("show");
});

closeModal.addEventListener('click', () => {
    modal.classList.remove("show");
});