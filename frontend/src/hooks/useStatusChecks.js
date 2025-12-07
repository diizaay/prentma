import { useCallback, useEffect, useMemo, useState } from "react";

import { createStatusCheck, listStatusChecks } from "../services/api";

export function useStatusChecks(options = {}) {
  const { limit } = options;
  const [statusChecks, setStatusChecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadStatusChecks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listStatusChecks();
      setStatusChecks(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Nao foi possivel carregar os registos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatusChecks();
  }, [loadStatusChecks]);

  const submitStatusCheck = useCallback(
    async (clientName) => {
      const trimmedName = (clientName || "").trim();
      if (!trimmedName) {
        return;
      }

      setSubmitting(true);
      try {
        await createStatusCheck(trimmedName);
        await loadStatusChecks();
        setError("");
      } catch (err) {
        console.error(err);
        setError("Nao foi possivel registar o estado agora.");
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [loadStatusChecks]
  );

  const recentStatusChecks = useMemo(() => {
    if (limit == null) {
      return statusChecks;
    }
    return statusChecks.slice(0, limit);
  }, [limit, statusChecks]);

  return {
    statusChecks,
    recentStatusChecks,
    loading,
    submitting,
    error,
    submitStatusCheck,
    reloadStatusChecks: loadStatusChecks,
    setStatusError: setError,
  };
}
