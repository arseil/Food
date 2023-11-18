import { openModal, closeModal } from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalTimerId) {
	// Forms

	const forms = document.querySelectorAll(formSelector);

	const message = {
		// loading: 'Загрузка',
		loading: 'img/form/spinner.svg',
		soccess: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});



	function bindPostData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			// const statusMessage = document.createElement('div');
			// statusMessage.classList.add('status');
			// statusMessage.textContent = message.loading;

			// Добавляем spiner.svg вместо 'Загрузка'
			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;

			// form.append(statusMessage);
			form.insertAdjacentElement('afterend', statusMessage);

			// const request = new XMLHttpRequest();
			// request.open('POST', 'server.php');
			// request.setRequestHeader('Content-type', 'multipart/form-data'); // заголовок устанав. автоматич. при XMLHttpRequest + FormData

			// если все же нужно работать с json
			// request.setRequestHeader('Content-type', 'application/json');

			const formData = new FormData(form);

			// const object = {};
			// formData.forEach(function (value, key) {
			// 	object[key] = value;
			// });
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			// const json = JSON.stringify(object);

			// request.send(formData);
			// request.send(json);


			// Переделываем с помощью Fetch API
			// fetch('server.php', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-type': 'application/json'
			// 	},
			// 	body: JSON.stringify(object)
			// })

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.soccess);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});

			// request.addEventListener('load', () => {
			// 	if (request.status === 200) {
			// 		console.log(request.response);
			// 		showThanksModal(message.soccess);
			// 		form.reset();
			// 		statusMessage.remove();
			// 		// setTimeout(() => {
			// 		// 	statusMessage.remove();
			// 		// }, 2000);
			// 	} else {
			// 		showThanksModal(message.failure);
			// 	}
			// });
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
				<div class="modal__close" data-close>&times;</div>
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

	// fetch('http://localhost:3000/menu')
	// 	.then(data => data.json())
	// 	.then(res => console.log(res));
}

export default forms;