(function (window, document, undefined) {
	'use strict';

	/*==============================
	Sidebar
	==============================*/
	if (document.querySelector('.sidebar')) {
		const sidebar = document.querySelector('.sidebar');
		const bottomMenuBtn = document.querySelector('.botbar__btn--menu');
		var screenWidth = window.innerWidth;

		function toggleHeaderMenu() {
			sidebar.classList.toggle('sidebar--active');
			bottomMenuBtn.classList.toggle('active');
		}

		bottomMenuBtn.addEventListener('click', toggleHeaderMenu);

		document.addEventListener('click', function(event) {
			if (sidebar.classList.contains('sidebar--active') && screenWidth < 1200) {
				var isClickInside01 = sidebar.contains(event.target);
				var isClickButton01 = bottomMenuBtn.contains(event.target);

				if (!isClickInside01 && !isClickButton01) {
					sidebar.classList.remove('sidebar--active');
					bottomMenuBtn.classList.remove('active');
				}
			}
		});
	}

	/*==============================
	Header
	==============================*/
	if (document.querySelector('.header__balance')) {
		document.addEventListener('DOMContentLoaded', function () {
			const dropdownButton = document.querySelector('.header__balance-dropdown-btn');
			const balanceItems = document.querySelectorAll('.header__balance-currencies li');

			balanceItems.forEach((item) => {
				item.addEventListener('click', function () {
					balanceItems.forEach((el) => el.classList.remove('active'));
					this.classList.add('active');
					const imgSrc = this.querySelector('img').getAttribute('src');
					const text = this.querySelectorAll('span')[1].textContent.trim();
					const buttonImg = dropdownButton.querySelector('img');
					const buttonText = dropdownButton.querySelector('span');
					buttonImg.setAttribute('src', imgSrc);
					buttonText.textContent = text;
				});
			});
		});
	}

	/*==============================
	Multisearch
	==============================*/
	if (document.querySelector('.multisearch')) {
		document.addEventListener('DOMContentLoaded', () => {
			const searchButtons = document.querySelectorAll('.botbar__btn--search, .header__search');
			const multisearch = document.querySelector('.multisearch');
			const multisearchContent = document.querySelector('.multisearch__content');
			const closeButton = document.querySelector('.multisearch__close');

			function toggleSearch(button) {
				button.classList.toggle('active');
				multisearch.classList.toggle('multisearch--active');
			}

			searchButtons.forEach(button => {
				button.addEventListener('click', () => {
					toggleSearch(button);
					document.getElementById('msit').focus();
				});
			});

			closeButton.addEventListener('click', () => {
				searchButtons.forEach(button => button.classList.remove('active'));
				multisearch.classList.remove('multisearch--active');
			});

			document.addEventListener('click', (e) => {
				const screenWidth = window.innerWidth;
				if (screenWidth >= 768) {
					if (!multisearchContent.contains(e.target) && !Array.from(searchButtons).some(button => button.contains(e.target))) {
						searchButtons.forEach(button => button.classList.remove('active'));
						multisearch.classList.remove('multisearch--active');
					}
				} else {
					if (!multisearch.contains(e.target) && !Array.from(searchButtons).some(button => button.contains(e.target))) {
						searchButtons.forEach(button => button.classList.remove('active'));
						multisearch.classList.remove('multisearch--active');
					}
				}
			});
		});

		document.addEventListener('DOMContentLoaded', function () {
			const dropdownButton = document.querySelector('.multisearch__dropdown-btn span');
			const dropdownItems = document.querySelectorAll('.multisearch__dropdown-list li');

			dropdownItems.forEach((item) => {
				item.addEventListener('click', function () {
					dropdownItems.forEach((el) => el.classList.remove('active'));
					this.classList.add('active');
					dropdownButton.textContent = this.querySelector('span').textContent.trim();
				});
			});
		});
	}

	/*==============================
	Carousel
	==============================*/
	if (document.querySelector('.splide--hero')) {
		const setupSplideWithResize0 = (selector, options) => {
			const splide = new Splide(selector, { ...options, keyboard: false }).mount();

			let isHovered = false;
			const splideEl = document.querySelector(selector);
			splideEl.addEventListener('mouseenter', () => {
				isHovered = true;
			});
			splideEl.addEventListener('mouseleave', () => {
				isHovered = false;
			});

			document.addEventListener('keydown', (e) => {
				if (!isHovered) return;

				if (e.key === 'ArrowRight') {
					splide.go('>');
				} else if (e.key === 'ArrowLeft') {
					splide.go('<');
				}
			});

			function debounce(func, wait) {
				let timeout;
				return function () {
					const context = this;
					const args = arguments;
					clearTimeout(timeout);
					timeout = setTimeout(() => func.apply(context, args), wait);
				};
			}

			const debouncedRefresh = debounce(() => {
			    splide.refresh();
			}, 100);

			const resizeObserver = new ResizeObserver(() => {
				splide.Components.Elements.track.style.transition = "none";
				debouncedRefresh();
				setTimeout(() => {
					splide.Components.Elements.track.style.transition = "";
				}, 100);
			});

			resizeObserver.observe(document.querySelector(selector).parentElement);
			return splide;
		};

		setupSplideWithResize0('.splide--hero', {
			type: 'loop',
			perPage: 1,
			perMove: 1,
			drag: true,
			pagination: true,
			speed: 1200,
			gap: 0,
			arrows: true,
			focus: 0,
			keyboard: false,
		});
	}

	if (document.querySelector('.splide--items')) {
		var elms = document.getElementsByClassName('splide--items');

		for ( var i = 0; i < elms.length; i++ ) {
			(function(elm) {
				var splide = new Splide(elm, {
					type: 'loop',
					perPage: 7,
					perMove: 7,
					drag: true,
					pagination: false,
					autoWidth: false,
					autoHeight: false,
					speed: 1200,
					gap: 16,
					arrows: true,
					focus: 0,
					keyboard: false,
					breakpoints: {
						575: {
							perPage: 2,
							perMove: 2,
							speed: 800,
						},
						767: {
							perPage: 3,
							perMove: 3,
						},
						991: {
							perPage: 4,
							perMove: 4,
						},
						1399: {
							perPage: 5,
							perMove: 5,
						},
						1899: {
							perPage: 6,
							perMove: 6,
						},
					}
				}).mount();

				let isHovered = false;
				elm.addEventListener('mouseenter', () => {
					isHovered = true;
				});
				elm.addEventListener('mouseleave', () => {
					isHovered = false;
				});
				document.addEventListener('keydown', (e) => {
					if (!isHovered) return;
					if (e.key === 'ArrowRight') {
						splide.go('>');
					} else if (e.key === 'ArrowLeft') {
						splide.go('<');
					}
				});

				function debounce(func, wait) {
					let timeout;
					return function () {
						const context = this;
						const args = arguments;
						clearTimeout(timeout);
						timeout = setTimeout(() => func.apply(context, args), wait);
					};
				}

				const debouncedRefresh = debounce(() => {
					splide.refresh();
				}, 100);

				const resizeObserver = new ResizeObserver(() => {
					splide.Components.Elements.track.style.transition = "none";
					debouncedRefresh();
					setTimeout(() => {
						splide.Components.Elements.track.style.transition = "";
					}, 100);
				});

				resizeObserver.observe(elm.parentElement);
			})(elms[i]);
		}
	}

	if (document.querySelector('.splide--timetable')) {
		const setupSplideWithResize = (selector, options) => {
			const splide = new Splide(selector, options).mount();

			function debounce(func, wait) {
				let timeout;
				return function () {
					const context = this;
					const args = arguments;
					clearTimeout(timeout);
					timeout = setTimeout(() => func.apply(context, args), wait);
				};
			}

			const debouncedRefresh = debounce(() => {
			    splide.refresh();
			}, 100);

			const resizeObserver = new ResizeObserver(() => {
				splide.Components.Elements.track.style.transition = "none";
				debouncedRefresh();
				setTimeout(() => {
					splide.Components.Elements.track.style.transition = "";
				}, 100);
			});

			resizeObserver.observe(document.querySelector(selector).parentElement);
			return splide;
		};

		setupSplideWithResize('.splide--timetable', {
			type: 'slide',
			perPage: 7,
			perMove: 7,
			drag: false,
			autoWidth: true,
			pagination: false,
			speed: 800,
			gap: 30,
			arrows: false,
			focus: 0,
			breakpoints: {
				575: {
					gap: 8,
					perPage: 3,
					perMove: 3,
					autoWidth: false,
					arrows: true,
					drag: true,
				},
				767: {
					gap: 16,
					perPage: 4,
					perMove: 4,
					autoWidth: false,
					arrows: true,
					drag: true,
				},
			}
		});

		if (document.querySelector('.timetable__datetime')) {
			const today = new Date();
			const dateOptions = {
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			};
			document.getElementById('date').innerHTML = today.toLocaleDateString('en-US', dateOptions);
			function theTime() {
				const now = new Date();
				const timeOptions = {
					hour: 'numeric',
					minute: '2-digit',
					second: '2-digit',
					hour12: true
				};
				document.getElementById('time').innerHTML = now.toLocaleTimeString('en-US', timeOptions);
			}
			setInterval(theTime, 1000);
		}
	}

	if (document.querySelector('.splide--partners')) {
		var elms = document.getElementsByClassName('splide--partners');

		for ( var i = 0; i < elms.length; i++ ) {
			(function(elm) {
				var splide = new Splide(elm, {
					type: 'loop',
					perPage: 7,
					perMove: 7,
					autoplay: true,
					interval: 8000,
					pauseOnHover: true,
					resetProgress: true,
					pauseOnFocus: false,
					drag: false,
					pagination: false,
					autoWidth: false,
					autoHeight: false,
					speed: 1200,
					gap: 16,
					arrows: true,
					focus: 0,
					keyboard: false,
					breakpoints: {
						575: {
							perPage: 2,
							perMove: 2,
							speed: 800,
							drag: true,
						},
						767: {
							perPage: 3,
							perMove: 3,
							drag: true,
						},
						991: {
							perPage: 4,
							perMove: 4,
							drag: true,
						},
						1399: {
							perPage: 5,
							perMove: 5,
						},
						1899: {
							perPage: 6,
							perMove: 6,
						},
					}
				}).mount();

				let isHovered = false;
				elm.addEventListener('mouseenter', () => {
					isHovered = true;
				});
				elm.addEventListener('mouseleave', () => {
					isHovered = false;
				});
				document.addEventListener('keydown', (e) => {
					if (!isHovered) return;
					if (e.key === 'ArrowRight') {
						splide.go('>');
					} else if (e.key === 'ArrowLeft') {
						splide.go('<');
					}
				});

				function debounce(func, wait) {
					let timeout;
					return function () {
						const context = this;
						const args = arguments;
						clearTimeout(timeout);
						timeout = setTimeout(() => func.apply(context, args), wait);
					};
				}

				const debouncedRefresh = debounce(() => {
					splide.refresh();
				}, 100);

				const resizeObserver = new ResizeObserver(() => {
					splide.Components.Elements.track.style.transition = "none";
					debouncedRefresh();
					setTimeout(() => {
						splide.Components.Elements.track.style.transition = "";
					}, 100);
				});

				resizeObserver.observe(elm.parentElement);
			})(elms[i]);
		}
	}

	if (document.querySelector('.splide--contests')) {
		var elms = document.getElementsByClassName('splide--contests');

		for ( var i = 0; i < elms.length; i++ ) {
			(function(elm) {
				var splide = new Splide(elm, {
					type: 'loop',
					perPage: 4,
					perMove: 4,
					drag: true,
					pagination: false,
					autoWidth: false,
					autoHeight: false,
					speed: 1200,
					gap: 16,
					arrows: true,
					focus: 0,
					keyboard: false,
					breakpoints: {
						767: {
							perPage: 1,
							perMove: 1,
							speed: 800,
						},
						991: {
							perPage: 2,
							perMove: 2,
						},
						1399: {
							perPage: 3,
							perMove: 3,
						},
					}
				}).mount();

				let isHovered = false;
				elm.addEventListener('mouseenter', () => {
					isHovered = true;
				});
				elm.addEventListener('mouseleave', () => {
					isHovered = false;
				});
				document.addEventListener('keydown', (e) => {
					if (!isHovered) return;
					if (e.key === 'ArrowRight') {
						splide.go('>');
					} else if (e.key === 'ArrowLeft') {
						splide.go('<');
					}
				});

				function debounce(func, wait) {
					let timeout;
					return function () {
						const context = this;
						const args = arguments;
						clearTimeout(timeout);
						timeout = setTimeout(() => func.apply(context, args), wait);
					};
				}

				const debouncedRefresh = debounce(() => {
					splide.refresh();
				}, 100);

				const resizeObserver = new ResizeObserver(() => {
					splide.Components.Elements.track.style.transition = "none";
					debouncedRefresh();
					setTimeout(() => {
						splide.Components.Elements.track.style.transition = "";
					}, 100);
				});

				resizeObserver.observe(elm.parentElement);
			})(elms[i]);
		}
	}

	if (document.querySelector('.splide--carousel')) {
		var elms = document.getElementsByClassName('splide--carousel');

		for ( var i = 0; i < elms.length; i++ ) {
			(function(elm) {
				var splide = new Splide(elm, {
					type: 'loop',
					perPage: 3,
					perMove: 3,
					drag: true,
					pagination: true,
					autoWidth: false,
					autoHeight: false,
					speed: 1200,
					gap: 16,
					arrows: true,
					focus: 0,
					keyboard: false,
					breakpoints: {
						767: {
							perPage: 1,
							perMove: 1,
							autoWidth: true,
						},
						1199: {
							perPage: 2,
							perMove: 2,
						},
						1399: {
							perPage: 2,
							perMove: 2,
						},
					}
				}).mount();

				let isHovered = false;
				elm.addEventListener('mouseenter', () => {
					isHovered = true;
				});
				elm.addEventListener('mouseleave', () => {
					isHovered = false;
				});
				document.addEventListener('keydown', (e) => {
					if (!isHovered) return;
					if (e.key === 'ArrowRight') {
						splide.go('>');
					} else if (e.key === 'ArrowLeft') {
						splide.go('<');
					}
				});

				function debounce(func, wait) {
					let timeout;
					return function () {
						const context = this;
						const args = arguments;
						clearTimeout(timeout);
						timeout = setTimeout(() => func.apply(context, args), wait);
					};
				}

				const debouncedRefresh = debounce(() => {
					splide.refresh();
				}, 100);

				const resizeObserver = new ResizeObserver(() => {
					splide.Components.Elements.track.style.transition = "none";
					debouncedRefresh();
					setTimeout(() => {
						splide.Components.Elements.track.style.transition = "";
					}, 100);
				});

				resizeObserver.observe(elm.parentElement);
			})(elms[i]);
		}
	}

	if (document.querySelector('.splide--online')) {
		var elms = document.getElementsByClassName('splide--online');

		for ( var i = 0; i < elms.length; i++ ) {
			(function(elm) {
				var splide = new Splide(elm, {
					type: 'loop',
					perPage: 3,
					perMove: 3,
					drag: true,
					pagination: false,
					autoWidth: false,
					autoHeight: false,
					speed: 1200,
					gap: 16,
					arrows: true,
					focus: 0,
					keyboard: false,
					breakpoints: {
						767: {
							perPage: 1,
							perMove: 1,
						},
						1199: {
							perPage: 2,
							perMove: 2,
						},
						1399: {
							perPage: 2,
							perMove: 2,
						},
					}
				}).mount();

				let isHovered = false;
				elm.addEventListener('mouseenter', () => {
					isHovered = true;
				});
				elm.addEventListener('mouseleave', () => {
					isHovered = false;
				});
				document.addEventListener('keydown', (e) => {
					if (!isHovered) return;
					if (e.key === 'ArrowRight') {
						splide.go('>');
					} else if (e.key === 'ArrowLeft') {
						splide.go('<');
					}
				});

				function debounce(func, wait) {
					let timeout;
					return function () {
						const context = this;
						const args = arguments;
						clearTimeout(timeout);
						timeout = setTimeout(() => func.apply(context, args), wait);
					};
				}

				const debouncedRefresh = debounce(() => {
					splide.refresh();
				}, 100);

				const resizeObserver = new ResizeObserver(() => {
					splide.Components.Elements.track.style.transition = "none";
					debouncedRefresh();
					setTimeout(() => {
						splide.Components.Elements.track.style.transition = "";
					}, 100);
				});

				resizeObserver.observe(elm.parentElement);
			})(elms[i]);
		}
	}

	if (document.querySelector('.splide--news')) {
		var elms = document.getElementsByClassName('splide--news');

		for ( var i = 0; i < elms.length; i++ ) {
			(function(elm) {
				var splide = new Splide(elm, {
					type: 'loop',
					perPage: 3,
					perMove: 3,
					drag: true,
					pagination: false,
					autoWidth: false,
					autoHeight: false,
					speed: 1200,
					gap: 16,
					arrows: true,
					focus: 0,
					keyboard: false,
					breakpoints: {
						767: {
							perPage: 1,
							perMove: 1,
						},
						1199: {
							perPage: 2,
							perMove: 2,
						},
						1399: {
							perPage: 2,
							perMove: 2,
						},
					}
				}).mount();

				let isHovered = false;
				elm.addEventListener('mouseenter', () => {
					isHovered = true;
				});
				elm.addEventListener('mouseleave', () => {
					isHovered = false;
				});
				document.addEventListener('keydown', (e) => {
					if (!isHovered) return;
					if (e.key === 'ArrowRight') {
						splide.go('>');
					} else if (e.key === 'ArrowLeft') {
						splide.go('<');
					}
				});

				function debounce(func, wait) {
					let timeout;
					return function () {
						const context = this;
						const args = arguments;
						clearTimeout(timeout);
						timeout = setTimeout(() => func.apply(context, args), wait);
					};
				}

				const debouncedRefresh = debounce(() => {
					splide.refresh();
				}, 100);

				const resizeObserver = new ResizeObserver(() => {
					splide.Components.Elements.track.style.transition = "none";
					debouncedRefresh();
					setTimeout(() => {
						splide.Components.Elements.track.style.transition = "";
					}, 100);
				});

				resizeObserver.observe(elm.parentElement);
			})(elms[i]);
		}
	}

	if (document.querySelector('.splide--roadmap')) {
		var elms = document.getElementsByClassName('splide--roadmap');

		for ( var i = 0; i < elms.length; i++ ) {
			(function(elm) {
				var splide = new Splide(elm, {
					type: 'loop',
					perPage: 3,
					perMove: 3,
					drag: true,
					pagination: false,
					autoWidth: false,
					autoHeight: true,
					speed: 1200,
					gap: 16,
					arrows: true,
					focus: 0,
					keyboard: false,
					breakpoints: {
						767: {
							perPage: 1,
							perMove: 1,
						},
						1399: {
							perPage: 2,
							perMove: 2,
						},
					}
				}).mount();

				let isHovered = false;
				elm.addEventListener('mouseenter', () => {
					isHovered = true;
				});
				elm.addEventListener('mouseleave', () => {
					isHovered = false;
				});
				document.addEventListener('keydown', (e) => {
					if (!isHovered) return;
					if (e.key === 'ArrowRight') {
						splide.go('>');
					} else if (e.key === 'ArrowLeft') {
						splide.go('<');
					}
				});

				function debounce(func, wait) {
					let timeout;
					return function () {
						const context = this;
						const args = arguments;
						clearTimeout(timeout);
						timeout = setTimeout(() => func.apply(context, args), wait);
					};
				}

				const debouncedRefresh = debounce(() => {
					splide.refresh();
				}, 100);

				const resizeObserver = new ResizeObserver(() => {
					splide.Components.Elements.track.style.transition = "none";
					debouncedRefresh();
					setTimeout(() => {
						splide.Components.Elements.track.style.transition = "";
					}, 100);
				});

				resizeObserver.observe(elm.parentElement);
			})(elms[i]);
		}
	}

	/*==============================
	Dropdowns
	==============================*/
	if (document.querySelector('.sign__dropdown--type1')) {
		document.addEventListener('DOMContentLoaded', function () {
			function initializeDropdowns(context = document) {
				const dropdowns = context.querySelectorAll('.sign__dropdown--type1');

				dropdowns.forEach((dropdown) => {
					const button = dropdown.querySelector('.sign__dropdown-btn');
					if (!button) return;

					const image = button.querySelector('img');
					const span = button.querySelector('span');
					if (!image || !span) return;

					const items = dropdown.querySelectorAll('.sign__currencies li');

					items.forEach((item) => {
						item.addEventListener('click', function () {
							items.forEach((el) => el.classList.remove('active'));
							this.classList.add('active');
							const newImageSrc = this.querySelector('img').src;
							const newText = this.querySelector('span').textContent.trim();
							image.src = newImageSrc;
							span.textContent = newText;
						});
					});
				});
			}

			initializeDropdowns();

			const modals = document.querySelectorAll('.modal');
			modals.forEach((modal) => {
				modal.addEventListener('shown.bs.modal', function () {
					initializeDropdowns(modal);
				});
			});
		});
	}

	if (document.querySelector('.sign__dropdown--type2')) {
		document.addEventListener('DOMContentLoaded', function () {
			function initializeDropdownType2(context = document) {
				const dropdowns = context.querySelectorAll('.sign__dropdown--type2');

				dropdowns.forEach((dropdown) => {
					const button = dropdown.querySelector('.sign__dropdown-btn');
					if (!button) return;

					const span = button.querySelector('span');
					if (!span) return;

					const items = dropdown.querySelectorAll('.sign__currencies li');

					items.forEach((item) => {
						item.addEventListener('click', function () {
							items.forEach((el) => el.classList.remove('active'));
							this.classList.add('active');
							const newText = this.querySelector('span').textContent.trim();
							span.textContent = newText;
						});
					});
				});
			}

			initializeDropdownType2();

			const modals = document.querySelectorAll('.modal');
			modals.forEach((modal) => {
				modal.addEventListener('shown.bs.modal', function () {
					initializeDropdownType2(modal);
				});
			});
		});
	}

	if (document.querySelector('.sign__dropdown--type3')) {
		document.addEventListener('DOMContentLoaded', function () {
			function initializeDropdownType3(context = document) {
				const dropdowns = context.querySelectorAll('.sign__dropdown--type3');

				dropdowns.forEach((dropdown) => {
					const button = dropdown.querySelector('.sign__dropdown-btn');
					if (!button) return;

					const buttonImg = button.querySelector('img');
					const buttonSpan = button.querySelector('span');
					if (!buttonImg || !buttonSpan) return;

					const items = dropdown.querySelectorAll('.sign__currencies li');

					items.forEach((item) => {
						item.addEventListener('click', function () {
							items.forEach((el) => el.classList.remove('active'));
							this.classList.add('active');
							const newImgSrc = this.querySelector('img')?.getAttribute('src');
							const newText = this.querySelectorAll('span')[1]?.textContent.trim();
							if (newImgSrc) buttonImg.setAttribute('src', newImgSrc);
							if (newText) buttonSpan.textContent = newText;
						});
					});
				});
			}

			initializeDropdownType3();

			const modals = document.querySelectorAll('.modal');
			modals.forEach((modal) => {
				modal.addEventListener('shown.bs.modal', function () {
					initializeDropdownType3(modal);
				});
			});
		});
	}

	/*==============================
	Favorite
	==============================*/
	if (document.querySelector('.item__favorite')) {
		document.querySelectorAll('.item__favorite').forEach(function (element) {
			element.addEventListener('click', function () {
				element.classList.toggle('item__favorite--active');
			});
		});
	}

	if (document.querySelector('.hero__favorite')) {
		document.querySelectorAll('.hero__favorite').forEach(function (element0) {
			element0.addEventListener('click', function () {
				element0.classList.toggle('hero__favorite--active');
			});
		});
	}

	if (document.querySelector('.xtable__favorite')) {
		document.querySelectorAll('.xtable__favorite').forEach(function (element1) {
			element1.addEventListener('click', function () {
				element1.classList.toggle('xtable__favorite--active');
			});
		});
	}

	/*==============================
	Filter
	==============================*/
	if (document.querySelector('.filter')) {
		const input = document.querySelector('.filter__search input');
		const clearButton = document.querySelector('.filter__search-clear');

		input.addEventListener('input', function() {
			if (input.value.length > 0) {
				clearButton.classList.add('active');
			} else {
				clearButton.classList.remove('active');
			}
		});

		clearButton.addEventListener('click', function() {
			input.value = '';
			clearButton.classList.remove('active');
		});
	}

	if (document.querySelector('.filter__dropdown--checkboxes')) {
		document.addEventListener('DOMContentLoaded', () => {
			const dropdowns = document.querySelectorAll('.filter__dropdown--checkboxes');

			dropdowns.forEach(dropdown => {
				const filterBtn = dropdown.querySelector('.filter__btn');
				const filterCounter = filterBtn.querySelector('.filter__btn-counter');
				const clearBtns = dropdown.querySelectorAll('.filter__dropdown-clear, .filter__btn-clear');
				const checkboxes = dropdown.querySelectorAll('.filter__dropdown-checkboxes input[type="checkbox"]');

				dropdown.addEventListener('click', (e) => {
					e.stopPropagation();
				});

				filterBtn.addEventListener('click', () => {
					dropdowns.forEach(otherDropdown => {
						if (otherDropdown !== dropdown) {
							const openDropdownMenu = otherDropdown.querySelector('.dropdown-menu.show');
							if (openDropdownMenu) {
								openDropdownMenu.classList.remove('show');
							}
						}
					});
				});

				const updateCounter = () => {
					const activeCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
					filterCounter.textContent = activeCheckboxes > 0 ? activeCheckboxes : '';
					filterBtn.classList.toggle('active', activeCheckboxes > 0);
				};

				checkboxes.forEach(checkbox => {
					checkbox.addEventListener('change', updateCounter);
				});

				clearBtns.forEach(clearBtn => {
					clearBtn.addEventListener('click', (e) => {
						e.stopPropagation();
						checkboxes.forEach(checkbox => checkbox.checked = false);
						filterBtn.classList.remove('active');
						filterCounter.textContent = '';
					});
				});

				updateCounter();
			});
		});
	}

	if (document.querySelector('.filter__dropdown--sort')) {
		document.addEventListener('DOMContentLoaded', function () {
			function initializeDropdownType2(context = document) {
				const dropdowns = context.querySelectorAll('.filter__dropdown--sort');

				dropdowns.forEach((dropdown) => {
					const button = dropdown.querySelector('.filter__btn');
					if (!button) return;

					const span = button.querySelector('.filter__btn-name');
					if (!span) return;

					const items = dropdown.querySelectorAll('.filter__dropdown-list li');

					items.forEach((item) => {
						item.addEventListener('click', function () {
							items.forEach((el) => el.classList.remove('active'));
							this.classList.add('active');
							const newText = this.querySelector('span').textContent.trim();
							span.textContent = newText;
						});
					});
				});
			}

			initializeDropdownType2();

			const modals = document.querySelectorAll('.modal');
			modals.forEach((modal) => {
				modal.addEventListener('shown.bs.modal', function () {
					initializeDropdownType2(modal);
				});
			});
		});
	}

	/*==============================
	Catalog Grid
	==============================*/
	if (document.querySelector('.grid--catalog')) {
		document.addEventListener('DOMContentLoaded', function () {
			const gridContainers = document.querySelectorAll('.grid--catalog');

			if (gridContainers.length) {
				let columnCount = 1;

				const firstVisibleGrid = Array.from(gridContainers).find(grid => grid.offsetParent !== null);
				if (firstVisibleGrid) {
					const gridStyle = window.getComputedStyle(firstVisibleGrid);
					columnCount = gridStyle.getPropertyValue('grid-template-columns').split(' ').length;
				}

				gridContainers.forEach(gridContainer => {
					const gridItems = gridContainer.querySelectorAll('.item');

					if (gridItems.length) {
						const updateGridItems = () => {
							const totalItems = gridItems.length;
							const itemsToHide = totalItems % columnCount;

						 gridItems.forEach(item => item.classList.remove('item--none'));

							if (itemsToHide > 0) {
								for (let i = totalItems - itemsToHide; i < totalItems; i++) {
									gridItems[i].classList.add('item--none');
								}
							}
						};

						updateGridItems();
						window.addEventListener('resize', updateGridItems);
					}
				});
			}
		});
	}

	/*==============================
	Chart
	==============================*/
	if (document.querySelector('#tokenomics')) {
		const data = {
			labels: ['Ecosystem Growth', 'Community Rewards', 'Team & Founders', 'Partnerships', 'Liquidity & Listings',],
			datasets: [{
				data: [30, 25, 15, 10, 20],
				backgroundColor: [
					'rgba(26, 170, 103, 1)',
					'rgba(255, 43, 145, 1)',
					'rgba(232, 65, 66, 1)',
					'rgba(114, 242, 235, 1)',
					'rgba(5, 175, 242, 1)',
					'rgba(220, 45, 78, 1)',
					'rgba(172, 41, 194, 1)',
					'rgba(206, 43, 43, 1)',
					'rgba(22, 98, 255, 1)',
					'rgba(255, 195, 18, 1)',
				],
				borderWidth: 0,
			}]
		};

		const getOrCreateTooltip = (chart) => {
			let tooltipEl = chart.canvas.parentNode.querySelector('div');

			if (!tooltipEl) {
				tooltipEl = document.createElement('div');
				tooltipEl.style.background = 'rgba(20, 20, 20, 0.75)';
				tooltipEl.style.borderRadius = '24px';
				tooltipEl.style.color = 'white';
				tooltipEl.style.opacity = 1;
				tooltipEl.style.pointerEvents = 'none';
				tooltipEl.style.position = 'absolute';
				tooltipEl.style.transform = 'translate(-50%, 0)';
				tooltipEl.style.transition = 'all .4s ease';
				tooltipEl.style.fontSize = '14px';
				tooltipEl.style.lineHeight = '24px';
				tooltipEl.style.fontWeight = '500';
				tooltipEl.style.whiteSpace = 'nowrap';

				const table = document.createElement('table');
				table.style.margin = '0px';

				tooltipEl.appendChild(table);
				chart.canvas.parentNode.appendChild(tooltipEl);
			}

			return tooltipEl;
		};

		const externalTooltipHandler = (context) => {
			const {chart, tooltip} = context;
			const tooltipEl = getOrCreateTooltip(chart);

			if (tooltip.opacity === 0) {
				tooltipEl.style.opacity = 0;
				return;
			}

			// Set Text
			if (tooltip.body) {
				const titleLines = tooltip.title || [];
				const bodyLines = tooltip.body.map(b => b.lines);

				const tableHead = document.createElement('thead');

				titleLines.forEach(title => {
					const tr = document.createElement('tr');
					tr.style.borderWidth = 0;

					const th = document.createElement('th');
					th.style.borderWidth = 0;
					const text = document.createTextNode(title);

					th.appendChild(text);
					tr.appendChild(th);
					tableHead.appendChild(tr);
				});

				const tableBody = document.createElement('tbody');
				bodyLines.forEach((body, i) => {
					const colors = tooltip.labelColors[i];

					const span = document.createElement('span');
					span.style.background = colors.backgroundColor;
					span.style.borderColor = colors.borderColor;
					span.style.borderWidth = '0px';
					span.style.marginRight = '8px';
					span.style.height = '8px';
					span.style.width = '8px';
					span.style.borderRadius = '50%';
					span.style.display = 'inline-block';
					span.style.lineHeight = '100%';

					const tr = document.createElement('tr');
					tr.style.backgroundColor = 'inherit';
					tr.style.borderWidth = 0;

					const td = document.createElement('td');
					td.style.borderWidth = 0;

					const text = document.createTextNode(body);

					const text2 = document.createTextNode('%');

					td.appendChild(span);
					td.appendChild(text);
					tr.appendChild(td);
					td.appendChild(text2);
					tableBody.appendChild(tr);
				});

				const tableRoot = tooltipEl.querySelector('table');

				while (tableRoot.firstChild) {
					tableRoot.firstChild.remove();
				}

				tableRoot.appendChild(tableHead);
				tableRoot.appendChild(tableBody);
			}

			const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
			tooltipEl.style.opacity = 1;
			tooltipEl.style.left = positionX + tooltip.caretX + 'px';
			tooltipEl.style.top = positionY + tooltip.caretY + 'px';
			tooltipEl.style.font = tooltip.options.bodyFont.string;
			tooltipEl.style.padding = '8px ' +  '16px';
		};

		const config = {
			type: 'doughnut',
			data: data,
			options: {
				responsive: true,
				plugins: {
					legend: false,
					tooltip: {
						enabled: false,
						position: 'nearest',
						external: externalTooltipHandler
					}
				},
			},
		};

		const myChart = new Chart(
			document.getElementById('tokenomics'),
			config
		);
	}

	/*==============================
	Upload
	==============================*/
	if (document.querySelector('#upload-att0')) {
		var galleryUpload = document.getElementById('upload-att0');

		galleryUpload.addEventListener('change', function(event) {
			var length = event.target.files.length;
			var galleryLabel = galleryUpload.getAttribute('data-name');
			var label = document.querySelector(galleryLabel);

			if (length > 1) {
				label.textContent = length + " files selected";
			} else {
				label.textContent = event.target.files[0].name;
			}
		});
	}

	/*==============================
	Player
	==============================*/
	if (document.querySelector('#player')) {
		const player = new Plyr(document.querySelector('#player'));
	}

	/*==============================
	Review
	==============================*/
	if (document.querySelector('.hero__btn--review')) {
		document.querySelector('.hero__btn--review')?.addEventListener('click', function (e) {
			e.preventDefault();
			const targetTab = document.querySelector('[data-bs-target="#tab-main02"]');
			const form = document.querySelector('#add-review');
			if (targetTab && form) {
				const tab = new bootstrap.Tab(targetTab);
				tab.show();
				setTimeout(() => {
					form.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}, 200);
			}
		});
	}

	/*==============================
	Tabs
	==============================*/
	function activateTabFromHash(hash) {
		if (hash && hash.startsWith("#tab-")) {
			const trigger = document.querySelector(`[data-bs-target="${hash}"]`);
			if (trigger) {
				const tab = new bootstrap.Tab(trigger);
				tab.show();
				history.replaceState(null, "", window.location.pathname + window.location.search);
			}
		}
	}

	document.addEventListener("DOMContentLoaded", () => {
		activateTabFromHash(window.location.hash);
	});

	window.addEventListener("hashchange", () => {
		activateTabFromHash(window.location.hash);
	});

	/*==========================================
	today / weekday / day / date / month / year
	==========================================*/
	document.addEventListener("DOMContentLoaded", function () {
		const elements = document.querySelectorAll("[data-date]");
		const today = new Date();

		elements.forEach(el => {
			const key = el.getAttribute("data-date");
			const format = el.getAttribute("data-format");

			let dayOffset = 0;
			let type = "";

			if (key.startsWith("today")) {
				type = key.split("-")[1];
			} else if (key.startsWith("day-")) {
				const parts = key.split("-");
				dayOffset = parseInt(parts[1], 10);
				type = parts[2];
			}

			const targetDate = new Date();
			targetDate.setDate(today.getDate() + dayOffset);

			let value = "";

			switch (type) {
				case "weekday":
					value = targetDate.toLocaleDateString("en-US", {
						weekday: format !== "long" ? "short" : "long"
					});
					break;
				case "day":
					value = targetDate.toLocaleDateString("en-US", {
						weekday: format !== "long" ? "short" : "long"
					});
					break;
				case "date":
					value = targetDate.getDate();
					break;
				case "month":
					value = targetDate.toLocaleDateString("en-US", {
						month: format !== "long" ? "short" : "long"
					});
					break;
				case "year":
					value = targetDate.getFullYear();
					break;
				default:
					value = "";
			}

			el.textContent = value;
		});
	});

	/*==============================
	Tooltip
	==============================*/
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

})(window, document);