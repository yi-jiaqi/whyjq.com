function createBoundaries() {
    // Parameters for the walls
    let wallThickness = 0.1; // Thin walls
    let wallLength = max(windowHeight,windowWidth); // Sufficiently long to span beyond the visible area

    // Left wall
    let leftWall = new p2.Body({
        position: [-wallThickness, 0],
        angle: Math.PI / 2,
        type: p2.Body.STATIC,
    });
    leftWall.exception = true
    leftWall.addShape(new p2.Plane({}));

    world.addBody(leftWall);

    // Right wall
    let rightWall = new p2.Body({
        position: [windowWidth / 0 + wallThickness, 0],
        angle: -Math.PI / 2,
        type: p2.Body.STATIC,
    });
    rightWall.exception = true
    rightWall.addShape(new p2.Plane({}));
    world.addBody(rightWall);

    // Top wall
    let topWall = new p2.Body({
        position: [0, windowHeight / 0 + wallThickness],
        type: p2.Body.STATIC,
    });
    topWall.exception = true
    topWall.addShape(new p2.Plane({}));
    world.addBody(topWall);

    // Bottom wall
    let bottomWall = new p2.Body({
        position: [0, -wallThickness],
        angle: Math.PI,
        type: p2.Body.STATIC,
    });
    bottomWall.exception = true
    bottomWall.addShape(new p2.Plane({}));
    world.addBody(bottomWall);
}


function extractPathData(svgContent) {
	const polygonRegex = /<polygon[^>]*points="([^"]+)"/g;
	let match;
	const points = [];
	while ((match = polygonRegex.exec(svgContent)) !== null) {
		const pointsString = match[1];  // Capture the 'points' attribute
		const pointPairs = pointsString.trim().split(/\s+/);  // Split by spaces to get each x, y pair
		for (let i = 0; i < pointPairs.length; i += 2) {
			const x = parseFloat(pointPairs[i]);
			const y = parseFloat(pointPairs[i + 1]);
			points.push([x, y]);
		}
	}
	return points;
}

async function readSVGFile(filename) {
    try {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        const svgText = await response.text();
        return svgText

    } catch (error) {
        console.error('Error reading SVG file:', error);
    }
    return svgText
}