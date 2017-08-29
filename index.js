const fs = require('fs');
const pinterestAPI = require('pinterest-api');

const appName = 'Ditto';
// var MARKERS_DATA_FILE = [];
const TYPES = [
  'Armchair',
  'Art',
  'Bedframe',
  'Bench',
  'Blanket',
  'Cabinet',
  'Chair',
  'Chaise',
  'Chandelier',
  'Coffe Table',
  'Cushion',
  'Curtains',
  'Dining Chair',
  'Dining Storage',
  'Dining Table',
  'Dresser',
  'Duvet',
  'Floor Lamp',
  'Hutch',
  'Lamp',
  'Mattress',
  'Mirror',
  'Nightstand',
  'Ottoman',
  'Paint',
  'Photograph',
  'Picture Frame',
  'Pillow',
  'Plant',
  'Rug',
  'Shelf',
  'Side Board',
  'Side Table',
  'Sofa',
  'Tablewear',
  'Vase',
  'Wallpaper',
];

const COLORS = [
  'Beige',
  'Black',
  'Black-Brown',
  'Blue',
  'Brown',
  'Clear',
  'Copper',
  'Cream',
  'Dusty Pink',
  'Gold',
  'Green',
  'Grey',
  'Indigo',
  'Lavender',
  'Multi-colour',
  'Neutral',
  'Orange',
  'Purple',
  'Red',
  'Red-Brown',
  'Silver',
  'Sky Blue',
  'Tan',
  'White',
  'Yellow',
];

const TEXTURES = [
  'Bumpy',
  'Fluffy',
  'Furry',
  'Plush',
  'Quilted',
  'Patterned',
  'Reflective',
  'Rough',
  'Smooth',
  'Soft',
  'Stained',
  'Weathered',
];
const SIZES = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'Extra Small',
  'Small',
  'Medium',
  'Large',
  'Extra Large',
];

const MATERIALS = [
  'Bamboo',
  'Barnwood',
  'Brass',
  'Brick',
  'Burlap',
  'Canvas',
  'Ceramic',
  'Cotton',
  'Fur',
  'Glass',
  'Knit',
  'Leather',
  'Marble',
  'Metal',
  'Mirror',
  'Plastic',
  'Silk',
  'Steel',
  'Stone',
  'Velvet',
  'Wire',
  'Wood',
  'Wool',
];

const FUNCTIONS = [
  'Decorative',
  'Lighting',
  'Sitting',
  'Sleeping',
  'Storage',
];

const STYLES = [
  'Antique',
  'Bohemian',
  'Bright',
  'Chic',
  'Classic',
  'Clean',
  'Country',
  'Cozy',
  'Exotic',
  'Feminine',
  'Fresh',
  'Funky',
  'Geometric',
  'Industrial',
  'Masculine',
  'Minimalist',
  'Modern',
  'Polished',
  'Posh',
  'Organic',
  'Rustic',
  'Simple',
  'Sleek',
  'Vintage',
];

console.log(`Welcome to ${appName}`);

if (!process.env.PIN_USERNAME || !process.env.BOARDS || process.env.BOARDS === '' ||
    process.env.PIN_USERNAME === '') {
  console.error('Error :: Missing parameters (PIN_USERNAME or BOARDS).');
  return;
}

const PIN_USERNAME = process.env.PIN_USERNAME.trim().toLowerCase();
const USER_BOARDS = process.env.BOARDS.split(',');
console.log(`Username: ${PIN_USERNAME} Boards: ${USER_BOARDS}`);

// Create a new object and set the accountname
// var pinterest = pinterestAPI('carlos_cerqueira');
const pinterest = pinterestAPI(PIN_USERNAME);

if (process.env.GET_BOARDS) {
  pinterest.getBoards(true, (boards) => {
    var boards = boards.data;

    console.log(`Number of Boards: ${boards.length}`);
    console.log(boards);

    // for (var i = 0; i < boards.length; i++) {
    //  let board = boards[i].href.split('/')[2]; // we ensure name of the board
    //  getPinsFromBoard(board);
    // }
  });
}

for (let i = 0; i < USER_BOARDS.length; i++) {
  console.log(`Processing.. ${i + 1}/${USER_BOARDS.length}`);
  getPinsFromBoard(USER_BOARDS[i].trim().toLowerCase());
}

function getPinsFromBoard(boardName) {
  // Get pins from a board (second parameter determines whether you want the results paginated and to include some metadata)
  pinterest.getPinsFromBoard(boardName, true, (pins) => {
    extractPins(pins, boardName);
  });
}

function extractPins(pins, boardName) {
  var pins = pins.data;
  let markers = [];

  for (let i = 0; i < pins.length; i++) {
    let pin = {};
    pin.board = boardName;
    pin.id = pins[i].id;
    pin.description = pins[i].description.replace(/,/g, '');
    pin.dominant_color = pins[i].dominant_color;
    pin.link = pins[i].link;
    pin.imageUrl = pins[i].images['237x'].url;
    pin.imageW = pins[i].images['237x'].width;
    pin.imageH = pins[i].images['237x'].height;

    // console.log('Pin number ' + pin.board + ' ' + i);
    // console.log('ID ' + pins[i].id);
    // console.log('Description ' + pins[i].description);
    // console.log('Dominant Color ' + pins[i].dominant_color);
    // console.log('Link ' + pins[i].link);
    // console.log('Images ' + pins[i].images);
    // console.log();

    markers.push(pin);
  }
  mapPins(markers);
}

function mapTypes(words) {
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < TYPES.length; j++) {
      if (words[i].toLowerCase() === TYPES[j].toLowerCase()) {
        return TYPES[j];
      }
    }
  }
}

function mapColors(words) {
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < COLORS.length; j++) {
      if (words[i].toLowerCase() === COLORS[j].toLowerCase()) {
        return COLORS[j];
      }
    }
  }
}

function mapTextures(words) {
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < TEXTURES.length; j++) {
      if (words[i].toLowerCase() === TEXTURES[j].toLowerCase()) {
        return TEXTURES[j];
      }
    }
  }
}

function mapSizes(words) {
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < SIZES.length; j++) {
      if (words[i].toLowerCase() === SIZES[j].toLowerCase()) {
        return SIZES[j];
      }
    }
  }
}

function mapMaterials(words) {
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < MATERIALS.length; j++) {
      if (words[i].toLowerCase() === MATERIALS[j].toLowerCase()) {
        return MATERIALS[j];
      }
    }
  }
}

function mapFunctions(words) {
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < FUNCTIONS.length; j++) {
      if (words[i].toLowerCase() === FUNCTIONS[j].toLowerCase()) {
        return FUNCTIONS[j];
      }
    }
  }
}

function mapStyles(words) {
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < STYLES.length; j++) {
      if (words[i].toLowerCase() === STYLES[j].toLowerCase()) {
        return STYLES[j];
      }
    }
  }
}

function mapPins(markers) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].type = 'N/A';
    markers[i].color = 'N/A';
    markers[i].texture = 'N/A';
    markers[i].size = 'N/A';
    markers[i].material = 'N/A';
    markers[i].functionality = 'N/A';
    markers[i].style = 'N/A';

    let wordsDescp = markers[i].description.split(' ');
    markers[i].type = mapTypes(wordsDescp);
    markers[i].color = mapColors(wordsDescp);
    markers[i].texture = mapTextures(wordsDescp);
    markers[i].size = mapSizes(wordsDescp);
    markers[i].material = mapMaterials(wordsDescp);
    markers[i].functionality = mapFunctions(wordsDescp);
    markers[i].style = mapStyles(wordsDescp);

    writeFile(csv(markers[i]));
  }
  // console.log(markers);
}

function csv(dict) {
  return Object.keys(dict).map((k) => dict[k]).join(',');
}

function writeFile(data) {
  const fileName = 'map.csv';

  if (!fs.existsSync(fileName)) {
    fs.appendFileSync(fileName, 'BOARD, ID, DESCRIPTION, DOMINANT COLOR, LINK, IMAGE URL, ' +
    'IMAGE WIDTH, IMAGE HEIGH, TYPE, COLOR, TEXTURE, SIZE, MATERIAL, FUNCTION, STYLE' +
    '\r\n');
  }
  fs.appendFileSync(fileName, `${data}\r\n`);
}
