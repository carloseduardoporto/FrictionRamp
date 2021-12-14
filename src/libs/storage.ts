import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SampleProps {
  id: string;
  user_id: string;
  angle: string;
  tgt: string;
  material: string;
  superficie: string;
  created_at: string;
}

export interface StorageSampleProps {
  [id: string]: {
    data: SampleProps;
  };
}

export async function saveSample(sample: SampleProps): Promise<void> {
  try {
    const data = await AsyncStorage.getItem(`${sample.user_id}:samples`);
    const oldSamples = data ? (JSON.parse(data) as StorageSampleProps) : {};

    const newSample = {
      [sample.id]: {
        data: sample,
      },
    };
    await AsyncStorage.setItem(
      `${sample.user_id}:samples`,
      JSON.stringify({ ...newSample, ...oldSamples }),
    );
  } catch {
    throw new Error('Erro ao salvar ensaio');
  }
}

export async function loadSamples(user_id: string): Promise<SampleProps[]> {
  try {
    const data = await AsyncStorage.getItem(`${user_id}:samples`);
    const samples = data ? (JSON.parse(data) as StorageSampleProps) : {};

    const samplesSorted = Object.keys(samples).map(plant => ({
      ...samples[plant].data,
    }));

    return samplesSorted;
  } catch {
    throw new Error('Erro ao carregar Ensaios');
  }
}

export async function removeSample(id: string, user_id: string): Promise<void> {
  const data = await AsyncStorage.getItem(`${user_id}:samples`);

  const samples = data ? (JSON.parse(data) as StorageSampleProps) : {};

  delete samples[id];

  await AsyncStorage.setItem(`${user_id}:samples`, JSON.stringify(samples));
}
