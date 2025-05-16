import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ActionSpec } from "../../types/events";
import { ComponentState } from "../../types/state";
import { generateUniqueId } from "./unique-id";

export interface EventLog {
  id: string;
  timestamp: number;
  eventType: string;
  target: string;
  action: ActionSpec;
  state?: ComponentState;
  propagationPath: string[];
  stopped: boolean;
  prevented: boolean;
}

interface EventDebuggerProps {
  logs: EventLog[];
  enabled: boolean;
  onClear: () => void;
  onToggle: () => void;
}

const EventDebugger: React.FC<EventDebuggerProps> = ({ logs, enabled, onClear, onToggle }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<string>("");
  // Remove unused state
  // const [selectedLog, setSelectedLog] = useState<EventLog | null>(null);

  const filteredLogs = logs.filter(
    (log) =>
      filter === "" ||
      log.eventType.includes(filter) ||
      log.action.type.includes(filter) ||
      log.target.includes(filter)
  );

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  return (
    <div
      className={`fixed bottom-0 right-0 w-96 h-80 bg-white dark:bg-gray-900 border-l border-t rounded-tl-lg shadow-xl transition-all ${enabled ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="font-semibold text-sm">Event Debugger</h3>
        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
          <button
            onClick={onToggle}
            className="text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Hide
          </button>
        </div>
      </div>

      <div className="p-3 border-b">
        <input
          type="text"
          placeholder="Filter events..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-2 py-1 text-sm border rounded"
        />
      </div>

      <div className="overflow-y-auto h-56">
        {filteredLogs.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">No events logged</div>
        ) : (
          <div className="divide-y">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => toggleExpand(log.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleExpand(log.id);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900 px-1 rounded">
                      {log.eventType}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{log.target}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                {expanded.has(log.id) && (
                  <div className="mt-2 text-xs">
                    <div className="mb-1">
                      <strong>Action:</strong> {log.action.type}
                    </div>
                    {log.action.payload && (
                      <div className="mb-1">
                        <strong>Payload:</strong>
                        <pre className="mt-1 p-1 bg-gray-100 dark:bg-gray-800 rounded overflow-x-auto">
                          {JSON.stringify(log.action.payload, null, 2)}
                        </pre>
                      </div>
                    )}
                    {log.state && (
                      <div className="mb-1">
                        <strong>State:</strong>
                        <pre className="mt-1 p-1 bg-gray-100 dark:bg-gray-800 rounded overflow-x-auto">
                          {JSON.stringify(log.state, null, 2)}
                        </pre>
                      </div>
                    )}
                    <div className="flex gap-3 mt-2">
                      {log.stopped && <span className="text-orange-600">Propagation Stopped</span>}
                      {log.prevented && <span className="text-red-600">Default Prevented</span>}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export interface UseEventDebuggerOptions {
  enabled?: boolean;
  maxLogs?: number;
}

export function useEventDebugger(options: UseEventDebuggerOptions = {}) {
  const [logs, setLogs] = useState<EventLog[]>([]);
  const [enabled, setEnabled] = useState(options.enabled ?? false);
  const maxLogs = options.maxLogs ?? 100;

  const logEvent = (
    eventType: string,
    target: string,
    action: ActionSpec,
    state?: ComponentState,
    propagationPath: string[] = [],
    stopped = false,
    prevented = false
  ) => {
    const log: EventLog = {
      id: generateUniqueId("log"),
      timestamp: Date.now(),
      eventType,
      target,
      action,
      state,
      propagationPath,
      stopped,
      prevented,
    };

    setLogs((prev) => {
      const newLogs = [log, ...prev];
      return newLogs.slice(0, maxLogs);
    });
  };

  const clearLogs = () => setLogs([]);
  const toggleDebugger = () => setEnabled((prev) => !prev);

  const DebuggerPortal = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(
      <EventDebugger logs={logs} enabled={enabled} onClear={clearLogs} onToggle={toggleDebugger} />,
      document.body
    );
  };

  return {
    logEvent,
    clearLogs,
    toggleDebugger,
    DebuggerPortal,
    enabled,
  };
}
