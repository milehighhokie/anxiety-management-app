import React, { useState } from 'react';
import { Heart, Brain, Users, Coffee, Music, Trees as Tree } from 'lucide-react';

interface Technique {
  id: number;
  name: string;
  description: string;
  steps: string[];
  category: 'emotional' | 'cognitive' | 'social' | 'physical' | 'creative' | 'environmental';
  duration: string;
}

function CopingTechniques() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTechnique, setExpandedTechnique] = useState<number | null>(null);

  const categories = [
    { id: 'emotional', name: 'Emotional', icon: Heart },
    { id: 'cognitive', name: 'Cognitive', icon: Brain },
    { id: 'social', name: 'Social', icon: Users },
    { id: 'physical', name: 'Physical', icon: Coffee },
    { id: 'creative', name: 'Creative', icon: Music },
    { id: 'environmental', name: 'Environmental', icon: Tree },
  ];

  const techniques: Technique[] = [
    {
      id: 1,
      name: 'Progressive Muscle Relaxation',
      description: 'Systematically tense and relax different muscle groups to reduce physical tension and stress.',
      category: 'physical',
      duration: '10-15 minutes',
      steps: [
        'Find a quiet, comfortable place to sit or lie down',
        'Start with your toes, tense the muscles for 5 seconds',
        'Release the tension and notice the feeling of relaxation',
        'Move progressively through each muscle group',
        'End with your facial muscles'
      ]
    },
    {
      id: 2,
      name: 'Thought Reframing',
      description: 'Challenge and change negative thought patterns into more balanced, realistic ones.',
      category: 'cognitive',
      duration: '5-10 minutes',
      steps: [
        'Identify the negative thought',
        'Examine the evidence for and against it',
        'Consider alternative perspectives',
        'Create a more balanced thought',
        'Practice the new perspective'
      ]
    },
    {
      id: 3,
      name: 'Gratitude Journaling',
      description: 'Write down things you\'re grateful for to shift focus to positive aspects of life.',
      category: 'emotional',
      duration: '5-15 minutes',
      steps: [
        'Choose a quiet time of day',
        'Write down 3-5 things you\'re grateful for',
        'Include small and large things',
        'Add specific details about why',
        'Review previous entries occasionally'
      ]
    },
    {
      id: 4,
      name: 'Social Connection',
      description: 'Reach out to supportive people in your life to share feelings and receive support.',
      category: 'social',
      duration: 'Varies',
      steps: [
        'Identify trusted friends or family members',
        'Choose your preferred method of contact',
        'Share your feelings openly',
        'Listen to their perspective',
        'Plan regular check-ins'
      ]
    },
    {
      id: 5,
      name: 'Art Expression',
      description: 'Use creative activities to express emotions and reduce stress.',
      category: 'creative',
      duration: '20-30 minutes',
      steps: [
        'Gather art supplies',
        'Create without judgment',
        'Express your emotions through colors and shapes',
        'Reflect on your creation',
        'Share if you feel comfortable'
      ]
    },
    {
      id: 6,
      name: 'Nature Connection',
      description: 'Spend time in nature to reduce stress and improve mood.',
      category: 'environmental',
      duration: '15-60 minutes',
      steps: [
        'Find a natural setting',
        'Notice the sounds around you',
        'Observe plants and wildlife',
        'Take deep breaths of fresh air',
        'Walk mindfully if possible'
      ]
    }
  ];

  const filteredTechniques = selectedCategory === 'all'
    ? techniques
    : techniques.filter(t => t.category === selectedCategory);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Coping Techniques</h1>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedCategory(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              selectedCategory === id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {name}
          </button>
        ))}
      </div>

      {/* Techniques Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTechniques.map((technique) => (
          <div
            key={technique.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{technique.name}</h3>
              <p className="text-gray-600 mb-4">{technique.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Duration: {technique.duration}</span>
                <span className="capitalize">Category: {technique.category}</span>
              </div>
              <button
                onClick={() => setExpandedTechnique(
                  expandedTechnique === technique.id ? null : technique.id
                )}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                {expandedTechnique === technique.id ? 'Hide Steps' : 'Show Steps'}
              </button>
              {expandedTechnique === technique.id && (
                <div className="mt-4 pl-4">
                  <h4 className="font-semibold mb-2">Steps:</h4>
                  <ol className="list-decimal pl-4">
                    {technique.steps.map((step, index) => (
                      <li key={index} className="text-gray-600 mb-1">{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CopingTechniques;