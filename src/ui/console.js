import readline from 'readline';

export async function askQuestion(question, colour, isColour) {
    // let text = question + ' (press ENTER to ignore)\n';

    // if (isColour) {
    //     const rgbArray = colour.match(/\d+/g);
    //     const ansiBackgroundColor = `\x1b[48;2;${rgbArray[0]};${rgbArray[1]};${rgbArray[2]}m`;
    //     text = `${ansiBackgroundColor}${text}\x1b[0m`;
    // }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

	return new Promise((resolve) => {
        rl.question(question + ' (press ENTER to ignore)\n', (answer) => {
          rl.close();
          resolve(answer);
        });
    });
}
