import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { trackFotografi, trackDesain, trackStreaming } from '../data/curriculum';

const calculateLevel = (xp) => {
  if (xp >= 1400) return 5;
  if (xp >= 900) return 4;
  if (xp >= 500) return 3;
  if (xp >= 200) return 2;
  return 1;
};

const calculateProgressToNextLevel = (xp) => {
  const levelBounds = [0, 200, 500, 900, 1400];
  const currentLevel = calculateLevel(xp);
  
  if (currentLevel === 5) return 100; // Max level

  const currentBound = levelBounds[currentLevel - 1];
  const nextBound = levelBounds[currentLevel];
  const xpInLevel = xp - currentBound;
  const levelRange = nextBound - currentBound;

  return Math.min(Math.round((xpInLevel / levelRange) * 100), 100);
};

export const useGamificationStore = create(
  persist(
    (set, get) => ({
      user: {
        name: 'Tamu',
        isLoggedIn: false,
      },
      theme: 'dark', // 'dark' or 'light'
      selectedTracks: [], // 'fotografi', 'desain'
      completedUnits: [], // array of unit IDs
      trackXP: {
        fotografi: 0,
        desain: 0,
        streaming: 0,
      },

      login: (name, tracks) => set({
        user: { name, isLoggedIn: true },
        selectedTracks: tracks,
      }),

      logout: () => set({
        user: { name: 'Tamu', isLoggedIn: false },
        selectedTracks: [],
        completedUnits: [],
        trackXP: { fotografi: 0, desain: 0, streaming: 0 },
      }),

      toggleTheme: () => set((state) => ({
        theme: state.theme === 'dark' ? 'light' : 'dark'
      })),

      addTrack: (trackId) => set((state) => {
        if (state.selectedTracks.includes(trackId)) return state;
        return { selectedTracks: [...state.selectedTracks, trackId] };
      }),

      completeUnit: (unitId, trackId, xpReward) => set((state) => {
        if (state.completedUnits.includes(unitId)) return state; // Already completed

        const newCompletedUnits = [...state.completedUnits, unitId];
        const newXP = state.trackXP[trackId] + xpReward;

        // Check for level up
        const oldLevel = calculateLevel(state.trackXP[trackId]);
        const newLevel = calculateLevel(newXP);

        if (newLevel > oldLevel) {
          // Trigger level up animation (could be handled in UI via an event or another state)
          console.log(`Level Up! ${trackId} is now level ${newLevel}`);
        }

        return {
          completedUnits: newCompletedUnits,
          trackXP: {
            ...state.trackXP,
            [trackId]: newXP
          }
        };
      }),

      getTrackLevel: (trackId) => {
        return calculateLevel(get().trackXP[trackId] || 0);
      },
      
      getTrackProgress: (trackId) => {
        return calculateProgressToNextLevel(get().trackXP[trackId] || 0);
      },

      isUnitUnlocked: (unitId, trackId) => {
        const state = get();
        // Simple linear unlock logic: find the unit in the track, check if previous is completed
        const track = trackId === 'fotografi' ? trackFotografi : (trackId === 'desain' ? trackDesain : trackStreaming);
        let allUnits = [];
        track.levels.forEach(l => {
          allUnits = allUnits.concat(l.units);
        });

        const unitIndex = allUnits.findIndex(u => u.id === unitId);
        if (unitIndex === 0) return true; // First unit always unlocked
        if (unitIndex === -1) return false;

        const previousUnit = allUnits[unitIndex - 1];
        return state.completedUnits.includes(previousUnit.id);
      }
    }),
    {
      name: 'frameup-gamification-storage',
    }
  )
);
