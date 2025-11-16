export const saveToLocalStorage = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(data))
      return true
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      return false
    }
  }
  return false
}

export const getFromLocalStorage = (key: string, defaultValue: any = null) => {
  if (typeof window !== "undefined") {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return defaultValue
    }
  }
  return defaultValue
}

export const loadFromLocalStorage = getFromLocalStorage

export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error("Error removing from localStorage:", error)
      return false
    }
  }
  return false
}

export const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error("Error clearing localStorage:", error)
      return false
    }
  }
  return false
}
