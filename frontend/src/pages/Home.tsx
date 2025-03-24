import SubtitleDocCard from "../components/subtitles/SubtitleDocCard";
import AddSubtitleButton from "../components/subtitles/AddSubtitleButton";
import { useGetSubtitleDocs } from "../hooks/hooks";

const Home = () => {
  const { docs, loading } = useGetSubtitleDocs();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-fr">
        <AddSubtitleButton />
        {loading ? (
          <p>Loading...</p>
        ) : (
          docs.map((doc) => (
            <SubtitleDocCard
              key={doc.id}
              id={doc.id}
              name={doc.name}
              createdBy={doc.createdBy}
              contributors={doc.contributors}
            />
          ))
        )}
      </div>
    </main>
  );
};

export default Home;
