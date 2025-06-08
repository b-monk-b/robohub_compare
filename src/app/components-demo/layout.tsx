import { Toaster } from '@/components/ui/toast';

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
