import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreatePhononResponse, DescriptorDTO, Phonon, Session } from "../types";

// const baseUrl = "";
const bridgeUrl = "https://phonon.npmaile.com:8080/phonon/";

export const api = createApi({
  // reducerPath: "api",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["Session", "Phonon"],
  endpoints: (builder) => ({
    fetchSessions: builder.query<{ Sessions: Session[] }, void>({
      query: () => "listSessions",
    }),
    unlockSession: builder.mutation<void, { sessionId: string; pin: string }>({
      query: ({ sessionId, pin }) => ({
        url: `cards/${sessionId}/unlock`,
        method: "POST",
        body: { pin },
      }),
    }),
    pairSession: builder.mutation<void, { sessionId: string; cardId: string }>({
      query: ({ cardId, sessionId }) => ({
        url: `cards/${sessionId}/Pair`,
        method: "POST",
        body: { url: `${bridgeUrl}${cardId}` },
      }),
    }),
    fetchPhonons: builder.query<Phonon[], { sessionId: string }>({
      query: ({ sessionId }) => `/cards/${sessionId}/listPhonons`,
      providesTags: ["Phonon"],
    }),
    createPhonon: builder.mutation<CreatePhononResponse, { sessionId: string }>(
      {
        query: ({ sessionId }) => ({
          url: `cards/${sessionId}/phonon/create`,
          method: "POST",
        }),
        invalidatesTags: ["Phonon"],
      }
    ),
    setDescriptor: builder.mutation<void, DescriptorDTO>({
      query: ({ index, currencyType, sessionId, value }) => ({
        url: `cards/${sessionId}/phonon/${index}/setDescriptor`,
        method: "POST",
        body: { currencyType, value },
      }),
      invalidatesTags: ["Phonon"],
    }),
    redeemPhonon: builder.mutation<
      { privateKey: string },
      { index: number; sessionId: string }
    >({
      query: ({ index, sessionId }) => ({
        url: `cards/${sessionId}/phonon/${index}/redeem`,
        method: "POST",
      }),
      invalidatesTags: ["Phonon"],
    }),
    sendPhonon: builder.mutation<void, { index: number; sessionId: string }>({
      query: ({ index, sessionId }) => ({
        url: `cards/${sessionId}/phonon/${index}/send`,
        method: "POST",
      }),
      invalidatesTags: ["Phonon"],
    }),
  }),
});

export const {
  useFetchSessionsQuery,
  useUnlockSessionMutation,
  usePairSessionMutation,
  useFetchPhononsQuery,
  useCreatePhononMutation,
  useSetDescriptorMutation,
  useRedeemPhononMutation,
  useSendPhononMutation,
} = api;
