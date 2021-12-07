import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SampleProps {
  id: string;
  angle: string;
  tgt: string;
  material: string;
  created_at: string;
}

export interface StorageSampleProps {
  [id: string]: {
    data: SampleProps;
  };
}

export async function saveSample(sample: SampleProps): Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@frictionramp:samples');
    const oldSamples = data ? (JSON.parse(data) as StorageSampleProps) : {};

    const newSample = {
      [sample.id]: {
        data: sample,
      },
    };
    await AsyncStorage.setItem(
      '@frictionramp:samples',
      JSON.stringify({ ...newSample, ...oldSamples }),
    );
    console.log(newSample);
  } catch (error) {
    throw new Error(error);
  }
}

export async function loadSamples(): Promise<SampleProps[]> {
  try {
    const data = await AsyncStorage.getItem('@frictionramp:samples');
    const samples = data ? (JSON.parse(data) as StorageSampleProps) : {};

    const samplesSorted = Object.keys(samples).map(plant => ({
      ...samples[plant].data,
    }));

    console.log(samplesSorted);
    return samplesSorted;
  } catch (error) {
    throw new Error(error);
  }
}

export async function removeSample(id: string): Promise<void> {
  const data = await AsyncStorage.getItem('@frictionramp:samples');

  const samples = data ? (JSON.parse(data) as StorageSampleProps) : {};

  delete samples[id];

  await AsyncStorage.setItem('@frictionramp:samples', JSON.stringify(samples));
}
