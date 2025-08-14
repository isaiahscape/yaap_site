import Header from "../components/Header";
import Hero from "../components/Hero";
import Screenshots from "../components/Screenshots";
import DeviceList from "../components/DeviceList";
import Contribute from "../components/Contribute";
import Footer from "../components/Footer";
import { Container } from "../components/ui/container";
import { Separator } from "../components/ui/separator";

export default function Page() {
  return (
    <Container>
      {/* Add Header here if available */}
      <Header />
      <Hero />
      <Separator className="my-8" />
      <Screenshots />
      <Separator className="my-8" />
      <DeviceList />
      <Separator className="my-8" />
      <Contribute />
      <Separator className="my-8" />\
      <Footer />
      {/* Add Footer here if available */}
    </Container>
  );
}
