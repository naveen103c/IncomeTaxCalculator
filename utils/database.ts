import * as SQLite from 'expo-sqlite';

export interface ProfileData {
  id?: number;
  name: string;
  email: string;
  pan: string;
  phone: string;
  occupation: string;
  createdAt?: string;
  updatedAt?: string;
}

let db: SQLite.SQLiteDatabase | null = null;

// Initialize database
export const initDatabase = async (): Promise<void> => {
  try {
    db = await SQLite.openDatabaseAsync('incometax.db');
    
    // Create profile table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        pan TEXT NOT NULL,
        phone TEXT NOT NULL,
        occupation TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Save or update profile
export const saveProfile = async (profileData: ProfileData): Promise<void> => {
  try {
    if (!db) {
      throw new Error('Database not initialized');
    }

    // Check if profile exists
    const existing = await db.getFirstAsync<ProfileData>('SELECT * FROM profile LIMIT 1');
    
    if (existing && existing.id) {
      // Update existing profile
      await db.runAsync(
        `UPDATE profile SET 
          name = ?, 
          email = ?, 
          pan = ?, 
          phone = ?, 
          occupation = ?,
          updatedAt = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [profileData.name, profileData.email, profileData.pan, profileData.phone, profileData.occupation, existing.id]
      );
      console.log('Profile updated successfully');
    } else {
      // Insert new profile
      await db.runAsync(
        `INSERT INTO profile (name, email, pan, phone, occupation) 
         VALUES (?, ?, ?, ?, ?)`,
        [profileData.name, profileData.email, profileData.pan, profileData.phone, profileData.occupation]
      );
      console.log('Profile created successfully');
    }
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
};

// Load profile
export const loadProfile = async (): Promise<ProfileData | null> => {
  try {
    if (!db) {
      throw new Error('Database not initialized');
    }

    const profile = await db.getFirstAsync<ProfileData>('SELECT * FROM profile LIMIT 1');
    return profile || null;
  } catch (error) {
    console.error('Error loading profile:', error);
    throw error;
  }
};

// Get all data from database (for debugging/viewing)
export const getAllDatabaseData = async (): Promise<any> => {
  try {
    if (!db) {
      throw new Error('Database not initialized');
    }

    const profiles = await db.getAllAsync('SELECT * FROM profile');
    
    return {
      profiles,
      totalProfiles: profiles.length,
    };
  } catch (error) {
    console.error('Error getting database data:', error);
    throw error;
  }
};

// Delete profile (optional)
export const deleteProfile = async (): Promise<void> => {
  try {
    if (!db) {
      throw new Error('Database not initialized');
    }

    await db.runAsync('DELETE FROM profile');
    console.log('Profile deleted successfully');
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};

// Export database as JSON string (for viewing/debugging)
export const exportDatabaseAsJSON = async (): Promise<string> => {
  try {
    const data = await getAllDatabaseData();
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error exporting database:', error);
    throw error;
  }
};
