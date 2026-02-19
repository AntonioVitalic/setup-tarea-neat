import { db } from '../config/firebase.js';
import { AdoptionStatus } from '../models/Adoption.js';
import { PokemonStatus } from '../models/Pokemon.js';

export function setupAdoptionsListener() {
  const adoptionsRef = db.collection('adoptions');

  adoptionsRef.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type !== 'modified') return;

      const adoptionData = change.doc.data();

      if (adoptionData.status === AdoptionStatus.APPROVED) {
        const pokemonId = adoptionData.pokemonId;
        if (!pokemonId) return;

        try {
          const pokemonRef = db.collection('pokemons').doc(pokemonId);
          const pokemonSnap = await pokemonRef.get();

          if (!pokemonSnap.exists) {
            console.warn(`Pokemon ${pokemonId} no existe. Se omite actualización de estado.`);
            return;
          }

          await pokemonRef.update({ status: PokemonStatus.PREPARED });
          console.log(
            `Pokemon ${pokemonId} actualizado a PREPARED después de aprobar adopción ${change.doc.id}`
          );
        } catch (error) {
          console.error(`Error al actualizar el estado del Pokémon ${pokemonId}:`, error);
        }
      }
    });
  });

  console.log('Listener de adopciones configurado correctamente');
}