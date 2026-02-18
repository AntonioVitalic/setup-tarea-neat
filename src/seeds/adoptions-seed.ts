import { pathToFileURL } from 'url';
import { resolve } from 'path';
import { db } from "../config/firebase.js";
import { Adoption, AdoptionStatus } from "../models/Adoption.js";

const adoptions: Partial<Adoption>[] = [
  {
    userData: {
      name: 'Alejandro Sanchez',
      email: 'alejandro@gmail.com',
      phone: '1234567890',
      region: 'Region 1',
      idNumber: '1234567890',
    },
    status: AdoptionStatus.APPROVED,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userData: {
      name: 'Juan Pérez',
      email: 'juan@gmail.com',
      phone: '1234567890',
      region: 'Region 1',
      idNumber: '1234567891',
    },
    status: AdoptionStatus.UNDER_REVIEW,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userData: {
      name: 'María López',
      email: 'maria@gmail.com',
      phone: '1234567890',
      region: 'Region 1',
      idNumber: '1234567892',
    },
    status: AdoptionStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userData: {
      name: 'Pedro Gómez',
      email: 'pedro@gmail.com',
      phone: '1234567890',
      region: 'Region 1',
      idNumber: '1234567893',
    },
    status: AdoptionStatus.DELIVERED,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userData: {
      name: 'Ana Rodríguez',
      email: 'ana@gmail.com',
      phone: '1234567895',
      region: 'Region 1',
      idNumber: '1234567894',
    },
    status: AdoptionStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

const seedAdoptions = async () => {
  try {
    const batch = db.batch();
    const adoptionsRef = db.collection('adoptions');

    adoptions.forEach((adoption, idx) => {
      const docRef = adoptionsRef.doc();
      batch.set(docRef, {...adoption, pokemonId: (idx + 1).toString()});
    });

    await batch.commit();
    console.log('Adoptions seeded successfully');
  }
  catch (error) {
    console.error('Error seeding adoptions:', error);
  }
}

// Ejecutar el seed si este archivo es ejecutado directamente
const isDirectRun =
  !!process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isDirectRun) {
  seedAdoptions().then(() => process.exit(0));
}