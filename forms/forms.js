import {
   closeModal,
   openModal
} from './modal';
import {
   postData
} from '../services/services';

function forms(formSelector, modalTimerId) {
   const form = document.querySelectorAll(formSelector);
   const message = {
      loading: 'img/form/5.2 spinner.svg',
      success: 'Success',
      fail: 'Failed'
   };

   form.forEach(item => {
      bindPostDate(item);
   });


   function bindPostDate(form) {

      form.addEventListener('submit', event => {
         event.preventDefault();

         const messageStatus = document.createElement('img');

         messageStatus.src = message.loading;
         messageStatus.style.cssText = `
               display: block;
               margin: 0 auto;
            `;


         form.insertAdjacentElement('afterend', messageStatus);

         const formData = new FormData(form);

         messageStatus.textContent = message.loading;

         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         postData('http://localhost:3000/requests', json)
            .then(data => {
               console.log(data);
               showThanksModal(message.success);
               messageStatus.remove();
            }).catch(() => {
               showThanksModal(message.fail);
            }).finally(() => {
               form.reset();
            });

      });
   }

   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      openModal('.modal', modalTimerId);

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');

      thanksModal.innerHTML = `
      <div class="modal__content">
         <div class = "modal__close" data-close>&times;</div>
         <div class="modal__title">${message}</div>
      </div>
      `;
      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         closeModal('.modal');
      }, 4000);
   }
}

export default forms;