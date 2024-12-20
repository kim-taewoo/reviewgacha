"use client"

import { RealtimePostgresChangesPayload } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

import { getSupabaseBrowserClient } from "@/lib/supabase/client"

import { Gacha } from "./types"

interface Props {
  initialState: Gacha[]
}

export const RealtimeGachas = ({ initialState }: Props) => {
  const supabase = getSupabaseBrowserClient()
  const [gachas, setGachas] = useState(initialState || [])

  useEffect(() => {
    const listener = (payload: RealtimePostgresChangesPayload<Gacha>) => {
      const eventType = payload.eventType
      if (eventType === "INSERT") {
        setGachas(prev => [...prev, payload.new])
      }
    }
    const subscription = supabase
      .channel("my-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "gachas",
          // filter: ``
        },
        listener,
      )
      .subscribe()
    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <div>
      Realtime
      <div>
        <pre>
          {JSON.stringify(gachas, null, 2)}
        </pre>
      </div>
    </div>
  )
}
