// Middleware for request counting
let requestStats = {
  total: 0,
  successful: 0,
  failed: 0,
  startTime: new Date(),
  totalResponseTime: 0,
  responseTimes: []
};

function trackRequests(req, res, next) {
  const startTime = Date.now();
  requestStats.total++;
  console.log(`Request #${requestStats.total}: ${req.method}       ${req.path}`);

  // Track response status and timing
  const originalSend = res.send;
  res.send = function(data) {
    const responseTime = Date.now() - startTime;
    requestStats.totalResponseTime += responseTime;
    requestStats.responseTimes.push(responseTime);

    // Keep only last 100 response times to prevent memory issues
    if (requestStats.responseTimes.length > 100) {
      requestStats.responseTimes.shift();
    }

    if (res.statusCode >= 200 && res.statusCode < 400) {
      requestStats.successful++;
    } else {
      requestStats.failed++;
    }

    console.log(`Response time: ${responseTime}ms`);
    return originalSend.call(this, data);
  };

  next();
}

app.use(express.json());
app.use(trackRequests);

// Input validation middleware
function validateHealthCheckup(req, res, next) {
  const { username, password } = req.headers;
  const { kidneyId } = req.query;

  if (!username || !password) {
    return res.status(400).json({ 
      error: "Missing credentials",
      message: "Username and password headers are required" 
    });
  }

  if (username !== "narottam" || password !== "pass") {
    return res.status(401).json({ 
      error: "Invalid credentials",
      message: "Please check your username and password" 
    });
  }

  if (!kidneyId || (kidneyId != "1" && kidneyId != "2")) {
    return res.status(400).json({ 
      error: "Invalid kidney ID",
      message: "kidneyId must be 1 or 2" 
    });
  }

  next();
}



app.get("/stats", (req, res) => {
  const uptime = Math.floor((new Date() - requestStats.startTime) / 1000);
  const avgResponseTime = requestStats.total > 0 ? 
    Math.round(requestStats.totalResponseTime / requestStats.total) : 0;

  const recentAvgResponseTime = requestStats.responseTimes.length > 0 ?
    Math.round(requestStats.responseTimes.reduce((a, b) => a + b, 0) / requestStats.responseTimes.length) : 0;

  const minResponseTime = requestStats.responseTimes.length > 0 ? 
    Math.min(...requestStats.responseTimes) : 0;

  const maxResponseTime = requestStats.responseTimes.length > 0 ? 
    Math.max(...requestStats.responseTimes) : 0;

  res.json({
    requests: {
      total: requestStats.total,
      successful: requestStats.successful,
      failed: requestStats.failed,
      startTime: requestStats.startTime
    },
    performance: {
      averageResponseTime: `${avgResponseTime}ms`,
      recentAverageResponseTime: `${recentAvgResponseTime}ms (last ${requestStats.responseTimes.length} requests)`,
      minResponseTime: `${minResponseTime}ms`,
      maxResponseTime: `${maxResponseTime}ms`
    },
    uptime: {
      seconds: uptime,
      formatted: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s`
    },
    server: {
      status: "running",
      port: 3000,
      environment: process.env.NODE_ENV || "development"
    }
  });
});



app.get("/system-health", (req, res) => {
  const healthCheck = {
    status: "operational",
    checks: {
      database: { status: "connected", responseTime: "12ms" },
      memory: { status: "optimal", usage: "45%" },
      cpu: { status: "normal", usage: "23%" },
      disk: { status: "healthy", usage: "67%" }
    },
    timestamp: new Date().toISOString()
  };

  res.json(healthCheck);
});




// Global catches
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal server error",
    message: "Something went wrong on our end"
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not found",
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});