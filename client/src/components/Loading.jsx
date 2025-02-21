import { useAuth } from '@/context/AuthProvider';
import { LoaderCircleIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Loading = ({children}) => {
    const {loading} = useAuth()
  return (
    loading ? (
        <div className='min-h-screen min-w-full flex items-center justify-center'>
            <LoaderCircleIcon className='animate-spin text-emerald-600' size={90} />
        </div>
    ) : (
        <>
            {children}
        </>
    )
  )
}

export default Loading
