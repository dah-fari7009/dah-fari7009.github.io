console.log('before');

(function(){
  'use strict';

  console.log('first step');

  new WOW().init();
  console.log('inside');

  window.addEventListener('load', () => {
    const faceObject = document.getElementById('myface');
    const kwDetails = document.getElementById('kw-details');

    console.log('event listener');
    console.log(faceObject)
    //wait for svg to load
    faceObject.onload = function() {
      const svgDoc = faceObject.contentDocument;
      console.log('loadeeeeeed');
      console.log(svgDoc);

      const colors = [
        "#e0672f",
        "#fe8a3f",
        "#feb856",
        "#9d787f",
        "#cad1c5"];

      const keywords = {
        "origin": {
          detailMap: {
            "left-eye": "from Cotonou, Benin", 
            "left-cheek": "lived in Paris, France", 
            "chin": "currently in Vancouver, Canada"
          },
          colorMap: {
            "left-eye": colors[0],
            "right-eye": colors[0],
            "left-cheek": colors[1],
            "right-cheek": colors[1],
            "chin": colors[2]

          }
        },
        "education": {
          detailMap: {
            "right-eye": "2016-2019: double BSc in Computer Science and Maths", 
            "left-cheek": "2019-2021: started MEng program in Computer Engineering", 
            "chin": "2021-2024: transferred to research-based MAsc program"
          },
          colorMap: {
            "left-eye": colors[1],
            "right-eye": colors[1],
            "left-cheek": colors[3],
            "right-cheek": colors[3],
            "chin": colors[4]

          }
        },
        "engineer": {
          detailMap: {
            "left-eye": "software dev.", 
            "right-eye":"mobile", 
            "left-cheek": "backend", 
            "chin": "software design"
          },
          colorMap: {
            "left-eye": colors[0],
            "right-eye": colors[1],
            "left-cheek": colors[3],
            "right-cheek": colors[3],
            "chin": colors[4]

          }
        },
        "research": {
          detailMap: {
            "left-eye": "automated testing", 
            "right-eye": "program analysis", 
            "left-cheek": "security", 
            "right-cheek": "quality assurance", 
            "chin": "formal methods"
          },
          colorMap: {
            "left-eye": colors[0],
            "right-eye": colors[1],
            "left-cheek": colors[2],
            "right-cheek": colors[3],
            "chin": colors[4]

          }
        }
      }

      function handleKwClick(keyword) {
        const data = keywords[keyword];
        console.log("handling click");
        console.log(data);

        const group = svgDoc.querySelector('g');
        // Remove all existing text elements before adding new ones
        const textElems = svgDoc.querySelectorAll('text');
        textElems.forEach(textElem => textElem.remove());


        Object.keys(data.colorMap).forEach(partId => {
          const partElem = svgDoc.getElementById(partId);
          //const rect = faceObject.getBoundingClientRect();
          var index = 1;
          if (partElem) {
            partElem.setAttribute('fill', data.colorMap[partId])
            const kwText = data.detailMap[partId]

            if(kwText){
              const textElem = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'text');

              //bounding box
              const bbox = partElem.getBBox();
              const bboxHeight = bbox.height;
              console.log(bbox);

              const xPosition = bbox.x + bbox.width/2//1000; // Adjust X position based on the region
                
              // Calculate the adjusted Y position to account for the negative scaling
              const yPosition = bbox.y + bbox.height/2//6000 //+ (index * 15); // This is the base Y position

              // Inverse scaling correction to get the text inside the original coordinates
              const scalingFactor = 0.1; // Based on your scale(0.1, -0.1)
              const inverseScalingFactor = 1 / scalingFactor;

              // Reverse the scaling applied by <g> transformation (scale(0.1, -0.1))
              const correctedXPosition = xPosition //* scalingFactor; // Reverse scale on X
              const correctedYPosition = yPosition //* scalingFactor; // Reverse scale on Y

              console.log("x: " +correctedXPosition+" y: "+correctedYPosition);
              console.log(kwText);

              // Here we manually flip the Y position to counteract the negative scaling.
              //const correctedYPosition = 1000;//(bbox.y + bbox.height) - yPosition;
              const svgWidth = svgDoc.documentElement.viewBox.baseVal.width;
              //const correctedXPosition = svgWidth - xPosition - bbox.width; 
              //const correctedXPosition = xPosition;
              //const correctedYPosition = yPosition;

              textElem.setAttribute('transform', 'scale(+1, -1)');
              textElem.setAttribute('x', correctedXPosition); // Adjusted X position
              textElem.setAttribute('y', -correctedYPosition);  
              textElem.setAttribute('fill', 'black'); // Text color, adjust if necessary
              textElem.setAttribute('font-size', '70em'); // Font size, adjust as necessary

              //textElem.setAttribute('transform', 'rotate(180 ' + correctedXPosition + ' ' + correctedYPosition + ')');

              textElem.textContent = kwText;

              group.append(textElem);
              //group.insertBefore(textElem, group.firstChild);
              //svgDoc.documentElement.append(textElem);
              //
              index += 1;

            }
          }
        });

        /*kwDetails.innerHTML = `
          <ul>
            ${data.details.map(detail => `<li>${detail}</li>`).join('')}
          </ul>
        `;*/
      }

      document.getElementById('kw-origin').addEventListener('click', () => handleKwClick("origin"));
      document.getElementById('kw-education').addEventListener('click', () => handleKwClick("education"));
      document.getElementById('kw-engineer').addEventListener('click', () => handleKwClick("engineer"));
      document.getElementById('kw-research').addEventListener('click', () => handleKwClick("research"));

    }

    // Check if SVG is already loaded, in case it's cached
    if (faceObject.contentDocument) {
      faceObject.onload(); // Call onload manually if already loaded
    }
  })
  
})();
