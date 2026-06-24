const places = [
  // =====================
  // POINT PEDRO HOTELS
  // Use your own downloaded/local images for hotels.
  // Example asset filenames are given below.
  // =====================
  {
    name: "Village Hotel Northern Point",
    category: "hotel",
    description:
      "A real beachfront accommodation in Point Pedro, suitable for visitors exploring the northern coastal area.",
    location: "Point Pedro, Jaffna",
    latitude: 9.8158,
    longitude: 80.2364,
    image: "village hotel northern point.jpg",
    rating: 4.3,
    openingHours: "Open 24 hours",
    entryFee: "Room rates vary",
    bestTime: "December to April",
    sourceUrl: "https://www.booking.com/hotel/lk/village-northern-point.html",
  },

  {
    name: "KBS Golden House",
    category: "hotel",
    description:
      "A real accommodation option in Point Pedro for travelers visiting nearby northern attractions.",
    location: "Point Pedro, Jaffna",
    latitude: 9.8097,
    longitude: 80.2296,
    image: "KBS Golden House.jpg",
    rating: 4.2,
    openingHours: "Open 24 hours",
    entryFee: "Room rates vary",
    bestTime: "December to April",
    sourceUrl: "https://www.booking.com/city/lk/point-pedro.html",
  },
  {
    name: "Ammu Villa",
    category: "hotel",
    description:
      "A real villa stay listed in Point Pedro, useful for budget-friendly local travel.",
    location: "Point Pedro, Jaffna",
    latitude: 9.8135,
    longitude: 80.2309,
    image: "ammu villa.jpg",
    rating: 4.1,
    openingHours: "Open 24 hours",
    entryFee: "Room rates vary",
    bestTime: "December to April",
    sourceUrl: "https://www.booking.com/hotel/lk/ammu-villa.html",
  },

  // =====================
  // POINT PEDRO NATURE
  // =====================
  {
    name: "Point Pedro Beach",
    category: "nature",
    description:
      "A northern coastal beach area in Point Pedro with sea views and a quiet local atmosphere.",
    location: "Point Pedro, Jaffna",
    latitude: 9.8236,
    longitude: 80.2357,
    image: "point-pedro-jafna2.jpg",
    rating: 4.5,
    openingHours: "Open daily",
    entryFee: "Free",
    bestTime: "Morning or evening",
    sourceUrl: "https://nashaplaneta.net/asia/srilanka/jaffna-dostoprimechatelnosti-point-pedro_en",
  },
  
  {
    name: "Manalkadu Beach and Sand Dunes",
    category: "nature",
    description:
      "A coastal area near Point Pedro known for sand dunes, beach scenery, and nearby church ruins.",
    location: "Manalkadu, near Point Pedro",
    latitude: 9.7258,
    longitude: 80.2496,
    image: "manalkadu-title-photo_orig.jpg",
    rating: 4.6,
    openingHours: "Open daily",
    entryFee: "Free",
    bestTime: "Morning or late afternoon",
    sourceUrl: "https://www.lanka-excursions-holidays.com/manalkadu.html",
  },
  
  

  // =====================
  // POINT PEDRO HISTORICAL
  // These include real image URLs where available.
  // =====================
  {
    name: "Point Pedro Lighthouse",
    category: "historical",
    description:
      "A real lighthouse in Point Pedro, built in 1916, known as a coastal landmark near the northern tip of Sri Lanka.",
    location: "Point Pedro, Jaffna",
    latitude: 9.8239,
    longitude: 80.2368,
    image: "Point_Pedro_Lighthouse.jpg",
    rating: 4.6,
    openingHours: "View from outside",
    entryFee: "Free",
    bestTime: "Morning or evening",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Point_Pedro_Lighthouse.jpg",
  },
  {
    name: "Vallipuram Alvar Vishnu Kovil",
    category: "historical",
    description:
      "A real Hindu temple in Vallipuram near Point Pedro, connected with the cultural and religious history of the region.",
    location: "Vallipuram, near Point Pedro",
    latitude: 9.7897372,
    longitude: 80.242423,
    image: "vallipura vishnu temple.jpg",
    rating: 4.7,
    openingHours: "Morning and evening pooja times",
    entryFee: "Free",
    bestTime: "Morning or evening",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Vallipuram_Vishnu_Temple.jpg",
  },
 
  {
    name: "Manalkadu Old Church Ruins",
    category: "historical",
    description:
      "Old church ruins near Manalkadu, partly surrounded by sand dunes and connected with colonial history in the Jaffna Peninsula.",
    location: "Manalkadu, near Point Pedro",
    latitude: 9.7245,
    longitude: 80.2474,
    image: "manalkadu-title-photo_orig.jpg",
    rating: 4.4,
    openingHours: "Open daily",
    entryFee: "Free",
    bestTime: "Morning or evening",
    sourceUrl: "https://amazinglanka.com/wp/manalkadu-dutch-church/",
  },
  {
    name: "Nilavarai Bottomless Well",
    category: "historical",
    description:
      "A natural underground water well in the Jaffna District, known locally as the Nilavarai Bottomless Well.",
    location: "Nilavarai, Jaffna",
    latitude: 9.7542,
    longitude: 80.0922,
    image: "nilavarai-well.jpg",
    rating: 4.5,
    openingHours: "Open daily",
    entryFee: "Free",
    bestTime: "Morning",
    sourceUrl: "https://alt.army.lk/sfhqj/nilavarai-bottomless-well",
  },
  // =====================
  // KELANIYA AND COLOMBO PLACES
  // =====================
  {
      name: "Hotel Clarion",
      category: "hotel",
      description:
        "A real hotel in Kiribathgoda near Kelaniya, suitable for visitors who want accommodation close to Kelaniya and Colombo.",
      location: "Kiribathgoda, Kelaniya",
      latitude: 6.9839,
      longitude: 79.9307,
      image: "hotel-clarion-kiribathgoda.jpg",
      rating: 0,
      openingHours: "Open 24 hours",
      entryFee: "Room rates vary",
      bestTime: "Year-round",
      sourceUrl: "https://www.hotels.com/ho453945/hotel-clarion-kiribathgoda-sri-lanka/",
    },
    {
      name: "Forever City Hotel",
      category: "hotel",
      description:
        "A real hotel in Kiribathgoda with rooms, garden space, and pool facilities, located close to Kelaniya.",
      location: "Kiribathgoda",
      latitude: 6.9886,
      longitude: 79.9372,
      image: "hotel-forever-city-kiribathgoda.jpg",
      rating: 0,
      openingHours: "Open 24 hours",
      entryFee: "Room rates vary",
      bestTime: "Year-round",
      sourceUrl: "https://www.booking.com/hotel/lk/forever-city.html",
    },
    {
      name: "Pegasus Reef Hotel",
      category: "hotel",
      description:
        "A real beachside hotel in Wattala, useful for visitors staying near Kelaniya, Colombo, and the western coast.",
      location: "Hendala, Wattala",
      latitude: 6.9796,
      longitude: 79.8559,
      image: "hotel-pegasus-reef-wattala.jpg",
      rating: 0,
      openingHours: "Open 24 hours",
      entryFee: "Room rates vary",
      bestTime: "December to April",
      sourceUrl: "https://www.pegasusreefhotel.com/",
    },
    {
      name: "Relax On Plus Kelaniya",
      category: "hotel",
      description:
        "A real 3-star hotel listed in Kelaniya, located within reach of Colombo and Kelaniya attractions.",
      location: "Kelaniya",
      latitude: 6.9565,
      longitude: 79.9218,
      image: "hotel-relax-on-plus-kelaniya.jpg",
      rating: 0,
      openingHours: "Open 24 hours",
      entryFee: "Room rates vary",
      bestTime: "Year-round",
      sourceUrl: "https://www.booking.com/parking/city/lk/kiribathgoda.html",
    },
    {
      name: "Hotel Royal Grand Paradise",
      category: "hotel",
      description:
        "A real hotel in Gonawala, Kelaniya, located close to Kelaniya town and local attractions.",
      location: "Gonawala, Kelaniya",
      latitude: 6.9658,
      longitude: 79.9301,
      image: "hotel-royal-grand-paradise-kelaniya.jpg",
      rating: 0,
      openingHours: "Open 24 hours",
      entryFee: "Room rates vary",
      bestTime: "Year-round",
      sourceUrl: "https://www.travelated.com/sri-lanka/kelaniya/hotel-royal-grand-paradise",
    },
  
    // =====================
    // NATURE PLACES NEAR KELANIYA
    // =====================
    {
      name: "Kelani River View",
      category: "nature",
      description:
        "A riverside area around Kelaniya connected with the Kelani River, useful for scenic views near Kelaniya Raja Maha Vihara.",
      location: "Kelaniya",
      latitude: 6.9568,
      longitude: 79.9226,
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Kelaniya.JPG",
      rating: 0,
      openingHours: "Open daily",
      entryFee: "Free",
      bestTime: "Morning or evening",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kelaniya.JPG",
    },
    {
      name: "Beddagana Wetland Park",
      category: "nature",
      description:
        "An urban wetland park with wetland birds, butterflies, dragonflies, fish, animals, vegetation, ponds, and walking paths.",
      location: "Sri Jayawardenepura Kotte",
      latitude: 6.8869,
      longitude: 79.9071,
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Beddagana%20wetland%20park.jpg",
      rating: 0,
      openingHours: "Check before visiting",
      entryFee: "Ticket may be required",
      bestTime: "Morning",
      sourceUrl: "https://www.uda.gov.lk/beddagana/",
    },
    {
      name: "Diyatha Uyana",
      category: "nature",
      description:
        "A lakeside urban park and walking area in Battaramulla, popular for relaxing, food stalls, water views, and evening visits.",
      location: "Battaramulla",
      latitude: 6.9042,
      longitude: 79.9099,
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Diyatha%20uyana.jpg",
      rating: 0,
      openingHours: "Open daily",
      entryFee: "Free",
      bestTime: "Evening",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Diyatha_uyana.jpg",
    },
    {
      name: "Crow Island Beach Park",
      category: "nature",
      description:
        "A public beach park in Colombo 15 developed for recreation while preserving the natural scenic beauty of the beach.",
      location: "Colombo 15",
      latitude: 6.9736,
      longitude: 79.8667,
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Crow%20Island%20beach.%20Colombo%2015%20-%20Sri%20lanka.jpg",
      rating: 0,
      openingHours: "Open daily",
      entryFee: "Free",
      bestTime: "Evening",
      sourceUrl: "https://www.colombo.mc.gov.lk/pdf/CROWISLANDBEACHPARKpdf.pdf",
    },
    {
      name: "Muthurajawela Wetlands",
      category: "nature",
      description:
        "A large coastal wetland ecosystem north of Colombo, known for biodiversity, marsh scenery, and boating tours.",
      location: "Wattala / Negombo Lagoon area",
      latitude: 7.0875,
      longitude: 79.8669,
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Negombo%20Lagoon%20%28Muthurajawela%20marsh%29%2C%20Sri%20Lanka%20-%20panoramio.jpg",
      rating: 0,
      openingHours: "Check tour availability",
      entryFee: "Tour prices vary",
      bestTime: "Morning",
      sourceUrl: "https://en.wikipedia.org/wiki/Muthurajawela_wetlands",
    },
  
    // =====================
    // HISTORICAL PLACES NEAR KELANIYA
    // =====================
    {
      name: "Kelaniya Raja Maha Vihara",
      category: "historical",
      description:
        "A historic Buddhist temple in Kelaniya, located near the Kelani River and known for religious, cultural, and artistic importance.",
      location: "Kelaniya",
      latitude: 6.9561,
      longitude: 79.9225,
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Kelaniya%20Temple%20%28Kelaniya%20Raja%20Maha%20Vihara%29%20%285439887839%29.jpg",
      rating: 0,
      openingHours: "Open daily",
      entryFee: "Free",
      bestTime: "Morning or evening",
      sourceUrl: "https://kelaniyatemple.lk/",
    },
    {
      name: "Wolvendaal Church",
      category: "historical",
      description:
        "A Dutch colonial-era church in Colombo, completed in 1757 and considered one of the important historical churches in Sri Lanka.",
      location: "Pettah, Colombo",
      latitude: 6.9418,
      longitude: 79.8594,
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/SL%20Colombo%20asv2020-01%20img01%20Wolvendaal%20Church.jpg",
      rating: 0,
      openingHours: "Check before visiting",
      entryFee: "Free",
      bestTime: "Morning",
      sourceUrl: "https://amazinglanka.com/wp/wolvendaal-church/",
    },
    {
      name: "Colombo Dutch Museum",
      category: "historical",
      description:
        "A museum in Colombo connected with Dutch colonial history and architecture, located in the Pettah area.",
      location: "Pettah, Colombo",
      latitude: 6.9379,
      longitude: 79.8549,
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Colombo%20Dutch%20Museum.jpg",
      rating: 0,
      openingHours: "Check before visiting",
      entryFee: "Ticket may be required",
      bestTime: "Morning",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Colombo_Dutch_Museum.jpg",
    },
    {
      name: "Independence Memorial Hall",
      category: "historical",
      description:
        "A national monument in Colombo built to commemorate Sri Lanka's independence from British rule.",
      location: "Cinnamon Gardens, Colombo",
      latitude: 6.9036,
      longitude: 79.8678,
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Independence%20Commemoration%20Hall.jpg",
      rating: 0,
      openingHours: "Open daily",
      entryFee: "Free",
      bestTime: "Morning or evening",
      sourceUrl: "https://www.uniquesrilanka.com/heritage/independence-memorial-hall",
    },
    {
      name: "Colombo National Museum",
      category: "historical",
      description:
        "Sri Lanka's largest museum, founded in 1877, with collections related to Sri Lankan history, culture, and heritage.",
      location: "Colombo 07",
      latitude: 6.9100,
      longitude: 79.8607,
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/National%20Museum%20of%20Colombo.jpg",
      rating: 0,
      openingHours: "Check before visiting",
      entryFee: "Ticket required",
      bestTime: "Morning",
      sourceUrl: "https://www.museum.gov.lk/",
    },
];

module.exports = places;