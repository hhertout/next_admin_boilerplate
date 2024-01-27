'use client'

import React, {forwardRef, useCallback, useEffect, useState} from "react";

const CSRFInput = forwardRef<HTMLInputElement, any>((_, ref) => {
  const [token, setToken] = useState<string>("")

  const fetchCsrfToken = useCallback(async (signal: AbortSignal) => {
    try {
      const res = await fetch(`/api/csrf-token`, {
        credentials: 'include',
        signal,
      });
      if (res.ok) {
        return await res.json()
      } else {
        throw new Error("Failed to fetch CSRF token");
      }
    } catch (err) {
      throw err
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    fetchCsrfToken(controller.signal)
      .then(data => setToken(data.token))
      .catch((err: any) => {
        if (err.name !== 'AbortError') console.error(err)
      })

    return () => controller.abort()
  }, [fetchCsrfToken])

  return <input ref={ref} type={'hidden'} name={'csrf-token'} value={token}/>
})

CSRFInput.displayName = 'CSRFInput';

export default CSRFInput