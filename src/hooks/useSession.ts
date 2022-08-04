import { useParams } from "react-router";
import { useFetchSessionsQuery } from "../store/api";

export const useSession = () => {
  const { data, isLoading } = useFetchSessionsQuery();

  const getSessionName = (session?: Session) => {
    return session?.Name ? session?.Name : session?.Id;
  };

  const getSessionFromSessionList = (sessionId: string) => {
    return data?.find((session) => session.Id === sessionId);
  };

  const getSessionNameForId = (sessionId: string) => {
    const session = getSessionFromSessionList(sessionId);
    return getSessionName(session);
  };

  const { sessionId } = useParams<{ sessionId: string }>();

  const activeSession = getSessionFromSessionList(sessionId);
  const sessionName = getSessionName(activeSession);

  return {
    sessionId,
    sessionName,
    activeSession,
    isSessionLoading: isLoading,
    getSessionFromSessionList,
    getSessionName,
    getSessionNameForId,
  };
};
