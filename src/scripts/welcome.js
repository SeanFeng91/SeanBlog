	document.addEventListener('DOMContentLoaded', () => {
		const slider = document.querySelector('#slider');
		setTimeout(function moveSlide() {
			const max = slider.scrollWidth - slider.clientWidth;
			const left = slider.clientWidth;
  
			if (max === slider.scrollLeft) {
				slider.scrollTo({left: 0, behavior: 'smooth'})
			} else {
				slider.scrollBy({left, behavior: 'smooth'})
			}
			setTimeout(moveSlide, 1000)
		}, 1000)
	})

// <!-- Font awesome -->

	let confettiElement = document.getElementById('my-canvas');
	console.log(confettiElement,'confettiElement');
	let confettiSettings = { target: confettiElement };
	let confetti = new ConfettiGenerator(confettiSettings);
	confetti.render();
