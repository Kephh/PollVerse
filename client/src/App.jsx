import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

const CreatePoll = lazy(() => import('./Components/CreatePoll'));
const ViewPoll = lazy(() => import('./Components/ViewPoll'));
const UpdateVotes = lazy(() => import('./Components/UpdateVotes'));

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>PollVerse</h1>
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Create</NavLink>
          <NavLink to="/vote" className={({ isActive }) => isActive ? 'active' : ''}>Vote</NavLink>
          <NavLink to="/view" className={({ isActive }) => isActive ? 'active' : ''}>View</NavLink>
        </nav>
      </header>

      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<CreatePoll />} />
            <Route path="/view" element={<ViewPoll />} />
            <Route path="/vote" element={<UpdateVotes />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}
