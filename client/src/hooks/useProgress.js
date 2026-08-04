import { useProgressContext } from '../context/ProgressContext.jsx';

/**
 * Custom hook to access MongoDB progress tracking context.
 * Provides: { checkedState, loading, error, toggleProblem, resetSheetProgress, refetchProgress }
 */
const useProgress = () => {
  return useProgressContext();
};

export default useProgress;
