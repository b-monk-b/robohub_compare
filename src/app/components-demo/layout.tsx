import { Toaster } from '@/components/ui/Toaster';

export default function ComponentsDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
