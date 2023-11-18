function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
	// Slider

	// solution #1
	// const slides = document.querySelectorAll('.offer__slide'),
	// 	prev = document.querySelector('.offer__slider-prev'),
	// 	next = document.querySelector('.offer__slider-next'),
	// 	total = document.querySelector('#total'),
	// 	current = document.querySelector('#current');

	// let slideIndex = 1;

	// showSlides(slideIndex);

	// if (slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }

	// function showSlides(n) {

	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}

	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	slides.forEach(item => {
	// 		item.classList.remove('show', 'fade');
	// 		item.classList.add('hide');
	// 	});

	// 	slides[slideIndex - 1].classList.add('show', 'fade');
	// 	slides[slideIndex - 1].classList.remove('hide');

	// 	if (slides.length < 10) {
	// 		current.textContent = `0${slideIndex}`;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}
	// }

	// function plusSlides(n) {
	// 	showSlides(slideIndex += n);
	// }

	// prev.addEventListener('click', () => {
	// 	plusSlides(-1);
	// });

	// next.addEventListener('click', () => {
	// 	plusSlides(1);
	// });


	//solution #2 like merry go round
	const slides = document.querySelectorAll(slide),
		slider = document.querySelector(container),
		next = document.querySelector(nextArrow),
		prev = document.querySelector(prevArrow),
		total = document.querySelector(totalCounter),
		current = document.querySelector(currentCounter),
		slidesWrapper = document.querySelector(wrapper),
		slidesField = document.querySelector(field),
		width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}


	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
		dots = [];

	indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;

		if (i == 0) {
			dot.style.opacity = 1;
		}

		indicators.append(dot);
		dots.push(dot);
	}

	function changeOpacity() {
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	}

	function changeCurrentIndex(item, depends) {
		if (depends < 10) {
			current.textContent = `0${item}`;
		} else {
			current.textContent = item;
		}
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	next.addEventListener('click', () => {

		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		changeCurrentIndex(slideIndex, slides.length);
		changeOpacity();
	});

	prev.addEventListener('click', () => {

		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		changeCurrentIndex(slideIndex, slides.length);
		changeOpacity();
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slideTo < 10) {
				current.textContent = `0${slideTo}`;
			} else {
				current.textContent = slideTo;
			}

			changeCurrentIndex(slideTo, slideTo);
			changeOpacity();
		});
	});

	// my solution

	// const slides = document.querySelectorAll('.offer__slide'),
	// 	sliderCounter = document.querySelector('.offer__slider-counter'),
	// 	current = document.querySelector('#current'),
	// 	total = document.querySelector('#total');

	// function hideSlide() {
	// 	slides.forEach(item => {
	// 		item.classList.remove('show', 'fade');
	// 		item.classList.add('hide');
	// 	});
	// }

	// let currentSlide = 0;

	// function showSlide(i = 0) {
	// 	currentSlide = i;

	// 	slides[i].classList.add('show', 'fade');
	// 	slides[i].classList.remove('hide');

	// 	if (i < 10 && slides.length < 10) {
	// 		current.textContent = `0${i + 1}`;
	// 		total.textContent = `0${slides.length}`;
	// 	} else {
	// 		current.textContent = i;
	// 		total.textContent = slides.length;
	// 	}
	// }

	// hideSlide();
	// showSlide();

	// sliderCounter.addEventListener('click', (e) => {
	// 	const target = e.target;

	// 	if (target && target.classList.contains('offer__slider-next')) {

	// 		hideSlide();
	// 		if (currentSlide === slides.length - 1) {
	// 			showSlide();
	// 		} else {
	// 			showSlide(currentSlide + 1);
	// 		}
	// 	}

	// 	if (target && target.classList.contains('offer__slider-prev')) {
	// 		hideSlide();
	// 		if (currentSlide === 0) {
	// 			showSlide(slides.length - 1);
	// 		} else {
	// 			showSlide(currentSlide - 1);
	// 		}
	// 	}
	// });
}

export default slider;