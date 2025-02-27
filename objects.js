const mustSee = [4002, 8001,8002, 9001, 1008]


const buttons = [
  {
    html: `
    <div class="typea-content" style="font-family: 'helvetica'; color: #000; position: relative;user-select: none;">
    <span class="material-symbols-outlined">keyboard_double_arrow_left</span>
    <span class="typea-text-below">Previous</span>
</div>
`,
    action: () => {
      let tempPrevious = -1
      if (currentType < 1000) { tempPrevious = availablePrevious() } else { tempPrevious = currentType - 1 }
      setupGrid(null, tempPrevious)
    }
  },
  //0.Previous Button

  {
    html: `
    <div class="typea-content" style="font-family: 'helvetica'; color: #000; position: relative;user-select: none;">
    <span class="material-symbols-outlined">keyboard_double_arrow_right</span>
    <span class="typea-text-below">Next</span>
</div>
`,
    action: () => {
      let tempNext = availableNext()
      setupGrid(null, tempNext)
    }
  },
  //1.Next Button

  {
    html: `
    <div class="typea-content" style="font-family: 'helvetica'; color: #000; position: relative;user-select: none;">
    <span class="material-symbols-outlined">Undo</span>
    <span class="typea-text-below">Back</span>
</div>
`,
    action: () => {
      if (isTwoOrOneDigit(currentType) || currentType < 0) {
        setupGrid(null, -1)
      } else {
        setupGrid(null, Math.floor(currentType / 1000))
      }
    }
  },
  //2.Back Button

  {
    html: `
    <div class="typea-content" style="font-family: 'helvetica'; color: #000; position: relative;user-select: none;">
    <span class="material-symbols-outlined">refresh</span>
    <span class="typea-text-below">Shuffle</span>
</div>
`,
    action: () => { console.log("shuffle!") }
  },
  //3.Shuffle Button


  {
    html: `
    <div class="typea-content" style="font-family: 'helvetica'; color: #000; position: relative;user-select: none;">
    <span class="material-symbols-outlined">Source files</span>
    <span class="typea-text-below">Shuffle</span>
</div>
`,
    action: () => { console.log("shuffle!") }
  },
  //4.Source files
];
const categoryObjects = [
  {
    html: `
    <div class="typea-content" style="font-family: 'helvetica'; color: #000; position: relative;user-select: none;">
    <span class="material-symbols-outlined">architecture</span>
    <span class="typea-text-below"><b>A</b>rchitecture</span>
</div>`,
    action: () => setupGrid(null, 1),
    type: 1
  },
  //1.architecture

  {
    html: `<div class="typea-content" style="font-family: 'helvetica'; color: #000; position: relative;user-select: none;">
    <span class="material-symbols-outlined">gesture</span>
    <span class="typea-text-below"><b>F</b>abrications</span>
</div>`,
    action: () => setupGrid(null, 2),
    type: 2
  },
  //2.fabrications
  {
    html: `
    <div class="typea-content" style="font-family: 'helvetica'; color: #000; position: relative;user-select: none;">
    <span class="material-symbols-outlined">joystick</span>
    <span class="typea-text-below"><b>G</b>ame Design</span>
</div>`, action: () => setupGrid(null, 3),
    type: 3
  },
  //3.gameDesign
  {
    html: `
    <div class="typea-content" style="font-family: 'helvetica'; color: #000; position: relative;user-select: none;">
    <span class="material-symbols-outlined">stock_media</span>
    <span class="typea-text-below"><b>G</b>enerative Art</span>
</div>

`, action: () => setupGrid(null, 4),
    type: 4
  },
  //4.generativeArt
  {
    html: `<div class="typea-content" style="font-family: 'helvetica'; color: #000; position: relative;user-select: none;">
    <span class="material-symbols-outlined">atr</span>
    <span class="typea-text-below"><b>I</b>nteraction Design</span>
    
</div>`, action: () => setupGrid(null, 5),
    type: 5
  },
  //5.interactionDesign
  {
    html: `<div class="typea-content" style="font-family: 'helvetica'; color: #000; position: relative;user-select: none;">
    <span class="material-symbols-outlined">category</span>
    <span class="typea-text-below"><b>i</b>OS Development</span>
</div>`, action: () => setupGrid(null, 6),
    type: 6
  },
  //6.iOSdevelopment
  {
    html: `<div class="typea-content" style="font-family: 'helvetica'; color: #000; position: relative;user-select: none;">
    <span class="material-symbols-outlined">category</span>
    <span class="typea-text-below"><b>P</b>roduct Design</span>
</div>`, action: () => setupGrid(null, 7),
    type: 7
  },
  //7.productDesign
  {
    html: `<div class="typea-content" style="font-family: 'helvetica'; color: #000; position: relative;user-select: none;">
    <span class="material-symbols-outlined">web</span>
    <span class="typea-text-below"><b>W</b>eb Design</span>
</div>`, action: () => setupGrid(null, 8),
    type: 8
  },
  //8.webDesign
  {
    html: `<div class="typea-content" style="font-family: 'helvetica'; color: #000; position: relative;user-select: none;">
    <span class="material-symbols-outlined">history_edu</span>
    <span class="typea-text-below"><b>S</b>torytelling</span>
</div>`, action: () => setupGrid(null, 9),
    type: 9
  },
  //9.fictions & story telling
  
];
var maxCategory = categoryObjects.length + 1;
const categoryTags = [
  "test",
  "architecture",/*1*/
  "fabrications",/*2*/
  "gameDesign",/*3*/
  "generativeArt",/*4*/
  "interactionDesign",/*5*/
  "iOSdevelopment",/*6*/
  "productDesign",/*7*/
  "webDesign",/*8*/
  "fictions",/*9*/
];
const projectObjects = [
  /*------------------------------------1----------------------------------- */

  {
    coverPicture: "images/verticalCity.jpg",
    dimension: { x: 2, y: 1 },
    dimension_category: { x: 2, y: 1 },
    pdf: 'pdfs/vertical_city.pdf',
    year: 2021,
    title: `Vertical City`,
    tags: ["architecture"],
    id: 1001,
    elements: [
      { kind: 'link', content: "icons/gDrive.svg", link: "https://drive.google.com/file/d/10n7HnZd79uYfJ7G3wqUSljryX4uPxaIy/view?usp=sharing", explanation: "Here's the portfolio:" },
      { kind: 'link', content: "icons/gDrive.svg", link: "https://drive.google.com/file/d/103XKicsiqXVQRrzdc9p1orY2l8Uhlrpq/view?usp=sharing", explanation: "Here's the original boards:" },
      { kind: 'text', content: "Collaborated with Chen Dongyuan and Wang Xiaoyuan.", },
      { kind: 'picture', content: "images/verticalCity.jpg", dimension: { x: 2, y: 1 } },
      { kind: 'text', content: "Ever since the beginning of the history, the communities of human have been growing.", },
      { kind: 'picture', content: "images/verticalCity2.png", dimension: { x: 2, y: 1 } },
      { kind: 'text', content: "In the time of population explosion, we’ll be witnessing the emergence of hyperdense cities.", },
      { kind: 'text', content: "This is a project of future residential community aimed at accommodating as many as possible, at the same time provide a city space to live in. ", },
      { kind: 'picture', content: "images/verticalCity3.png", dimension: { x: 6, y: 4 } },
      { kind: 'picture', content: "images/verticalCity1.png", dimension: { x: 2, y: 1 } },
    ],
  },


  {
    coverPicture: "images/communityGallery.png",
    dimension: { x: 3, y: 2 },
    dimension_category: { x: 3, y: 2 },
    pdf: 'pdfs/community_gallery.pdf',
    year: 2020,

    title: `Community Gallery: XiJiaDaTang`,
    tags: ["architecture"],
    id: 1002,
    elements: [
      { kind: 'text', content: "[西家大塘社区美术馆 江苏 南京]", },
      { kind: 'text', content: "Architectural Design of community XiJiaDaTang beside Nanjing City Wall and Xuanwu Lake.", },
      { kind: 'text', content: "The building area is 5000 m² and occupying the land of 10000m², playing the role of art center of the community.", },
      { kind: 'picture', content: "images/communityGallery.png", dimension: { x: 3, y: 2 } },
      { kind: 'picture', content: "images/communityGallery1.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/communityGallery2.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/communityGallery3.png", dimension: { x: 6, y: 4 } },
    ],
  },

  {
    coverPicture: "images/pukouRailwayStation.png",
    dimension: { x: 2, y: 1 },
    dimension_category: { x: 4, y: 2 },
    pdf: 'pdfs/pukou_railway_station_reform.pdf',
    year: 2021,

    title: `Pukou Station Reform`,
    tags: ["architecture"],
    id: 1003,
    elements: [
      { kind: 'text', content: "[浦口火车站改扩建设计 江苏 南京]", },
      { kind: 'text', content: "Reformation design of the 100+ years old Pukou Railway Station. ", },
      { kind: 'text', content: "Mixed with curve and arches, a museum with garden arises from the less travelled heritage.", },
      { kind: 'picture', content: "images/pukouRailwayStation.png", dimension: { x: 4, y: 2 } },
      { kind: 'picture', content: "images/pukouRailwayStation1.png", dimension: { x: 4, y: 2 } },
      { kind: 'text', content: "It is inspired by Ito Toyo's Tama Art University Library in Japan.", },
    ],
  },

  {
    coverPicture: "images/greenValley.png",
    dimension: { x: 2, y: 1 },
    dimension_category: { x: 2, y: 1 },
    pdf: '',
    year: 2022,
    title: `Green Valley`,
    tags: ["architecture"],
    id: 1004,
    elements: [
      { kind: 'text', content: "[中央门棚户区改造 江苏 南京]", },
      { kind: 'text', content: "Collaboration with Zhao Ningyuan, Chen Jiang.", },
      { kind: 'text', content: "Reformation design of slum complex by the Zhongyangmen, leverating the living quality while the unique culture and behavior context are kept.", },
      { kind: 'text', content: "The project aim to keep the memory of green valley to the community, making it an unique source of vibration to the city.", },
      { kind: 'picture', content: "images/greenValley.png", dimension: { x: 6, y: 3 } },
      { kind: 'picture', content: "images/greenValley1.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/greenValley2.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/greenValley3.png", dimension: { x: 2, y: 1 } },
    ],
  },

  {
    coverPicture: "images/cheeseStair.jpg",
    dimension: { x: 1, y: 2 },

    dimension_category: { x: 1, y: 2 },
    pdf: 'pdfs/cheese_stair.pdf',
    year: 2022,
    title: `Cheese Stairs`,
    tags: ["architecture"],
    id: 1005,
    elements: [
      { kind: 'text', content: "[道桥实验室楼梯间改造 江苏 南京]", },
      { kind: 'text', content: "An architectural design with computation, project with Chen Jiang and Cheng Donyuan.", },
      { kind: 'text', content: "Parametrical design of the endangered stair of the Construction Lab of the Southeast University.", },
      { kind: 'picture', content: "images/cheeseStair.jpg", dimension: { x: 2, y: 4 } },
      { kind: 'picture', content: "images/cheeseStair1.jpeg", dimension: { x: 4, y: 4 } },
      { kind: 'text', content: "The shape is inspired from the shape of cartoon cheese, which is significantly beneficial to ventilation and view angle from inside.", },
    ],
  },

  {
    coverPicture: "images/mochiGallery.jpeg",
    dimension: { x: 2, y: 1 },

    dimension_category: { x: 4, y: 2 },
    pdf: 'pdfs/mochi_gallery.pdf',
    year: 2022,
    title: `Wang Xizhi Memorial Gallery`,
    tags: ["architecture"],
    id: 1006,
    elements: [
      { kind: 'text', content: "[王羲之纪念馆 浙江 绍兴]", },
      { kind: 'text', content: "Collaborated with Li Zhuoqun and Liu Yi.", },
      { kind: 'text', content: "Classical design of a gallery addressing the chinese cultural celebrity Wang Xizhi.", },
      { kind: 'text', content: "Spatial design centered the story of Wang practicing caligraphy by the pool, which serves as core of Chinese classical conception of studio spaces.", },
      { kind: 'picture', content: "images/mochiGallery.jpeg", dimension: { x: 6, y: 3 } },
      { kind: 'picture', content: "images/mochiGallery1.jpeg", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/mochiGallery2.jpeg", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/mochiGallery3.jpeg", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/mochiGallery4.jpeg", dimension: { x: 2, y: 1 } },
    ],
  },

  {
    coverPicture: "images/youthActivityCenter.png",
    dimension: { x: 2, y: 1 },
    dimension_category: { x: 4, y: 2 },
    pdf: 'pdfs/youth_activities_center.pdf',
    year: 2021,
    title: `Youth Activity Center`,
    tags: ["architecture"],
    id: 1007,
    elements: [
      { kind: 'text', content: "[青少年活动中心 浙江 宁波]", },
      { kind: 'text', content: "A youth activity center in Ningbo, Zhejiang.", },
      { kind: 'text', content: "Being set above the river, truss are largely introduced to create the unique space.", },
      { kind: 'picture', content: "images/youthActivityCenter.png", dimension: { x: 4, y: 2 } },
      { kind: 'picture', content: "images/youthActivityCenter1.png", dimension: { x: 4, y: 2 } },
      { kind: 'text', content: "A 12 meters high slope is the core space, allowing activities to take place differently.", },
    ],
  },

  {
    coverPicture: "images/ChangjunHighSchool.png",
    dimension: { x: 2, y: 1 },

    dimension_category: { x: 4, y: 2 },
    year: 2023,
    pdf: 'pdfs/changjun_high_school_reform_complete.pdf',
    title: `Reform of Changjun High School`,
    tags: ["architecture"],
    id: 1008,
    elements: [
      { kind: 'text', content: "[长郡中学改扩建设计 湖南 长沙]", },
      { kind: 'text', content: "Reform of Changjun High School and neighboring community.", },
      { kind: 'text', content: "This is the <b>graduation design</b> for my Bachelor of Architecture, in the high school that <b>I came from.</b>", },
      { kind: 'text', content: "The reform expands the space of the students in the crowded area in the center of old City of Changsha.", },
      { kind: 'picture', content: "images/ChangjunHighSchool.png", dimension: { x: 6, y: 3 } },
      { kind: 'picture', content: "images/ChangjunHighSchool1.png", dimension: { x: 2, y: 1 } },
      { kind: 'text', content: "The key idea is to create shared spaces for the school and the neighbor, shared in different time of a day.", },
      { kind: 'picture', content: "images/ChangjunHighSchool2.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/ChangjunHighSchool3.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/ChangjunHighSchool4.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/ChangjunHighSchool5.png", dimension: { x: 2, y: 1 } },
    ],
  },

  {
    coverPicture: "images/hexagonCommunity.png",
    dimension: { x: 2, y: 1 },

    dimension_category: { x: 4, y: 2 },
    year: 2020,
    pdf: 'pdfs/hexagon_community.pdf',
    title: `Hexagon Community`,
    tags: ["architecture"],
    id: 1009,
    elements: [
      { kind: 'text', content: "Community housing project design in Kinshasa, Democratic Republic of the Congo.", },
      { kind: 'text', content: "This is a group project with Guo Yuchen and Huang Yiling.", },
      { kind: 'text', content: "<b>Hexagon,</b> is the structural form of communication, ventilation and to enable the flexity.", },
      { kind: 'picture', content: "images/hexagonCommunity.png", dimension: { x: 4, y: 2 } },
      { kind: 'text', content: "It is inspired from the special occasion of the people wearing suits in farming.", },
      { kind: 'text', content: "We re-imagined the expectation of the community, addressing the morden form into a raw atmosphere.", },
      { kind: 'picture', content: "images/hexagonCommunity2.png", dimension: { x: 5, y: 2 } },
      { kind: 'picture', content: "images/hexagonCommunity1.png", dimension: { x: 2, y: 2 } },
      { kind: 'picture', content: "images/hexagonCommunity3.png", dimension: { x: 3, y: 2 } },
    ],
  },

  {
    coverPicture: "images/roofsVillageByTheWall.png",
    dimension: { x: 1, y: 1 },

    dimension_category: { x: 2, y: 2 },
    year: 2023,
    pdf: 'pdfs/roofs_village_by_the_wall.pdf',
    title: `Roofs: Village by the Wall`,
    tags: ["architecture"],
    id: 1010,
    elements: [
      { kind: 'text', content: "Group project with Nehul Khilnani, Yu Yang, Helia Soleimani and Jahangir Shahi.", },
      { kind: 'picture', content: "images/roofsVillageByTheWall.png", dimension: { x: 4, y: 4 } },
      { kind: 'text', content: "It is a bridge project over the ancient city wall of Nanjing.", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'picture', content: "images/roofsVillageByTheWall1.png", dimension: { x: 2, y: 2 } },
      { kind: 'text', content: "We were inspired with the traditional form of Chinese villages by <b>the City Wall</b>, and applied with truss as structure.", },
      { kind: 'picture', content: "images/roofsVillageByTheWall3.png", dimension: { x: 4, y: 2 } },
      { kind: 'picture', content: "images/roofsVillageByTheWall2.png", dimension: { x: 3, y: 1 } },
      { kind: 'text', content: "As the former capitol of China, the City Wall of Nanjing plays a core role in the forming of morden Nanjing.", },
      { kind: 'text', content: "The goal of the project is to strengthen the connection between the mega structure and community.", },
    ],
  },


  /*------------------------------------2----------------------------------- */
  {
    coverPicture: "images/nanjingCityModel.png",
    dimension: { x: 2, y: 3 },
    dimension_category: { x: 2, y: 3 },
    pdf: 'pdfs/nanjing_city_model.pdf',
    year: 2018,

    title: `Nanjing City Model`,
    tags: ["fabrications", "architecture"],
    id: 2001,
    elements: [
      { kind: 'text', content: "A wooden, planar city model of the City of Nanjing, in the scale of 1:1000.", },
      { kind: 'text', content: "It is made with checking in person and updates of the alleys and entrances.", },
      { kind: 'text', content: "It is achieved by <b>ALL students</b> from Southeast University, School of Architecture, class of 2023.", },
      { kind: 'picture', content: "images/nanjingCityModel.png", dimension: { x: 3, y: 5 } },
      { kind: 'picture', content: "images/nanjingCityModel1.png", dimension: { x: 3, y: 5 } },
    ],
  },

  {
    coverPicture: "images/bambooPavillion.jpg",
    dimension: { x: 1, y: 1 },
    dimension_category: { x: 3, y: 3 },
    pdf: 'pdfs/bamboo_pavillion.pdf',
    year: 2019,
    title: `Bamboo Pavillion`,
    tags: ["fabrications", "architecture"],
    id: 2002,
    elements: [
      { kind: 'text', content: "A pavillion made from bamboo, group project of 9 people.", },
      { kind: 'text', content: " Starting from cutting bamboo in the mountain, it took less than 48 hour in total.", },
      { kind: 'picture', content: "images/bambooPavillion.jpg", dimension: { x: 2, y: 2 } },
      { kind: 'picture', content: "images/bambooPavillion1.jpg", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/bambooPavillion2.jpg", dimension: { x: 2, y: 1 } },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'picture', content: "images/bambooPavillion3.jpg", dimension: { x: 4, y: 2 } },
      { kind: 'picture', content: "images/bambooPavillion4.jpg", dimension: { x: 4, y: 2 } },
      { kind: 'picture', content: "images/bambooPavillion5.jpg", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/bambooPavillion6.jpg", dimension: { x: 2, y: 1 } },
    ],
  },


  {
    coverPicture: "images/growth1.png",
    dimension: { x: 1, y: 1 },
    dimension_category: { x: 3, y: 3 },
    year: 2018,
    title: `Crazy Growth`,
    tags: ["fabrications", ],
    id: 2003,
    elements: [
      { kind: 'text', content: "A woven statue made by Liu Lunhai, Zhong Yu, Tan Haozheng and me.", },
      { kind: 'picture', content: "images/growth1.png", dimension: { x: 2, y: 2 } },
      { kind: 'text', content: "It is made of 24 units woven with different ways with vine, as to show it grows fastly with complexity.", },
      { kind: 'picture', content: "images/growth2.png", dimension: { x: 3, y: 5 } },
      { kind: 'picture', content: "images/growth3.png", dimension: { x: 3, y: 2 } },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: "Here's how we experimented with vines:", },
      { kind: 'picture', content: "images/growth4.png", dimension: { x: 4, y: 2 } },
    ],
  },

  /*------------------------------------3----------------------------------- */

  {
    coverPicture: "images/choiceReverse.png",
    dimension: { x: 2, y: 1 },
    dimension_category: { x: 4, y: 2 },
    pdf: 'pdfs/choice_reverse.pdf',
    year: 2022,
    title: `Choice Reverse`,
    tags: ["gameDesign"],
    id: 3001,
    intro: "",
    elements: [
      { kind: 'link', content: "icons/youtube3.svg", link: "https://youtu.be/t7_DihsEWVc", explanation: "Check the demo video here:" },
      { kind: 'text', content: "This is a first-perspective game expressing how people feel about <b>choices.</b>", },
      { kind: 'picture', content: "images/choiceReverse.png", dimension: { x: 4, y: 2 } },
      { kind: 'picture', content: "images/choiceReverse1.png", dimension: { x: 4, y: 2 } },
      { kind: 'picture', content: "images/choiceReverse2.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/choiceReverse3.png", dimension: { x: 2, y: 1 } },
      { kind: 'text', content: "Here, gravity is reversed while player make choices talking to NPCs. ", },
      { kind: 'text', content: "This project is done by UE4 as level design with narrative spacial design while studying architecture.", },
      { kind: 'picture', content: "images/choiceReverse4.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/choiceReverse5.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/choiceReverse6.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/choiceReverse7.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/choiceReverse8.png", dimension: { x: 3, y: 1 } },
    ],
  },

  {
    coverPicture: "images/cemetery.png",
    dimension: { x: 2, y: 1 },
    dimension_category: { x: 4, y: 2 },
    pdf: '',
    year: 2024,

    title: `Cemetery`,
    tags: ["gameDesign"],
    id: 3002,
    elements: [
      { kind: 'link', content: "icons/youtube3.svg", link: "https://www.youtube.com/watch?v=scmfdT19C6Q", explanation: "See the demo here:" },
      { kind: 'text', content: "The final project of class \"Level Design Studio\" in NYU.", },
      { kind: 'text', content: "A destination driven, first perspective game of escape, in the enclosed zone of Cemetery", },
      { kind: 'picture', content: "images/cemetery.png", dimension: { x: 6, y: 3 } },
      { kind: 'text', content: "Player has an ability of flashing to a place and create a clone of self in the place of origin, and switch place with the clone anytime.", },
    ],
  },


  /*------------------------------------4----------------------------------- */

  {
    coverPicture: "images/talkingToTheAlien.jpg",
    dimension: { x: 1, y: 1 },
    dimension_category: { x: 4, y: 4 },
    pdf: 'pdfs/talking_to_the_alien.pdf',
    year: 2023,
    title: `Talking to the Alien`,
    tags: ["generativeArt", "interactionDesign"],
    id: 4001,
    elements: [
      { kind: 'link', link: 'https://whyjq.com/arrival/', explanation: "I am here." },
      { kind: 'text', content: " ", },
      { kind: 'text', content: "This is my final project for 2023 ITP Winter Show, a generative artwork, a recreation of movie \"Arrival\".", },
      { kind: 'text', content: "Here users can talk to the alien behind the screen like what they do in the movie.", },
      { kind: 'text', content: "The unique ink styled language shows the response from the alien. AI translation is accompanied.", },
      { kind: 'picture', content: "images/talkingToTheAlien.jpg", dimension: { x: 4, y: 4 } },
      { kind: 'picture', content: "images/talkingToTheAlien1.png", dimension: { x: 1, y: 2 } },
      { kind: 'picture', content: "images/talkingToTheAlien2.png", dimension: { x: 2, y: 2 } },
      { kind: 'picture', content: "images/talkingToTheAlien3.png", dimension: { x: 1, y: 1 } },
      { kind: 'picture', content: "images/talkingToTheAlien4.png", dimension: { x: 1, y: 1 } },
      { kind: 'picture', content: "images/talkingToTheAlien5.png", dimension: { x: 1, y: 1 } },
      { kind: 'picture', content: "images/talkingToTheAlien6.png", dimension: { x: 1, y: 1 } },
      { kind: 'picture', content: "images/talkingToTheAlien7.png", dimension: { x: 3, y: 2 } },
      { kind: 'picture', content: "images/talkingToTheAlien8.png", dimension: { x: 2, y: 2 } },
    ],
  },



  {
    coverPicture: "images/mandala.png",
    dimension: { x: 1, y: 2 },

    dimension_category: { x: 2, y: 4 },
    pdf: '',
    year: 2024,
    title: `Mandala`,
    tags: ["generativeArt", "interactionDesign"],
    id: 4002,
    elements: [
      // { kind: 'link', content: "icons/github.svg", link: 'https://github.com/Typemaster32/Mandala', explanation: "Source Code" },
      { kind: 'link', link: 'https://typemaster32.github.io/Mandala/', explanation: "Let me blossom!" },
      { kind: 'text', content: " ", },
      { kind: 'text', content: "This is my 2024 ITP Spring Show project <b>\"Mandala\"</b>, collabrating with <b>Tammana Jain.</b>", },

      { kind: 'picture', content: "images/mandala7.png", dimension: { x: 4, y: 2 } },
      { kind: 'text', content: "Mandala is a responsive flower that generates shapes with your description.", },
      { kind: 'text', content: "We integrated different kinds of patterns from cultural and architectural heritages, with AI aided speech recognition.", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'picture', content: "images/mandala1.png", dimension: { x: 1, y: 1 } },
      { kind: 'picture', content: "images/mandala2.png", dimension: { x: 1, y: 1 } },
      { kind: 'text', content: "Our initial inspiration is the beautiful pattern from classical architecture like Taj Mahal.", },
      { kind: 'picture', content: "images/mandala3.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/mandala4.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/mandala5.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/mandala6.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/mandala8.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/mandala9.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/mandala10.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/mandala11.png", dimension: { x: 2, y: 1 } },
    ],
  },

  {
    coverPicture: "images/disordered1.png",
    dimension: { x: 2, y: 1 },

    dimension_category: { x: 4, y: 2 },
    pdf: '',
    year: 2019,
    title: `Disordered`,
    tags: ["generativeArt",],
    id: 4003,
    elements: [
      { kind: 'link', content: "icons/openProcessing.png", link: 'https://openprocessing.org/sketch/2015945', explanation: "Try it! Source code included." },
      { kind: 'text', content: "This is my first generative artwork: Disordered.", },
      { kind: 'text', content: "It's from the idea of tessellation, a special pentagon, that tiles up a plane and each edge fits to its neighbor", },
      { kind: 'picture', content: "images/disordered.jpg", dimension: { x: 7, y: 5 } },
      { kind: 'text', content: "It was written in Java in Processing 3, and recently translated into p5.js.", },
    ],
  },

  {
    coverPicture: "images/voronoi.png",
    dimension: { x: 1, y: 1 },

    dimension_category: { x: 3, y: 3 },
    pdf: '',
    year: 2023,
    title: `Voronoi Map Creation`,
    tags: ["generativeArt",],
    id: 4004,
    elements: [
      { kind: 'link', content: "icons/arrow3.svg", link: 'https://typemaster32.github.io/Voronoi-Map-Creation/', explanation: "Try it!" },
      { kind: 'text', content: "This is a map creater using <b>voronoi diagram.</b>", },
      { kind: 'text', content: "It creates a different map everytime generating, making of Ocean -> Sea -> Beach -> Forest -> Deep Forest -> Bare Mountain -> Snow Mountain Top", },
      { kind: 'picture', content: "images/voronoi5.png", dimension: { x: 4, y: 3 } },
      { kind: 'picture', content: "images/voronoi.png", dimension: { x: 2, y: 2 } },
      { kind: 'picture', content: "images/voronoi2.png", dimension: { x: 2, y: 2 } },
      { kind: 'text', content: "It creates all kinds of landscapes, allowing you to create more freely.", },

      { kind: 'text', content: "It is on $99.99 Exhibition! Check the poster here:", },
      { kind: 'picture', content: "images/voronoi99.99.png", dimension: { x: 2, y: 4 } },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'link', content: "icons/github.svg", link: 'https://github.com/Typemaster32/Voronoi-Map-Creation', explanation: "Source codes:" },
    ],
  },

  {
    coverPicture: "images/dune.png",
    dimension: { x: 2, y: 2 },
    dimension_category: { x: 3, y: 3 },
    pdf: '',
    year: 2023,
    title: `Dune`,
    tags: ["generativeArt",],
    id: 4005,
    elements: [
      { kind: 'link', content: "icons/openProcessing.png", link: 'https://openprocessing.org/sketch/2172705', explanation: "Try it here!" },
      { kind: 'text', content: "<b>Stare at it.</b> The wind is gradually taking the sands away...", },
      { kind: 'text', content: "It is created in p5.js, using Perlin Noise with simple Trigonometric functions.", },
      { kind: 'picture', content: "images/dune.png", dimension: { x: 3, y: 3 } },
    ],
  },


  /*------------------------------------5----------------------------------- */
  //interaction design


  /*------------------------------------6----------------------------------- */
  {
    coverPicture: "images/p5viewer.png",
    dimension: { x: 2, y: 4 },
    dimension_category: { x: 2, y: 4 },
    pdf: '',
    year: 2024,
    title: `P5 Viewer`,
    tags: ["iOSdevelopment",],
    id: 6001,
    elements: [
      { kind: 'link', content: "icons/github.svg", link: 'https://github.com/Typemaster32/molab-2024-01-Jiaqi_Yi-P5.js-Viewer', explanation: "Check the source code here:" },
      { kind: 'text', content: "P5 Viewer is the final project for NYU ITP class \"Mobile App Development\". ", },
      { kind: 'text', content: "This app is scheduled to come out by September 2024. ", },
      { kind: 'text', content: "P5.js now on iOS! It's an app where you can view, share or track artists for there most recent works.", },
      { kind: 'picture', content: "images/p5viewer.png", dimension: { x: 2, y: 4 } },
      { kind: 'picture', content: "images/p5viewer1.png", dimension: { x: 2, y: 4 } },
      { kind: 'picture', content: "images/p5viewer2.png", dimension: { x: 2, y: 4 } },
      { kind: 'text', content: "Save as an image or to your collection to use as wallpaper or anywhere you like.", },
    ],
  },

  /*------------------------------------7----------------------------------- */
  {
    coverPicture: "images/petSphere.png",
    dimension: { x: 3, y: 2 },
    dimension_category: { x: 3, y: 2 },
    pdf: 'pdfs/pet_sphere.pdf',
    year: 2023,
    title: `Pet Sphere`,
    tags: ["productDesign", "interactionDesign"],
    id: 7001,
    elements: [
      { kind: 'link', content: "icons/youtube3.svg", link: 'https://www.youtube.com/watch?v=wJFLMlQ7Ngg', explanation: "Watch our demo:" },
      { kind: 'text', content: "Pet Sphere is in <b>2023 ITP Winter Show</b>, collaborating with Isabel Wu, Siqi Cheng, Jiayi Li.", },
      { kind: 'text', content: "Touch plays an essential role in our interactions with pets.To replicate this in our product and convey similar emotional value.", },
      { kind: 'text', content: "We aim to simulate the tactile interactions found between humans and pets.", },
      { kind: 'picture', content: "images/petSphere0.png", dimension: { x: 5, y: 3 } },
      { kind: 'picture', content: "images/petSphere1.png", dimension: { x: 4, y: 2 } },
      { kind: 'picture', content: "images/petSphere2.jpg", dimension: { x: 4, y: 2 } },
    ],
  },



  /*------------------------------------8----------------------------------- */
  //web design

  {
    coverPicture: "images/ft.jpeg",
    dimension: { x: 4, y: 2 },
    dimension_category: { x: 4, y: 2 },
    pdf: '',
    year: 2024,
    title: `Financial Times: A Redesign`,
    tags: ["webDesign", "iOSdevelopment"],
    id: 8001,
    elements: [
      { kind: 'link', link: 'https://staging.d2x136r30399f9.amplifyapp.com/', explanation: "Link" },
      { kind: 'text', content: "This is the graduation thesis of Victoria Mortimer and I was the collaborator.", },
      { kind: 'text', content: "<b>What should news website be like in the days of social medias?<b>", },
      { kind: 'picture', content: "images/ft.jpeg", dimension: { x: 4, y: 2 } },
      { kind: 'text', content: "We added social media elements, like carousel and vertical videos.", },
      { kind: 'text', content: "However, we soon realized it there should be a new <b>APP<b>.", },
      { kind: 'text', content: "", },
      { kind: 'picture', content: "images/ft2.jpeg", dimension: { x: 2, y: 1 } },
      { kind: 'text', content: "", },
      { kind: 'picture', content: "images/ft3.jpeg", dimension: { x: 2, y: 2 } },
      { kind: 'text', content: "Live News: realtime updates for follow-up news", },
      { kind: 'text', content: "", },
      { kind: 'link', content: "icons/youtube3.svg", link: 'https://youtube.com/shorts/K90xSNkR1Lk?feature=share', explanation: "Demo:" },
      { kind: 'picture', content: "images/ft4.jpeg", dimension: { x: 2, y: 4 } },
      { kind: 'text', content: "", },
      { kind: 'text', content: "", },
      { kind: 'picture', content: "images/ft5.jpeg", dimension: { x: 2, y: 4 } },

    ],
  },

  {
    coverPicture: "images/quantaBridge.png",
    dimension: { x: 1, y: 1 },
    dimension_category: { x: 2, y: 2 },
    pdf: '',
    year: 2025,
    title: `Quanta Bridge`,
    tags: ["webDesign", "startup"],
    id: 8002,
    elements: [
      { kind: 'link', link: 'https://quantabridge.ai', explanation: "quantabridge.ai" },
      { kind: 'text', content: "In the Winter, me and my friends founded a platform to empower the scientist to utilize their expertise with AI.", },
      { kind: 'picture', content: "images/quantaBridge.png", dimension: { x: 1, y: 1 } },
      { kind: 'text', content: "Here I work as the CMO, constructing medias including the web app and broadcasting.", },
      { kind: 'text', content: "We are now in the process of raising funds and recruiting talents."},
      { kind: 'text', content: "", },
      { kind: 'text', content: "", },
      { kind: 'picture', content: "images/quantaBridge1.jpeg", dimension: { x: 4, y: 2 } },
      { kind: 'picture', content: "images/quantaBridge2.jpeg", dimension: { x: 4, y: 2 } },
    ],
  },

  {
    coverPicture: "images/alfaGallery.jpeg",
    dimension: { x: 2, y: 1 },
    dimension_category: { x: 2, y: 1 },
    pdf: '',
    year: 2024,
    title: `Alfa Art Gallery`,
    tags: ["internship", "webDesign"],
    id: 8003,
    elements: [
      { kind: 'link', link: 'https://www.alfaart.org/', explanation: "Link" },      
      { kind: 'picture', content: "images/alfaGallery1.jpeg", dimension: { x: 4, y: 2 } },
      { kind: 'text', content: "In 2024 summer, I spent 4 months interning there as a web designer.", },
      { kind: 'text', content: "In my time there, I maintained the website and did updates with <b>WordPress<b>.", },
    ],
  },

  {
    coverPicture: "images/sixtyworlds.jpeg",
    dimension: { x: 4, y: 2 },
    dimension_category: { x: 4, y: 2 },
    pdf: '',
    year: 2024,
    title: `Sixty Worlds`,
    tags: ["thesisProject", "architecture","gameDesign"],
    id: 8004,
    elements: [
      { kind: 'link', link: 'https://sixtyworlds.com', explanation: 'sixtyworlds.com' },
      { kind: 'text', content: "Thesis Project of my time in NYU", },
      { kind: 'picture', content: "images/sixtyworlds.jpeg", dimension: { x: 4, y: 2 } },
      { kind: 'picture', content: "images/sixtyworlds2.jpeg", dimension: { x: 4, y: 2 } },
      { kind: 'text', content: "It is a platform for people to share their virtual worlds, and to explore others.", },
      { kind: 'text', content: "", },
      { kind: 'text', content: "", },
      { kind: 'text', content: "", },
      { kind: 'picture', content: "images/sixtyworlds3.jpeg", dimension: { x: 4, y: 2 } },
    ],
  },

  // {
  //   coverPicture: "images/ft.jpeg",
  //   dimension: { x: 4, y: 2 },
  //   dimension_category: { x: 4, y: 2 },
  //   pdf: '',
  //   year: 2024,
  //   title: `NYU AI Chatbot`,
  //   tags: ["webDesign", "architecture","gameDesign"],
  //   id: 8005,
  //   elements: [
  //     { kind: 'link', content: "icons/youtube3.svg", link: 'https://staging.d2x136r30399f9.amplifyapp.com/', explanation: "Take a look" },
  //   ],
  // },

  /*------------------------------------9----------------------------------- */
  {
    coverPicture: "images/theLanguageRevolution4.png",
    dimension: { x: 1, y: 1 },
    dimension_category: { x: 3, y: 3 },
    pdf: 'pdfs/the_language_revolution.pdf',
    year: 2022,
    title: `The Language Revolution`,
    tags: ["fictions",],
    id: 9001,
    elements: [
      { kind: 'link', content: "icons/youtube3.svg", link: 'https://youtu.be/8FfbswuTQlc', explanation: "Here's the full video:" },
      { bigger: true, kind: 'text', content: "Fictional story of a world where people communicate directly through minds.", },
      { kind: 'text', content: "The core product, MindPort™, is a tape which delivers thoughts attaching to skin.", },
      { kind: 'picture', content: "images/theLanguageRevolution8.png", dimension: { x: 6, y: 3 } },
      { kind: 'picture', content: "images/theLanguageRevolution4.png", dimension: { x: 1, y: 1 } },
      { kind: 'picture', content: "images/theLanguageRevolution1.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/theLanguageRevolution3.png", dimension: { x: 6, y: 2 } },
      { kind: 'text', content: "In the future, would language still be needed?", },
      { bigger: true, kind: 'text', content: "What would the world be like if people read minds?", },

      { kind: 'picture', content: "images/theLanguageRevolution2.png", dimension: { x: 1, y: 1 } },
      { kind: 'text', content: "The infrastructure, together with the MindPort™ as a universally accessed, makes the world an aggregation shared minds.", },
      { kind: 'picture', content: "images/theLanguageRevolution5.png", dimension: { x: 1, y: 1 } },

      { kind: 'picture', content: "images/theLanguageRevolution7.png", dimension: { x: 1, y: 1 } },
    ],
  },

  {
    coverPicture: "images/theMinute.png",
    dimension: { x: 2, y: 1 },
    dimension_category: { x: 4, y: 2 },
    pdf: 'pdfs/the_minute.pdf',
    year: 2022,
    title: `The Minute`,
    tags: ["fictions",],
    id: 9002,
    elements: [
      { kind: 'link', content: "icons/youtube3.svg", link: 'https://youtu.be/X1I8Nj77gYI', explanation: "Here's the video:" },
      { bigger: true, kind: 'text', content: "The Minute is an AI generated video, made by Stable Diffusion upon its coming out.", },
      { kind: 'picture', content: "images/theMinute.png", dimension: { x: 4, y: 2 } },
      { kind: 'text', content: "I found it good at transition of the concepts, which is futuristic.", },
      { kind: 'picture', content: "images/theMinute4.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/theMinute5.png", dimension: { x: 2, y: 1 } },
      { kind: 'text', content: "With this idea, I searched and made a list of pairs of concepts to make the process smooth.", },
      { kind: 'text', content: "PEACE -> Lake -> Califlower -> Mushroom cloud -> War -> CHAOS", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: " ", },
      { kind: 'text', content: "RESTRCITION -> Cage -> Stripes -> Long exposure Stripes -> Movement -> FREEDOM", },
      { kind: 'text', content: " ", },
      { kind: 'picture', content: "images/theMinute7.png", dimension: { x: 6, y: 2 } },
      { kind: 'picture', content: "images/theMinute4.png", dimension: { x: 2, y: 1 } },
      { kind: 'picture', content: "images/theMinute8.png", dimension: { x: 2, y: 2 } },
      { kind: 'text', content: "This project expresses my idea for AI when it's firstly coming out: <b>generating rich expression.</b>", },
    ],
  },



];




const logo = {
  // Adding the custom logo "Jiaqi"
  html: `<div style="display: inline-block; width: auto; height: auto;">
          <svg id="Layer_2" data-name="Layer 2" style="display: block; margin: auto; width: 150px; height: auto; overflow: visible;" xmlns="http://www.w3.org/2000/svg" viewBox="20 10 213.74 212.97">
<defs>
  <style>
    .cls-1 {
      fill: none;
      stroke-width: 0px;
    }

    .cls-2 {
      stroke-width: .5px;
    }

    .cls-2, .cls-3 {
      fill: #222020;
      stroke: #222020;
      stroke-miterlimit: 10;
    }

    .cls-3 {
      stroke-width: .75px;
    }
  </style>
</defs>
<g id="Layer_1-2" data-name="Layer 1">
  <g>
    <path class="cls-3" d="M75.24,95.71c1.12,0,1.79.85,1.79,2.08v50.45c0,9.32,2.73,11.68,7.7,16.65,7.12,7.12,8.88,10.65,8.88,20.64,0,15.41-12.18,27.04-28.54,27.04-13.52,0-24.2-8.63-27.64-20.57-.75-2.7-1.05-4.62-1.05-6.09,0-1.23.67-1.85,1.72-1.85,1.12,0,1.64.54,1.87,2,1.64,13.56,11.73,22.96,25.1,22.96s24.73-9.78,24.73-23.57c0-8.4-2.19-12.64-7.87-18.31-7.48-7.48-8.56-8.58-8.56-18.74v-50.6c0-1.23.67-2.08,1.87-2.08Z"/>
    <g>
      <path class="cls-3" d="M89.39,133.94v-36.65c0-.93.59-1.56,1.45-1.56s1.45.63,1.45,1.56v36.65c0,.93-.59,1.56-1.45,1.56s-1.45-.63-1.45-1.56Z"/>
      <path class="cls-3" d="M101.11,124.51c0-6.49,4.67-10.42,13.65-11.09l13.28-.93v-3.45c0-6.68-4.04-10.72-10.87-10.72-6.16,0-10.39,2.75-11.95,8.61-.22.67-.63,1-1.26,1-.78,0-1.3-.52-1.3-1.34,0-.59.22-1.48.52-2.26,1.74-5.05,6.79-8.61,14.02-8.61,8.5,0,13.73,5.05,13.73,13.1v25.15c0,.93-.59,1.52-1.41,1.52s-1.37-.59-1.37-1.52v-7.35h-.07c-1.97,5.23-7.75,8.87-14.21,8.87-7.53,0-12.76-4.49-12.76-10.98ZM128.05,120.58v-5.71l-12.87.93c-7.27.56-11.17,3.71-11.17,8.57,0,5.16,4.3,8.61,10.31,8.61,7.53,0,13.73-5.53,13.73-12.39Z"/>
      <path class="cls-3" d="M139.29,115.61c0-11.87,6.71-19.88,16.43-19.88,7.16,0,12.76,4.71,14.54,10.94h.11v-9.46c0-.89.52-1.48,1.34-1.48s1.37.59,1.37,1.48v74.82c0,.96-.59,1.56-1.45,1.56s-1.45-.59-1.45-1.56v-47.33h-.07c-1.74,6.08-7.31,10.8-14.43,10.8-9.68,0-16.4-8.01-16.4-19.88ZM170.19,115.61c0-10.24-5.86-17.29-14.13-17.29s-13.87,6.97-13.87,17.32,5.68,17.25,13.87,17.25,14.13-7.05,14.13-17.29Z"/>
      <path class="cls-3" d="M183.97,133.94v-36.65c0-.93.59-1.56,1.45-1.56s1.45.63,1.45,1.56v36.65c0,.93-.59,1.56-1.45,1.56s-1.45-.63-1.45-1.56Z"/>
    </g>
    <circle class="cls-2" cx="75.27" cy="80.83" r="2.51"/>
    <circle class="cls-2" cx="90.73" cy="80.83" r="2.51"/>
    <circle class="cls-2" cx="185.18" cy="80.83" r="2.51"/>
  </g>
  <rect class="cls-1" width="253.74" height="252.97"/>
</g>
</svg>
<p style="font-family: 'helvetica', sans-serif; font-size: calc(var(--grid-size) / 10); color: #333; margin-top: 0px; padding: 0 0px; word-wrap: break-word; text-align: right;">
        Profile
      </p>
     </div>`,
  action: () => {
    setupGrid(null, -2)
  }
};

const myself = {
  year: 2000,
  title: `This is Jiaqi Yi`,
  tags: ["Developer", "Designer", "Architect"],
  id: -2,
  elements: [
    {  kind: 'text', content: "Hello! This is <b>Jiaqi Yi</b>, interaction designer based in New York City.", },
    {  kind: 'text', content: "I do a wide range of design, from <b>architecture and game design</b>...", },

    { kind: 'text', content: "<b>...to generative art and web art</b>, also <b>physical installation and interactive exhibitions.</b>", },
    { bigger: true, kind: 'text', content: " ", },
    { bigger: true, kind: 'text', content: " ", },

    { kind: 'link', content: "icons/gDrive.svg", link: 'https://drive.google.com/file/d/1IauqpG0Trfu_eWYY7McEQuKAQnhNQnj6/view?usp=sharing', explanation: "Check my Resume here:" },
    { kind: 'link', content: "icons/gDrive.svg", link: 'https://drive.google.com/file/d/1lt0v3RHOMQmmt8wCkntSEZ5xRP5gXiLS/view?usp=sharing', explanation: "Or Portfolio (selected):" },
    { kind: 'text', content: " ", },
    { kind: 'text', content: " ", },
    { kind: 'text', content: "And here is a brief story of the main character here, Jiaqi Yi.", },
    { kind: 'picture', content: "images/storyOfJiaqi2.jpg", dimension: { x: 2, y: 2 } },
    { smaller: true, kind: 'text', content: "2018, graduated from Changjun High School, went to architecture in Southeast University", },
    { kind: 'picture', content: "images/storyOfJiaqi5.jpg", dimension: { x: 2, y: 1 } },
    { smaller: true, kind: 'text', content: "I was really into archi-things.", },

    { kind: 'picture', content: "images/storyOfJiaqi9.jpg", dimension: { x: 1, y: 1 } },
    { smaller: true, kind: 'text', content: "Soon I flet like design should be way more than space. I went into generative art with a book: Nature of Code ", },
    { kind: 'picture', content: "images/storyOfJiaqi6.jpg", dimension: { x: 1, y: 1 } },
    { smaller: true, kind: 'text', content: "In covid, everything is frozen. However I managed to go to <b>Politecnico di Torino</b>, as the first exchange student in our year. Everything was by myself.", },
    { kind: 'picture', content: "images/storyOfJiaqi1.png", dimension: { x: 1, y: 1 } },
    { smaller: true, kind: 'text', content: "Had a great time there↑ And realized I should grow outside of architecture.", },

    { kind: 'picture', content: "images/choiceReverse.png", dimension: { x: 2, y: 1 }, targetType: 3001 },
    { smaller: true, kind: 'text', content: "And I started to make architecture in games!", },

    { kind: 'picture', content: "images/storyOfJiaqi8.jpg", dimension: { x: 2, y: 2 } },
    { kind: 'picture', content: "images/ChangjunHighSchool.png", dimension: { x: 2, y: 1 }, targetType: 1008 },
    { smaller: true, kind: 'text', content: "Graduated from SEU, and went to <b>NYU ITP</b> for a broader world. Btw, this is my favorite architecture design.", },


    { kind: 'picture', content: "images/petSphere.png", dimension: { x: 1, y: 1 }, targetType: 7001 },
    { kind: 'picture', content: "images/talkingToTheAlien.jpg", dimension: { x: 1, y: 1 }, targetType: 4001 },
    { kind: 'picture', content: "images/mandala.png", dimension: { x: 1, y: 2 }, targetType: 4002 },
    { smaller: true, kind: 'text', content: "In ITP, I did a lot of interaction design in web, in games and physical.", },
    { smaller: true, kind: 'text', content: "And with everything I experienced, I built my own site from 0, in GRID, as it's my favorite design pattern in architecture.", },
  ],
}


/*
unfinished 0529:
1. dune / voronoi / language revo / minute / hexagon / roofs
2. links to linkedin, skills / resume / even portfolio
*/