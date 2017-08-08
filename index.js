var fs = require('fs');

var appName = 'Ditto';
var MARKERS = [];
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
   console.log('Your boards are: ');
   console.log();
   console.log(boards.data);
   console.log();

});
// Get pins from a board (second parameter determines whether you want the results paginated and to include some metadata) 
pinterest.getPinsFromBoard('dream-livingroom', true, function (pins) {
    console.log('Your pins are: ');
    console.log();
    extractPins(pins);
    mapPins();
});

function extractPins(pins) {
  var pins = pins.data;
  
  for (var i = 0; i < pins.length; i++) {
    
    let pin = {};
    pin.id = pins[i].id;
    pin.description = pins[i].description;
    pin.dominant_color = pins[i].dominant_color;
    pin.link = pins[i].link;
    console.log(pins[i].images);
    pin.imageUrl = pins[i].images['237x'].url;
    pin.imageW = pins[i].images['237x'].width;
    pin.imageH = pins[i].images['237x'].height;

    
    console.log('Pin number ' + i);
    console.log('ID ' + pins[i].id);
    console.log('Description ' + pins[i].description);
    console.log('Dominant Color ' + pins[i].dominant_color);
    console.log('Link ' + pins[i].link);
    console.log('Images ' + pins[i].images);
    console.log();

    MARKERS.push(pin);
  }
  
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

function mapPins() {
  for (var i = 0; i < MARKERS.length; i++) {
    
    MARKERS[i].type = 'N/A';
    MARKERS[i].color = 'N/A';
    MARKERS[i].texture = 'N/A';
    MARKERS[i].size = 'N/A';
    MARKERS[i].material = 'N/A';
    MARKERS[i].functionality = 'N/A';
    MARKERS[i].style = 'N/A';

    var wordsDescp = MARKERS[i].description.split(' ');
    MARKERS[i].type = mapTypes(wordsDescp);
    MARKERS[i].color = mapColors(wordsDescp);
    MARKERS[i].texture = mapTextures(wordsDescp);
    MARKERS[i].size = mapSizes(wordsDescp);
    MARKERS[i].material = mapMaterials(wordsDescp);
    MARKERS[i].functionality = mapFunctions(wordsDescp);
    MARKERS[i].style = mapStyles(wordsDescp);
    
    writeFile(csv(MARKERS[i]));
  }
  // console.log(MARKERS);
}

function csv(dict) {
  return Object.keys(dict).map(function(k){
    return dict[k];
  }).join(',');
}

function writeFile(data) {
  var fileName = 'map.csv';
  
  if (!fs.existsSync(fileName)) {
    fs.appendFileSync(fileName, 'ID, DESCRIPTION, DOMINANT COLOR, LINK, IMAGE URL, ' +
    'IMAGE WIDTH, IMAGE HEIGH, TYPE, COLOR, TEXTURE, SIZE, MATERIAL, FUNCTION, STYLE' + '\r\n');
  }
  fs.appendFileSync(fileName, data + '\r\n');

}
