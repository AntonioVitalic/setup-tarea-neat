import { db } from '../config/firebase.js';
import { Pokemon, PokemonNames, PokemonStatus } from '../models/Pokemon.js';
import { pathToFileURL } from 'url';
import { resolve } from 'path';

// Function to fetch Pokemon data from PokeAPI
async function fetchPokemonData(pokemonId: number) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!response.ok) throw new Error(`Failed to fetch Pokemon ${pokemonId}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching Pokemon ${pokemonId}:`, error);
    return null;
  }
}


// Function to get Pokemon type in Spanish
function getSpanishType(types: any[]): string {
  const typeMap: { [key: string]: string } = {
    'normal': 'Normal',
    'fire': 'Fuego',
    'water': 'Agua',
    'electric': 'Eléctrico',
    'grass': 'Planta',
    'ice': 'Hielo',
    'fighting': 'Lucha',
    'poison': 'Veneno',
    'ground': 'Tierra',
    'flying': 'Volador',
    'psychic': 'Psíquico',
    'bug': 'Bicho',
    'rock': 'Roca',
    'ghost': 'Fantasma',
    'dragon': 'Dragón',
    'dark': 'Siniestro',
    'steel': 'Acero',
    'fairy': 'Hada'
  };
  
  return types.map((type: any) => typeMap[type.type.name] || type.type.name).join('/');
}

// Function to generate diet based on Pokemon type
function generateDiet(types: any[]): string {
  const typeNames = types.map((type: any) => type.type.name);
  
  if (typeNames.includes('grass')) {
    return 'Herbívoro - principalmente plantas y bayas';
  } else if (typeNames.includes('fire')) {
    return 'Omnívoro - bayas y pequeños animales';
  } else if (typeNames.includes('water')) {
    return 'Omnívoro - plantas acuáticas y peces pequeños';
  } else if (typeNames.includes('electric')) {
    return 'Omnívoro - bayas y frutas';
  } else if (typeNames.includes('psychic')) {
    return 'Omnívoro - puede alimentarse de cualquier cosa';
  } else if (typeNames.includes('dragon')) {
    return 'Carnívoro - principalmente peces y pequeños mamíferos';
  } else if (typeNames.includes('flying')) {
    return 'Omnívoro - bayas, frutas y pequeños insectos';
  } else if (typeNames.includes('bug')) {
    return 'Herbívoro - principalmente hojas y savia';
  } else if (typeNames.includes('poison')) {
    return 'Omnívoro - bayas y pequeños animales';
  } else if (typeNames.includes('ground')) {
    return 'Omnívoro - raíces y pequeños animales';
  } else if (typeNames.includes('rock')) {
    return 'Herbívoro - principalmente minerales y plantas';
  } else if (typeNames.includes('ghost')) {
    return 'Omnívoro - puede alimentarse de energía espiritual';
  } else if (typeNames.includes('ice')) {
    return 'Omnívoro - peces y plantas acuáticas';
  } else if (typeNames.includes('steel')) {
    return 'Omnívoro - minerales y bayas';
  } else if (typeNames.includes('fairy')) {
    return 'Herbívoro - principalmente bayas y flores';
  } else if (typeNames.includes('dark')) {
    return 'Omnívoro - bayas y pequeños animales';
  } else if (typeNames.includes('fighting')) {
    return 'Carnívoro - principalmente pequeños animales';
  } else {
    return 'Omnívoro - bayas y pequeños animales';
  }
}

// Function to get region based on Pokemon ID
function getRegion(pokemonId: number): string {
  if (pokemonId <= 151) return 'Kanto';
  if (pokemonId <= 251) return 'Johto';
  if (pokemonId <= 386) return 'Hoenn';
  if (pokemonId <= 493) return 'Sinnoh';
  if (pokemonId <= 649) return 'Unova';
  if (pokemonId <= 721) return 'Kalos';
  if (pokemonId <= 809) return 'Alola';
  if (pokemonId <= 898) return 'Galar';
  return 'Paldea';
}

// Comprehensive Pokemon data from different regions
const samplePokemons: Omit<Pokemon, 'id'>[] = [
  // Kanto Region (1-151)
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Pikachu',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    type: 'Eléctrico',
    diet: 'Omnívoro - bayas y frutas',
    region: 'Kanto'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Charizard',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    type: 'Fuego/Volador',
    diet: 'Carnívoro - principalmente peces y pequeños mamíferos',
    region: 'Kanto'
  },
  { 
    status: PokemonStatus.AVAILABLE,
    name: 'Blastoise',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
    type: 'Agua',
    diet: 'Omnívoro - plantas acuáticas y peces pequeños',
    region: 'Kanto'
  },
  { 
    status: PokemonStatus.AVAILABLE,
    name: 'Venusaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    type: 'Planta/Veneno',
    diet: 'Herbívoro - principalmente plantas y flores',
    region: 'Kanto'
  },
  {  
    status: PokemonStatus.AVAILABLE,
    name: 'Mewtwo',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
    type: 'Psíquico',
    diet: 'Omnívoro - puede alimentarse de cualquier cosa',
    region: 'Kanto'
  },
  
  // Johto Region (152-251)
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Typhlosion',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/157.png',
    type: 'Fuego',
    diet: 'Omnívoro - bayas y pequeños animales',
    region: 'Johto'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Feraligatr',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/160.png',
    type: 'Agua',
    diet: 'Omnívoro - plantas acuáticas y peces pequeños',
    region: 'Johto'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Meganium',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/154.png',
    type: 'Planta',
    diet: 'Herbívoro - principalmente plantas y bayas',
    region: 'Johto'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Lugia',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png',
    type: 'Psíquico/Volador',
    diet: 'Omnívoro - puede alimentarse de cualquier cosa',
    region: 'Johto'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Ho-Oh',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png',
    type: 'Fuego/Volador',
    diet: 'Omnívoro - puede alimentarse de cualquier cosa',
    region: 'Johto'
  },
  
  // Hoenn Region (252-386)
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Blaziken',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/257.png',
    type: 'Fuego/Lucha',
    diet: 'Omnívoro - bayas y pequeños animales',
    region: 'Hoenn'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Swampert',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/260.png',
    type: 'Agua/Tierra',
    diet: 'Omnívoro - plantas acuáticas y peces pequeños',
    region: 'Hoenn'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Sceptile',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/254.png',
    type: 'Planta',
    diet: 'Herbívoro - principalmente plantas y bayas',
    region: 'Hoenn'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Rayquaza',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png',
    type: 'Dragón/Volador',
    diet: 'Carnívoro - principalmente peces y pequeños mamíferos',
    region: 'Hoenn'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Metagross',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/376.png',
    type: 'Acero/Psíquico',
    diet: 'Omnívoro - minerales y bayas',
    region: 'Hoenn'
  },
  
  // Sinnoh Region (387-493)
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Infernape',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/392.png',
    type: 'Fuego/Lucha',
    diet: 'Omnívoro - bayas y pequeños animales',
    region: 'Sinnoh'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Empoleon',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/395.png',
    type: 'Agua/Acero',
    diet: 'Omnívoro - plantas acuáticas y peces pequeños',
    region: 'Sinnoh'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Torterra',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/389.png',
    type: 'Planta/Tierra',
    diet: 'Herbívoro - principalmente plantas y bayas',
    region: 'Sinnoh'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Dialga',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/483.png',
    type: 'Acero/Dragón',
    diet: 'Omnívoro - minerales y bayas',
    region: 'Sinnoh'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Palkia',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/484.png',
    type: 'Agua/Dragón',
    diet: 'Omnívoro - plantas acuáticas y peces pequeños',
    region: 'Sinnoh'
  },
  
  // Unova Region (494-649)
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Emboar',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/500.png',
    type: 'Fuego/Lucha',
    diet: 'Omnívoro - bayas y pequeños animales',
    region: 'Unova'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Samurott',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/503.png',
    type: 'Agua',
    diet: 'Omnívoro - plantas acuáticas y peces pequeños',
    region: 'Unova'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Serperior',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/497.png',
    type: 'Planta',
    diet: 'Herbívoro - principalmente plantas y bayas',
    region: 'Unova'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Zekrom',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/644.png',
    type: 'Dragón/Eléctrico',
    diet: 'Omnívoro - puede alimentarse de cualquier cosa',
    region: 'Unova'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Reshiram',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/643.png',
    type: 'Dragón/Fuego',
    diet: 'Omnívoro - puede alimentarse de cualquier cosa',
    region: 'Unova'
  },
  
  // Kalos Region (650-721)
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Delphox',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/655.png',
    type: 'Fuego/Psíquico',
    diet: 'Omnívoro - bayas y pequeños animales',
    region: 'Kalos'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Greninja',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png',
    type: 'Agua/Siniestro',
    diet: 'Omnívoro - plantas acuáticas y peces pequeños',
    region: 'Kalos'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Chesnaught',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/652.png',
    type: 'Planta/Lucha',
    diet: 'Herbívoro - principalmente plantas y bayas',
    region: 'Kalos'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Xerneas',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/716.png',
    type: 'Hada',
    diet: 'Herbívoro - principalmente bayas y flores',
    region: 'Kalos'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Yveltal',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/717.png',
    type: 'Siniestro/Volador',
    diet: 'Omnívoro - puede alimentarse de cualquier cosa',
    region: 'Kalos'
  },
  
  // Alola Region (722-809)
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Incineroar',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/727.png',
    type: 'Fuego/Siniestro',
    diet: 'Omnívoro - bayas y pequeños animales',
    region: 'Alola'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Primarina',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/730.png',
    type: 'Agua/Hada',
    diet: 'Omnívoro - plantas acuáticas y peces pequeños',
    region: 'Alola'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Decidueye',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/724.png',
    type: 'Planta/Fantasma',
    diet: 'Herbívoro - principalmente plantas y bayas',
    region: 'Alola'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Solgaleo',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/791.png',
    type: 'Psíquico/Acero',
    diet: 'Omnívoro - puede alimentarse de cualquier cosa',
    region: 'Alola'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Lunala',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/792.png',
    type: 'Psíquico/Fantasma',
    diet: 'Omnívoro - puede alimentarse de cualquier cosa',
    region: 'Alola'
  },
  
  // Galar Region (810-898)
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Cinderace',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/815.png',
    type: 'Fuego',
    diet: 'Omnívoro - bayas y pequeños animales',
    region: 'Galar'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Inteleon',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/818.png',
    type: 'Agua',
    diet: 'Omnívoro - plantas acuáticas y peces pequeños',
    region: 'Galar'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Rillaboom',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/812.png',
    type: 'Planta',
    diet: 'Herbívoro - principalmente plantas y bayas',
    region: 'Galar'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Zacian',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/888.png',
    type: 'Hada',
    diet: 'Herbívoro - principalmente bayas y flores',
    region: 'Galar'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Zamazenta',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/889.png',
    type: 'Lucha',
    diet: 'Carnívoro - principalmente pequeños animales',
    region: 'Galar'
  },
  
  // Paldea Region (900+)
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Skeledirge',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/911.png',
    type: 'Fuego/Fantasma',
    diet: 'Omnívoro - bayas y pequeños animales',
    region: 'Paldea'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Quaquaval',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/914.png',
    type: 'Agua/Lucha',
    diet: 'Omnívoro - plantas acuáticas y peces pequeños',
    region: 'Paldea'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Meowscarada',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/908.png',
    type: 'Planta/Siniestro',
    diet: 'Herbívoro - principalmente plantas y bayas',
    region: 'Paldea'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Koraidon',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1007.png',
    type: 'Lucha/Dragón',
    diet: 'Omnívoro - puede alimentarse de cualquier cosa',
    region: 'Paldea'
  },
  {
    status: PokemonStatus.AVAILABLE,
    name: 'Miraidon',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1008.png',
    type: 'Eléctrico/Dragón',
    diet: 'Omnívoro - puede alimentarse de cualquier cosa',
    region: 'Paldea'
  }
];

// Function to create Pokemon from PokeAPI data
async function createPokemonFromAPI(pokemonId: number): Promise<Omit<Pokemon, 'id'> | null> {
  const pokemonData = await fetchPokemonData(pokemonId);
  if (!pokemonData) return null;

  return {
    status: PokemonStatus.AVAILABLE,
    name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
    imageUrl: pokemonData.sprites.other['official-artwork'].front_default || 
              pokemonData.sprites.front_default,
    type: getSpanishType(pokemonData.types),
    diet: generateDiet(pokemonData.types),
    region: getRegion(pokemonId)
  };
}

// Function to add random Pokemon from different regions
async function addRandomPokemonFromRegions() {
  const regionPokemonIds = {
    'Kanto': [1, 4, 7, 25, 39, 52, 63, 66, 72, 81], // Bulbasaur, Charmander, Squirtle, Pikachu, etc.
    'Johto': [152, 155, 158, 161, 164, 167, 170, 173, 176, 179], // Chikorita, Cyndaquil, etc.
    'Hoenn': [252, 255, 258, 261, 264, 267, 270, 273, 276, 279], // Treecko, Torchic, etc.
    'Sinnoh': [387, 390, 393, 396, 399, 402, 405, 408, 411, 414], // Turtwig, Chimchar, etc.
    'Unova': [495, 498, 501, 504, 507, 510, 513, 516, 519, 522], // Snivy, Tepig, etc.
    'Kalos': [650, 653, 656, 659, 662, 665, 668, 671, 674, 677], // Chespin, Fennekin, etc.
    'Alola': [722, 725, 728, 731, 734, 737, 740, 743, 746, 749], // Rowlet, Litten, etc.
    'Galar': [810, 813, 816, 819, 822, 825, 828, 831, 834, 837], // Grookey, Scorbunny, etc.
    'Paldea': [906, 909, 912, 915, 918, 921, 924, 927, 930, 933] // Sprigatito, Fuecoco, etc.
  };

  const additionalPokemon: Omit<Pokemon, 'id'>[] = [];
  
  // Add 2 random Pokemon from each region
  for (const [region, pokemonIds] of Object.entries(regionPokemonIds)) {
    const randomIds = pokemonIds.sort(() => 0.5 - Math.random()).slice(0, 2);
    
    for (const id of randomIds) {
      const pokemon = await createPokemonFromAPI(id);
      if (pokemon) {
        additionalPokemon.push(pokemon);
      }
    }
  }
  
  return additionalPokemon;
}

export async function seedPokemons() {
  try {
    const batch = db.batch();
    const pokemonsRef = db.collection('pokemons');

    // Add the predefined Pokemon
    console.log('🌍 Seeding predefined Pokemon...');
    let id = 1;
    samplePokemons.forEach((pokemon) => {
      const docRef = pokemonsRef.doc(id.toString());
      batch.set(docRef, {
        ...pokemon,
        id: id.toString(),
        createdAt: new Date()
      });
      id++
    });

    // Add random Pokemon from different regions
    console.log('🌍 Fetching additional Pokemon from different regions...');
    const additionalPokemon = await addRandomPokemonFromRegions();
    
    additionalPokemon.forEach((pokemon) => {
      const docRef = pokemonsRef.doc(id.toString());
      batch.set(docRef, {
        ...pokemon,
        id: id.toString(),
        createdAt: new Date()
      });
      id++
    });

    await batch.commit();
    console.log(`✅ Pokemon data seeded successfully! Added ${samplePokemons.length + additionalPokemon.length} Pokemon from all regions.`);
  } catch (error) {
    console.error('❌ Error seeding pokemon data:', error);
  }
}

// Ejecutar el seed si este archivo es ejecutado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  seedPokemons().then(() => process.exit(0));
}

// Ejecutar el seed si este archivo es ejecutado directamente
const isDirectRun =
  !!process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isDirectRun) {
  seedPokemons().then(() => process.exit(0));
}