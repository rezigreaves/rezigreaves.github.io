/*

A simple monochrome OLED memory/display simulator for mapping byte bits to individual pixels.

With it you can test your algorithms for masked sprites, pixel manipulation routines, line drawing routines and circle drawing.
All using a monochrome 1 byte-per-8-pixels fast response OLED screen.

The memory is contained in OLEDScreen[], the length of the array is found by the program by ((Width in OLED pixels / 8) + Height in OLED pixels).
It is calculated automatically, and can be found by OLEDScreen.length.

The RAM update is VSynced.

function loop(){} is called 60 times a second (configurable), in which you should manipulate OLEDScreen[], once loop(){} exits, the OLED display will then update.

Make sure loop(){} isn't running for more than a few milliseconds to keep the animation at 60 FPS.

*/

//Configuration
var FPS = 60; // Speed OLED is refreshed.

var OLED_Red = 90, OLED_Green = 120, OLED_Blue = 180 // Colour of the illuminated OLED pixels.

var OLEDWidth = 128; // In pixels, must be multiples of 8. (1 byte per 8 pixels)
var OLEDHeight = 64; // In pixels.


//Your program goes here:
var counter = 0;
var state = 1;
var stateCounter = 0;

var xx=0, yy=0;

function loop(){
  //Single timer to decide which one of the three display states we're in.
  stateCounter++;

  var dl = OLEDScreen.length;

  if(state==0){
    //for(var ctr = 0;ctr < 50;ctr++)
      //setPixel(rand(0, OLEDWidth), rand(0, OLEDHeight));
    if(stateCounter == 5000){
      stateCounter=0;
      state++;
    }
  }

  //Phase 1: Draw vertical bands
  if(state==1){
    for(var i = 0; i < dl; i++) OLEDScreen[i] = counter;
    if(++counter == 256){
      counter = 0;
      stateCounter=0;
      state++;
    }
  }

  if(state==2){
    for(var i = 0; i < dl; i++) OLEDScreen[i] = logo1_bytes[i];
    if(stateCounter == 300){
      stateCounter=0;
      state++;
    }
  }

  if(state==3){
    for(var i = 0; i < dl; i++) OLEDScreen[i] = logo2_bytes[i];
    if(stateCounter == 300){
      stateCounter=0;
      state = 1;
    }
  }

}

var WHITE = 1, BLACK = 2, INVERSE = 3;
var pixelColor = WHITE;
function setPixel(x, y){
  if (x >= 0 && x < OLEDWidth && y >= 0 && y < OLEDHeight) {
            debugger;
    switch (pixelColor) {
      case WHITE:   OLEDScreen[x + (y / 8) * OLEDWidth] |=  (1 << (y & 7)); break;
      case BLACK:   OLEDScreen[x + (y / 8) * OLEDWidth] &= ~(1 << (y & 7)); break;
      case INVERSE: OLEDScreen[x + (y / 8) * OLEDWidth] ^=  (1 << (y & 7)); break;
    }
  }
}

// http://www.online-utility.org/image_converter.jsp  XBM file format (text), with {} swapped with [].
var logo1_bytes = [
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x83, 0x2E, 0xEC, 0x82, 0xEF,
  0x1B, 0xC3, 0xAE, 0x07, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xEF,
  0xAC, 0xEB, 0xEE, 0xCF, 0xE9, 0xBA, 0xAE, 0xF7, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xEF, 0xAC, 0xEB, 0xEE, 0xCF, 0xE9, 0xBA, 0xAE, 0xF7,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xEF, 0xAA, 0xEB, 0xEE, 0xAF,
  0xEA, 0xBA, 0xAE, 0x07, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xEF,
  0x26, 0xEC, 0xEE, 0xAF, 0xEA, 0xBA, 0xAE, 0xF7, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xEF, 0xA6, 0xEF, 0xEE, 0xAF, 0xEA, 0xBA, 0xAE, 0xF7,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x83, 0xAE, 0x1F, 0xEF, 0x6F,
  0x1B, 0xC3, 0x31, 0x04, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80,
  0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80,
  0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC0,
  0x03, 0x0F, 0x60, 0x80, 0x3F, 0x00, 0x00, 0x80, 0xC1, 0x07, 0x00, 0x00,
  0x00, 0x00, 0x06, 0xE0, 0x87, 0x1F, 0x78, 0x80, 0x3F, 0x00, 0x00, 0x80,
  0xE1, 0x0F, 0x00, 0x00, 0x00, 0x00, 0x06, 0x70, 0xCE, 0x39, 0x7E, 0x00,
  0x38, 0x00, 0x00, 0x80, 0x31, 0x1C, 0x00, 0x00, 0x00, 0x00, 0x06, 0x70,
  0xCE, 0x39, 0x7E, 0x00, 0x38, 0x00, 0x00, 0x80, 0x31, 0x98, 0x1D, 0x38,
  0x70, 0xE0, 0x06, 0x70, 0xCE, 0x39, 0x70, 0x00, 0x38, 0x02, 0x40, 0x80,
  0xF1, 0x80, 0x3F, 0x7C, 0xF8, 0xF0, 0x07, 0x70, 0x0E, 0x38, 0x70, 0x00,
  0x18, 0x02, 0x40, 0x80, 0xE1, 0x87, 0x73, 0xC6, 0x8C, 0x39, 0x07, 0x70,
  0x0E, 0x1C, 0x70, 0x00, 0x1C, 0x52, 0x4F, 0x83, 0x81, 0x8F, 0x61, 0xFE,
  0xFC, 0x19, 0x06, 0x70, 0x0E, 0x1E, 0x70, 0x00, 0x1C, 0xCA, 0xD2, 0x84,
  0x01, 0x9C, 0x61, 0xFE, 0xFC, 0x19, 0x06, 0x70, 0x0E, 0x0E, 0x70, 0x00,
  0x1C, 0x46, 0x52, 0x84, 0x31, 0x98, 0x61, 0x06, 0x0C, 0x18, 0x06, 0x70,
  0x0E, 0x0F, 0x70, 0x00, 0x0E, 0x4A, 0x52, 0x84, 0x71, 0x9C, 0x73, 0xCE,
  0x9C, 0x39, 0x07, 0x70, 0x0E, 0x07, 0x70, 0x00, 0x0E, 0x4A, 0x52, 0x84,
  0xE1, 0x8F, 0x3F, 0x7C, 0xF8, 0xF0, 0x07, 0x70, 0x8E, 0x03, 0x70, 0x00,
  0x0E, 0x52, 0x52, 0x84, 0xC1, 0x87, 0x1D, 0x38, 0x70, 0xE0, 0x06, 0x70,
  0x8E, 0x03, 0x70, 0x0E, 0x0E, 0x00, 0x00, 0x80, 0x01, 0x80, 0x01, 0x00,
  0x00, 0x00, 0x00, 0xE0, 0xC7, 0x3F, 0x70, 0x0E, 0x07, 0x00, 0x00, 0x80,
  0x01, 0x80, 0x01, 0x00, 0x00, 0x00, 0x00, 0xC0, 0xC3, 0x3F, 0x70, 0x0E,
  0x07, 0x00, 0x00, 0x80, 0x01, 0x80, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80,
  0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80,
  0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80,
  0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80,
  0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0F,
  0x3C, 0x80, 0xC1, 0x83, 0x0F, 0x00, 0x00, 0x80, 0xF1, 0x0F, 0x7F, 0x38,
  0x38, 0x00, 0x80, 0x1F, 0x7E, 0xE0, 0xE1, 0xC7, 0x1F, 0x00, 0x00, 0x80,
  0xF1, 0x1F, 0xFF, 0x38, 0x38, 0x00, 0xC0, 0x39, 0xE7, 0xF8, 0x71, 0xCE,
  0x39, 0x00, 0x00, 0x80, 0x31, 0x38, 0xC3, 0x79, 0x3C, 0x00, 0xC0, 0x39,
  0xE7, 0xF8, 0x71, 0xCE, 0x39, 0x00, 0x00, 0x80, 0x31, 0x30, 0x83, 0x79,
  0x3C, 0x00, 0xC0, 0x39, 0x07, 0xC0, 0x71, 0xCE, 0x39, 0x00, 0x00, 0x80,
  0x31, 0x38, 0xC3, 0x59, 0x34, 0x00, 0xC0, 0x39, 0x7F, 0xC0, 0x71, 0x0E,
  0x38, 0x00, 0x00, 0x80, 0xF1, 0x1F, 0xFF, 0xD8, 0x36, 0x00, 0xC0, 0x39,
  0xFF, 0xC0, 0x71, 0x0E, 0x1F, 0xAA, 0xE9, 0x81, 0xF1, 0x07, 0x7F, 0xD8,
  0x36, 0x00, 0xC0, 0x39, 0xE7, 0xC0, 0x71, 0x0E, 0x3F, 0x66, 0x5A, 0x82,
  0x31, 0x0E, 0x03, 0xD8, 0x36, 0x00, 0xC0, 0x39, 0xE7, 0xC0, 0x71, 0x0E,
  0x38, 0x22, 0x4A, 0x82, 0x31, 0x1C, 0x03, 0x98, 0x33, 0x00, 0xC0, 0x39,
  0xE7, 0xC0, 0x71, 0xCE, 0x39, 0x22, 0x4A, 0x82, 0x31, 0x18, 0x03, 0x98,
  0x33, 0x00, 0xC0, 0x39, 0xE7, 0xC0, 0x71, 0xCE, 0x39, 0x62, 0x4A, 0x82,
  0x31, 0x38, 0x03, 0x98, 0x33, 0x00, 0xC0, 0x39, 0xE7, 0xC0, 0x71, 0xCE,
  0x39, 0xA2, 0x49, 0x82, 0x31, 0x70, 0x03, 0x18, 0x31, 0x00, 0xC0, 0x39,
  0xE7, 0xC0, 0x71, 0xCE, 0x39, 0x20, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x80, 0x1F, 0x7E, 0xC0, 0xE1, 0x87, 0x1F, 0x20, 0x00, 0x80,
  0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0F, 0x3C, 0xC0, 0xC1, 0x03,
  0x0F, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80,
  0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x01, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF ] ;

var logo2_bytes = [
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0x07, 0x00, 0x00, 0x00, 0x00, 0xFC, 0x87, 0x3F, 0xF0, 0xE1, 0xFF,
  0xCF, 0xBF, 0xFF, 0xFF, 0xFF, 0xF7, 0xFF, 0xFF, 0xFF, 0xFF, 0xFD, 0xBF,
  0xFF, 0xF7, 0xED, 0xFF, 0xEF, 0xBF, 0xFB, 0xFF, 0xFF, 0xF7, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFD, 0xBF, 0xFF, 0xF7, 0xED, 0xFF, 0xEF, 0xBF, 0xFB, 0xFF,
  0xFF, 0xF7, 0xFF, 0xFF, 0xFF, 0xFF, 0xFD, 0xBF, 0xFF, 0xF7, 0xED, 0xBB,
  0xEF, 0xBF, 0xFB, 0xFF, 0xFF, 0xF7, 0xFF, 0xFF, 0xFF, 0xFF, 0xFD, 0xBF,
  0x3F, 0xF0, 0xC0, 0xBB, 0xEF, 0xBF, 0xFB, 0xFF, 0xFF, 0xF7, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFD, 0xBF, 0xBF, 0xFF, 0xDE, 0xD7, 0x0F, 0x3C, 0xF0, 0xFF,
  0xFF, 0xF7, 0xFF, 0xFF, 0xFF, 0xFF, 0xFD, 0xBF, 0xBD, 0xFF, 0xDE, 0xEF,
  0xEF, 0xFD, 0xFB, 0xFF, 0xFF, 0x07, 0x00, 0x00, 0x00, 0x00, 0xFC, 0xBF,
  0xBD, 0xFF, 0xDE, 0xD7, 0xEF, 0xFD, 0xFB, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xBF, 0xBD, 0xFF, 0xDE, 0xBB, 0xEF, 0xFD, 0xFB, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x07, 0x3C, 0xF0, 0xC0, 0xBB,
  0x0F, 0xFC, 0xFB, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x83,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0x3F, 0x7C, 0xF8, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xDF, 0xFF, 0xF7, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xE7, 0xFF,
  0xCF, 0x3F, 0xC7, 0xC9, 0x9C, 0xFF, 0x03, 0xFC, 0xFF, 0xFF, 0x3F, 0xFF,
  0xFF, 0xFF, 0xFB, 0xFF, 0xBF, 0x3F, 0xC7, 0xC9, 0x9C, 0xFF, 0x03, 0xF8,
  0xFF, 0xFF, 0x3F, 0xFF, 0xFF, 0xFF, 0xFD, 0xFF, 0x7F, 0x3F, 0xC7, 0xF9,
  0x9C, 0xFF, 0x9F, 0xFF, 0xFF, 0xFF, 0x3F, 0xFF, 0xFF, 0xFF, 0xFE, 0xFF,
  0xFF, 0x7E, 0xD6, 0x4C, 0x10, 0xF8, 0x9F, 0x1F, 0xCE, 0x79, 0x38, 0xF0,
  0xFF, 0xFF, 0xFE, 0xFF, 0xDF, 0x7E, 0x92, 0xCC, 0x1C, 0xF3, 0x9F, 0xCF,
  0xCC, 0x39, 0x33, 0xE6, 0xFF, 0x7F, 0xFF, 0xFF, 0xE7, 0x7D, 0x92, 0xCC,
  0x9C, 0xF3, 0x9F, 0xE7, 0xC9, 0x99, 0x37, 0xE7, 0xFF, 0xBF, 0xFF, 0xFF,
  0xFB, 0x7B, 0x92, 0xCC, 0x9C, 0xF3, 0x9F, 0xE7, 0xC9, 0x99, 0x3F, 0xE7,
  0xFF, 0xBF, 0xFF, 0xFF, 0xFD, 0x7B, 0xBA, 0xCC, 0x9C, 0xF3, 0x9F, 0xE7,
  0xC9, 0x99, 0x3F, 0xE7, 0xFF, 0xBF, 0xFF, 0xFF, 0xFE, 0xFB, 0x38, 0xCE,
  0x9C, 0xF3, 0x9F, 0xE7, 0xC9, 0x99, 0x37, 0xE7, 0xFF, 0xBF, 0xFF, 0x7F,
  0xFF, 0xFB, 0x38, 0xCE, 0x9C, 0xF3, 0x9F, 0xCF, 0xCC, 0x38, 0x23, 0xE7,
  0xFF, 0xDF, 0xFF, 0x9F, 0xFF, 0xF7, 0x7C, 0xCE, 0x91, 0xF3, 0x9F, 0x1F,
  0x1E, 0x78, 0x38, 0xE7, 0xFF, 0xDF, 0xFF, 0xEF, 0xFF, 0xF7, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xDF, 0xFF, 0xF7,
  0xFF, 0xF7, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xDF, 0xFF, 0xFF, 0xFF, 0xF7, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xDF, 0xFF, 0xFF, 0xFF, 0xF7, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xBF, 0xFF, 0xFF,
  0xFF, 0xFB, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xBF, 0xFF, 0xFF, 0xFF, 0xFB, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xBF, 0xFF, 0xFF, 0xFF, 0xFB, 0x3F, 0xCF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xF9, 0xFF, 0xFF, 0xFF, 0xBF, 0xFF, 0xFF,
  0xFF, 0xFB, 0x3F, 0xC7, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xF9, 0xFF, 0xFF,
  0xFF, 0x7F, 0xFF, 0xFF, 0xFF, 0xFD, 0x3F, 0xE3, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xF9, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xFF, 0xFF, 0xFE, 0x3F, 0xF1,
  0x87, 0x73, 0x12, 0x0F, 0x1E, 0xF8, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xFF,
  0xFF, 0xFE, 0x3F, 0xF8, 0x33, 0x73, 0x62, 0xEE, 0x8C, 0xF8, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFD, 0xFF, 0x7F, 0xFF, 0x3F, 0xF0, 0x39, 0x73, 0xF3, 0xE4,
  0xCC, 0xF9, 0xFF, 0xFF, 0xFF, 0xFF, 0xFB, 0xFF, 0xBF, 0xFF, 0x3F, 0xE2,
  0x79, 0x26, 0xF3, 0x3C, 0xCC, 0xF9, 0xFF, 0xFF, 0xFF, 0xFF, 0xE7, 0xFF,
  0xCF, 0xFF, 0x3F, 0xC7, 0x01, 0x27, 0xF3, 0xC4, 0xCC, 0xF9, 0xFF, 0xFF,
  0xFF, 0xFF, 0xDF, 0xFF, 0xF7, 0xFF, 0x3F, 0xC7, 0xF9, 0xAF, 0xF3, 0xE4,
  0xCC, 0xF9, 0xFF, 0xFF, 0xFF, 0xFF, 0x3F, 0x7C, 0xF8, 0xFF, 0x3F, 0x8F,
  0x33, 0x8F, 0x63, 0x66, 0x9C, 0xF8, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x83,
  0xFF, 0xFF, 0x3F, 0x9F, 0x87, 0x8F, 0x13, 0x0F, 0x1C, 0xF8, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xCF, 0xF3, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xCF, 0xF3, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xE3, 0xF3, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
  0xFF, 0xFF, 0xFF, 0xFF
  ];

//----------------------------------
//Start of simulator
//Actual FPS acheived.
var actualFPS = 0,
    actualFPSold = 0;

window.requestAnimFrame=function(){return window.requestAnimationFrame||
  window.webkitRequestAnimationFrame||
  window.mozRequestAnimationFrame||
  window.oRequestAnimationFrame||
  window.msRequestAnimationFrame||
  function(a){window.setTimeout(a, 1E3 / 60)}}();

setInterval(updateFPSold, 1000);

document.onselectstart = function() {
  return false;
};

//OLED display RAM.
var OLEDScreenRaw = new ArrayBuffer(Math.round(OLEDWidth / 8) * OLEDHeight);
var OLEDScreen = new Uint8ClampedArray(OLEDScreenRaw);

//Canvas display
var c = document.getElementById("OLED");
var ctx = c.getContext('2d');
var divId = document.getElementById("textOutput");
var OLEDPCBStyle = document.getElementById("OLEDPCB").style;
var displayStyle = document.getElementById("display").style;

var cStyle = c.style;
var imageData = ctx.getImageData(0, 0, OLEDWidth, OLEDHeight);
var buf = new ArrayBuffer(imageData.data.length);
var buf8 = new Uint8ClampedArray(buf);
var buf32 = new Uint32Array(buf);

//Scale the panels pixels by 4 times, and make them square shaped, not interpolated.
cStyle.cssText = 'image-rendering: pixelated;';
cStyle.width = OLEDWidth * 4 + "px";
cStyle.height = OLEDHeight * 4 + "px";
ctx.imageSmoothingEnabled = false;

//OLEDPCBStyle.width = cStyle.width;
//OLEDPCBStyle.height = cStyle.height;

c.width = OLEDWidth;
c.height = OLEDHeight;
var centerX= Math.round(OLEDWidth / 2);
var centerY= Math.round(OLEDHeight / 2);

var oldTimeStamp = 0;

function updateFPSold(){
  actualFPSold  = actualFPS;
  actualFPS = 0;
}

function newFrame(currentTimeStamp) {
  setTimeout(function() {	requestAnimFrame(newFrame);	}, 1000 / FPS);
  var timeDelta = currentTimeStamp - oldTimeStamp;
  oldTimeStamp = currentTimeStamp;
  divId.innerHTML = actualFPSold + " FPS - " + Math.round(timeDelta) + " milliseconds";
  loop();
  //drawBufferAlternateMemoryLayout();
  drawBuffer();
  actualFPS += 1;
}

function drawBuffer(){
  var dl = OLEDScreen.length;
  var buf8I = -1;
  for (var i = 0; i < dl; i++) {
    var pixelByte = OLEDScreen[i];
    buf8I+=4;
    buf8[buf8I] = (pixelByte & 1)?200:0;
    buf8I+=4;
    buf8[buf8I] = (pixelByte & 2)?200:0;
    buf8I+=4;
    buf8[buf8I] = (pixelByte & 4)?200:0;
    buf8I+=4;
    buf8[buf8I] = (pixelByte & 8)?200:0;
    buf8I+=4;
    buf8[buf8I] = (pixelByte & 16)?200:0;
    buf8I+=4;
    buf8[buf8I] = (pixelByte & 32)?200:0;
    buf8I+=4;
    buf8[buf8I] = (pixelByte & 64)?200:0;
    buf8I+=4;
    buf8[buf8I] = (pixelByte & 128)?200:0;
  }
  imageData.data.set(buf8);
  ctx.putImageData(imageData, 0, 0);
}

//This draws each byte vertically on the display starting at the top left.
function drawBufferAlternateMemoryLayout(){
  var dl = OLEDScreen.length;
  var buf8I = -1;

  for(var yy=0; yy < OLEDHeight; yy++){

    var YOffset = Math.round(yy / 8) * OLEDWidth;
    var pixelMask = 1 << (yy % 8);

    for(var xx=0; xx < OLEDWidth; xx += 8){

      var XYOffset = xx + YOffset;

      buf8I+=4;
      buf8[buf8I] = (OLEDScreen[XYOffset] & pixelMask)?200:0;
      buf8I+=4;
      buf8[buf8I] = (OLEDScreen[XYOffset + 1] & pixelMask)?200:0;
      buf8I+=4;
      buf8[buf8I] = (OLEDScreen[XYOffset + 2] & pixelMask)?200:0;
      buf8I+=4;
      buf8[buf8I] = (OLEDScreen[XYOffset + 3] & pixelMask)?200:0;
      buf8I+=4;
      buf8[buf8I] = (OLEDScreen[XYOffset + 4] & pixelMask)?200:0;
      buf8I+=4;
      buf8[buf8I] = (OLEDScreen[XYOffset + 5] & pixelMask)?200:0;
      buf8I+=4;
      buf8[buf8I] = (OLEDScreen[XYOffset + 6] & pixelMask)?200:0;
      buf8I+=4;
      buf8[buf8I] = (OLEDScreen[XYOffset + 7] & pixelMask)?200:0;
    }
  }

  imageData.data.set(buf8);
  ctx.putImageData(imageData, 0, 0);
}

function clearBuffer(){
  var dl = buf32.length;
  var a=0;
  var value =  (a << 24) |          // alpha
               (OLED_Blue << 16) |  // blue
               (OLED_Green<<  8) |  // green
                OLED_Red;           // red
  for (var i = 0; i < dl; i++) buf32[i] = value;
  imageData.data.set(buf8);
  ctx.putImageData(imageData, 0, 0);
}

function rand(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);}

clearBuffer();
newFrame();
