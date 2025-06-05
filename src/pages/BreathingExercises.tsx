import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

interface BreathingExercise {
  id: number;
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
}

function BreathingExercises() {
  const [activeExercise, setActiveExercise] = useState<BreathingExercise | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [currentCycle, setCurrentCycle] = useState(1);
  const [timer, setTimer] = useState(0);

  const exercises: BreathingExercise[] = [
    {
      id: 1,
      name: '4-7-8 Breathing',
      description: 'A natural tranquilizer for the nervous system, helping reduce anxiety and facilitate sleep.',
      inhale: 4,
      hold: 7,
      exhale: 8,
      cycles: 4
    },
    {
      id: 2,
      name: 'Box Breathing',
      description: 'Used by Navy SEALs to reduce stress and improve concentration.',
      inhale: 4,
      hold: 4,
      exhale: 4,
      cycles: 4
    },
    {
      id: 3,
      name: 'Relaxing Breath',
      description: 'Perfect for quick relaxation and stress relief during the day.',
      inhale: 5,
      hold: 2,
      exhale: 5,
      cycles: 3
    }
  ];

  useEffect(() => {
    let interval: number | undefined;

    if (isPlaying && activeExercise) {
      interval = window.setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1;
          const currentStepDuration = activeExercise[currentStep];

          if (newTimer >= currentStepDuration) {
            // Move to next step
            if (currentStep === 'inhale') {
              setCurrentStep('hold');
              return 0;
            } else if (currentStep === 'hold') {
              setCurrentStep('exhale');
              return 0;
            } else {
              // Complete cycle
              if (currentCycle >= activeExercise.cycles) {
                setIsPlaying(false);
                setCurrentCycle(1);
                setCurrentStep('inhale');
                return 0;
              } else {
                setCurrentCycle((prev) => prev + 1);
                setCurrentStep('inhale');
                return 0;
              }
            }
          }
          return newTimer;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, currentStep, currentCycle, activeExercise]);

  const startExercise = (exercise: BreathingExercise) => {
    setActiveExercise(exercise);
    setIsPlaying(true);
    setCurrentStep('inhale');
    setCurrentCycle(1);
    setTimer(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetExercise = () => {
    setIsPlaying(false);
    setCurrentStep('inhale');
    setCurrentCycle(1);
    setTimer(0);
  };

  const getStepDuration = () => {
    if (!activeExercise) return 0;
    return activeExercise[currentStep];
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Breathing Exercises</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{exercise.name}</h3>
            <p className="text-gray-600 mb-4">{exercise.description}</p>
            <div className="text-sm text-gray-500 mb-4">
              <p>Inhale: {exercise.inhale} seconds</p>
              <p>Hold: {exercise.hold} seconds</p>
              <p>Exhale: {exercise.exhale} seconds</p>
              <p>Cycles: {exercise.cycles}</p>
            </div>
            <button
              onClick={() => startExercise(exercise)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Start Exercise
            </button>
          </div>
        ))}
      </div>

      {activeExercise && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">{activeExercise.name}</h2>
          <div className="text-4xl font-bold text-blue-500 mb-4">
            {currentStep === 'inhale' && 'Inhale'}
            {currentStep === 'hold' && 'Hold'}
            {currentStep === 'exhale' && 'Exhale'}
          </div>
          <div className="text-xl mb-2">
            {timer} / {getStepDuration()} seconds
          </div>
          <div className="text-gray-600 mb-6">
            Cycle {currentCycle} of {activeExercise.cycles}
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={togglePlay}
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={resetExercise}
              className="bg-gray-200 text-gray-700 p-3 rounded-full hover:bg-gray-300 transition-colors"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BreathingExercises;