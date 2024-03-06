import { JSDOM } from 'jsdom';
import { isFullHtml } from "./checkHtml.js";
import { getButtonInfo } from './extractor.js';
// const filepath = `src/microsite.html`

export function updateHtmlContent(html, allUpdatesObj) {
  const full = isFullHtml(html);
  const dom = new JSDOM(html);
  const document = dom.window.document;

  //   Update colors
  function changeBackgroundColour(allUpdatesObj) {
    const allElements = document.getElementsByTagName("div");

    for (const colorType in allUpdatesObj.backgroundColors) {
      for (let i = 0; i < allElements.length; i++) {
        let element = allElements[i];

        if (element.getAttribute("data-background-updated") === "true") {
          continue;
        }

        if (
          dom.window.getComputedStyle(element, null).backgroundColor ===
          allUpdatesObj.backgroundColors[colorType].oldBackground
        ) {
          element.style.backgroundColor =
            allUpdatesObj.backgroundColors[colorType].newBackground;
          element.setAttribute("data-background-updated", "true");
        }
      }
    }
  }

  changeBackgroundColour(allUpdatesObj);

  // Update fonts
  function changeFontFamily(allUpdatesObj) {
    const allElements = document.getElementsByTagName("p");

    for (const fontType in allUpdatesObj.fontFamily) {
      for (let i = 0; i < allElements.length; i++) {
        let element = allElements[i];

        if (
          dom.window
            .getComputedStyle(element, null)
            .fontFamily.includes(
              allUpdatesObj.fontFamily[fontType].oldFontFamily
            )
        ) {
          element.style.fontFamily =
            allUpdatesObj.fontFamily[fontType].newFontFamily;
        }
      }
    }
  }

  changeFontFamily(allUpdatesObj);

  // Update Images
  function changeImgSrc(allUpdatesObj) {
    const allElements = document.getElementsByTagName("img");

    for (const imgType in allUpdatesObj.images) {
      for (let i = 0; i < allElements.length; i++) {
        let element = allElements[i];

        if (element.src === allUpdatesObj.images[imgType].oldImageSrc) {
          element.src = allUpdatesObj.images[imgType].newImageSrc;
          if (element.closest('.col-md-displayblock')) {
            element.closest('.col-md-displayblock').style.alignItems = 'center';
            console.log(element.closest('.col-md-displayblock').outerHTML)
          }
        }
      }
    }
  }

  changeImgSrc(allUpdatesObj);

  // Update Button
  function changeButton(allUpdatesObj) {
    const allButtons = document.getElementsByClassName("btn");

    for (const buttonType in allUpdatesObj.buttons) {
      for (let i = 0; i < allButtons.length; i++) {
        const element = allButtons[i];

        const info = getButtonInfo(element);

        if (info === JSON.stringify(allUpdatesObj.buttons[buttonType].oldButton, null, 2)) {
          for (const attribute in allUpdatesObj.buttons[buttonType].newButton) {
            element.style[attribute] = allUpdatesObj.buttons[buttonType].newButton[attribute];
          }
        }
      }
    }
  }

  changeButton(allUpdatesObj);

  return full ? dom.serialize() : document.body.innerHTML;
}
