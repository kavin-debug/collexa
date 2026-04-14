import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export const OfflineBanner = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div className="border-b border-amber-200/60 bg-amber-400 px-4 py-2 text-center text-sm font-medium text-amber-950">
      You are offline &mdash; showing cached data
    </div>
  );
};
