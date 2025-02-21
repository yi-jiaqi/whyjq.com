function placeMS(gridContainer, targetCells, listOfObjects) {
  listOfObjects.forEach((obj) => {
    // const targetCell = targetCells.shift(); // Remove and get the first target cell
    const randomIndex = Math.floor(Math.random() * targetCells.length);

    const targetCell = targetCells[randomIndex];
    targetCells.splice(randomIndex, 1);
    if (!targetCell) {
      console.log("No more target cells left.");
      return; // If no target cells left, skip
    }

    const gridItem = findGridItemByCoordsFromGC(gridContainer, targetCell.x, targetCell.y);
    if (gridItem) {
      const contentContainer = document.createElement("div");
      contentContainer.classList.add("object-content"); // Mark it for easy identification
      contentContainer.innerHTML = obj.html; // Set new HTML content
      gridItem.appendChild(contentContainer);
      // gridItem.classList.add("pattern-cross-dots-sm");
      gridItem.addEventListener('click', obj.action);
    } else {
      console.log(`No grid item found at x=${targetCell.x}, y=${targetCell.y}`);
    }
  });
}

function placeMM_Cover(gridContainer, gridMap, obd) {
  /*This function computes where to put the image. The execution is in placeImageInLayout */
  console.log("placeMM_Cover")
  Object.entries(obd).forEach(([dimensionKey, objects]) => {
    const [dimX, dimY] = dimensionKey.split("x").map(Number); // Convert "NxM" to [N, M]
    // console.log(objects.length)
    if (objects.length > 0) {
      objects.forEach((obj) => {
        let placed = false; // Track if the object has been placed
        // Iterate over gridMap to find a placement
        for (let x = 0; x <= gridMap.length - dimX && !placed; x++) {
          for (let y = 0; y <= gridMap[0].length - dimY && !placed; y++) {
            let availability = true;

            // Check if all sub-positions required for object are unoccupied
            for (let dx = 0; dx < dimX && availability; dx++) {
              for (let dy = 0; dy < dimY && availability; dy++) {
                if (gridMap[x + dx][y + dy]) {
                  // Check if cell is already occupied
                  availability = false;
                }
              }
            }

            if (availability) {
              // If all required cells are available
              // Mark required cells as occupied in gridMap
              for (let dx = 0; dx < dimX; dx++) {
                for (let dy = 0; dy < dimY; dy++) {
                  gridMap[x + dx][y + dy] = true;
                }
              }

              // Prepare parameters for placing the image
              const topLeftCoords = { x: x + 1, y: y + 1 }; // Convert to 1-indexed coordinates
              const layoutDimension = { x: dimX, y: dimY };
              const imageUrl = obj.coverPicture;
              const title = obj.title;

              // gridItem.classList.add('pattern-cross-dots-sm');
              // Place the image
              placeImageInLayout(gridContainer, topLeftCoords, layoutDimension, imageUrl, title, obj.id);
              placed = true; // Mark as placed to break out of the loop
            }
          }
        }
      });
    }
  });
}

function placeMM_Content(gridContainer, gridMap, objects, pdfPath = '') {//objects here are elements of the project
  console.log("placeMM_Content");
  objects.forEach((item) => {
    let dimX = item.dimension?.x || 1; // Default dimension x is 1 if not specified
    let dimY = item.dimension?.y || 1; // Default dimension y is 1 if not specified

    // Function to check and place the item
    const tryPlaceItem = (dx, dy) => {
      for (let x = 0; x <= gridMap.length - dx; x++) {
        for (let y = 0; y <= gridMap[0].length - dy; y++) {
          if (isAvailable(x, y, dx, dy)) {
            markOccupied(x, y, dx, dy);
            placeItem(x, y, dx, dy, item, pdfPath);
            return true;
          }
        }
      }
      return false;
    };

    // Try placing the item with initial dimensions
    if (!tryPlaceItem(dimX, dimY)) {
      // Try adjusting dimensions if initial placement fails
      let largerDimension = sumX > sumY ? 'x' : 'y';
      if (largerDimension === 'x') {
        dimX += 1; // Increase the dimension along the X-axis
      } else {
        dimY += 1; // Increase the dimension along the Y-axis
      }

      // Try placing again with adjusted dimensions
      if (!tryPlaceItem(dimX, dimY)) {
        console.error('Unable to place item:', item);
      }
    }
  });

  function isAvailable(x, y, dx, dy) {
    for (let i = 0; i < dx; i++) {
      for (let j = 0; j < dy; j++) {
        if (gridMap[x + i][y + j]) return false;
      }
    }
    return true;
  }

  function markOccupied(x, y, dx, dy) {
    for (let i = 0; i < dx; i++) {
      for (let j = 0; j < dy; j++) {
        gridMap[x + i][y + j] = true;
      }
    }
  }

  function placeItem(x, y, dx, dy, item, pdfPath) {//item here is the element of the project
    const topLeftCoords = { x: x + 1, y: y + 1 };
    const layoutDimension = { x: dx, y: dy };
    let gridItem = findGridItemByCoordsFromGC(gridContainer, topLeftCoords.x, topLeftCoords.y);  // Declare gridItem once here

    if (gridItem) {
      const contentContainer = document.createElement("div");
      contentContainer.classList.add("object-content");

      contentContainer.style.display = 'flex';  // Use flexbox for alignment
      contentContainer.style.flexDirection = 'column';  // Stack children vertically
      contentContainer.style.alignItems = 'flex-start';  // Align children to the left
      contentContainer.style.justifyContent = 'flex-start';  // Align children to the top


      switch (item.kind) {
        case 'picture':
          placeImageInLayout(gridContainer, topLeftCoords, layoutDimension, item.content, item.title, item.id, pdfPath);
          break;

        case 'link':
          let linkElement = document.createElement('a');
          linkElement.href = item.link;  // Set the href to the item's link
          linkElement.target = '_blank'; // Ensure it opens in a new tab
          linkElement.style.textDecoration = 'none'; // Optional: removes underline from the link
          // let explanationClickable = false;
          if (item.content) {
            if (item.content.endsWith('.svg')) {
              let img = new Image();
              img.onload = function () {
                console.log("SVG loaded successfully");
                if (item.content.includes('youtube')) { img.style.maxWidth = '50%'; } else { img.style.maxWidth = '25%'; }
                img.style.height = 'auto';
                img.style.display = 'block';
                linkElement.appendChild(img);  // Append the image to the link element
              };
              img.onerror = function () {
                console.error("Failed to load SVG at", item.content);
              };
              img.src = item.content;
              img.alt = "SVG Image";
            } else if (item.content.endsWith('.png')) {
              linkElement.innerHTML = `<img src="${item.content}" alt=" " style="max-width: 50%; height: auto; display: block;">`;
            }
          } 

          contentContainer.appendChild(linkElement);

          if (item.explanation) {
            let explanationText = document.createElement('p');
            explanationText.textContent = item.explanation;
            explanationText.style.textAlign = 'left';
            explanationText.style.marginTop = '10px';
            explanationText.style.fontFamily = 'helvetica';
            explanationText.style.fontSize = 'calc(var(--grid-size) / 8)';
            explanationText.style.overflowWrap = 'break-word';
            explanationText.style.fontWeight = 'bold';
            explanationText.style.color = 'black';
            // Add underline if there's no content
            if (!item.content) {
              explanationText.style.textDecoration = 'underline';
            }
            linkElement.appendChild(explanationText);
          }

          gridItem.appendChild(contentContainer);
          gridItem.style.backgroundColor = 'rgba(249, 249, 249, 0.5)'; // Adjust the transparency as needed

          break;


        case 'text':
          contentContainer.innerHTML = item.content;
          // contentContainer.style.padding = '10px'; // Add padding around the text
          // contentContainer.style.border = '1px solid #ccc'; // Optional: add a border
          // contentContainer.style.margin = '15px'; // Optional: add some margin
          if (item.smaller) {
            contentContainer.style.fontSize = 'calc(var(--grid-size) / 10)';
          } else if (item.bigger) {
            contentContainer.style.fontSize = 'calc(var(--grid-size) / 8)';
            contentContainer.style.fontWeight = 'bold';
          } else {
            contentContainer.style.fontSize = 'calc(var(--grid-size) / 9)';
          }
          contentContainer.style.fontFamily = 'helvetica'; // Optional: add some margin

          contentContainer.style.overflowWrap = 'break-word'; // Break long words to prevent overflow
          gridItem.style.backgroundColor = 'rgba(249, 249, 249, 0)'; // Completely transparent
          gridItem.appendChild(contentContainer);
          break;
      }
    }
  }

}



function placeSS(gridContainer, object, coord, fromGridArray) {
  /*Remember coord is 1-indexed */
  const targetCell = findGridItemByCoordsFromGC(gridContainer, coord[0], coord[1]);
  const index = fromGridArray.findIndex((item) => item.x === coord[0] && item.y === coord[1]);
  if (index !== -1) fromGridArray.splice(index, 1);
  var specificContainer = document.createElement("div");
  specificContainer.classList.add("object-content");
  specificContainer.innerHTML = object.html;
  if (object.action) targetCell.addEventListener('click', object.action);
  targetCell.appendChild(specificContainer);
  targetCell.classList.add("pattern-cross-dots-sm");
}



