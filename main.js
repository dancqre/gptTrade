//SLIDER

const slider = document.querySelector('#slider');
const sliderItems = Array.from(slider.children);
const btnNext = document.querySelector('#btnNext');
const btnPrev = document.querySelector('#btnPrev');

sliderItems.forEach(function (slide, index){
	if (index !== 1) slide.classList.add('none');

	slide.dataset.index = index;

	sliderItems[1].setAttribute('data-active', '');
	slide.addEventListener('click', function(){

		slide.classList.add('none');
		slide.removeAttribute('data-active');
		let nextSlideIndex; 

		if (index + 1 === sliderItems.length){
			nextSlideIndex = 1;
		}else{
			nextSlideIndex = index + 1;
		}

		const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);	
		nextSlide.classList.remove('none');
		nextSlide.setAttribute('data-active', '');

	})
})
btnNext.onclick = function () {
	const currentSlide = slider.querySelector('[data-active]');
	const currentSlideIndex = +currentSlide.dataset.index;
	
	currentSlide.classList.add('none');
	currentSlide.removeAttribute('data-active');

	const nextSlideIndex = currentSlideIndex + 1 === sliderItems.length ? 1 : currentSlideIndex + 1;
	const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
	nextSlide.classList.remove('none');
	nextSlide.setAttribute('data-active', '');
}	
btnPrev.onclick = function () {
	const currentSlide = slider.querySelector('[data-active]');
	const currentSlideIndex = +currentSlide.dataset.index;
	currentSlide.classList.add('none');
	currentSlide.removeAttribute('data-active');

	const nextSlideIndex = currentSlideIndex  === 1 ? sliderItems.length - 1 : currentSlideIndex - 1;

	const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
	nextSlide.classList.remove('none');
	nextSlide.setAttribute('data-active', '');
}

//Burger

const burger = document.querySelector('.menu-icon');
const menu = document.querySelector('.nav-list');
const body = document.body;

if (burger && menu) {
	burger.addEventListener('click', () => {
		burger.classList.toggle('_active');
		menu.classList.toggle('_active');
		body.classList.toggle('_lock');
	})
}

//Nav

const menuLinks = document.querySelectorAll('a[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('click', onMenuLinkClick);
	});
	function onMenuLinkClick(e){
		const menuLink = e.target;
		if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY - document.querySelector('header').offsetHeight;

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			body.classList.remove('_lock');
			menu.classList.remove('_active');
			e.preventDefault();
		} 
	}
}