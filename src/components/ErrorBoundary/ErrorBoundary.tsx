import { Component, ReactNode } from "react";
import { clearSession } from "@/utils/clearSession";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

function isNonCriticalError(error: Error): boolean {
  if (error.name === "NotFoundError") return true;
  if (error.message?.includes("removeChild")) return true;
  if (error.message?.includes("insertBefore")) return true;
  if (error.message?.includes("NotFoundError")) return true;
  return false;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (isNonCriticalError(error)) {
      return { hasError: false, error: null };
    }
    if (error.name === "NotFoundError") {
      return { hasError: false, error: null };
    }
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (isNonCriticalError(error)) {
      console.warn("Non-critical DOM error ignored:", error.message);
      return;
    }
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReload = () => {
    clearSession();
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4"
          style={{ overflow: "hidden" }}
        >
          <div className="max-w-md w-full text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-red-400" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">
                Algo salió mal
              </h1>
              <p className="text-gray-400">
                Ha ocurrido un error inesperado. Tu sesión ha sido limpiada automáticamente.
              </p>
            </div>

            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
