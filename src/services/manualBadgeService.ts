/**
 * Service for managing manual badge settings from JSON file
 * Read-only: badges are controlled by editing the JSON file on the server
 */

interface ManualBadgeData {
  version: number;
  lastUpdated: string;
  badges: Record<string, boolean>;
}

class ManualBadgeService {
  private cache: Record<string, boolean> | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_DURATION = 30000; // 30 seconds

  /**
   * Fetch manual badge settings from the JSON file
   */
  async fetchManualBadges(): Promise<Record<string, boolean>> {
    // Return cached data if still valid
    const now = Date.now();
    if (this.cache && (now - this.cacheTimestamp) < this.CACHE_DURATION) {
      return this.cache;
    }

    try {
      const response = await fetch('/data/manual-badges.json?t=' + now);
      if (!response.ok) {
        console.warn('Failed to fetch manual badges, using empty state');
        return {};
      }

      const data: ManualBadgeData = await response.json();
      this.cache = data.badges || {};
      this.cacheTimestamp = now;
      
      console.log('Manual badges loaded:', this.cache);
      return this.cache;
    } catch (error) {
      console.error('Error fetching manual badges:', error);
      return {};
    }
  }

  /**
   * Clear the cache to force a fresh fetch
   */
  clearCache(): void {
    this.cache = null;
    this.cacheTimestamp = 0;
  }

  /**
   * Get a specific badge status from cache (if available)
   */
  getCachedBadge(contentId: string): boolean | undefined {
    return this.cache?.[contentId];
  }
}

export const manualBadgeService = new ManualBadgeService();
