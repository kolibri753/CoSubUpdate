import SubtitleDocCard from "../components/subtitles/SubtitleDocCard";
import AddSubtitleButton from "../components/subtitles/AddSubtitleButton";

const mockSubtitles = [
  {
    id: "1",
    name: "Movie 1",
    createdBy: "User A",
    contributors: ["User B", "User C"],
  },
  { id: "2", name: "Show 2", createdBy: "User D", contributors: ["User E"] },
];

const Home = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-fr">
        <AddSubtitleButton />
        {mockSubtitles.map((doc) => (
          <SubtitleDocCard key={doc.id} {...doc} />
        ))}
      </div>
    </main>
  );
};

export default Home;
