// History illustrations. Names start with "hist.".
// Maps are schematic: simple landmass shapes in roughly the right places, never to scale.
(() => {
  const { el, line, shape, rect, circ, ellipse, txt, F, K, STONE, PAPER, WINDOW, docLines } = CC;

  const LAND = { fill: "var(--soil-f)", stroke: "var(--soil-s)", strokeWidth: 2, strokeLinejoin: "round" };
  const SEA = { fill: F("blue"), stroke: "var(--soil-s)", strokeWidth: 2, strokeLinejoin: "round" };
  const RIDGE = { fill: "none", stroke: "var(--soil-s)", strokeWidth: 1.8, strokeLinejoin: "round", strokeLinecap: "round", opacity: .8 };

  // A smooth closed outline through the given points (Catmull-Rom turned into cubic Béziers).
  function smooth(pts) {
    const n = pts.length, P = i => pts[(i + n) % n];
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < n; i++) {
      const [p0, p1, p2, p3] = [P(i - 1), P(i), P(i + 1), P(i + 2)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`;
    }
    return d + " Z";
  }

  // Map frame: a sea-coloured rounded rectangle; land and inner seas are clipped to it.
  let uid = 0;
  function mapFrame(g, w, h) {
    const id = `hist-clip-${++uid}`;
    const cp = el("clipPath", { id }, el("defs", {}, g));
    el("rect", { x: 0, y: 0, width: w, height: h, rx: 14 }, cp);
    rect(g, 0, 0, w, h, { fill: F("blue") }, 14);
    const inner = el("g", { "clip-path": `url(#${id})` }, g);
    return { inner, done() { rect(g, 0, 0, w, h, { fill: "none", stroke: K("blue"), strokeWidth: 2 }, 14); } };
  }
  const land = (g, pts) => shape(g, smooth(pts), LAND);
  const sea = (g, pts) => shape(g, smooth(pts), SEA);
  const peaks = (g, x, y, n, s = 9) => {
    let d = "";
    for (let i = 0; i < n; i++) d += `M${x + i * s * 1.3},${y} l${s / 2},${-s} l${s / 2},${s} `;
    shape(g, d, RIDGE);
  };
  const dunes = (g, x, y, n) => {
    let d = "";
    for (let i = 0; i < n; i++) d += `M${x + i * 14},${y + (i % 2) * 7} q5,-5 10,0 `;
    shape(g, d, RIDGE);
  };
  const region = (g, x, y, s) => txt(g, x, y, s, "eqlabel");

  // Europe's coastlines in the 480 x 410 frame of hist.mapEurope (x = (lon + 12) * 8.28, y = (62 - lat) * 15.2).
  function europe(c) {
      const main = land(c, [[275, -30], [510, -30], [510, 440], [410, 440], [402, 400], [380, 388], [350, 392], [331, 385], [322, 360],
        [318, 333], [305, 330], [290, 325], [296, 345], [295, 365], [286, 372], [281, 392], [270, 372], [273, 357], [265, 335],
        [261, 319], [250, 300], [232, 281], [220, 262], [213, 249], [201, 252], [206, 268], [211, 282], [226, 300], [239, 318],
        [253, 334], [244, 338], [234, 346], [229, 365], [220, 345], [218, 322], [203, 306], [190, 290], [173, 268], [160, 275],
        [144, 284], [128, 292], [118, 313], [100, 330], [96, 342], [100, 355], [91, 371], [72, 385], [53, 395], [40, 388],
        [28, 376], [24, 350], [25, 304], [22, 290], [30, 281], [60, 280], [84, 282], [91, 258], [90, 240], [81, 225], [62, 207],
        [86, 188], [100, 190], [115, 167], [132, 152], [141, 131], [170, 129], [166, 99], [187, 65], [186, 91], [182, 114],
        [215, 122], [253, 116], [273, 96], [298, 76], [298, 40], [348, 34], [306, 24], [278, 22], [273, 8]]);
      land(c, [[141, -30], [141, 0], [141, 23], [150, 45], [166, 61], [182, 62], [198, 65], [207, 100], [222, 96], [236, 84],
        [244, 62], [248, 41], [256, 20], [262, 0], [262, -30]]);
      land(c, [[52, 181], [70, 176], [90, 172], [111, 166], [114, 150], [113, 143], [104, 134], [99, 128], [92, 110], [83, 91],
        [86, 70], [75, 52], [62, 56], [54, 68], [60, 90], [58, 106], [66, 124], [62, 140], [62, 152], [57, 157], [64, 166]]);
      land(c, [[18, 150], [36, 156], [48, 140], [50, 112], [44, 96], [28, 92], [20, 108], [17, 130]]);
      land(c, [[-30, 440], [-30, 398], [53, 401], [90, 392], [124, 384], [160, 381], [188, 378], [194, 392], [192, 440]]);
      land(c, [[207, 362], [229, 360], [226, 380], [212, 376]]);
      land(c, [[168, 318], [180, 316], [180, 350], [167, 348]]);
      land(c, [[172, 290], [178, 290], [178, 311], [171, 311]]);
      land(c, [[290, 404], [320, 403], [318, 411], [292, 412]]);
      sea(c, [[340, 316], [332, 300], [331, 289], [338, 270], [345, 255], [353, 236], [368, 246], [374, 262], [388, 268],
        [402, 258], [412, 263], [430, 280], [444, 300], [444, 310], [420, 312], [389, 304], [370, 310], [356, 316]]);
      return main.getAttribute("d");
  }

  CC.art({
    // Europe, North Africa and Asia from Spain to China (about 10°W to 125°E, 55°N to 5°N).
    "hist.mapEurasia": { w: 760, h: 330, draw(g) {
      const m = mapFrame(g, 760, 330), c = m.inner;
      land(c, [[100, -30], [790, -30], [790, 82], [752, 88], [738, 100], [728, 114], [742, 126], [734, 142], [744, 158],
        [730, 186], [712, 206], [696, 218], [676, 228], [668, 248], [672, 272], [656, 296], [634, 292], [620, 284], [612, 304],
        [616, 360], [598, 360], [600, 300], [600, 264], [586, 248], [576, 230], [560, 220], [546, 228], [534, 242], [518, 266],
        [504, 294], [494, 312], [482, 290], [470, 252], [464, 230], [452, 214], [436, 206], [416, 202], [394, 204], [376, 194],
        [386, 204], [394, 218], [380, 244], [352, 262], [322, 276], [308, 284], [326, 290], [344, 292], [330, 324], [314, 360],
        [-30, 360], [-30, 186], [4, 162], [14, 136], [24, 118], [12, 104], [2, 92], [6, 74], [30, 64], [56, 64],
        [50, 50], [34, 44], [56, 36], [70, 26], [88, 10]]);
      land(c, [[24, 32], [42, 28], [62, 26], [66, 14], [58, 2], [54, -12], [40, -12], [40, 4], [32, 12], [36, 22]]);
      land(c, [[2, 22], [16, 18], [22, 6], [14, -6], [-6, -6], [-4, 14]]);
      // Mediterranean, Black Sea, Caspian, Aral, Red Sea, Persian Gulf
      sea(c, [[25, 125], [31, 119], [51, 113], [54, 101], [69, 89], [87, 77], [106, 70], [118, 80], [130, 90], [140, 101], [146, 113],
        [152, 106], [165, 101], [156, 93], [144, 83], [132, 72], [127, 63], [136, 61], [150, 72], [164, 88], [172, 104], [182, 122], [190, 112],
        [186, 96], [205, 98], [214, 120], [229, 118], [260, 121], [257, 139], [251, 155], [231, 155], [200, 150], [170, 152],
        [158, 162], [140, 154], [128, 146], [113, 139], [118, 120], [100, 122], [73, 120], [40, 126]]);
      sea(c, [[220, 90], [213, 78], [224, 65], [231, 56], [244, 60], [248, 68], [256, 62], [264, 66], [274, 72], [290, 86],
        [280, 93], [253, 87], [236, 91]]);
      sea(c, [[322, 56], [340, 52], [357, 55], [350, 66], [344, 71], [356, 82], [360, 94], [356, 104], [362, 118], [348, 121],
        [334, 118], [337, 98], [326, 86], [320, 75]]);
      sea(c, [[384, 62], [394, 58], [401, 66], [396, 74], [386, 72]]);
      sea(c, [[236, 163], [243, 164], [268, 210], [290, 248], [307, 276], [300, 281], [282, 256], [260, 220], [244, 190]]);
      sea(c, [[327, 166], [333, 164], [345, 176], [362, 183], [376, 186], [372, 195], [360, 202], [348, 197], [346, 190], [336, 184]]);
      land(c, [[128, 114], [142, 112], [140, 120], [130, 120]]);
      land(c, [[104, 82], [110, 82], [111, 102], [104, 104]]);
      land(c, [[190, 129], [204, 128], [204, 133], [190, 133]]);
      land(c, [[508, 298], [514, 296], [518, 312], [510, 316]]);
      peaks(c, 506, 178, 7);
      peaks(c, 486, 92, 6, 8);
      peaks(c, 458, 122, 2, 8);
      dunes(c, 500, 112, 4);
      region(c, 690, 182, "CHINA");
      region(c, 488, 236, "INDIA");
      region(c, 420, 70, "CENTRAL ASIA");
      region(c, 368, 150, "PERSIA");
      region(c, 300, 230, "ARABIA");
      region(c, 160, 40, "EUROPE");
      region(c, 120, 230, "AFRICA");
      m.done();
    } },

    "hist.camel": { w: 96, h: 80, draw(g) {
      const C = { fill: F("amber"), stroke: K("amber"), strokeWidth: 2.5, strokeLinejoin: "round" };
      const leg = { stroke: K("amber"), strokeWidth: 4.5, strokeLinecap: "round" };
      for (const [x1, x2] of [[26, 24], [34, 35], [56, 56], [63, 66]]) line(g, x1, 48, x2, 76, leg);
      shape(g, "M10,36 L16,48", { ...leg, strokeWidth: 3 });
      shape(g, "M14,42 C14,30 22,24 30,26 C36,10 54,10 58,26 C64,30 70,34 70,42 C70,50 62,54 52,54 L28,54 C20,54 14,50 14,42 Z", C);
      shape(g, "M64,38 C72,34 74,24 76,14 L86,12 C91,12 92,18 88,20 L82,22 C80,34 76,44 68,48 Z", C);
      circ(g, 82, 15, 1.6, { fill: K("amber") });
      shape(g, "M28,30 C34,22 52,20 60,30 L56,40 L32,40 Z", { fill: F("red"), stroke: K("red"), strokeWidth: 2, strokeLinejoin: "round" });
    } },
    // The whole world, about 170°W to 190°E and 80°N to 60°S. Very simplified; small islands left out.
    "hist.mapWorld": { w: 760, h: 330, draw(g) {
      const m = mapFrame(g, 760, 330), c = m.inner;
      land(c, [[-10, 30], [4, 32], [30, 20], [60, 22], [95, 22], [130, 18], [158, 18], [170, 30], [158, 47], [170, 62], [186, 66],
        [190, 56], [194, 52], [211, 42], [220, 48], [232, 59], [247, 76], [236, 82], [222, 85], [210, 90], [203, 93], [199, 106],
        [192, 116], [189, 130], [185, 121], [171, 118], [154, 124], [154, 139], [165, 141], [175, 138], [173, 151], [184, 160],
        [191, 167], [196, 168], [196, 172], [194, 172], [186, 166], [181, 165], [166, 154], [150, 148], [137, 141], [127, 134],
        [120, 124], [112, 112], [100, 100], [97, 80], [89, 66], [70, 52], [42, 47], [21, 57], [8, 58], [-10, 58]]);
      land(c, [[194, 172], [196, 166], [210, 162], [226, 164], [243, 174], [262, 184], [285, 200], [285, 207], [278, 219],
        [268, 243], [258, 255], [239, 271], [232, 280], [222, 288], [216, 306], [216, 318], [208, 316], [203, 306], [205, 275],
        [209, 231], [196, 217], [188, 200], [190, 191], [192, 180]]);
      land(c, [[243, -10], [320, -10], [318, 10], [312, 24], [290, 38], [266, 47], [256, 36], [243, 24], [236, 10]]);
      land(c, [[370, 47], [372, 38], [391, 26], [412, 21], [443, 28], [460, 22], [486, 24], [517, 19], [580, 7], [620, 14],
        [654, 19], [697, 24], [739, 33], [770, 30], [770, 46], [735, 46], [720, 42], [703, 52], [689, 68], [680, 60], [665, 62],
        [654, 64], [644, 59], [640, 70], [634, 88], [628, 96], [630, 106], [624, 108], [620, 98], [610, 98], [616, 104],
        [614, 118], [600, 137], [587, 139], [589, 160], [583, 165], [574, 160], [570, 157], [574, 175], [576, 186], [570, 178],
        [566, 165], [557, 151], [549, 137], [543, 138], [528, 158], [522, 170], [516, 155], [513, 139], [500, 130], [479, 128],
        [484, 137], [469, 151], [450, 158], [467, 161], [446, 193], [443, 205], [445, 224], [433, 245], [425, 259], [416, 268],
        [400, 271], [388, 243], [384, 229], [386, 217], [384, 203], [378, 189], [378, 179], [363, 174], [342, 178], [331, 170],
        [322, 154], [323, 139], [338, 118], [346, 106], [340, 102], [339, 87], [350, 83], [349, 74], [363, 68], [368, 60], [376, 54]]);
      land(c, [[345, 71], [361, 65], [358, 56], [352, 50], [344, 54], [348, 62]]);
      land(c, [[336, 66], [342, 64], [342, 58], [336, 58]]);
      land(c, [[312, 33], [330, 33], [328, 39], [314, 39]]);
      land(c, [[179, 136], [190, 134], [203, 139], [198, 142], [185, 140]]);
      land(c, [[204, 141], [214, 141], [213, 146], [205, 145]]);
      land(c, [[452, 217], [464, 225], [458, 248], [451, 243]]);
      land(c, [[634, 115], [644, 108], [654, 105], [659, 94], [658, 82], [665, 86], [662, 98], [656, 110], [644, 113]]);
      land(c, [[600, 240], [602, 269], [636, 263], [651, 271], [667, 280], [675, 275], [682, 254], [667, 233], [659, 214],
        [658, 226], [646, 224], [647, 217], [635, 217], [625, 221], [616, 230]]);
      land(c, [[556, 174], [562, 176], [584, 202], [578, 204]]);
      land(c, [[588, 186], [600, 178], [610, 186], [604, 198], [592, 198]]);
      land(c, [[582, 205], [600, 205], [600, 208], [582, 208]]);
      land(c, [[635, 196], [660, 198], [676, 210], [660, 212], [640, 204]]);
      sea(c, [[338, 104], [355, 99], [360, 96], [367, 88], [376, 86], [384, 86], [390, 96], [394, 99], [398, 93], [390, 85],
        [396, 86], [404, 95], [405, 101], [410, 97], [416, 101], [435, 103], [433, 113], [422, 116], [401, 113], [390, 113],
        [381, 101], [365, 102], [350, 106], [338, 108]]);
      sea(c, [[418, 90], [420, 81], [430, 79], [446, 85], [440, 92], [425, 93]]);
      sea(c, [[458, 80], [468, 78], [470, 90], [474, 100], [462, 101], [462, 90]]);
      sea(c, [[428, 117], [432, 118], [452, 158], [448, 160]]);
      sea(c, [[457, 117], [461, 117], [476, 125], [472, 129], [462, 127]]);
      sea(c, [[381, 61], [395, 60], [401, 56], [408, 49], [418, 47], [404, 46], [404, 36], [410, 35], [404, 33], [396, 47], [386, 57]]);
      m.done();
    } },

    // A caravel, the small sailing ship of Columbus's time.
    "hist.ship": { w: 120, h: 100, draw(g) {
      const WOOD = { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2.5, strokeLinejoin: "round" };
      const SAIL = { fill: "var(--paper)", stroke: "var(--paper-ink)", strokeWidth: 2, strokeLinejoin: "round" };
      for (const [x, y1] of [[44, 12], [80, 24]]) line(g, x, y1, x, 76, { stroke: "var(--root)", strokeWidth: 3, strokeLinecap: "round" });
      shape(g, "M26,22 C36,26 52,26 62,22 L60,62 C50,66 38,66 28,62 Z", SAIL);
      shape(g, "M66,32 C74,36 86,36 94,32 L92,66 C84,70 76,70 68,66 Z", SAIL);
      line(g, 44, 34, 44, 52, { stroke: K("red"), strokeWidth: 3 }); line(g, 36, 41, 52, 41, { stroke: K("red"), strokeWidth: 3 });
      shape(g, "M44,12 L56,16 L44,20 Z", { fill: F("red"), stroke: K("red"), strokeWidth: 1.5, strokeLinejoin: "round" });
      shape(g, "M4,70 L116,70 L104,92 C80,96 40,96 16,92 Z", WOOD);
      line(g, 12, 80, 110, 80, { stroke: "var(--root)", strokeWidth: 1.5 });
      shape(g, "M0,97 q8,-5 16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t8,0", { fill: "none", stroke: K("blue"), strokeWidth: 2, strokeLinecap: "round" });
    } },

    // Foods and animals of the Columbian Exchange (50 x 50 icons).
    "hist.potato": { w: 50, h: 50, draw(g) {
      shape(g, "M8,28 C6,16 18,8 30,10 C42,12 46,22 44,30 C42,40 30,44 20,42 C12,40 9,34 8,28 Z", { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2.5 });
      for (const [x, y] of [[18, 20], [30, 18], [36, 30], [22, 33]]) circ(g, x, y, 1.8, { fill: "var(--root)" });
    } },
    "hist.corn": { w: 50, h: 50, draw(g) {
      const cob = el("g", { transform: "rotate(30 25 25)" }, g);
      ellipse(cob, 25, 22, 9, 19, { fill: F("yellow"), stroke: K("yellow"), strokeWidth: 2.5 });
      for (const y of [12, 19, 26, 33]) line(cob, 17, y, 33, y, { stroke: K("yellow"), strokeWidth: 1.2 });
      line(cob, 25, 4, 25, 40, { stroke: K("yellow"), strokeWidth: 1.2 });
      shape(cob, "M25,46 C14,40 12,28 16,20 C18,32 22,38 25,40 C28,38 32,32 34,20 C38,28 36,40 25,46 Z", { fill: F("green"), stroke: K("green"), strokeWidth: 2, strokeLinejoin: "round" });
    } },
    "hist.tomato": { w: 50, h: 50, draw(g) {
      shape(g, "M25,14 C40,12 46,22 45,30 C44,40 35,45 25,45 C15,45 6,40 5,30 C4,22 10,12 25,14 Z", { fill: F("red"), stroke: K("red"), strokeWidth: 2.5 });
      shape(g, "M25,16 L18,10 L23,14 L25,6 L27,14 L32,10 Z", { fill: F("green"), stroke: K("green"), strokeWidth: 2, strokeLinejoin: "round" });
    } },
    "hist.cacao": { w: 50, h: 50, draw(g) {
      const pod = el("g", { transform: "rotate(-35 25 25)" }, g);
      shape(pod, "M25,3 C36,10 38,22 36,32 C34,42 28,47 25,47 C22,47 16,42 14,32 C12,22 14,10 25,3 Z", { fill: F("amber"), stroke: K("amber"), strokeWidth: 2.5 });
      for (const d of ["M20,10 C17,22 18,36 22,44", "M25,4 V46", "M30,10 C33,22 32,36 28,44"]) shape(pod, d, { fill: "none", stroke: K("amber"), strokeWidth: 1.3 });
    } },
    "hist.horse": { w: 50, h: 50, draw(g) {
      shape(g, "M12,47 C10,34 13,22 22,14 L22,5 L28,11 C35,11 42,18 46,26 C48,30 46,33 42,32 L34,29 C31,34 31,41 34,47 Z",
        { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2.5, strokeLinejoin: "round" });
      shape(g, "M21,13 C15,18 11,28 11,40", { fill: "none", stroke: "var(--root)", strokeWidth: 4, strokeLinecap: "round" });
      circ(g, 33, 18, 1.8, { fill: "var(--root)" });
    } },
    "hist.cow": { w: 50, h: 50, draw(g) {
      const T = { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.5, strokeLinejoin: "round" };
      shape(g, "M14,12 C10,10 7,6 7,2 M36,12 C40,10 43,6 43,2", { fill: "none", stroke: K("grey"), strokeWidth: 2.5, strokeLinecap: "round" });
      ellipse(g, 7, 18, 6, 3.5, T); ellipse(g, 43, 18, 6, 3.5, T);
      shape(g, "M13,12 C13,8 37,8 37,12 L35,34 L15,34 Z", T);
      ellipse(g, 25, 38, 12, 9, { fill: F("red"), stroke: K("red"), strokeWidth: 2.2 });
      circ(g, 21, 38, 1.8, { fill: K("red") }); circ(g, 29, 38, 1.8, { fill: K("red") });
      circ(g, 19, 21, 1.8, { fill: K("grey") }); circ(g, 31, 21, 1.8, { fill: K("grey") });
    } },
    "hist.wheat": { w: 50, h: 50, draw(g) {
      for (const r of [-14, 0, 14]) {
        const s = el("g", { transform: `rotate(${r} 25 48)` }, g);
        line(s, 25, 48, 25, 6, { stroke: K("amber"), strokeWidth: 2, strokeLinecap: "round" });
        for (let y = 8; y < 30; y += 6) {
          ellipse(el("g", { transform: `rotate(-30 21 ${y})` }, s), 21, y, 2.6, 4.5, { fill: F("yellow"), stroke: K("amber"), strokeWidth: 1.4 });
          ellipse(el("g", { transform: `rotate(30 29 ${y})` }, s), 29, y, 2.6, 4.5, { fill: F("yellow"), stroke: K("amber"), strokeWidth: 1.4 });
        }
      }
    } },
    "hist.sugarcane": { w: 50, h: 50, draw(g) {
      for (const [x, top] of [[16, 6], [28, 2], [38, 10]]) {
        rect(g, x - 4, top, 8, 48 - top, { fill: F("green"), stroke: K("green"), strokeWidth: 2 }, 3);
        for (let y = top + 11; y < 46; y += 11) line(g, x - 4, y, x + 4, y, { stroke: K("green"), strokeWidth: 2 });
      }
      shape(g, "M28,14 C36,8 44,8 48,4 M16,20 C10,14 6,12 2,12", { fill: "none", stroke: K("green"), strokeWidth: 2.2, strokeLinecap: "round" });
    } },

    // Industrial Revolution: home spinning, mills, steam, railways and factory towns.
    "hist.cottage": { w: 200, h: 150, draw(g) {
      const WOOD = { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2.2 };
      for (const [x, y, r] of [[152, 0, 5], [160, -10, 6.5], [150, -20, 4.5]]) circ(g, x, y + 8, r, { fill: F("grey"), stroke: K("grey"), strokeWidth: 1.5, opacity: .8 });
      rect(g, 140, 18, 18, 32, STONE);
      rect(g, 22, 60, 156, 86, STONE);
      shape(g, "M6,68 L60,16 L140,16 L194,68 Z", { fill: F("amber"), stroke: K("amber"), strokeWidth: 2.5, strokeLinejoin: "round" });
      for (const x of [50, 80, 110, 140]) line(g, x, 22, x - 14, 62, { stroke: K("amber"), strokeWidth: 1.2, opacity: .7 });
      rect(g, 87, 96, 26, 50, WOOD, 2);
      rect(g, 38, 88, 30, 24, WINDOW, 2); rect(g, 132, 88, 30, 24, WINDOW, 2);
      line(g, 53, 88, 53, 112, { stroke: "var(--stone-s)", strokeWidth: 1 }); line(g, 147, 88, 147, 112, { stroke: "var(--stone-s)", strokeWidth: 1 });
      line(g, 0, 147, 200, 147, { stroke: K("green"), strokeWidth: 3, strokeLinecap: "round" });
    } },
    "hist.spinningWheel": { w: 110, h: 100, draw(g) {
      const W = { stroke: "var(--root)", strokeWidth: 3, strokeLinecap: "round" };
      line(g, 22, 80, 12, 98, W); line(g, 62, 80, 72, 98, W); line(g, 96, 80, 102, 98, W);
      rect(g, 6, 76, 100, 8, { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2.2 }, 3);
      line(g, 40, 46, 40, 78, W);
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; line(g, 40, 42, 40 + 30 * Math.cos(a), 42 + 30 * Math.sin(a), { stroke: "var(--root)", strokeWidth: 1.6 }); }
      circ(g, 40, 42, 32, { fill: "none", stroke: "var(--root)", strokeWidth: 3.5 });
      circ(g, 40, 42, 4, { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2 });
      line(g, 92, 44, 92, 78, W);
      rect(g, 84, 34, 16, 10, { fill: F("yellow"), stroke: K("yellow"), strokeWidth: 2 }, 3);
      line(g, 40, 10, 90, 36, { stroke: K("yellow"), strokeWidth: 1.2 }); line(g, 40, 74, 90, 42, { stroke: K("yellow"), strokeWidth: 1.2 });
    } },
    // A water-powered cotton mill beside a river.
    "hist.mill": { w: 220, h: 170, draw(g) {
      rect(g, 0, 150, 220, 20, { fill: F("blue"), stroke: K("blue"), strokeWidth: 2 }, 4);
      rect(g, 64, 22, 150, 128, STONE);
      shape(g, "M58,24 L139,6 L220,24 Z", { fill: F("amber"), stroke: K("amber"), strokeWidth: 2, strokeLinejoin: "round" });
      for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) rect(g, 74 + c * 23, 34 + r * 28, 13, 16, WINDOW, 1);
      for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; line(g, 34, 118, 34 + 30 * Math.cos(a), 118 + 30 * Math.sin(a), { stroke: "var(--root)", strokeWidth: 2 }); }
      circ(g, 34, 118, 30, { fill: "none", stroke: "var(--root)", strokeWidth: 3.5 });
      circ(g, 34, 118, 5, { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2 });
    } },
    // A Watt-style beam engine: boiler, cylinder, rocking beam and flywheel.
    "hist.steamEngine": { w: 170, h: 170, draw(g) {
      const METAL = { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.5, strokeLinejoin: "round" };
      const WOOD = { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2.5 };
      for (const [x, y, r] of [[16, 44, 5], [10, 32, 6.5], [18, 20, 4.5]]) circ(g, x, y, r, { fill: F("sky"), stroke: K("sky"), strokeWidth: 1.5 });
      rect(g, 4, 112, 78, 44, METAL, 14);
      shape(g, "M28,152 C24,140 32,136 34,128 C38,136 44,138 42,152 Z", { fill: F("amber"), stroke: K("amber"), strokeWidth: 2, strokeLinejoin: "round" });
      rect(g, 30, 56, 32, 56, METAL, 3);
      line(g, 46, 56, 46, 30, { stroke: K("grey"), strokeWidth: 4, strokeLinecap: "round" });
      rect(g, 84, 34, 14, 122, STONE);
      shape(g, "M40,26 L150,18 L150,28 L40,36 Z", WOOD);
      circ(g, 91, 27, 4, { fill: "var(--root)" });
      line(g, 146, 26, 132, 112, { stroke: K("grey"), strokeWidth: 4, strokeLinecap: "round" });
      for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; line(g, 128, 122, 128 + 32 * Math.cos(a), 122 + 32 * Math.sin(a), { stroke: K("grey"), strokeWidth: 2 }); }
      circ(g, 128, 122, 32, { fill: "none", stroke: K("grey"), strokeWidth: 5 });
      circ(g, 128, 122, 5, METAL);
      rect(g, 0, 156, 170, 10, WOOD, 3);
    } },
    // A factory with a saw-tooth roof and a tall chimney.
    "hist.factory": { w: 240, h: 170, draw(g) {
      for (const [x, y, r] of [[218, 10, 7], [230, -2, 9], [214, -6, 6]]) circ(g, x, y + 8, r, { fill: F("grey"), stroke: K("grey"), strokeWidth: 1.5, opacity: .85 });
      rect(g, 206, 26, 24, 140, { fill: F("red"), stroke: K("red"), strokeWidth: 2.2 }, 2);
      rect(g, 202, 22, 32, 8, { fill: F("red"), stroke: K("red"), strokeWidth: 2.2 }, 2);
      shape(g, "M0,74 L0,54 L40,30 L40,54 L80,30 L80,54 L120,30 L120,54 L160,30 L160,54 L200,30 L200,74 Z", { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.2, strokeLinejoin: "round" });
      rect(g, 0, 72, 200, 94, STONE);
      for (let c = 0; c < 7; c++) for (const y of [86, 122]) rect(g, 10 + c * 27, y, 16, 22, WINDOW, 1);
      line(g, -4, 166, 244, 166, { stroke: "var(--stone-s)", strokeWidth: 2.5, strokeLinecap: "round" });
    } },
    // An early steam locomotive with a tender and a coal wagon.
    "hist.train": { w: 240, h: 84, draw(g) {
      const BODY = { fill: F("teal"), stroke: K("teal"), strokeWidth: 2.5, strokeLinejoin: "round" };
      const WH = { fill: "var(--canvas)", stroke: K("grey"), strokeWidth: 3 };
      line(g, 0, 80, 240, 80, { stroke: K("grey"), strokeWidth: 3, strokeLinecap: "round" });
      for (const [x, y, r] of [[30, 2, 5], [42, -4, 7]]) circ(g, x, y + 6, r, { fill: F("grey"), stroke: K("grey"), strokeWidth: 1.5, opacity: .8 });
      rect(g, 22, 12, 12, 26, BODY, 2);
      rect(g, 10, 34, 80, 28, BODY, 12);
      rect(g, 84, 22, 32, 40, BODY, 3);
      rect(g, 92, 30, 16, 12, WINDOW, 2);
      rect(g, 126, 40, 42, 24, { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.2 }, 3);
      rect(g, 176, 36, 60, 28, { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2.2 }, 3);
      for (const x of [186, 198, 210, 222]) circ(g, x, 36, 5, { fill: "var(--paper-ink)" });
      line(g, 116, 60, 126, 60, { stroke: K("grey"), strokeWidth: 3 }); line(g, 168, 60, 176, 60, { stroke: K("grey"), strokeWidth: 3 });
      for (const [x, r] of [[30, 13], [72, 9], [100, 9], [138, 8], [158, 8], [190, 8], [224, 8]]) { circ(g, x, 78 - r, r, WH); circ(g, x, 78 - r, 2, { fill: K("grey") }); }
    } },
    // A row of crowded terraced houses in a factory town.
    "hist.houses": { w: 220, h: 100, draw(g) {
      for (let i = 0; i < 5; i++) {
        const x = i * 44;
        rect(g, x + 30, 4, 8, 22, STONE);
        rect(g, x, 34, 44, 62, STONE);
        rect(g, x + 7, 66, 12, 30, { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 1.8 }, 1);
        rect(g, x + 25, 46, 12, 14, WINDOW, 1); rect(g, x + 25, 70, 12, 14, WINDOW, 1);
      }
      shape(g, "M-2,36 L14,16 L206,16 L222,36 Z", { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.2, strokeLinejoin: "round" });
      line(g, -4, 97, 224, 97, { stroke: "var(--stone-s)", strokeWidth: 2.5, strokeLinecap: "round" });
    } },

    // A stretch of the Berlin Wall with people standing on top, as on the night of November 9, 1989.
    "hist.berlinWall": { w: 260, h: 130, draw(g) {
      const C = { fill: F("grey"), stroke: K("grey"), strokeWidth: 2.2, strokeLinejoin: "round" };
      line(g, 0, 128, 260, 128, { stroke: "var(--stone-s)", strokeWidth: 2.5, strokeLinecap: "round" });
      for (let i = 0; i < 6; i++) rect(g, 10 + i * 40, 60, 40, 68, C, 2);
      rect(g, 6, 52, 248, 12, C, 6);
      shape(g, "M22,96 c8,-12 16,8 24,-4 s14,6 20,-6", { fill: "none", stroke: K("violet"), strokeWidth: 3, strokeLinecap: "round" });
      shape(g, "M110,84 l12,20 l10,-16 l12,18", { fill: "none", stroke: K("amber"), strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" });
      shape(g, "M182,104 c6,-14 18,-14 24,0 M196,80 v14", { fill: "none", stroke: K("teal"), strokeWidth: 3, strokeLinecap: "round" });
      const fig = (x, t, up) => {
        circ(g, x, 20, 6, { fill: F(t), stroke: K(t), strokeWidth: 2 });
        shape(g, `M${x - 8},52 V36 C${x - 8},30 ${x + 8},30 ${x + 8},36 V52 Z`, { fill: F(t), stroke: K(t), strokeWidth: 2 });
        if (up) shape(g, `M${x - 7},34 L${x - 14},16 M${x + 7},34 L${x + 14},16`, { fill: "none", stroke: K(t), strokeWidth: 2.5, strokeLinecap: "round" });
      };
      fig(56, "violet", true); fig(92, "teal", false); fig(150, "amber", true); fig(206, "green", true);
    } },

    // Europe from Portugal to western Russia (about 12°W to 46°E, 62°N to 35°N). No borders:
    // topics mark countries and cities with points, circles and labels.
    "hist.mapEurope": { w: 480, h: 410, draw(g) {
      const m = mapFrame(g, 480, 410);
      europe(m.inner);
      m.done();
    } },

    // A close-up of the Balkans in 1914, cut from the Europe map (about 9.7°E to 29°E, 48.5°N to 39.6°N).
    // Austria-Hungary (teal) and Serbia (violet) are tinted; borders are rough and dashed.
    "hist.mapBalkans": { w: 400, h: 340, draw(g) {
      const m = mapFrame(g, 400, 340);
      const z = el("g", { transform: "scale(2.5) translate(-180,-205)" }, m.inner);
      const id = `hist-clip-${++uid}`;
      el("path", { d: europe(z) }, el("clipPath", { id }, el("defs", {}, z)));
      const ov = el("g", { "clip-path": `url(#${id})` }, z);
      shape(ov, smooth([[207, 190], [207, 236], [212, 243], [213, 249], [220, 262], [232, 281], [250, 300], [254, 298], [252, 296],
        [256, 289], [259, 281], [260, 275], [259.6, 260.4], [268.7, 261.1], [285.7, 264.5], [293, 254], [302, 251], [311, 251],
        [317, 245], [319, 219], [319, 190]]), { fill: F("teal") });
      shape(ov, smooth([[259.6, 260.4], [268.7, 261.1], [285.7, 264.5], [287.3, 270.6], [284.8, 281.2], [284.8, 296.4], [288.9, 305.5],
        [288.9, 314.6], [273.2, 320.7], [269.1, 316.2], [269.9, 301], [266.6, 293.4], [267.4, 287.3], [261.6, 282.7], [260, 275]]), { fill: F("violet") });
      const B = (pts, t) => shape(z, "M" + pts.map(p => p.join(",")).join(" L"),
        { fill: "none", stroke: K(t), strokeWidth: 2, strokeDasharray: "6 4", strokeLinejoin: "round" });
      B([[207, 190], [207, 236], [212, 243], [213, 249]], "teal");
      B([[254, 298], [252, 296], [256, 289], [259, 281], [260, 275], [259.6, 260.4], [268.7, 261.1], [285.7, 264.5], [293, 254],
        [302, 251], [311, 251], [317, 245], [319, 219], [319, 190]], "teal");
      B([[285.7, 264.5], [287.3, 270.6], [284.8, 281.2], [284.8, 296.4], [288.9, 305.5], [288.9, 314.6], [273.2, 320.7], [269.1, 316.2],
        [269.9, 301], [266.6, 293.4], [267.4, 287.3], [261.6, 282.7], [260, 275]], "violet");
      B([[231, 255], [231, 263], [234, 274], [245, 291], [252, 296]], "teal");
      m.inner.querySelectorAll("path").forEach(p => { p.style.vectorEffect = "non-scaling-stroke"; });
      m.done();
    } },

    // A medieval scribe copying a book by hand at a sloped desk.
    "hist.scribe": { w: 170, h: 150, draw(g) {
      const WOOD = { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2.5, strokeLinejoin: "round" };
      const P = { fill: F("violet"), stroke: K("violet"), strokeWidth: 2.5, strokeLinejoin: "round" };
      line(g, 4, 147, 166, 147, { stroke: "var(--root)", strokeWidth: 2.5, strokeLinecap: "round" });
      for (const x of [24, 54]) line(g, x, 116, x, 146, { stroke: "var(--root)", strokeWidth: 4, strokeLinecap: "round" });
      rect(g, 16, 110, 46, 8, WOOD, 3);
      for (const x of [96, 150]) line(g, x, 88, x, 146, { stroke: "var(--root)", strokeWidth: 4, strokeLinecap: "round" });
      shape(g, "M80,92 L160,70 L163,79 L83,101 Z", WOOD);
      shape(g, "M22,110 V80 C22,64 30,57 42,57 C54,57 62,64 62,80 V110 Z", P);
      circ(g, 42, 38, 13, P);
      shape(g, "M30,34 C30,20 54,20 54,34 C50,28 34,28 30,34 Z", { fill: K("violet"), stroke: K("violet"), strokeWidth: 1.5 });
      const bk = el("g", { transform: "rotate(-15 122 80)" }, g);
      rect(bk, 94, 70, 28, 10, PAPER, 1);
      rect(bk, 122, 70, 28, 10, PAPER, 1);
      shape(g, "M50,72 L84,86 L98,80", { fill: "none", stroke: K("violet"), strokeWidth: 7, strokeLinecap: "round", strokeLinejoin: "round" });
      shape(g, "M98,80 L112,48 C118,44 120,50 116,56 Z", { fill: "var(--paper)", stroke: "var(--paper-ink)", strokeWidth: 1.8, strokeLinejoin: "round" });
      rect(g, 146, 56, 12, 12, { fill: "var(--paper-ink)", stroke: "var(--paper-ink)", strokeWidth: 1.5 }, 3);
    } },

    // A wooden screw press, as in Gutenberg's workshop.
    "hist.press": { w: 170, h: 210, draw(g) {
      const WOOD = { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2.5, strokeLinejoin: "round" };
      rect(g, 22, 8, 16, 192, WOOD, 3);
      rect(g, 132, 8, 16, 192, WOOD, 3);
      rect(g, 10, 6, 150, 18, WOOD, 4);
      rect(g, 22, 52, 126, 14, WOOD, 3);
      rect(g, 77, 24, 16, 86, { fill: F("grey"), stroke: K("grey"), strokeWidth: 2 }, 3);
      for (let y = 30; y < 104; y += 9) line(g, 78, y + 6, 92, y, { stroke: K("grey"), strokeWidth: 1.5 });
      line(g, 85, 92, 162, 80, { stroke: "var(--root)", strokeWidth: 6, strokeLinecap: "round" });
      rect(g, 44, 110, 82, 14, { fill: F("grey"), stroke: K("grey"), strokeWidth: 2 }, 3);
      rect(g, 50, 142, 70, 6, PAPER, 1);
      rect(g, 44, 148, 82, 10, { fill: "var(--paper-ink)", stroke: "var(--paper-ink)", strokeWidth: 1.5 }, 2);
      rect(g, 30, 158, 110, 12, WOOD, 3);
      rect(g, 4, 196, 162, 12, WOOD, 4);
    } },

    // One piece of metal movable type. The letter is cast backwards so it prints the right way round.
    "hist.type": { w: 34, h: 44, draw(g, d) {
      rect(g, 3, 8, 28, 34, { fill: F("grey"), stroke: K("grey"), strokeWidth: 2 }, 3);
      rect(g, 6, 2, 22, 8, { fill: F("grey"), stroke: K("grey"), strokeWidth: 2 }, 2);
      const m = el("g", { transform: "translate(34,0) scale(-1,1)" }, g);
      txt(m, 17, 31, d.text || "A", "atom");
    } },

    // A leather ink ball for dabbing ink onto the type.
    "hist.inkBall": { w: 50, h: 70, draw(g) {
      rect(g, 20, 4, 10, 36, { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2.2 }, 4);
      shape(g, "M4,62 C4,42 46,42 46,62 Z", { fill: "var(--soil-f)", stroke: "var(--root)", strokeWidth: 2.5, strokeLinejoin: "round" });
      rect(g, 4, 60, 42, 6, { fill: "var(--paper-ink)", stroke: "var(--paper-ink)", strokeWidth: 1.5 }, 3);
    } },

    // A printed page; d.text is its heading.
    "hist.page": { w: 80, h: 100, draw(g, d) {
      rect(g, 4, 4, 72, 92, PAPER, 2);
      if (d.text) txt(g, 40, 30, d.text, "atom");
      docLines(g, 14, 66, [46, 56, 66, 76, 86]);
    } },

    // A small stack of books.
    "hist.books": { w: 90, h: 70, draw(g) {
      const b = (x, y, w, t) => {
        rect(g, x, y, w, 18, { fill: F(t), stroke: K(t), strokeWidth: 2.2 }, 3);
        line(g, x + 8, y + 2, x + 8, y + 16, { stroke: K(t), strokeWidth: 1.5 });
      };
      b(6, 48, 78, "red"); b(12, 28, 68, "blue"); b(2, 8, 74, "green");
    } }
  });
})();
