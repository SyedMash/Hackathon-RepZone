import Hero from "@/components/Home/Hero";

export const dynamic = "force-dynamic";
export const revalidate = 30;

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
