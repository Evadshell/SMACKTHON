// pages/index.js

import Landing from "./landing";
// import SignInButton from "./signInButton";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <nav className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h2 className="text-xl font-bold text-indigo-600">MediStat</h2>
            {/* <SignInButton /> */}
          </div>
        </nav>
        <Landing />
      </div>
    </main>
  );
}
