// Using setItem method (recommended approach)
sessionStorage.setItem("username", "Narottam")

// Using property assignment (alternative approach)
sessionStorage.username = "Narottam"

// Using getItem method (recommended approach)
sessionStorage.getItem("username")  // Returns "Narottam"

// Using property access (alternative approach)
sessionStorage.username  // Returns "Narottam"

// Remove a specific item
sessionStorage.removeItem('tempData')

// Clear all items in sessionStorage
sessionStorage.clear()

// Get key at specific index
sessionStorage.key(0)  // Returns first key

// Check how many items are stored
sessionStorage.length  // Returns number of stored items

// Storing objects
const userPreferences = {
  theme: 'dark',
  fontSize: 14
}
sessionStorage.setItem("preferences", JSON.stringify(userPreferences))

// Retrieving objects
const preferences = JSON.parse(sessionStorage.getItem("preferences"))

// Storing arrays
const recentSearches = ["nodejs", "express", "react"]
sessionStorage.setItem("searches", JSON.stringify(recentSearches))



// Key Points to Remember
// Limited Persistence: Data is cleared when the page session ends (tab closes)
// Scope: Limited to the tab/window where it was created
// Storage Limit: Similar to LocalStorage (around 5MB)
// String Storage: Only stores strings (use JSON for complex data)
// Same-Origin: Only accessible on same domain
// Synchronous API: Operations can block the main thread


// Feature	LocalStorage	SessionStorage
// Persistence	Until explicitly cleared	Until tab/window closes
// Scope	Across all tabs/windows	Limited to creating tab
// API Methods	Same	Same
// Storage Size	~5MB	~5MB
// SessionStorage is ideal for temporary data that shouldn't persist beyond the current browsing session.