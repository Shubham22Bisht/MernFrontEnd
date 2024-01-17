import React from 'react'

export const useGetUserID = () => {
  return window.localStorage.getItem("userID");
}
