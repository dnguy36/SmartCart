import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Advantages from "@/components/Advantages";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Advantages />
        <Testimonials />
        <CallToAction />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
