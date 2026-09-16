import Hero from "@/components/Hero";
import ApologySection from "@/components/ApologySection";
import TulipSection from "@/components/TulipSection";
import NoExcuses from "@/components/NoExcuses";
import Memories from "@/components/Memories";
import NoteStack from "@/components/NoteStack";
import Letter from "@/components/Letter";
import SpaceSection from "@/components/SpaceSection";
import Envelope from "@/components/Envelope";
import FinalSection from "@/components/FinalSection";
import Divider from "@/components/Divider";

export default function Page() {
  return (
    <main>
      {/* here is something I made for you */}
      <Hero />

      <Divider className="py-2" />

      {/* I know I hurt you */}
      <ApologySection />

      {/* the tulips */}
      <TulipSection />

      {/* no excuses */}
      <NoExcuses />

      {/* the memories */}
      <Memories />

      {/* a few little things I still notice */}
      <NoteStack />

      {/* what I actually want to say */}
      <Letter />

      <Divider className="pb-4" />

      {/* you don't have to answer */}
      <SpaceSection />

      {/* one last thing */}
      <Envelope />

      {/* I'm sorry */}
      <FinalSection />
    </main>
  );
}
