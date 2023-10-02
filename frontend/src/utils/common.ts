export const getFileUrl = (id: string) =>
  `${import.meta.env.VITE_SERVER_FILES_URL}${id}`

export const getFormattedPrice = (price: number) => `$${price.toFixed(2)}`
