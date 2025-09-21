import HeroSection from "../components/hero-section"
import ProfileSection from "../components/profile-section"
import PhilosophySection from "../components/philosophy-section"
import CurrentStateSection from "../components/current-state-section"
import PoliticalIssuesSection from "../components/political-issues-section"
import SongArchiveSection from "../components/song-archive-section"
import GoalsSection from "../components/goals-section"
import CalendarSection from "../components/calendar-section"
import FansSection from "../components/fans-section"
import GoodsSection from "../components/goods-section"
import RecruitmentSection from "../components/recruitment-section"
import ContactSection from "../components/contact-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ProfileSection />
      <PhilosophySection />
      <CurrentStateSection />
      <PoliticalIssuesSection />
      <SongArchiveSection />
      <GoalsSection />
      <CalendarSection />
      <FansSection />
      <GoodsSection />
      <RecruitmentSection />
      <ContactSection />
    </div>
  )
}
