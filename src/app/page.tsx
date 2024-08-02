import { Home } from "@/components";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice',
  description: 'Invoice App | Home',
};


export default function HomePage() {
  return (
    <Home />
  );
}
