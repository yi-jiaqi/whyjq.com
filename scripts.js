let surroundingCells;
let gridContainer;
let gridMap;
let sumX, sumY;
let currentType = -1;
let currentGridSize = 0;
let currentGridContainerXOffset = 0;
let currentGridContainerYOffset = 0;
const canvasDivision = 5;
const gapProportion = 0.02;

var k = 10.8;
let currentInterval = null;
let duration = 50000; // Duration of the transition in milliseconds
let steps = duration / 50; // Number of steps based on the interval delay
let angleIncrement = (Math.PI / steps); // Full PI range covered over the transition

let autoHoverInterval;
let userHasInteracted = false;

function startAutoHover() {
  // Get all elements that have hover effects
  const elementsWithHover = Array.from(document.styleSheets)
    .flatMap(sheet => {
      try {
        return Array.from(sheet.cssRules);
      } catch {
        return [];
      }
    })
    .filter(rule => rule.selectorText?.includes(':hover'))
    .map(rule => rule.selectorText.split(':hover')[0])
    .flatMap(selector => Array.from(document.querySelectorAll(selector)));

  let currentIndex = 0;

  // Stop auto-hover if user interacts with any element
  document.addEventListener('mouseover', () => {
    userHasInteracted = true;
    if (autoHoverInterval) {
      clearInterval(autoHoverInterval);
      autoHoverInterval = null;
    }
  }, { once: true });

  // Start the interval
  autoHoverInterval = setInterval(() => {
    if (userHasInteracted) {
      clearInterval(autoHoverInterval);
      return;
    }

    // Remove hover from previous element
    if (currentIndex > 0) {
      const prevElement = elementsWithHover[currentIndex - 1];
      prevElement?.dispatchEvent(new Event('mouseout'));
    }

    // Add hover to current element
    const element = elementsWithHover[currentIndex];
    if (element) {
      element.dispatchEvent(new Event('mouseover'));

      // Remove hover effect after 1 second
      setTimeout(() => {
        if (!userHasInteracted) {
          element.dispatchEvent(new Event('mouseout'));
        }
      }, 1000);
    }

    // Move to next element or reset to beginning
    currentIndex = (currentIndex + 1) % elementsWithHover.length;
  }, 2000); // Trigger every 2 seconds
}


function setupGrid(event, type = -1) {
  currentType = type;
  updateURL(type)
  if (type == -1) {
    console.log("------------------- [Initiated] -------------------");
  } else if (type < 100) {
    console.log("------------------- ", type, ":", categoryTags[type], " -------------------");
  } else {

  }
  updateKValue(type)

  let X = window.innerWidth;
  let Y = window.innerHeight;
  let D = 0.05 * Math.min(X, Y);
  let n = canvasDivision;
  let sd = gapProportion;
  let s = (Math.min(X, Y) - 2 * D) / (n + sd * (n - 1));
  let d = sd * s;
  let newX, newY;

  document.documentElement.style.setProperty("--grid-size", `${s}px`);
  document.documentElement.style.setProperty("--grid-gap", `${d}px`);
  let m = Math.floor((Math.max(X, Y) - 2 * D + d) / (s + d));
  currentGridSize = s;
  currentGridContainerYOffset = D;
  currentGridContainerXOffset = (Math.max(X, Y) - m * s - (m - 1) * d) / 2
  gridContainer = document.querySelector(".grid-container");
  clearGridItems(gridContainer);

  if (X <= Y) {
    // If X is the shorter side (or equal, treating X as the shorter side)
    // Columns are determined by n, and rows by m
    gridContainer.style.gridTemplateColumns = `repeat(${n}, ${d + s}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${m}, ${d + s}px)`;
    // Adjusting Y: (n is tied to shorter side)
    newY = m * s + (m - 1) * d;
    newX = X;
    surroundingCells = calculateSurroundingCells(n, m);
    sumX = n;
    sumY = m;
  } else {
    gridContainer.style.gridTemplateColumns = `repeat(${m}, ${d + s}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${n}, ${d + s}px)`;
    newX = m * s + (m - 1) * d;
    newY = Y;
    surroundingCells = calculateSurroundingCells(m, n);
    sumX = m;
    sumY = n;
  }

  gridContainer.style.setProperty("--grid-container-width", `${newX}px`);
  gridContainer.style.setProperty("--grid-container-height", `${newY}px`);

  let totalItems = n * m; // Total number of items needed
  // let gridItems = Array.from(gridContainer.children);

  for (let i = 0; i < totalItems; i++) {
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    // gridItem.classList.add("pattern-cross-dots-sm"); // Here to add texture for each grid.
    gridItem.classList.add("bg-white");
    gridItem.classList.add("hidden"); // Start with the item hidden

    // Calculate coordinates based on the loop index and grid structure
    let x, y;
    if (X <= Y) {
      x = (i % n) + 1; // Column index starts from 1
      y = Math.floor(i / n) + 1; // Row index starts from 1
    } else {
      x = (i % m) + 1; // Column index starts from 1
      y = Math.floor(i / m) + 1; // Row index starts from 1
    }
    // Set data-x and data-y attributes to gridItem
    gridItem.setAttribute("data-x", x.toString());
    gridItem.setAttribute("data-y", y.toString());

    // if (event && event.type === "DOMContentLoaded") {
    // if (existingItems < totalItems) {
    gridContainer.appendChild(gridItem);
    // }
    // }

    setTimeout(() => {
      gridItem.classList.remove('hidden'); // Remove the 'hidden' class to trigger the appearance transition
    }, 500);
  }
  // console.log(gridContainer)
  gridMap = createGridMap(gridContainer, sumX, sumY);
  setTimeout(() => {
    gridMap = createGridMap(gridContainer, sumX, sumY);
    fillGrid(type);
  }, 500 + 50);
}


function clearGridItems(gridContainer) {
  // Selecting both grid items and any full image overlays
  const gridItems = gridContainer.querySelectorAll('.grid-item, .grid-item-full-image');
  gridItems.forEach(item => {
    item.classList.add('hidden'); // Start transition to fade out
    setTimeout(() => item.remove(), 500); // Remove the item after the transition
  });
}



function fillGrid(type) {
  if (type == -2) {
    placeSS(gridContainer, logo, [1, 1], surroundingCells);
    placeSS(gridContainer, buttons[2], [sumX, 1], surroundingCells);
    checkPreExistingItems(gridContainer, gridMap);
    placeMM_Content(gridContainer, gridMap, myself.elements)
  } else if (type == -1) {
    //-----------------------------------------------------DEFAULT-----------------------------------------------------
    // placeSS(gridContainer,buttons[3],[sumX, sumY],surroundingCells);
    placeSS(gridContainer, logo, [1, 1], surroundingCells);

    let groupMustSee = filterWithIDs(projectObjects, mustSee);
    let groupNotMust = filterUnqualifiedItems(projectObjects, mustSee, 8);
    let selectedProjects = groupMustSee.concat(groupNotMust)
    let objectsByDimension = groupByDimension(selectedProjects);

    let checkedCategoryObjects = [];
    for (let i = 0; i < maxCategory; i++) {
      if (filterWithCode(projectObjects, i).length > 0) {
        let qualifiedCategoryArray = categoryObjects.filter(category => category.type === i)
        checkedCategoryObjects.push(qualifiedCategoryArray[0])
      }
    }

    placeMS(gridContainer, surroundingCells, checkedCategoryObjects);
    checkPreExistingItems(gridContainer, gridMap);
    placeMM_Cover(gridContainer, gridMap, objectsByDimension);
  } else if (isTwoOrOneDigit(currentType)) {
    //-----------------------------------------------------CATEGORY-----------------------------------------------------
    // let selectedProjects = filterByTag(projectObjects, categoryTags[type]);

    console.log("current category:", type, "projects:", getTheLargestIndexOfThisType(type))
    let selectedProjects = filterWithCode(projectObjects, type);
    // console.log(availablePrevious(),availableNext())
    if (availableNext() <= maxCategory) {
      if (availablePrevious() > 0) {
        placeSS(
          gridContainer,
          buttons[1],
          [2, sumY],
          surroundingCells
        );
      } else {
        placeSS(
          gridContainer,
          buttons[1],
          [1, sumY],
          surroundingCells
        );
      }
    }
    if (availablePrevious() > 0) {
      placeSS(
        gridContainer,
        buttons[0],
        [1, sumY],
        surroundingCells
      );
    }
    placeSS(
      gridContainer,
      buttons[2],
      [sumX, 1],
      surroundingCells
    );
    checkPreExistingItems(gridContainer, gridMap);
    let objectsByDimension;
    if (sumX * sumY <= canvasDivision * (canvasDivision + 2)) { objectsByDimension = groupByDimension(selectedProjects, true); } else { objectsByDimension = groupByDimension(selectedProjects); }
    // console.log("obd:", objectsByDimension);
    placeMM_Cover(gridContainer, gridMap, objectsByDimension);
    checkPreExistingItems(gridContainer, gridMap);

  } else {
    /*

    -----------------------------------------------------PROJECTS-----------------------------------------------------
    0. enlarge the grid container to be 4 * n
    1. Put the title, back, previous and next at top left two and bottom left two or left bottom two;
    2. Put the image in 2*4, 4*2, 3*3;
    3. Put the elements
    */
    let showPrevious = !(type - Math.floor(type / 1000) * 1000 == 1);
    console.log("current category:", Math.floor(type / 1000), "projects:", getTheLargestIndexOfThisType(Math.floor(type / 1000)))
    console.log("showPrevious:", showPrevious, type - Math.floor(type / 1000) * 1000)
    let showNext = !(
      getTheLargestIndexOfThisType(Math.floor(type / 1000)) +
      Math.floor(type / 1000) * 1000 ==
      type
    );
    console.log("showNext:", showNext, getTheLargestIndexOfThisType(Math.floor(type / 1000)))
    let project = findProjectById(type);
    let titleObject = createHtmlObject(project.title, project.tags[0], project.year);
    placeSS(
      gridContainer,
      titleObject,
      [1, 1],
      surroundingCells
    );
    placeSS(
      gridContainer,
      buttons[2],
      [sumX, 1],
      surroundingCells
    );//1-1 place the title, back
    if (project.dimension.x == 3 && project.dimension.y == 3) {
      if (showPrevious)
        placeSS(
          gridContainer,
          buttons[0],
          [1, sumY - 1],
          surroundingCells
        );
      if (showNext)
        placeSS(
          gridContainer,
          buttons[1],
          [1, sumY]
        );
    } else {
      if (showPrevious)
        placeSS(
          gridContainer,
          buttons[0],
          [1, sumY],
          surroundingCells
        );
      if (showNext)
        if (showPrevious) {
          placeSS(
            gridContainer,
            buttons[1],
            [2, sumY],
            surroundingCells
          );
        } else {
          placeSS(
            gridContainer,
            buttons[1],
            [1, sumY],
            surroundingCells
          );

        }
    } //1-2 place the previous and next
    //1-3 place images & dimensions + introductions (as 1 grid)
    checkPreExistingItems(gridContainer, gridMap);
    placeMM_Content(gridContainer, gridMap, project.elements, project.pdf)
  }

  setupCaptionContainer();
}


function setupCaptionContainer() {
    // Instead of setting up new caption management, just initialize the captionManager
    const captionContainer = document.getElementById('caption-container');
    if (!captionContainer) {
        console.error('Caption container not found in DOM');
        return;
    }

    // Initialize the global captionManager
    window.captionManager = createCaptionManager();

    // No need to clone or replace grid container
    const gridContainer = document.querySelector('.grid-container');
    
    // Set up delegate event listener for grid items
    gridContainer.addEventListener('mouseenter', (event) => {
        const gridItem = event.target.closest('.grid-item');
        if (gridItem) {
            const title = gridItem.querySelector('.grid-item-title');
            if (title && title.textContent) {
                window.captionManager.updateCaption(title.textContent);
            }
        }
    }, true);
}
