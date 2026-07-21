import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Kanban from "./pages/Kanban";
import Teams from "./pages/Teams";
import Settings from "./pages/Settings";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public Routes */}

                <Route

                    path="/"

                    element={<Login />}

                />

                <Route

                    path="/login"

                    element={<Login />}

                />

                <Route

                    path="/register"

                    element={<Register />}

                />

                {/* Protected Routes */}

                <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/projects"

                    element={

                        <ProtectedRoute>

                            <Projects />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/tasks"

                    element={

                        <ProtectedRoute>

                            <Tasks />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/kanban"

                    element={

                        <ProtectedRoute>

                            <Kanban />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/teams"

                    element={

                        <ProtectedRoute>

                            <Teams />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/settings"

                    element={

                        <ProtectedRoute>

                            <Settings />

                        </ProtectedRoute>

                    }

                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;