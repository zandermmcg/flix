import '@styles/globals.css';
import NavBar from '@/components/layout/Navbar.module';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container">
        <NavBar/>
        <div className="page">
          {children}
        </div>
      </body>
    </html>
  );
}
