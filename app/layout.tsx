import './globals.css';

export const metadata = {
  title: 'NEXORA — Intelligence, engineered into every layer.',
  description:
    'NEXORA builds AI, automation, and data platforms for enterprises — from model to interface, engineered end to end.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
