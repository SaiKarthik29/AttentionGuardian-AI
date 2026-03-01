import Stats from "../components/Stats";

export default function Dashboard({ theme }) {
  return (
    <div>
      <h1 style={{ color: theme.text }}>Your Learning Progress</h1>
      <Stats theme={theme} />
    </div>
  );
}