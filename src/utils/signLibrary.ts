interface SignEntry {
  name: string;
  data: Blob;
  timestamp: number;
}

class SignLibrary {
  private signs: Map<string, SignEntry>;

  constructor() {
    this.signs = new Map();
  }

  async addSign(name: string, data: Blob): Promise<void> {
    this.signs.set(name.toLowerCase(), {
      name,
      data,
      timestamp: Date.now()
    });
    await this.persistLibrary();
  }

  async getSign(name: string): Promise<SignEntry | undefined> {
    return this.signs.get(name.toLowerCase());
  }

  async getAllSigns(): Promise<SignEntry[]> {
    return Array.from(this.signs.values());
  }

  private async persistLibrary(): Promise<void> {
    // Convert blobs to base64 for storage
    const serializedSigns = Array.from(this.signs.entries()).map(([key, entry]) => ({
      key,
      name: entry.name,
      timestamp: entry.timestamp,
      // Store blob reference or metadata - actual blob handling would need backend storage
      blobId: key
    }));

    try {
      localStorage.setItem('signLibrary', JSON.stringify(serializedSigns));
    } catch (error) {
      console.error('Error saving sign library:', error);
    }
  }
}

const signLibrary = new SignLibrary();

export const saveSignToLibrary = async (name: string, data: Blob): Promise<void> => {
  await signLibrary.addSign(name, data);
};

export const getSignFromLibrary = async (name: string): Promise<SignEntry | undefined> => {
  return await signLibrary.getSign(name);
};

export const getAllSigns = async (): Promise<SignEntry[]> => {
  return await signLibrary.getAllSigns();
};