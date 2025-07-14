'use client';

import { useState } from 'react';

export default function DebugStorage() {
  const [showDebug, setShowDebug] = useState(false);

  const checkStorage = () => {
    if (typeof window === 'undefined') return null;

    try {
      const users = JSON.parse(localStorage.getItem('returo_users') || '[]');
      const auth = JSON.parse(localStorage.getItem('returo_auth') || 'null');

      return { users, auth };
    } catch {
      return { error: 'Failed to parse localStorage' };
    }
  };

  const clearStorage = () => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('returo_users');
    localStorage.removeItem('returo_auth');
    alert('Storage cleared!');
  };

  const addTestUser = () => {
    if (typeof window === 'undefined') return;

    const users = JSON.parse(localStorage.getItem('returo_users') || '[]');
    const testUser = {
      id: `user_${Date.now()}_test`,
      email: 'andrei.pata@cleancodeculture.com',
      firstName: 'Andrei',
      lastName: 'Pata',
      phone: '0700000000',
      avatar: '/illustrations/persona_illustration.png',
      dateJoined: new Date().toISOString(),
      isVerified: true,
    };

    // Remove existing user with same email
    const filteredUsers = users.filter((u: { email: string }) => u.email !== testUser.email);
    filteredUsers.push(testUser);

    localStorage.setItem('returo_users', JSON.stringify(filteredUsers));
    alert('Test user added!');
  };

  const storageData = checkStorage();

  if (!showDebug) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowDebug(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Debug Storage
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Debug Storage</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Users in Storage:</h4>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
              {JSON.stringify(storageData?.users || [], null, 2)}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold">Auth Data:</h4>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
              {JSON.stringify(storageData?.auth || null, null, 2)}
            </pre>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={clearStorage}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Clear Storage
            </button>
            <button
              onClick={addTestUser}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              Add Test User
            </button>
          </div>

          <button
            onClick={() => setShowDebug(false)}
            className="w-full bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 