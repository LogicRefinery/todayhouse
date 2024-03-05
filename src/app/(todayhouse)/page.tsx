async function getData() {
  const res = await fetch("http://localhost:9090/data", { method: "GET" });
  return res.json();
}

export default async function Home() {
  const data = await getData();
  return <main>{JSON.stringify(data)}</main>;
}
