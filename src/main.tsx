import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './pages/Home/Home.tsx';
import WeeklyMovieGenerator from './pages/WeeklyMovieGenerator/WeeklyMovieGenerator.tsx';
import DailyMovieGenerator from './pages/DailyMovieGenerator/DailyMovieGenerator.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/weekly-movie",
    element: <WeeklyMovieGenerator />,
  },
  {
    path: "/daily-movie",
    element: <DailyMovieGenerator />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
