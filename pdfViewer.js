document.addEventListener('DOMContentLoaded', function() {
	let pdfDoc = null;
	let pageNum = 1;
	let totalPages = 0;
	const scale = 1.5;
	let renderTask = null;
	let verticalScroll = false;
	let scrollOffset = 0;
	const canvas = document.getElementById('pdf-canvas');

	function renderPage(num, scrollY = 0) {
		if (renderTask) {
			renderTask.cancel();
		}
		pdfDoc.getPage(num).then(function(page) {
			const viewport = page.getViewport({ scale: scale });
			const rotation = (page.rotate + viewport.rotation) % 360;
			const isVertical = viewport.height > viewport.width * 2; // Consider it vertical if height is significantly greater than width
			verticalScroll = isVertical;

			canvas.height = viewport.height;
			canvas.width = viewport.width;
			const context = canvas.getContext('2d');
			context.clearRect(0, 0, canvas.width, canvas.height);

			const renderContext = {
				canvasContext: context,
				viewport: viewport,
				transform: (rotation === 180) ? [ -1, 0, 0, -1, viewport.width, viewport.height] :
						  (rotation === 90) ? [ 0, 1, -1, 0, viewport.height, 0] :
						  (rotation === 270) ? [ 0, -1, 1, 0, 0, viewport.width] : [1, 0, 0, 1, 0, 0]
			};

			renderTask = page.render(renderContext);
			return renderTask.promise;
		}).then(function() {
			const pageIndicator = document.getElementById('page-indicator');
			if (pageIndicator) {
				pageIndicator.textContent = `Page ${num} of ${totalPages}`;
			}
			const pageSlider = document.getElementById('page-slider');
			if (pageSlider) {
				pageSlider.value = num;
			}
		}).catch(function(reason) {
			if (reason.name === 'RenderingCancelledException') {
				// Ignore rendering canceled errors
				return;
			}
			console.error(reason);
		});
	}

	function loadPDF(pdfPath, initialPageNum) {
		const loadingTask = pdfjsLib.getDocument(pdfPath);
		loadingTask.promise.then(function(pdf) {
			pdfDoc = pdf;
			totalPages = pdf.numPages;
			pageNum = initialPageNum || 1;
			renderPage(pageNum);
			const pageSlider = document.getElementById('page-slider');
			if (pageSlider) {
				pageSlider.max = totalPages;
			}
			updateTicks(totalPages);
		}, function(reason) {
			console.error(reason);
		});
	}

	function updateTicks(totalPages) {
		const tickContainer = document.getElementById('tick-container');
		tickContainer.innerHTML = '';
		for (let i = 0; i < totalPages; i++) {
			const tick = document.createElement('div');
			tick.className = 'tick';
			tickContainer.appendChild(tick);
		}
	}

	function prevPage() {
		if (pageNum <= 1) {
			return;
		}
		pageNum--;
		renderPage(pageNum);
	}

	function nextPage() {
		if (pageNum >= totalPages) {
			return;
		}
		pageNum++;
		renderPage(pageNum);
	}

	window.openPDFModal = function(pdfPath, initialPageNum = 1) {
		const modalBackground = document.getElementById('pdf-modal-background');
		modalBackground.style.display = 'block';
		loadPDF(pdfPath, initialPageNum);

		const wheelHandler = function(event) {
			if (verticalScroll) {
				scrollOffset += event.deltaY;
				canvas.style.transform = `translateY(${-scrollOffset}px)`;
				return;
			}

			if (renderTask && renderTask._internalRenderTask.running) {
				event.preventDefault();
				return;
			}
			if (event.deltaY < 0 && pageNum > 1) {
				pageNum--;
				renderPage(pageNum);
			} else if (event.deltaY > 0 && pageNum < totalPages) {
				pageNum++;
				renderPage(pageNum);
			}
		};

		const modal = document.getElementById('pdf-modal');
		modal.addEventListener('wheel', function(event) {
			event.preventDefault();
			clearTimeout(wheelHandler.timeoutId);
			wheelHandler.timeoutId = setTimeout(() => {
				wheelHandler(event);
			}, 100); // Adjust delay to slow down scrolling
		});

		const pageSlider = document.getElementById('page-slider');
		pageSlider.addEventListener('input', function() {
			pageNum = parseInt(pageSlider.value);
			renderPage(pageNum);
		});
	};

	window.closePDFModal = function(event) {
		const modalBackground = document.getElementById('pdf-modal-background');
		modalBackground.style.display = 'none';
	};

	window.prevPage = prevPage;
	window.nextPage = nextPage;

	let isDragging = false;
	let startY = 0;
	let startScrollOffset = 0;

	canvas.addEventListener('mousedown', function(event) {
		if (verticalScroll) {
			isDragging = true;
			startY = event.clientY;
			startScrollOffset = scrollOffset;
			canvas.style.cursor = 'grabbing';
		}
	});

	canvas.addEventListener('mousemove', function(event) {
		if (isDragging) {
			const deltaY = event.clientY - startY;
			scrollOffset = startScrollOffset - deltaY;
			canvas.style.transform = `translateY(${-scrollOffset}px)`;
		}
	});

	canvas.addEventListener('mouseup', function() {
		if (isDragging) {
			isDragging = false;
			canvas.style.cursor = 'grab';
		}
	});

	canvas.addEventListener('mouseleave', function() {
		if (isDragging) {
			isDragging = false;
			canvas.style.cursor = 'grab';
		}
	});
});