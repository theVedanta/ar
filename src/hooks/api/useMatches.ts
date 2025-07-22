import { useState, useEffect, useCallback } from 'react';
import { Match } from '@/lib/firebase/types';

interface UseMatchesProps {
  studentId?: string;
  scribeId?: string;
  autoFetch?: boolean;
}

interface UseMatchesReturn {
  matches: Match[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createMatches: (matchData: {
    studentId: string;
    examDetails: any;
    location?: string;
  }) => Promise<{ matches: any[] }>;
  confirmMatch: (matchId: string) => Promise<void>;
  completeMatch: (matchId: string) => Promise<void>;
}

export const useMatches = ({
  studentId,
  scribeId,
  autoFetch = true,
}: UseMatchesProps = {}): UseMatchesReturn => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = useCallback(async () => {
    if (!autoFetch && !studentId && !scribeId) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (studentId) params.append('studentId', studentId);
      if (scribeId) params.append('scribeId', scribeId);

      if (!params.toString()) {
        setMatches([]);
        return;
      }

      const response = await fetch(`/api/matches?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch matches');
      }

      setMatches(data.matches || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [studentId, scribeId, autoFetch]);

  const createMatches = useCallback(async (matchData: {
    studentId: string;
    examDetails: any;
    location?: string;
  }) => {
    setError(null);

    try {
      const response = await fetch('/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create matches');
      }

      // Refetch matches after creating
      await fetchMatches();

      return {
        matches: data.matches,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [fetchMatches]);

  const confirmMatch = useCallback(async (matchId: string) => {
    setError(null);

    try {
      const response = await fetch('/api/matches', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matchId,
          action: 'confirm',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to confirm match');
      }

      // Update local state
      setMatches(prev =>
        prev.map(match =>
          match.id === matchId
            ? { ...match, status: 'confirmed', confirmedAt: new Date() }
            : match
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const completeMatch = useCallback(async (matchId: string) => {
    setError(null);

    try {
      const response = await fetch('/api/matches', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matchId,
          action: 'complete',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete match');
      }

      // Update local state
      setMatches(prev =>
        prev.map(match =>
          match.id === matchId
            ? { ...match, status: 'completed', completedAt: new Date() }
            : match
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchMatches();
    }
  }, [fetchMatches, autoFetch]);

  return {
    matches,
    loading,
    error,
    refetch: fetchMatches,
    createMatches,
    confirmMatch,
    completeMatch,
  };
};

export default useMatches;
