import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import MoodTracker from './pages/MoodTracker';
import Journal from './pages/Journal';
import BreathingExercises from './pages/BreathingExercises';
import CopingTechniques from './pages/CopingTechniques';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/breathing" element={<BreathingExercises />} />
          <Route path="/coping" element={<CopingTechniques />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;