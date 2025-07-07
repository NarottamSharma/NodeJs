// Using setItem method (recommended approach)
localStorage.setItem("name", "Narottam Sharma")

// Using property assignment (alternative approach)
localStorage.name = "Narottam"

// Using getItem method (recommended approach)
localStorage.getItem("name")  // Returns "Narottam Sharma"

// Using property access (alternative approach)
localStorage.name  // Returns "Narottam"

// Remove a specific item
localStorage.removeItem('beta')

// Clear all items in localStorage
localStorage.clear()

// Get key at specific index
localStorage.key(0)  // Returns first key

// Check how many items are stored
localStorage.length  // Returns number of stored items


// Storing booleans
let isLoggedIn = JSON.stringify(false)
localStorage.setItem("isLogged", isLoggedIn)

// Retrieving and parsing
JSON.parse(localStorage.getItem("isLogged"))  // Returns actual boolean false

// Storing arrays
let arr = [1, 34, 5, 3]
localStorage.setItem("array", JSON.stringify(arr))

// Retrieving arrays
JSON.parse(localStorage.getItem("array"))  // Returns [1, 34, 5, 3]


// Key Points to Remember
// LocalStorage persists even after browser restart
// Limited to about 5MB of storage
// Only stores strings (use JSON for complex data)
// Only accessible on same domain
// Synchronous operations (can affect performance)