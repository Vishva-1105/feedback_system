import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Feedback Dashboard
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Collect, manage, and analyze customer feedback in one place. 
          Make data-driven decisions to improve your products and services.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="card p-8 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold mb-4">Submit Feedback</h2>
            <p className="text-gray-600 mb-6">
              Share your thoughts and help us improve our services
            </p>
            <Link
              to="/feedback"
              className="btn-primary inline-block"
            >
              Give Feedback
            </Link>
          </div>
          
          <div className="card p-8 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-2xl font-semibold mb-4">View Dashboard</h2>
            <p className="text-gray-600 mb-6">
              Analyze feedback trends and statistics
            </p>
            <Link
              to="/dashboard"
              className="btn-primary inline-block"
            >
              View Analytics
            </Link>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Fast & Simple</h3>
            <p className="text-gray-600">Easy-to-use interface for quick feedback submission</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-gray-600">Get instant insights from customer feedback</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🛡️</div>
            <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">Your data is safe with enterprise-grade security</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
