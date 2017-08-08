var fs = require('fs');

var appName = 'Ditto';
// var MARKERS = [];
const TYPES = [
  'Armchair',
  'Bedframe',
  'Bench',
  'Blanket',
  'Chair',
  'Chaise',
  'Chandelier',
  'Coffe Table',
  'Couch',
  'Curtains',
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
  'Picture Frame',
  'Pillow',
  'Rug',
  'Side Table',
  'Tablewear',
  'Vase',
  'Wallpaper'
];

const COLORS = [
  'Beige',
  'Black',
  'Blue',
  'Brown',
  'Cream',
  'Dusty Pink',
  'Gold',
  'Green',
  'Grey',
  'Indigo',
  'Lavender',
  'Neutral',
  'Orange',
  'Purple',
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
  'Reflective',
  'Rough',
  'Smooth',
  'Soft',
  'Stained',
  'Weathered'
];
const SIZES = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'small',
  'extra small',
  'medium',
  'large',
  'extra large'
];

const MATERIALS = [
  'Bamboo',
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
  'Mirror',
  'Silk',
  'Steel',
  'Stone',
  'Velvet',
  'Wire',
  'Wood'
];

const FUNCTIONS = [
  'Decorative',
  'Lighting',
  'Sitting',
  'Sleeping',
  'Storage',
];

const STYLES = [
  'Bamboo',
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
  'Mirror',
  'Silk',
  'Steel',
  'Stone',
  'Velvet', 
  'Wire', 
  'Wood'
];

console.log('Welcome to ' + appName);
console.log();

// import 
var pinterestAPI = require('pinterest-api');
 
// Create a new object and set the accountname 
var pinterest = pinterestAPI('carlos_cerqueira');
 
 
pinterest.getBoards(true, function (boards) {
  var boards = boards.data;

  console.log('Board number: ' + boards.length);
  console.log();

  for (var i = 0; i < boards.length; i++) {
   let board = boards[i].href.split('/')[2]; // we ensure name of the board
   getPinsFromBoard(board);
  }
});

function getPinsFromBoard(boardName) {
  // Get pins from a board (second parameter determines whether you want the results paginated and to include some metadata) 
  pinterest.getPinsFromBoard(boardName, true, function (pins) {
      // console.log('Your pins are: ');
      // console.log();
      extractPins(pins, boardName);
  });
}

function extractPins(pins, boardName) {
  var pins = pins.data;
  var markers = [];
  
  for (var i = 0; i < pins.length; i++) {
    
    let pin = {};
    pin.board = boardName;
    pin.id = pins[i].id;
    pin.description = pins[i].description;
    pin.dominant_color = pins[i].dominant_color;
    pin.link = pins[i].link;
    pin.imageUrl = pins[i].images['237x'].url;
    pin.imageW = pins[i].images['237x'].width;
    pin.imageH = pins[i].images['237x'].height;

    
    console.log('Pin number ' + pin.board + ' ' + i);
    console.log('ID ' + pins[i].id);
    console.log('Description ' + pins[i].description);
    console.log('Dominant Color ' + pins[i].dominant_color);
    console.log('Link ' + pins[i].link);
    console.log('Images ' + pins[i].images);
    console.log();

    markers.push(pin);
  }
  mapPins(markers);
}

function mapTypes(words) {
  for (var i = 0; i < words.length; i++) {
    for (var j = 0; j < TYPES.length; j++) {
      if (words[i].toLowerCase() === TYPES[j].toLowerCase()) {    
        return TYPES[j];
      }
    }
  }
}

function mapColors(words) {
  for (var i = 0; i < words.length; i++) {
    for (var j = 0; j < COLORS.length; j++) {
      if (words[i].toLowerCase() === COLORS[j].toLowerCase()) {    
        return COLORS[j];
      }
    }
  }
}  

function mapTextures(words) {
  for (var i = 0; i < words.length; i++) {
    for (var j = 0; j < TEXTURES.length; j++) {
      if (words[i].toLowerCase() === TEXTURES[j].toLowerCase()) {    
        return TEXTURES[j];
      }
    }
  }
}

function mapSizes(words) {
  for (var i = 0; i < words.length; i++) {
    for (var j = 0; j < SIZES.length; j++) {
      if (words[i].toLowerCase() === SIZES[j].toLowerCase()) {    
        return SIZES[j];
      }
    }
  }
}

function mapMaterials(words) {
  for (var i = 0; i < words.length; i++) {
    for (var j = 0; j < MATERIALS.length; j++) {
      if (words[i].toLowerCase() === MATERIALS[j].toLowerCase()) {    
        return MATERIALS[j];
      }
    }
  }
}

function mapFunctions(words) {
  for (var i = 0; i < words.length; i++) {
    for (var j = 0; j < FUNCTIONS.length; j++) {
      if (words[i].toLowerCase() === FUNCTIONS[j].toLowerCase()) {    
        return FUNCTIONS[j];
      }
    }
  }
}

function mapStyles(words) {
  for (var i = 0; i < words.length; i++) {
    for (var j = 0; j < STYLES.length; j++) {
      if (words[i].toLowerCase() === STYLES[j].toLowerCase()) {    
        return STYLES[j];
      }
    }
  }
}

function mapPins(markers) {
  for (var i = 0; i < markers.length; i++) {
    
    markers[i].type = 'N/A';
    markers[i].color = 'N/A';
    markers[i].texture = 'N/A';
    markers[i].size = 'N/A';
    markers[i].material = 'N/A';
    markers[i].functionality = 'N/A';
    markers[i].style = 'N/A';

    var wordsDescp = markers[i].description.split(' ');
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
  return Object.keys(dict).map(function(k){
    return dict[k];
  }).join(',');
}

function writeFile(data) {
  var fileName = 'map.csv';
  
  if (!fs.existsSync(fileName)) {
    fs.appendFileSync(fileName, 'BOARD, ID, DESCRIPTION, DOMINANT COLOR, LINK, IMAGE URL, ' +
    'IMAGE WIDTH, IMAGE HEIGH, TYPE, COLOR, TEXTURE, SIZE, MATERIAL, FUNCTION, STYLE' +
    '\r\n');
  }
  fs.appendFileSync(fileName, data + '\r\n');

}
