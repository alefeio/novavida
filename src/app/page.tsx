import { BlogSection } from "@/components/home/BlogSection";
import { CommunitySection } from "@/components/home/CommunitySection";
import { CoursesSection } from "@/components/home/CoursesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { InviteSection } from "@/components/home/InviteSection";
import { MeetingsSection } from "@/components/home/MeetingsSection";
import { MessagesSection } from "@/components/home/MessagesSection";
import { MissionSection } from "@/components/home/MissionSection";
import { PrayerSection } from "@/components/home/PrayerSection";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { createPageMetadata, defaultDescription } from "@/lib/seo/metadata";
import { institution } from "@/content/institution";

export const metadata = createPageMetadata({
  title: institution.name,
  description: defaultDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <SectionDivider />
      <MissionSection />
      <CommunitySection />
      <MeetingsSection />
      <CoursesSection />
      <MessagesSection />
      <BlogSection />
      <PrayerSection />
      <InviteSection />
    </>
  );
}
