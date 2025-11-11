import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MedVis AI',
  description: 'Medical Imaging Visualization powered by AI',
};

// eslint-disable-next-line no-undef
export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
