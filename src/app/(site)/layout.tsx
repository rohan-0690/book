import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
    </>
  );
}
