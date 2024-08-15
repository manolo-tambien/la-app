"use client";

import { useRouter } from 'next/navigation';

export const useCustomRouter = () => {
  const router = useRouter();

  const redirectToRoot = () => {
    router.push('/');
  };

  return {
    redirectToRoot,
  };
};
