export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </main>
  );
}
