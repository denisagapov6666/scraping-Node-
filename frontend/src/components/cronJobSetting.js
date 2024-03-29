import React, { useState } from 'react';

function CronJobPage() {
  const [cronExpression, setCronExpression] = useState('');
  const [command, setCommand] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/schedule-cron-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cronExpression, command }),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule cron job.');
      }

      setMessage('Cron job scheduled successfully.');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Schedule Cron Job</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cronExpression">Cron Expression:</label>
          <input
            type="text"
            id="cronExpression"
            value={cronExpression}
            onChange={(e) => setCronExpression(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="command">Command/Script:</label>
          <input
            type="text"
            id="command"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CronJobPage;
