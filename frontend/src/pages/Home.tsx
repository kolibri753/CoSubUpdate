import SubtitleDocCard from "../components/subtitles/SubtitleDocCard";
import AddSubtitleButton from "../components/subtitles/AddSubtitleButton";
import { useGetSubtitleDocs } from "../hooks/hooks";
import { useGetUsers } from "../hooks/hooks";

const Home = () => {
  const { docs, loading: docsLoading } = useGetSubtitleDocs();
  const { users, loading: usersLoading } = useGetUsers();

  console.log(docs)

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-fr">
        <AddSubtitleButton />
        {docsLoading ? (
          <p>Loading...</p>
        ) : (
          docs.map((doc) => (
            <SubtitleDocCard
              key={doc.id}
              id={doc.id}
              name={doc.name}
              createdBy={doc.createdBy}
              access={doc.access}
              users={users}
              usersLoading={usersLoading}
            />
          ))
        )}
      </div>
    </main>
  );
};

export default Home;
