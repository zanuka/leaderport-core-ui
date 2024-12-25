import { FormEvent } from "react";
import { useSettingsStore } from "../../src/stores/settings";

export default function SettingsForm() {
  const { settings, saveSettings, loadSettings, savedMessage, updateSettings } =
    useSettingsStore();

  // Load settings on mount
  React.useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await saveSettings(settings);
  };

  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <div className="form-group">
        <label htmlFor="apiKey">API Key</label>
        <input
          type="password"
          id="apiKey"
          value={settings.apiKey}
          onChange={(e) => updateSettings({ apiKey: e.target.value })}
          placeholder="Enter your API key"
        />
      </div>

      <div className="form-group">
        <label htmlFor="refreshInterval">Refresh Interval (minutes)</label>
        <input
          type="number"
          id="refreshInterval"
          value={settings.refreshInterval}
          onChange={(e) =>
            updateSettings({ refreshInterval: Number(e.target.value) })
          }
          min={1}
          max={60}
        />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) =>
              updateSettings({ notifications: e.target.checked })
            }
          />
          Enable Notifications
        </label>
      </div>

      <button type="submit" className="save-button">
        Save Settings
      </button>

      {savedMessage && <div className="save-message">{savedMessage}</div>}

      <style jsx>{`
        .settings-form {
          padding: 1rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
        }

        .form-group input[type="password"],
        .form-group input[type="number"] {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .save-button {
          background-color: #4caf50;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .save-button:hover {
          background-color: #45a049;
        }

        .save-message {
          margin-top: 1rem;
          padding: 0.5rem;
          color: #4caf50;
        }
      `}</style>
    </form>
  );
}
