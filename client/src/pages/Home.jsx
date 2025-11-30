import { useState } from "react";
import API from "../api";

export default function Home() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await API.get(`/user/${username}`);
      setData(res.data);
    } catch {
      alert("User not found");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>README Generator</h1>

      <input
        style={{ width: 250, padding: 8 }}
        placeholder="GitHub Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={fetchData} style={{ marginLeft: 10 }}>
        Fetch
      </button>

      {data && (
        <div style={{ marginTop: 20 }}>
          <h2>{data.user.name}</h2>
          <p>{data.user.bio}</p>
          <img src={data.user.avatar_url} width={120} alt="avatar" />

          <h3>Top Repos</h3>
          {data.repos.map((r) => (
            <p key={r.name}>
              ⭐ {r.stars} — {r.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
