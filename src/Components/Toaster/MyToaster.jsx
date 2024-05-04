import React from 'react'
import { Toaster } from 'sonner'
const MyToaster = () => {
  return (
    <Toaster
    position='top-center'
    richColors
      // toastOptions={{
      //   unstyled: true,
      //   classNames: {
      //     toast: 'bg-blue-400',
      //     title: 'text-red-400',
      //     description: 'text-red-400',
      //     actionButton: 'bg-zinc-400',
      //     cancelButton: 'bg-orange-400',
      //     closeButton: 'bg-lime-400',
      //   },

        //   classNames: {
        //     error: 'bg-red-400',
        //     success: 'text-green-400',
        //     warning: 'text-yellow-400',
        //     info: 'bg-blue-400',
        //   },
        // }}
        // icons={{
        //   success: <SuccessIcon />,
        //   info: <InfoIcon />,
        //   warning: <WarningIcon />,
        //   error: <ErrorIcon />,
        //   loading: <LoadingIcon />,
      // }}
    />)
}

export default MyToaster
