import React, { Children, lazy } from 'react'
import Home from '@/views/Home'
import HomePage from '@/views/Page/HomePage'
import DetectionPage from '@/views/Page/DetectionPage'
import HelpPage from '@/views/Page/HelpPage'
import AnalysisPage from '@/views/Page/AnalysisPage'
import SettingPage from '@/views/Page/SettingPage'
import ResultPage from '../views/Page/DetectionInform/ResultPage'
import TestPage from '../views/Page/DetectionInform/AnalysisPage'

// import DetectionPage from '@/views/Page/DetectionPage'
import { Navigate } from 'react-router-dom'

// const HomePage = lazy(() => import('../views/Page/HomePage'))
// const DetectionPage = lazy(() => import('../views/Page/DetectionPage'))
// const HelpPage = lazy(() => import('../views/Page/HelpPage'))
// const AnalysisPage = lazy(() => import('../views/Page/AnalysisPage'))
// const SettingPage = lazy(() => import('../views/Page/SettingPage'))

const routes = [
    {
        path: '/',
        element: <Navigate to='/HomePage' />
    },
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '/HomePage',
                element: <HomePage />
            },
            {
                path: '/DetectionPage',
                element: <DetectionPage />,
                children: [
                    {
                        path: '/DetectionPage/result',
                        element: <ResultPage />
                    },
                    {
                        path: '/DetectionPage/test',
                        element: <TestPage />
                    },
                    {
                        path: '/DetectionPage/chart',
                        element: <div>图表分析</div>
                    }
                ]
            },
            {
                path: '/HelpPage',
                element: <HelpPage />
            },
            {
                path: '/AnalysisPage',
                element: <AnalysisPage />
            },
            {
                path: '/SettingPage',
                element: <SettingPage />
            },
        ]
    }
]

export default routes