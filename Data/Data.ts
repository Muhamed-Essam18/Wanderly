export interface Country {
  id: string;
  name: string;
  flag: string;
  budgetLevel: "low" | "medium" | "high";
  weeklyBudget: { min: number; max: number };
  travelStyles: string[];
  vibe: string[];
  cities: string[];
  landmarks: string[];
  avgFoodCost: number;
  avgAccommodationCost: number;
  description: string;
  heroImage: string;
}

export const countries: Country[] = [
  {
    id: "vietnam",
    name: "Vietnam",
    flag: "vn",
    budgetLevel: "low",
    weeklyBudget: { min: 1200, max: 1500 },
    travelStyles: ["Nature", "Historical", "Beach"],
    vibe: ["vibrant", "traditional"],
    cities: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hoi An"],
    landmarks: [
      "Ha Long Bay",
      "Cu Chi Tunnels",
      "Marble Mountains",
      "Mekong Delta",
    ],
    avgFoodCost: 8,
    avgAccommodationCost: 25,
    description:
      "A land of staggering natural beauty with vibrant cities, incredible street food, and rich history.",
    heroImage:
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
  },
  {
    id: "portugal",
    name: "Portugal",
    flag: "pt",
    budgetLevel: "high",
    weeklyBudget: { min: 2000, max: 2500 },
    travelStyles: ["City", "Beach", "Historical"],
    vibe: ["calm", "traditional"],
    cities: ["Lisbon", "Porto", "Faro", "Sintra"],
    landmarks: [
      "Belém Tower",
      "Pena Palace",
      "Ribeira District",
      "Benagil Cave",
    ],
    avgFoodCost: 20,
    avgAccommodationCost: 65,
    description:
      "Coastal charm meets historic grandeur with world-class wine, stunning beaches, and warm hospitality.",
    heroImage:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800",
  },
  {
    id: "japan",
    name: "Japan",
    flag: "jp",
    budgetLevel: "low",
    weeklyBudget: { min: 1000, max: 1400 },
    travelStyles: ["City", "Nature", "Historical"],
    vibe: ["modern", "calm"],
    cities: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"],
    landmarks: [
      "Mount Fuji",
      "Fushimi Inari",
      "Senso-ji Temple",
      "Arashiyama Bamboo Grove",
    ],
    avgFoodCost: 35,
    avgAccommodationCost: 100,
    description:
      "Where ancient traditions seamlessly blend with cutting-edge technology and natural wonders.",
    heroImage:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1170",
  },
  {
    id: "mexico",
    name: "Mexico",
    flag: "mx",
    budgetLevel: "low",
    weeklyBudget: { min: 1200, max: 1500 },
    travelStyles: ["Beach", "Historical", "City"],
    vibe: ["vibrant", "traditional"],
    cities: ["Mexico City", "Oaxaca", "Tulum", "Guadalajara"],
    landmarks: ["Chichen Itza", "Cenotes", "Teotihuacan", "Frida Kahlo Museum"],
    avgFoodCost: 12,
    avgAccommodationCost: 35,
    description:
      "Ancient ruins, vibrant culture, incredible cuisine, and pristine beaches await.",
    heroImage:
      "https://images.unsplash.com/photo-1568402102990-bc541580b59f?q=80&w=687",
  },
  {
    id: "iceland",
    name: "Iceland",
    flag: "is",
    budgetLevel: "high",
    weeklyBudget: { min: 2000, max: 2200 },
    travelStyles: ["Nature"],
    vibe: ["calm", "modern"],
    cities: ["Reykjavik", "Akureyri", "Vik"],
    landmarks: [
      "Blue Lagoon",
      "Golden Circle",
      "Northern Lights",
      "Jökulsárlón",
    ],
    avgFoodCost: 50,
    avgAccommodationCost: 150,
    description:
      "Otherworldly landscapes of glaciers, volcanoes, hot springs, and the magical Northern Lights.",
    heroImage:
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800",
  },
  {
    id: "thailand",
    name: "Thailand",
    flag: "th",
    budgetLevel: "low",
    weeklyBudget: { min: 700, max: 980 },
    travelStyles: ["Beach", "City", "Nature"],
    vibe: ["vibrant", "calm"],
    cities: ["Bangkok", "Chiang Mai", "Phuket", "Krabi"],
    landmarks: [
      "Grand Palace",
      "Phi Phi Islands",
      "Wat Phra That Doi Suthep",
      "Railay Beach",
    ],
    avgFoodCost: 10,
    avgAccommodationCost: 30,
    description:
      "Tropical paradise with golden temples, turquoise waters, and legendary street food.",
    heroImage:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800",
  },
  {
    id: "morocco",
    name: "Morocco",
    flag: "ma",
    budgetLevel: "low",
    weeklyBudget: { min: 800, max: 1100 },
    travelStyles: ["Historical", "City", "Nature"],
    vibe: ["vibrant", "traditional"],
    cities: ["Marrakech", "Fes", "Chefchaouen", "Essaouira"],
    landmarks: [
      "Jardin Majorelle",
      "Sahara Desert",
      "Hassan II Mosque",
      "Medina of Fes",
    ],
    avgFoodCost: 15,
    avgAccommodationCost: 40,
    description:
      "A sensory feast of colors, spices, and ancient medinas where Africa meets Arabia.",
    heroImage:
      "https://plus.unsplash.com/premium_photo-1661962958462-9e52fda9954d",
  },
  {
    id: "newzealand",
    name: "New Zealand",
    flag: "nz",
    budgetLevel: "medium",
    weeklyBudget: { min: 1800, max: 2000 },
    travelStyles: ["Nature", "Beach"],
    vibe: ["calm", "modern"],
    cities: ["Auckland", "Wellington", "Queenstown", "Rotorua"],
    landmarks: [
      "Milford Sound",
      "Hobbiton",
      "Tongariro Alpine Crossing",
      "Bay of Islands",
    ],
    avgFoodCost: 40,
    avgAccommodationCost: 120,
    description:
      "Epic landscapes of mountains, fjords, and rolling hills that inspired Middle-earth.",
    heroImage:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800",
  },
  {
    id: "greece",
    name: "Greece",
    flag: "gr",
    budgetLevel: "low",
    weeklyBudget: { min: 1300, max: 2000 },
    travelStyles: ["Beach", "Historical", "City"],
    vibe: ["calm", "traditional"],
    cities: ["Athens", "Santorini", "Mykonos", "Crete"],
    landmarks: ["Acropolis", "Oia Sunset", "Meteora", "Delphi"],
    avgFoodCost: 25,
    avgAccommodationCost: 80,
    description:
      "Ancient wonders, sun-drenched islands, and Mediterranean charm at every turn.",
    heroImage:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
  },
  {
    id: "colombia",
    name: "Colombia",
    flag: "co",
    budgetLevel: "low",
    weeklyBudget: { min: 1100, max: 1200 },
    travelStyles: ["City", "Nature", "Beach"],
    vibe: ["vibrant", "modern"],
    cities: ["Bogotá", "Medellín", "Cartagena", "Cali"],
    landmarks: [
      "Lost City",
      "Cocora Valley",
      "Tayrona National Park",
      "San Andrés",
    ],
    avgFoodCost: 12,
    avgAccommodationCost: 35,
    description:
      "A resurgent gem with incredible biodiversity, passionate culture, and warm people.",
    heroImage:
      "https://images.unsplash.com/photo-1534943441045-1009d7cb0bb9?q=80&w=808",
  },
  {
    id: "indonesia",
    name: "Indonesia",
    flag: "id",
    budgetLevel: "low",
    weeklyBudget: { min: 1000, max: 1400 },
    travelStyles: ["Beach", "Nature", "Cultural"],
    vibe: ["calm", "vibrant"],
    cities: ["Bali", "Jakarta", "Yogyakarta", "Lombok"],
    landmarks: [
      "Borobudur Temple",
      "Mount Bromo",
      "Ubud Rice Terraces",
      "Gili Islands",
    ],
    avgFoodCost: 10,
    avgAccommodationCost: 30,
    description:
      "A vast archipelago offering spiritual culture, tropical beaches, and dramatic volcanoes.",
    heroImage:
      "https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?q=80&w=1170",
  },

  {
    id: "italy",
    name: "Italy",
    flag: "it",
    budgetLevel: "medium",
    weeklyBudget: { min: 1600, max: 1800 },
    travelStyles: ["City", "Historical", "Cultural"],
    vibe: ["romantic", "vibrant"],
    cities: ["Rome", "Florence", "Venice", "Milan"],
    landmarks: [
      "Colosseum",
      "Vatican",
      "Leaning Tower of Pisa",
      "Duomo di Firenze",
    ],
    avgFoodCost: 30,
    avgAccommodationCost: 90,
    description:
      "Timeless art, iconic architecture, unforgettable cuisine, and deep cultural heritage.",
    heroImage:
      "https://images.unsplash.com/photo-1514896856000-91cb6de818e0?q=80&w=1171",
  },

  {
    id: "spain",
    name: "Spain",
    flag: "es",
    budgetLevel: "medium",
    weeklyBudget: { min: 1500, max: 1600 },
    travelStyles: ["City", "Beach", "Cultural"],
    vibe: ["vibrant", "social"],
    cities: ["Barcelona", "Madrid", "Seville", "Valencia"],
    landmarks: ["Sagrada Familia", "Alhambra", "Park Güell", "Plaza Mayor"],
    avgFoodCost: 25,
    avgAccommodationCost: 80,
    description:
      "Lively cities, rich traditions, sun-soaked beaches, and legendary nightlife.",
    heroImage:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1170",
  },

  {
    id: "turkey",
    name: "Turkey",
    flag: "tr",
    budgetLevel: "low",
    weeklyBudget: { min: 1000, max: 1250 },
    travelStyles: ["Historical", "City", "Cultural"],
    vibe: ["vibrant", "traditional"],
    cities: ["Istanbul", "Cappadocia", "Antalya", "Izmir"],
    landmarks: ["Hagia Sophia", "Blue Mosque", "Pamukkale", "Göreme"],
    avgFoodCost: 15,
    avgAccommodationCost: 45,
    description:
      "A bridge between East and West with stunning history, food, and landscapes.",
    heroImage:
      "https://images.unsplash.com/photo-1605581810011-c6d684e7ca22?q=80&w=1138",
  },

  {
    id: "southafrica",
    name: "South Africa",
    flag: "za",
    budgetLevel: "low",
    weeklyBudget: { min: 900, max: 1200 },
    travelStyles: ["Nature", "City", "Adventure"],
    vibe: ["modern", "wild"],
    cities: ["Cape Town", "Johannesburg", "Durban"],
    landmarks: ["Table Mountain", "Kruger National Park", "Cape of Good Hope"],
    avgFoodCost: 18,
    avgAccommodationCost: 60,
    description:
      "Wild safaris, dramatic coastlines, and vibrant urban culture.",
    heroImage:
      "https://images.unsplash.com/photo-1594795311074-4f384eff0a49?q=80&w=1074",
  },

  {
    id: "peru",
    name: "Peru",
    flag: "pe",
    budgetLevel: "low",
    weeklyBudget: { min: 500, max: 550 },
    travelStyles: ["Historical", "Nature", "Adventure"],
    vibe: ["traditional", "mystical"],
    cities: ["Cusco", "Lima", "Arequipa"],
    landmarks: ["Machu Picchu", "Sacred Valley", "Rainbow Mountain"],
    avgFoodCost: 12,
    avgAccommodationCost: 35,
    description:
      "Ancient civilizations, Andean landscapes, and rich indigenous culture.",
    heroImage:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800",
  },

  {
    id: "france",
    name: "France",
    flag: "fr",
    budgetLevel: "high",
    weeklyBudget: { min: 2000, max: 2500 },
    travelStyles: ["City", "Romantic", "Cultural"],
    vibe: ["romantic", "elegant"],
    cities: ["Paris", "Lyon", "Nice"],
    landmarks: ["Eiffel Tower", "Louvre", "Mont Saint-Michel"],
    avgFoodCost: 35,
    avgAccommodationCost: 120,
    description: "World-class art, cuisine, romance, and iconic landmarks.",
    heroImage:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
  },

  {
    id: "egypt",
    name: "Egypt",
    flag: "eg",
    budgetLevel: "low",
    weeklyBudget: { min: 300, max: 1000 },
    travelStyles: ["Historical", "Cultural"],
    vibe: ["traditional", "vibrant"],
    cities: ["Cairo", "Luxor", "Aswan", "Alexandria"],
    landmarks: ["Pyramids of Giza", "Valley of the Kings", "Karnak Temple"],
    avgFoodCost: 8,
    avgAccommodationCost: 30,
    description:
      "The cradle of civilization with legendary monuments and timeless history.",
    heroImage: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80",
  },

  {
    id: "brazil",
    name: "Brazil",
    flag: "br",
    budgetLevel: "medium",
    weeklyBudget: { min: 1600, max: 1700 },
    travelStyles: ["Beach", "Nature", "City"],
    vibe: ["vibrant", "energetic"],
    cities: ["Rio de Janeiro", "São Paulo", "Salvador"],
    landmarks: ["Christ the Redeemer", "Iguazu Falls", "Copacabana"],
    avgFoodCost: 20,
    avgAccommodationCost: 60,
    description:
      "High-energy culture, stunning beaches, rainforests, and festivals.",
    heroImage:
      "https://images.unsplash.com/photo-1593995863951-57c27e518295?q=80&w=735",
  },

  {
    id: "nepal",
    name: "Nepal",
    flag: "np",
    budgetLevel: "low",
    weeklyBudget: { min: 500, max: 950 },
    travelStyles: ["Nature", "Adventure", "Spiritual"],
    vibe: ["calm", "spiritual"],
    cities: ["Kathmandu", "Pokhara"],
    landmarks: ["Mount Everest", "Annapurna Circuit", "Swayambhunath"],
    avgFoodCost: 6,
    avgAccommodationCost: 20,
    description:
      "A spiritual and adventurous haven in the heart of the Himalayas.",
    heroImage:
      "https://images.unsplash.com/photo-1611516491426-03025e6043c8?q=80&w=1333",
  },
  {
    id: "canada",
    name: "Canada",
    flag: "ca",
    budgetLevel: "high",
    weeklyBudget: { min: 2000, max: 2100 },
    travelStyles: ["Nature", "City"],
    vibe: ["calm", "modern"],
    cities: ["Toronto", "Vancouver", "Montreal", "Banff"],
    landmarks: ["Niagara Falls", "Banff National Park", "CN Tower"],
    avgFoodCost: 35,
    avgAccommodationCost: 120,
    description:
      "Vast wilderness, multicultural cities, and stunning natural scenery.",
    heroImage:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800",
  },

  {
    id: "argentina",
    name: "Argentina",
    flag: "ar",
    budgetLevel: "medium",
    weeklyBudget: { min: 1500, max: 1850 },
    travelStyles: ["City", "Nature", "Cultural"],
    vibe: ["romantic", "vibrant"],
    cities: ["Buenos Aires", "Mendoza", "Bariloche"],
    landmarks: ["Patagonia", "Iguazu Falls", "Perito Moreno Glacier"],
    avgFoodCost: 20,
    avgAccommodationCost: 60,
    description:
      "European-style cities, world-class wine, and dramatic landscapes.",
    heroImage:
      "https://images.unsplash.com/photo-1599094792743-7df3e8870800?q=80&w=1158",
  },

  {
    id: "australia",
    name: "Australia",
    flag: "au",
    budgetLevel: "high",
    weeklyBudget: { min: 2200, max: 2500 },
    travelStyles: ["Beach", "City", "Nature"],
    vibe: ["relaxed", "modern"],
    cities: ["Sydney", "Melbourne", "Brisbane"],
    landmarks: ["Great Barrier Reef", "Sydney Opera House", "Uluru"],
    avgFoodCost: 40,
    avgAccommodationCost: 130,
    description: "Iconic beaches, laid-back lifestyle, and unique wildlife.",
    heroImage:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1530",
  },

  {
    id: "hungary",
    name: "Hungary",
    flag: "hu",
    budgetLevel: "medium",
    weeklyBudget: { min: 1650, max: 700 },
    travelStyles: ["City", "Historical"],
    vibe: ["romantic", "traditional"],
    cities: ["Budapest", "Szeged"],
    landmarks: ["Parliament Building", "Buda Castle", "Thermal Baths"],
    avgFoodCost: 15,
    avgAccommodationCost: 45,
    description: "Elegant architecture, thermal baths, and rich history.",
    heroImage:
      "https://plus.unsplash.com/premium_photo-1680721310331-7c5bea03392d?q=80&w=1170",
  },

  {
    id: "czechia",
    name: "Czech Republic",
    flag: "cz",
    budgetLevel: "low",
    weeklyBudget: { min: 1200, max: 1750 },
    travelStyles: ["City", "Historical"],
    vibe: ["romantic", "traditional"],
    cities: ["Prague", "Brno"],
    landmarks: ["Charles Bridge", "Prague Castle"],
    avgFoodCost: 18,
    avgAccommodationCost: 55,
    description:
      "Fairytale cities, medieval architecture, and rich beer culture.",
    heroImage:
      "https://plus.unsplash.com/premium_photo-1721675134861-a495c57ca4ef?q=80&w=1332",
  },

  {
    id: "austria",
    name: "Austria",
    flag: "at",
    budgetLevel: "medium",
    weeklyBudget: { min: 1700, max: 1900 },
    travelStyles: ["City", "Nature", "Cultural"],
    vibe: ["calm", "elegant"],
    cities: ["Vienna", "Salzburg", "Innsbruck"],
    landmarks: ["Schönbrunn Palace", "Hallstatt", "Alps"],
    avgFoodCost: 28,
    avgAccommodationCost: 90,
    description:
      "Classical music heritage, alpine beauty, and imperial cities.",
    heroImage:
      "https://images.unsplash.com/photo-1606944331341-72bf6523ff5e?q=80&w=1332",
  },

  {
    id: "poland",
    name: "Poland",
    flag: "pl",
    budgetLevel: "low",
    weeklyBudget: { min: 850, max: 1200 },
    travelStyles: ["City", "Historical"],
    vibe: ["traditional", "calm"],
    cities: ["Krakow", "Warsaw", "Gdansk"],
    landmarks: ["Wawel Castle", "Old Town Krakow"],
    avgFoodCost: 15,
    avgAccommodationCost: 45,
    description: "Deep history, charming old towns, and hearty cuisine.",
    heroImage:
      "https://images.unsplash.com/photo-1563177978-4c5ffc081b2a?q=80&w=1074",
  },

  {
    id: "romania",
    name: "Romania",
    flag: "ro",
    budgetLevel: "low",
    weeklyBudget: { min: 1300, max: 1250 },
    travelStyles: ["Nature", "Historical"],
    vibe: ["mystical", "traditional"],
    cities: ["Bucharest", "Brasov", "Sibiu"],
    landmarks: ["Bran Castle", "Carpathian Mountains"],
    avgFoodCost: 12,
    avgAccommodationCost: 40,
    description: "Medieval castles, wild mountains, and folklore legends.",
    heroImage:
      "https://images.unsplash.com/photo-1534371020656-6b85825f2b1a?q=80&w=1170",
  },

  {
    id: "finland",
    name: "Finland",
    flag: "fi",
    budgetLevel: "high",
    weeklyBudget: { min: 2100, max: 2500 },
    travelStyles: ["Nature", "City"],
    vibe: ["calm", "minimal"],
    cities: ["Helsinki", "Rovaniemi"],
    landmarks: ["Northern Lights", "Lapland", "Suomenlinna"],
    avgFoodCost: 38,
    avgAccommodationCost: 120,
    description: "Arctic beauty, pristine lakes, and peaceful Nordic living.",
    heroImage:
      "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?q=80&w=1170",
  },

  {
    id: "norway",
    name: "Norway",
    flag: "no",
    budgetLevel: "high",
    weeklyBudget: { min: 2000, max: 2500 },
    travelStyles: ["Nature"],
    vibe: ["calm", "wild"],
    cities: ["Oslo", "Bergen"],
    landmarks: ["Geirangerfjord", "Lofoten Islands"],
    avgFoodCost: 45,
    avgAccommodationCost: 140,
    description: "Dramatic fjords, untouched nature, and Arctic wonders.",
    heroImage:
      "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1332",
  },

  {
    id: "sweden",
    name: "Sweden",
    flag: "se",
    budgetLevel: "high",
    weeklyBudget: { min: 2250, max: 2500 },
    travelStyles: ["City", "Nature"],
    vibe: ["modern", "calm"],
    cities: ["Stockholm", "Gothenburg"],
    landmarks: ["Gamla Stan", "Archipelago"],
    avgFoodCost: 40,
    avgAccommodationCost: 120,
    description: "Stylish cities, nature escapes, and Scandinavian design.",
    heroImage:
      "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800",
  },

  {
    id: "chile",
    name: "Chile",
    flag: "cl",
    budgetLevel: "medium",
    weeklyBudget: { min: 1600, max: 1900 },
    travelStyles: ["Nature", "Adventure"],
    vibe: ["wild", "modern"],
    cities: ["Santiago", "Valparaíso", "Puerto Natales"],
    landmarks: ["Torres del Paine", "Atacama Desert"],
    avgFoodCost: 20,
    avgAccommodationCost: 65,
    description: "From deserts to glaciers, Chile offers extreme landscapes.",
    heroImage:
      "https://images.unsplash.com/photo-1490782300182-697b80ad4293?q=80&w=1227",
  },

  {
    id: "bolivia",
    name: "Bolivia",
    flag: "bo",
    budgetLevel: "low",
    weeklyBudget: { min: 600, max: 700 },
    travelStyles: ["Nature", "Adventure"],
    vibe: ["mystical", "traditional"],
    cities: ["La Paz", "Uyuni"],
    landmarks: ["Salar de Uyuni", "Lake Titicaca"],
    avgFoodCost: 10,
    avgAccommodationCost: 30,
    description: "Surreal salt flats and indigenous heritage in the Andes.",
    heroImage:
      "https://images.unsplash.com/photo-1544142447-e43d0fe04bf2?q=80&w=1170",
  },

  {
    id: "croatia",
    name: "Croatia",
    flag: "hr",
    budgetLevel: "medium",
    weeklyBudget: { min: 1550, max: 1200 },
    travelStyles: ["Beach", "Historical"],
    vibe: ["calm", "romantic"],
    cities: ["Dubrovnik", "Split", "Zagreb"],
    landmarks: ["Dubrovnik Old Town", "Plitvice Lakes"],
    avgFoodCost: 22,
    avgAccommodationCost: 70,
    description: "Crystal-clear coastlines and medieval towns.",
    heroImage:
      "https://images.unsplash.com/photo-1506158669146-619067262a00?w=800",
  },

  {
    id: "slovenia",
    name: "Slovenia",
    flag: "si",
    budgetLevel: "medium",
    weeklyBudget: { min: 1800, max: 2000 },
    travelStyles: ["Nature", "City"],
    vibe: ["calm", "green"],
    cities: ["Ljubljana", "Bled"],
    landmarks: ["Lake Bled", "Triglav National Park"],
    avgFoodCost: 20,
    avgAccommodationCost: 65,
    description: "A green gem with alpine lakes and charming towns.",
    heroImage:
      "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800",
  },
  {
    id: "germany",
    name: "Germany",
    flag: "de",
    budgetLevel: "medium",
    weeklyBudget: { min: 1700, max: 2000 },
    travelStyles: ["City", "Historical", "Cultural"],
    vibe: ["modern", "structured"],
    cities: ["Berlin", "Munich", "Hamburg", "Cologne"],
    landmarks: ["Brandenburg Gate", "Neuschwanstein Castle", "Berlin Wall"],
    avgFoodCost: 25,
    avgAccommodationCost: 85,
    description:
      "A blend of modern cities, deep history, and fairytale castles.",
    heroImage:
      "https://images.unsplash.com/photo-1618259278412-2819cbdea4dc?q=80&w=1121",
  },

  {
    id: "netherlands",
    name: "Netherlands",
    flag: "nl",
    budgetLevel: "high",
    weeklyBudget: { min: 2000, max: 2250 },
    travelStyles: ["City", "Cultural"],
    vibe: ["modern", "relaxed"],
    cities: ["Amsterdam", "Rotterdam", "Utrecht"],
    landmarks: ["Canals of Amsterdam", "Kinderdijk Windmills"],
    avgFoodCost: 30,
    avgAccommodationCost: 95,
    description: "Canal-lined cities, cycling culture, and artistic heritage.",
    heroImage:
      "https://images.unsplash.com/photo-1595698251407-8e7e3030a715?q=80&w=1170",
  },

  {
    id: "belgium",
    name: "Belgium",
    flag: "be",
    budgetLevel: "medium",
    weeklyBudget: { min: 1700, max: 2000 },
    travelStyles: ["City", "Historical"],
    vibe: ["romantic", "calm"],
    cities: ["Brussels", "Bruges", "Antwerp"],
    landmarks: ["Grand Place", "Bruges Canals"],
    avgFoodCost: 28,
    avgAccommodationCost: 90,
    description: "Medieval towns, world-famous chocolate, and rich history.",
    heroImage:
      "https://images.unsplash.com/photo-1547057951-61fcf322bb1e?q=80&w=1074",
  },

  {
    id: "switzerland",
    name: "Switzerland",
    flag: "ch",
    budgetLevel: "high",
    weeklyBudget: { min: 2000, max: 2200 },
    travelStyles: ["Nature", "City"],
    vibe: ["calm", "luxury"],
    cities: ["Zurich", "Lucerne", "Interlaken"],
    landmarks: ["Matterhorn", "Lake Lucerne", "Jungfraujoch"],
    avgFoodCost: 45,
    avgAccommodationCost: 150,
    description: "Alpine perfection, pristine lakes, and world-class scenery.",
    heroImage:
      "https://images.unsplash.com/photo-1570161766218-f8488ebb8078?q=80&w=1170",
  },

  {
    id: "ireland",
    name: "Ireland",
    flag: "ie",
    budgetLevel: "medium",
    weeklyBudget: { min: 1500, max: 1900 },
    travelStyles: ["Nature", "City"],
    vibe: ["friendly", "calm"],
    cities: ["Dublin", "Galway", "Cork"],
    landmarks: ["Cliffs of Moher", "Ring of Kerry"],
    avgFoodCost: 30,
    avgAccommodationCost: 90,
    description: "Green landscapes, warm pubs, and legendary folklore.",
    heroImage:
      "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=1074",
  },

  {
    id: "scotland",
    name: "Scotland",
    flag: "gb-sct",
    budgetLevel: "medium",
    weeklyBudget: { min: 1650, max: 1850 },
    travelStyles: ["Nature", "Historical"],
    vibe: ["mystical", "calm"],
    cities: ["Edinburgh", "Glasgow", "Inverness"],
    landmarks: ["Edinburgh Castle", "Isle of Skye", "Loch Ness"],
    avgFoodCost: 28,
    avgAccommodationCost: 85,
    description: "Dramatic highlands, ancient castles, and Celtic heritage.",
    heroImage:
      "https://images.unsplash.com/photo-1505832018823-50331d70d237?q=80&w=1208",
  },

  {
    id: "denmark",
    name: "Denmark",
    flag: "dk",
    budgetLevel: "high",
    weeklyBudget: { min: 2100, max: 2200 },
    travelStyles: ["City", "Cultural"],
    vibe: ["minimal", "calm"],
    cities: ["Copenhagen", "Aarhus"],
    landmarks: ["Nyhavn", "Tivoli Gardens"],
    avgFoodCost: 38,
    avgAccommodationCost: 120,
    description: "Nordic design, cycling culture, and cozy city life.",
    heroImage:
      "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=1170",
  },

  {
    id: "philippines",
    name: "Philippines",
    flag: "ph",
    budgetLevel: "low",
    weeklyBudget: { min: 550, max: 700 },
    travelStyles: ["Beach", "Nature"],
    vibe: ["relaxed", "vibrant"],
    cities: ["Manila", "Cebu", "Palawan"],
    landmarks: ["El Nido", "Chocolate Hills", "Boracay"],
    avgFoodCost: 10,
    avgAccommodationCost: 30,
    description: "Island-hopping paradise with turquoise waters.",
    heroImage:
      "https://images.unsplash.com/photo-1590077211339-724573dc4121?q=80&w=1074",
  },

  {
    id: "malaysia",
    name: "Malaysia",
    flag: "my",
    budgetLevel: "low",
    weeklyBudget: { min: 500, max: 650 },
    travelStyles: ["City", "Nature"],
    vibe: ["modern", "cultural"],
    cities: ["Kuala Lumpur", "Penang", "Langkawi"],
    landmarks: ["Petronas Towers", "Batu Caves"],
    avgFoodCost: 8,
    avgAccommodationCost: 28,
    description: "Cultural diversity, rainforests, and futuristic skylines.",
    heroImage:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1164",
  },

  {
    id: "singapore",
    name: "Singapore",
    flag: "sg",
    budgetLevel: "high",
    weeklyBudget: { min: 2300, max: 2500 },
    travelStyles: ["City"],
    vibe: ["modern", "luxury"],
    cities: ["Singapore"],
    landmarks: ["Marina Bay Sands", "Gardens by the Bay"],
    avgFoodCost: 35,
    avgAccommodationCost: 140,
    description: "Ultra-modern city with unmatched cleanliness and cuisine.",
    heroImage:
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800",
  },

  {
    id: "southkorea",
    name: "South Korea",
    flag: "kr",
    budgetLevel: "medium",
    weeklyBudget: { min: 1600, max: 1700 },
    travelStyles: ["City", "Cultural"],
    vibe: ["modern", "vibrant"],
    cities: ["Seoul", "Busan"],
    landmarks: ["Gyeongbokgung Palace", "Jeju Island"],
    avgFoodCost: 22,
    avgAccommodationCost: 75,
    description: "K-pop energy, ancient palaces, and dynamic street life.",
    heroImage:
      "https://images.unsplash.com/photo-1523180003485-e6e7d62c938b?q=80&w=1170",
  },

  {
    id: "taiwan",
    name: "Taiwan",
    flag: "tw",
    budgetLevel: "low",
    weeklyBudget: { min: 1000, max: 1250 },
    travelStyles: ["City", "Nature"],
    vibe: ["friendly", "modern"],
    cities: ["Taipei", "Kaohsiung"],
    landmarks: ["Taipei 101", "Taroko Gorge"],
    avgFoodCost: 15,
    avgAccommodationCost: 55,
    description: "Night markets, mountains, and warm hospitality.",
    heroImage:
      "https://images.unsplash.com/photo-1530324652194-d78318776d5c?q=80&w=765",
  },

  {
    id: "china",
    name: "China",
    flag: "cn",
    budgetLevel: "medium",
    weeklyBudget: { min: 1500, max: 1900 },
    travelStyles: ["Historical", "City"],
    vibe: ["traditional", "modern"],
    cities: ["Beijing", "Shanghai", "Xi'an"],
    landmarks: ["Great Wall", "Forbidden City", "Terracotta Army"],
    avgFoodCost: 18,
    avgAccommodationCost: 60,
    description: "Ancient civilization with futuristic megacities.",
    heroImage:
      "https://images.unsplash.com/photo-1516545595035-b494dd0161e4?q=80&w=1170",
  },

  {
    id: "saudiarabia",
    name: "Saudi Arabia",
    flag: "sa",
    budgetLevel: "medium",
    weeklyBudget: { min: 1800, max: 2500 },
    travelStyles: ["Cultural", "Historical"],
    vibe: ["traditional", "emerging"],
    cities: ["Riyadh", "Jeddah", "AlUla"],
    landmarks: ["Hegra", "Edge of the World"],
    avgFoodCost: 20,
    avgAccommodationCost: 70,
    description:
      "Desert wonders, ancient trade routes, and rapid transformation.",
    heroImage:
      "https://plus.unsplash.com/premium_photo-1697730274057-19338e84db8e?q=80&w=1170",
  },

  {
    id: "uae",
    name: "United Arab Emirates",
    flag: "ae",
    budgetLevel: "high",
    weeklyBudget: { min: 2100, max: 2500 },
    travelStyles: ["City", "Luxury"],
    vibe: ["luxury", "modern"],
    cities: ["Dubai", "Abu Dhabi"],
    landmarks: ["Burj Khalifa", "Sheikh Zayed Mosque"],
    avgFoodCost: 35,
    avgAccommodationCost: 140,
    description: "Ultra-luxury cities rising from the desert.",
    heroImage:
      "https://images.unsplash.com/photo-1498496294664-d9372eb521f3?w=800",
  },

  {
    id: "qatar",
    name: "Qatar",
    flag: "qa",
    budgetLevel: "high",
    weeklyBudget: { min: 2000, max: 2500 },
    travelStyles: ["City", "Cultural"],
    vibe: ["luxury", "calm"],
    cities: ["Doha"],
    landmarks: ["Museum of Islamic Art", "Katara"],
    avgFoodCost: 35,
    avgAccommodationCost: 130,
    description: "Modern luxury with deep Arabian heritage.",
    heroImage:
      "https://images.unsplash.com/photo-1700901742651-6b353164caf3?q=80&w=1170",
  },

  {
    id: "oman",
    name: "Oman",
    flag: "om",
    budgetLevel: "medium",
    weeklyBudget: { min: 1600, max: 1800 },
    travelStyles: ["Nature", "Cultural"],
    vibe: ["calm", "traditional"],
    cities: ["Muscat", "Nizwa"],
    landmarks: ["Wadi Shab", "Nizwa Fort"],
    avgFoodCost: 18,
    avgAccommodationCost: 60,
    description: "Authentic Arabian culture with dramatic landscapes.",
    heroImage:
      "https://images.unsplash.com/photo-1599743777555-e362a2feab39?q=80&w=688",
  },

  {
    id: "kenya",
    name: "Kenya",
    flag: "ke",
    budgetLevel: "medium",
    weeklyBudget: { min: 1500, max: 1650 },
    travelStyles: ["Nature", "Adventure"],
    vibe: ["wild", "vibrant"],
    cities: ["Nairobi", "Mombasa"],
    landmarks: ["Maasai Mara", "Mount Kenya"],
    avgFoodCost: 15,
    avgAccommodationCost: 55,
    description: "Iconic safaris, wildlife, and dramatic savannas.",
    heroImage:
      "https://plus.unsplash.com/premium_photo-1664304370557-233bccc0ac85?q=80&w=1179",
  },

  {
    id: "tanzania",
    name: "Tanzania",
    flag: "tz",
    budgetLevel: "medium",
    weeklyBudget: { min: 1550, max: 1650 },
    travelStyles: ["Nature", "Adventure"],
    vibe: ["wild", "calm"],
    cities: ["Arusha", "Zanzibar"],
    landmarks: ["Serengeti", "Mount Kilimanjaro", "Zanzibar Beaches"],
    avgFoodCost: 14,
    avgAccommodationCost: 55,
    description:
      "Safari heartland with pristine beaches and legendary wildlife.",
    heroImage:
      "https://plus.unsplash.com/premium_photo-1664304476568-0266b152bf9c?q=80&w=1192",
  },
];

export const travelStyles = ["Nature", "Historical", "City", "Beach"] as const;
export const vibeOptions = [
  "calm",
  "vibrant",
  "modern",
  "traditional",
] as const;
export const budgetLevels = ["low", "medium", "high"] as const;
