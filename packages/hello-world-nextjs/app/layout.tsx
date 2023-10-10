export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body><div>root layout header</div>{children}<div>root layout footer</div></body>
    </html>
  );
}
