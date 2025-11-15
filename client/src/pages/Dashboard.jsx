import { useState, useEffect } from 'react'
import { feedbackAPI } from '../services/api'
import AnalyticsCards from '../components/AnalyticsCards'
import FeedbackTable from '../components/FeedbackTable'

const Dashboard = () => {
  const [stats, setStats] = useState({})
  const [feedbacks, setFeedbacks] = useState([])
  const [ratingFilter, setRatingFilter] = useState(null)
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStats()
    fetchFeedbacks()
  }, [])

  useEffect(() => {
    fetchFeedbacks()
  }, [ratingFilter])

  const fetchStats = async () => {
    try {
      setIsLoadingStats(true)
      const response = await feedbackAPI.getStats()
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
      setError('Failed to load statistics')
    } finally {
      setIsLoadingStats(false)
    }
  }

  const fetchFeedbacks = async () => {
    try {
      setIsLoadingFeedbacks(true)
      const response = await feedbackAPI.getFeedbacks(ratingFilter)
      setFeedbacks(response.data)
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
      setError('Failed to load feedback data')
    } finally {
      setIsLoadingFeedbacks(false)
    }
  }

  const refreshData = () => {
    fetchStats()
    fetchFeedbacks()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Monitor customer feedback and insights</p>
            </div>
            <button
              onClick={refreshData}
              className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2 shadow-sm"
              disabled={isLoadingStats || isLoadingFeedbacks}
            >
              <svg className={`w-5 h-5 ${isLoadingStats || isLoadingFeedbacks ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        )}

        <AnalyticsCards stats={stats} isLoading={isLoadingStats} />
        
        <FeedbackTable 
          feedbacks={feedbacks} 
          isLoading={isLoadingFeedbacks}
          onRatingFilter={setRatingFilter}
          ratingFilter={ratingFilter}
        />
      </div>
    </div>
  )
}

export default Dashboard
