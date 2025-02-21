function availableNext() {
	let tempCurrentType = currentType + 1
	while (filterWithCode(projectObjects, tempCurrentType).length == 0 && tempCurrentType <= maxCategory) {
		tempCurrentType++
	}
	return tempCurrentType
}
function availablePrevious() {
	let tempCurrentType = currentType - 1
	while (filterWithCode(projectObjects, tempCurrentType).length == 0 && tempCurrentType > 0) {
		tempCurrentType--
	}
	return tempCurrentType

}
/*----------------------------------------------------A----------------------------------------------------*/


function createGridMap(gridContainer, qx, qy) { // attention: createGridMap conforms the same array format as coordinates, X is first and Y is second; This is DIFFERENT with usual array printing.
	let theMap = new Array(qx).fill(null).map(() => new Array(qy).fill(false)); // false indicates unoccupied
	return theMap;
}

function checkPreExistingItems(gridContainer, gridMap) {
	const gridItems = Array.from(gridContainer.children);
	gridItems.forEach(item => {
		const x = parseInt(item.dataset.x, 10);
		const y = parseInt(item.dataset.y, 10);
		occupyCell(gridContainer, gridMap, x, y);// x,y are 1-indexed
	});
}

function calculateSurroundingCells(qx, qy) {
	let surroundingCells = [];
	for (let x = 1; x <= qx; x++) {
		for (let y = 1; y <= qy; y++) {
			if (x == 1 || x == qx || y == 1 || y == qy) {
				// if (x > 1 || y > 1)
				surroundingCells.push({ x: x, y: y });
				// console.log("This is a surrounding cell: " + x + "," + y)
			}
		}
	}
	return surroundingCells;
}

function canPlaceObject(gridMap, startX, startY, dimension) {
	for (let x = startX; x < startX + dimension.x; x++) {
		for (let y = startY; y < startY + dimension.y; y++) {
			if (x >= gridMap.length || y >= gridMap[0].length || gridMap[x][y] === true) {
				return false; // Can't place the object here as it goes out of bounds or the space is occupied
			}
		}
	}
	return true; // The object can be placed here
}


function createHtmlObject(title, genre, year, collaborator = '', svg = null) {
	let htmlContent = `
      <div class="typea-content" style="font-family: 'Helvetica', sans-serif; color: #000; position: relative;">
        <div style="text-align: left;">
          <span class="typea-text-top" style="font-size: calc(var(--grid-size) / 6);font-weight: bold; display: block; margin-bottom: 8px;">${title}</span>
          ${genre ? `<span class="typea-text-below" style="font-size: calc(var(--grid-size) / 10); font-weight: bold;display: block; margin-bottom: 2px;">${formatCamelCaseString(genre)}</span>` : ''}
          ${year ? `<span class="typea-text-below" style="font-size: smaller; display: block;">${year}</span>` : ''}
          ${collaborator ? `<span class="typea-text-below" style="font-size: calc(var(--grid-size) / 12); display: block; margin-top: 8px;">${"With: " + collaborator}</span>` : ''}
        </div>
        ${svg ? `<span class="typea-svg-container">${svg}</span>` : ''}
      </div>
    `;

	return {
		html: htmlContent
	};
}


/*----------------------------------------------------C----------------------------------------------------*/





const findGridItemByCoordsFromGC = (gridContainer, x, y) => {
	// x and y here are coordinates, 1-indexed;
	return Array.from(gridContainer.children).find(item =>
		parseInt(item.getAttribute('data-x'), 10) === x && parseInt(item.getAttribute('data-y'), 10) === y
	);
};

function filterByTag(items, tag) {
	// Filter the items array to include only those that contain the specified tag
	// console.log(tag)

	// console.log(items.filter(item => item.tags.includes(tag)))
	return items.filter(item => item.tags.includes(tag));
}

function filterWithCode(items, categoryCode) {
	// Convert categoryCode to the format used in the item codes
	const categoryPrefix = categoryCode * 1000; // Start of the range for the category
	const categorySuffix = categoryPrefix + 999; // End of the range for the category
	// console.log("categoryPrefix", categoryPrefix)
	// console.log("categorySuffix", categorySuffix)
	// Filter the items array to include only those in the specified category
	return items.filter(item => item.id >= categoryPrefix && item.id <= categorySuffix);
}

function filterWithIDs(items, ids) {
	// ids is now an array of desired codes (IDs)
	// Filter the items array to include only those with an ID present in the ids array
	return items.filter(item => ids.includes(item.id));
}

function filterUnqualifiedItems(items, ids, n) {
	// Filter the items array to exclude those with an ID present in the ids array
	const unqualifiedItems = items.filter(item => !ids.includes(item.id));
	console.log(unqualifiedItems.length);

	// Shuffle the unqualified items using Durstenfeld shuffle algorithm
	for (let i = unqualifiedItems.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[unqualifiedItems[i], unqualifiedItems[j]] = [unqualifiedItems[j], unqualifiedItems[i]];
	}

	// Return 'n' random unqualified items from the shuffled list
	return unqualifiedItems.slice(0, n);
}


function filterByTags(items, desiredTags) {
	// Filter the items array
	return items.filter(item =>
		// Check if any of the desired tags is present in the item's tags
		item.tags.some(tag => desiredTags.includes(tag))
	);
}


function findProjectById(projectId) {
	return projectObjects.find(project => project.id === projectId);
}


function formatCamelCaseString(camelCaseString) {
	if (typeof camelCaseString !== 'string') {
		// Optionally throw an error or handle the case when input is not a string
		console.error('Input must be a string.');
		return '';
	}

	if (camelCaseString === 'iOSdevelopment') return 'iOS Development';

	// Split the string at each uppercase letter and capitalize the first letter
	const words = camelCaseString.split(/(?=[A-Z])/).map(word => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});
	// Join the words with a space
	return words.join(' ');
}


/*----------------------------------------------------F----------------------------------------------------*/


function groupByDimension(projects, useBigger = false) {
	const dimensions = {
		"1x1": [],
		"1x2": [],
		"2x1": [],
		"2x2": []
	};

	projects.forEach(project => {
		let dimensionKey = `${project.dimension.x}x${project.dimension.y}`;
		if (useBigger) dimensionKey = `${project.dimension_category.x}x${project.dimension_category.y}`;
		if (dimensions.hasOwnProperty(dimensionKey)) {
			dimensions[dimensionKey].push(project);
		} else {
			// If dimension key does not exist, initialize it with the current project
			dimensions[dimensionKey] = [project];
		}
	});

	return dimensions;
}

function getTheLargestIndexOfThisType(type) {
	// let selectedProjects = filterByTag(projectObjects, categoryTags[type]);

	let selectedProjects = filterWithCode(projectObjects, type);
	return selectedProjects.length
}

function getRenderedSize(element) {
	const rect = element.getBoundingClientRect();
	return {
		width: rect.width,
		height: rect.height
	};
}

function getGridSizeAndGap(gridContainer) {
	// Get computed style of the grid container
	const style = window.getComputedStyle(gridContainer);

	// Retrieve the grid size and gap using the computed style
	const gridSize = style.getPropertyValue('--grid-size');
	const gridGap = style.getPropertyValue('--grid-gap');

	return {
		gridSize: gridSize,
		gridGap: gridGap
	};
}

function getRenderedSizeGridAndGap(gridContainer) {
	// Get computed style of the grid container
	const style = window.getComputedStyle(gridContainer);

	// Retrieve the grid size and gap using the computed style
	const gridSize = parseFloat(style.getPropertyValue('--grid-size'));
	const gridGap = parseFloat(style.getPropertyValue('--grid-gap'));

	return {
		renderedSizeGrid: gridSize,  // Return as a number
		renderedSizeGap: gridGap     // Return as a number
	};
}

function getActualGridLayout(gridContainer) {
	const computedStyle = window.getComputedStyle(gridContainer);

	// Fetch actual values from the computed style
	const gridTemplateColumns = computedStyle.getPropertyValue('grid-template-columns').split(' ').map(s => parseFloat(s));
	const gridTemplateRows = computedStyle.getPropertyValue('grid-template-rows').split(' ').map(s => parseFloat(s));
	const gridContainerWidth = computedStyle.getPropertyValue('width');
	const gridContainerHeight = computedStyle.getPropertyValue('height');

	// Display the fetched values
	console.log("Grid Template Columns:", gridTemplateColumns);
	console.log("Grid Template Rows:", gridTemplateRows);
	console.log("Grid Container Width:", gridContainerWidth);
	console.log("Grid Container Height:", gridContainerHeight);
}

function isTwoOrOneDigit(num) {
	const absoluteNum = Math.abs(num);
	if (absoluteNum <= 99) {
		return true
	} else {
		return false
	}
}


/*----------------------------------------------------G/I----------------------------------------------------*/

function overlayShow(overlayElement) {
	overlayElement.classList.add('visible');
}

// Example function to hide the overlay
function overlayHide(overlayElement) {
	overlayElement.classList.remove('visible');
}


function occupyCell(gridContainer, gridMap, x, y) {// check the  occupancy of (x,y) in gridContainer and mark on gridMap
	// Ensure coordinates are within bounds
	if (x >= 1 && x <= gridMap.length && y >= 1 && y <= gridMap[0].length) {
		// gridMap is 0-indexed; x,y and gridContainer are 1-indexed;
		// Find the corresponding DOM element for the cell
		const gridItems = Array.from(gridContainer.children);
		const targetCell = gridItems.find(item =>
			parseInt(item.dataset.x, 10) === x && parseInt(item.dataset.y, 10) === y);

		if (targetCell) {
			const objectContent = targetCell.querySelector('.object-content');
			if (objectContent && objectContent.innerHTML.trim() !== '') {
				gridMap[x - 1][y - 1] = true;
				// console.log("Cell occupied at (" + x + ", " + y + ")");
			}
		} else {
			console.log("Cell at (" + x + ", " + y + ") not found in the DOM.");
		}
	} else {
		console.log("Coordinates (" + x + ", " + y + ") are out of bounds.");
	}
	return gridMap
}

function isMobileDevice() {
	return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}



function placeImageInLayout(gridContainer, topLeftCoords, layoutDimension, imageUrl, title, projectId, pdfPath = '', startingPage = 1) {
	/*
	In placeMM_Cover, projectId is valid;
	in placeMM_Content, projectId is null;
	*/


	console.log("placeImageInLayout");
	console.log("pdfPath:", pdfPath);
	const cellSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-size'));
	const gapSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-gap'));

	// Prepare the full image overlay
	const fullImageOverlay = document.createElement('img');
	fullImageOverlay.src = imageUrl;
	const topLeftGridItem = findGridItemByCoordsFromGC(gridContainer, topLeftCoords.x, topLeftCoords.y)
	// console.log("cellSize:", cellSize)
	// console.log("gapSize:", gapSize)
	const coverWidth = (layoutDimension.x * cellSize + (layoutDimension.x - 1) * gapSize * 2.01)
	const coverHeight = (layoutDimension.y * cellSize + (layoutDimension.y - 1) * gapSize * 2.01)
	fullImageOverlay.className = 'grid-item-full-image';
	fullImageOverlay.style.position = 'absolute';
	fullImageOverlay.style.width = `${coverWidth}px`;
	fullImageOverlay.style.height = `${coverHeight}px`;
	fullImageOverlay.style.top = `${topLeftGridItem.offsetTop + gapSize * 0.65}px`;
	fullImageOverlay.style.left = `${topLeftGridItem.offsetLeft + gapSize * 0.63}px`;
	fullImageOverlay.style.display = 'none'; // Initially hidden
	gridContainer.appendChild(fullImageOverlay);

	fullImageOverlay.addEventListener('mouseout', () => {
		fullImageOverlay.style.display = 'none';
	});
	if (projectId) {//The case of cover, click goes to the project
		let action = () => {
			setupGrid(null, projectId);
			fullImageOverlay.style.display = 'none';
		}
		// gridItem.addEventListener('click', action);
		fullImageOverlay.addEventListener('click', action);
	}
	if (pdfPath.length > 0) {
		let action = () => {
			console.log("try to view pdf at:", pdfPath)
			openPDFModal(pdfPath)
		}
		fullImageOverlay.addEventListener('click', action);
	}

	for (let dx = 0; dx < layoutDimension.x; dx++) {
		for (let dy = 0; dy < layoutDimension.y; dy++) {
			const gridItem = findGridItemByCoordsFromGC(gridContainer, topLeftCoords.x + dx, topLeftCoords.y + dy);
			if (gridItem) {

				// Assuming 'gridItem' is your grid item DOM element
				const invisibleElement = document.createElement('div');

				// Style the element to be full size but invisible
				// invisibleElement.style.position = 'absolute';
				invisibleElement.style.top = '0';
				invisibleElement.style.left = '0';
				invisibleElement.style.width = '100%';
				invisibleElement.style.height = '100%';
				invisibleElement.style.padding = '30px'; // Adjust padding as needed
				invisibleElement.style.pointerEvents = 'auto'; // Ensure it can be interacted with
				invisibleElement.style.opacity = '0'; // Make it transparent



				// Invisible img tag for SEO and accessibility
				const img = document.createElement('img');
				img.src = imageUrl;
				img.alt = title;
				img.style.position = 'absolute';
				img.style.left = `${-dx * (cellSize + gapSize * 2)}px`;
				img.style.top = `${-dy * (cellSize + gapSize * 2)}px`;
				img.style.width = `${layoutDimension.x * cellSize + (layoutDimension.x - 1) * gapSize * 2}px`;
				img.style.height = `${layoutDimension.y * cellSize + (layoutDimension.y - 1) * gapSize * 2}px`;
				img.style.overflow = 'hidden';

				img.onerror = function () {
					this.onerror = null; // Prevent infinite loop if the blank image also fails
					this.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBA=='; // Blank image
					this.alt = '...';
				};

				if (projectId) {//The case of cover, click goes to the project
					let action = () => {
						setupGrid(null, projectId);
						fullImageOverlay.style.display = 'none';
					}
					// gridItem.addEventListener('click', action);
					img.addEventListener('click', action);
				}

				gridItem.appendChild(img);




				// Append the invisible element to the grid item
				gridItem.appendChild(invisibleElement);


				if (isMobileDevice()){
					if (projectId) {//The case of cover, click goes to the project
						let action = () => {
							setupGrid(null, projectId);
							fullImageOverlay.style.display = 'none';
						}
						// gridItem.addEventListener('click', action);
						invisibleElement.addEventListener('click', action);
					}
				} else {
					// Mouse events to toggle full image overlay
					invisibleElement.addEventListener('mouseover', () => {
						fullImageOverlay.style.display = 'block';
					});
				}
 


				// Add clickable functionality if projectId is present


				// Add title to the bottom-right cell
				if (dx === layoutDimension.x - 1 && dy === layoutDimension.y - 1) {
					const titleElement = document.createElement('div');
					titleElement.className = 'grid-item-title'; // Class name for styling
					titleElement.textContent = title;
					gridItem.appendChild(titleElement);
				}
			}
		}
	}
}


/*----------------------------------------------------O/P----------------------------------------------------*/
function updateKValue(input) {
	let targetK;

	if (input < 0) {
		targetK = 19.8;
	} else if (input < 1000) {
		targetK = 9.8;
	} else {
		targetK = 0.8;
	}

	if (currentInterval) {
		clearInterval(currentInterval);
	}

	const startK = k; // Store the initial value of k
	currentStep = 0; // Reset current step

	currentInterval = setInterval(() => {
		currentStep++;
		let angle = angleIncrement * currentStep;
		let increment = 0.05 * Math.sin(angle); // Increment goes from 0 to 0.05 to 0

		if (k < targetK) {
			k += increment;
			if (k > targetK) {
				k = targetK; // Ensure k does not exceed target
			}
		} else if (k > targetK) {
			k -= increment;
			if (k < targetK) {
				k = targetK; // Ensure k does not fall below target
			}
		}

		if (currentStep >= steps) {
			clearInterval(currentInterval);
			if (k !== targetK) {
				k = targetK; // Final correction to ensure exact target is met
			}
		}
	}, 5); // Adjust this rate to control how fast k changes
}
/*----------------------------------------------------S----------------------------------------------------*/

function visualizeGridMapForTesting(gridMap) {
	// Start with an empty string that will represent the entire grid
	let gridVisualization = "";

	// Adjusted iteration order to conform to the specified coordinate system
	// Iterate through each row based on Y coordinate
	for (let y = 0; y < gridMap[0].length; y++) {
		// Assuming 4 rows as per your description
		// For each row, iterate through each column based on X coordinate
		for (let x = 0; x < gridMap.length; x++) {
			// Assuming 6 columns as per your description
			// Append 'X' for each cell, as specified
			gridVisualization += gridMap[x][y] ? "✓ " : "X ";
		}
		// Add a newline at the end of each row, trimming the trailing space for formatting
		gridVisualization = gridVisualization.trim() + "\n";
	}

	// Output the final grid visualization to the console
	console.log(gridVisualization);
}



/*----------------------------------------------------V----------------------------------------------------*/