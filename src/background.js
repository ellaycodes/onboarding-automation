const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// const filepath = `src/microsite.html`

function updateHtmlContent(oldFilepath, allUpdatesObj, newFilepath) {
  const data = fs.readFileSync(oldFilepath, "utf8");
  const dom = new JSDOM(data);
  const document = dom.window.document;

  //   Update colors
  function changeBackgroundColour(allUpdatesObj) {
    const allElements = document.getElementsByTagName("div");

    for (const colorType in allUpdatesObj.backgroundColors) {
      for (let i = 0; i < allElements.length; i++) {
        let element = allElements[i];
  
        if (
          dom.window.getComputedStyle(element, null).backgroundColor ===
          allUpdatesObj.backgroundColors[colorType].oldBackground
        ) {
          element.style.backgroundColor = allUpdatesObj.backgroundColors[colorType].newBackground;
        }
      }
    }

  }

  changeBackgroundColour(
    allUpdatesObj
  );

  // Update fonts
  // function applyFontRecursively(element, fontFamily) {
  //   element.style.fontFamily = fontFamily;
  //   element.childNodes.forEach((child) => {
  //     if (child.nodeType === Node.ELEMENT_NODE) {
  //       applyFontRecursively(child, fontFamily);
  //     }
  //   });
  // }
  // if (allUpdatesObj.fonts && data.includes(allUpdatesObj.fonts.selector)) {
  //   document
  //     .querySelectorAll(allUpdatesObj.fonts.selector)
  //     .forEach((element) => {
  //       applyFontRecursively(element, allUpdatesObj.fonts.fontFamily);
  //       console.log(element.style.fontFamily, "<< FONTS");
  //     });
  // }

  function changeFontFamily(allUpdatesObj) {
    const allElements = document.getElementsByTagName("p");

    for (const fontType in allUpdatesObj.fontFamily) {
      for (let i = 0; i < allElements.length; i++) {
        let element = allElements[i];
  
        if (
          dom.window.getComputedStyle(element, null).fontFamily.includes(
          allUpdatesObj.fontFamily[fontType].oldFontFamily)
        ) {
          element.style.fontFamily = allUpdatesObj.fontFamily[fontType].newFontFamily;
        }
      }
    }

  }

  changeFontFamily(
    allUpdatesObj
  );

  // Update logos
  // if (allUpdatesObj.logos) {
  //   const logoElement = document.querySelectorAll(allUpdatesObj.logos.selector);
  //   logoElement.forEach((logo) => {
  //     logo.src = allUpdatesObj.logos.newLogoUrl;
  //     console.log(logo.src, "<< LOGO");
  //   });
  // }

  function changeImgSrc(allUpdatesObj) {
    const allElements = document.getElementsByTagName("img");

    for (const imgType in allUpdatesObj.images) {
      for (let i = 0; i < allElements.length; i++) {
        let element = allElements[i];
  
        if (
          element.src === allUpdatesObj.images[imgType].oldImageSrc)
         {
          element.src = allUpdatesObj.images[imgType].newImageSrc;
        }
      }
    }

  }

  changeImgSrc(
    allUpdatesObj
  );

  const updatedHtml = document.body.innerHTML;

  try {
    fs.writeFileSync(newFilepath, updatedHtml);
  } catch (err) {
    console.error(err);
  }

  return updatedHtml;
}

const updatesObj = {
  colors: {
    background: ".clearfix",
    color: "rgb(224, 70, 59)",
  },
  fonts: {
    selector: "p",
    fontFamily: "Garamond, sans-serif",
  },
  logos: {
    selector: "a img",
    newLogoUrl:
      "https://cdn.freebiesupply.com/logos/large/2x/nike-4-logo-png-transparent.png",
  },
};

const allUpdatesObj = {
  backgroundColors: {
    color1: {
      oldBackground: "rgb(25, 4, 199)",
      newBackground: "rgb(224, 70, 59)",
    },
    color2: {
      oldBackground: "rgb(41, 105, 176)",
      newBackground: "#cc9a05",
    },
    color3: {
      oldBackground: "rgb(0, 167, 192)",
      newBackground: "purple",
    },
    color4: {
      oldBackground: "rgb(50, 72, 152)",
      newBackground: "green",
    },
    color5: {
      oldBackground: "rgb(224, 224, 224)",
      newBackground: "orange",
    },
  },
  fontFamily: {
    font1: {
      oldFontFamily: "Arial",
      newFontFamily: "Garamond",
    },
    font2: {
      oldFontFamily: "sans-serif",
      newFontFamily: "Courier New",
    },
  },
  images: {
      img1: {
        oldImageSrc: "https://s3.eu-west-2.amazonaws.com/force24-assets/Microsites/ab1ab55c-de0b-4171-ae5e-0161fe7ef607/16748/images/grey4.jpg",
        newImageSrc: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg",
      },
      img2: {
        oldImageSrc: "https://s3.eu-west-2.amazonaws.com/force24-assets/Microsites/ab1ab55c-de0b-4171-ae5e-0161fe7ef607/16748/images/textured_dark_grey_dg_foil_27.png",
        newImageSrc: "https://t3.ftcdn.net/jpg/04/40/29/94/360_F_440299419_s4b12RfNDJvpplheVDmKdhFGJiHlAYNs.jpg",
      },
      img3: {
        oldImageSrc: "https://s3.eu-west-2.amazonaws.com/force24-assets/Microsites/ab1ab55c-de0b-4171-ae5e-0161fe7ef607/16748/images/f24-l.png",
        newImageSrc: "https://cdn.freebiesupply.com/logos/large/2x/nike-4-logo-png-transparent.png",
      },
  },
  
};

updateHtmlContent(
  `src/microsite.html`,
  allUpdatesObj,
  `src/${Date.now()}-updated-microsite.html`
);

module.exports = { updateHtmlContent };
